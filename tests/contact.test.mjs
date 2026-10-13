import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createContactHandler, validateContact } from "../server/contact.js";
import {
  createSenders,
  deliverContact,
  contactText,
} from "../server/delivery.js";

const origin = "https://elit-plit.ru";
const lead = {
  service: "Укладка плитки на пол",
  name: "Тест",
  phone: "+7 985 085-28-04",
  address: "",
  square: "2.5",
  email: "",
  check: true,
};
const silent = () => {};

async function serve(t, senders) {
  const server = createServer(
    createContactHandler({ senders, allowedOrigins: [origin], log: silent }),
  );
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(
    () =>
      new Promise((resolve) => {
        server.closeAllConnections();
        server.close(resolve);
      }),
  );
  const url = `http://127.0.0.1:${server.address().port}/api/contact`;
  return (body = lead, options = {}) =>
    fetch(url, {
      method: "POST",
      headers: { origin, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...options,
    });
}

test("both channels start independently and any confirmed delivery succeeds", async () => {
  let release;
  const waiting = new Promise((resolve) => {
    release = resolve;
  });
  const calls = [];
  const delivery = deliverContact(
    lead,
    {
      telegram: async () => {
        calls.push("telegram");
        await waiting;
        throw new Error("offline");
      },
      email: async () => {
        calls.push("email");
        return "smtp-id";
      },
    },
    silent,
  );
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(calls, ["telegram", "email"]);
  release();
  assert.equal(await delivery, true);
  assert.equal(
    await deliverContact(
      lead,
      {
        telegram: async () => "tg-id",
        email: () => {
          throw new Error("SMTP offline");
        },
      },
      silent,
    ),
    true,
  );
});

test("provider error details and credentials never enter logs", async () => {
  const logs = [];
  const ok = await deliverContact(
    lead,
    {
      telegram: async () => {
        throw new Error("secret-token https://private");
      },
      email: async () => {
        throw new Error("secret-password private lead");
      },
    },
    (line) => logs.push(line),
  );
  assert.equal(ok, false);
  assert.equal(logs.length, 2);
  assert.ok(logs.every((line) => !/secret|private/.test(line)));
});

test("validation rejects missing consent, phone, unexpected service and malformed fields", () => {
  for (const value of [
    null,
    [],
    { ...lead, check: false },
    { ...lead, check: "on" },
    { ...lead, phone: "abc" },
    { ...lead, phone: "" },
    { ...lead, phone: "+1" },
    { ...lead, service: "Invented service" },
    { ...lead, name: { nested: true } },
    { ...lead, address: "x".repeat(501) },
    { ...lead, email: "bad-email" },
    { ...lead, email: "a@b.ru\r\nBcc: injected@example.org" },
    { ...lead, square: "0" },
    { ...lead, square: "-1" },
    { ...lead, square: "Infinity" },
  ]) {
    assert.throws(() => validateContact(value));
  }
  assert.equal(validateContact({ ...lead, square: "2,5" }).square, "2.5");
  assert.equal(
    validateContact({ ...lead, square: "", name: "", email: "" }).square,
    "",
  );
});

test("one shared request prevents duplicate delivery during and after submission", async (t) => {
  let telegram = 0,
    email = 0;
  const post = await serve(t, {
    telegram: async () => {
      telegram++;
      await new Promise((resolve) => setTimeout(resolve, 40));
      return "tg-id";
    },
    email: async () => {
      email++;
      return "smtp-id";
    },
  });
  const responses = await Promise.all([post(), post()]);
  for (const response of responses)
    assert.deepEqual(await response.json(), { ok: true });
  assert.equal((await post()).status, 200);
  assert.equal(telegram, 1);
  assert.equal(email, 1);
});

test("a failed pair returns an error and allows a later attempt", async (t) => {
  let online = false;
  const send = async () => {
    if (!online) throw new Error("secret URL");
    return "id";
  };
  const post = await serve(t, { telegram: send, email: send });
  const failed = await post();
  assert.equal(failed.status, 502);
  assert.equal((await failed.json()).ok, false);
  online = true;
  assert.equal((await post()).status, 200);
});

test("bad origin, method, body or content type never calls a delivery channel", async (t) => {
  let sends = 0;
  const post = await serve(t, {
    telegram: async () => {
      sends++;
    },
  });
  assert.equal(
    (await post(lead, { method: "GET", body: undefined })).status,
    405,
  );
  assert.equal(
    (
      await post(lead, {
        headers: {
          origin: "https://unrelated.example",
          "Content-Type": "application/json",
        },
      })
    ).status,
    403,
  );
  assert.equal(
    (await post(lead, { headers: { "Content-Type": "application/json" } }))
      .status,
    403,
  );
  assert.equal(
    (await post(lead, { headers: { origin, "Content-Type": "text/plain" } }))
      .status,
    415,
  );
  assert.equal((await post(lead, { body: "{broken" })).status, 400);
  assert.equal((await post({ ...lead, check: false })).status, 400);
  assert.equal(
    (await post({ ...lead, address: "x".repeat(9000) })).status,
    413,
  );
  assert.equal(sends, 0);
});

test("Telegram success requires an actual message receipt for the configured group", async () => {
  const env = { TG_BOT_TOKEN: "test-token", TG_CHAT_ID: "-123" };
  let payload;
  const senders = createSenders(env, {
    fetchImpl: async (url, options) => {
      assert.equal(url, "https://api.telegram.org/bottest-token/sendMessage");
      payload = JSON.parse(options.body);
      return {
        ok: true,
        json: async () => ({
          ok: true,
          result: { message_id: 42, chat: { id: -123 } },
        }),
      };
    },
  });
  assert.equal(await senders.telegram(lead), "42");
  assert.equal(payload.chat_id, "-123");
  assert.equal(payload.parse_mode, undefined);
  for (const response of [
    { ok: false },
    { ok: true },
    { ok: true, result: { message_id: 42, chat: { id: -456 } } },
  ]) {
    const broken = createSenders(env, {
      fetchImpl: async () => ({ ok: true, json: async () => response }),
    });
    await assert.rejects(() => broken.telegram(lead));
  }
});

test("stairs are described in linear metres in both delivery channels", () => {
  const text = contactText({ ...lead, service: "Укладка ступени" });
  assert.ok(text.includes("Длина: 2.5 пог. м"));
  assert.ok(!text.includes("Площадь:"));
});
