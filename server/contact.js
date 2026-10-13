import { createHash } from "node:crypto";
import { pages } from "../src/content/pages.js";
import { deliverContact } from "./delivery.js";

const services = new Set(Object.values(pages).flatMap((page) => page.services));
const limits = {
  service: 100,
  address: 500,
  square: 32,
  email: 254,
  name: 100,
  phone: 32,
};

class ContactError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function validateContact(body) {
  if (!body || typeof body !== "object" || Array.isArray(body))
    throw new ContactError(400, "Проверьте данные формы.");
  const lead = {};
  for (const [key, max] of Object.entries(limits)) {
    const value = body[key] ?? "";
    if (typeof value !== "string" || value.length > max)
      throw new ContactError(400, "Проверьте данные формы.");
    lead[key] = value.trim().replace(/\s+/g, " ");
  }
  if (!services.has(lead.service))
    throw new ContactError(400, "Выберите услугу из списка.");
  if (body.check !== true)
    throw new ContactError(
      400,
      "Подтвердите согласие на обработку персональных данных.",
    );
  if (
    !/^[+\d\s().-]+$/.test(lead.phone) ||
    !/^\d{7,15}$/.test(lead.phone.replace(/\D/g, ""))
  )
    throw new ContactError(400, "Укажите корректный номер телефона.");
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email))
    throw new ContactError(400, "Проверьте адрес электронной почты.");
  if (lead.square) {
    const quantity = Number(lead.square.replace(",", "."));
    if (!Number.isFinite(quantity) || quantity <= 0)
      throw new ContactError(400, "Укажите площадь или длину больше нуля.");
    lead.square = String(quantity);
  }
  return lead;
}

async function readBody(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 8192)
      throw new ContactError(413, "Данные формы слишком большие.");
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new ContactError(400, "Не удалось прочитать данные формы.");
  }
}

function reply(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  res.end(JSON.stringify(body));
}

export function createContactHandler({
  senders,
  allowedOrigins,
  log = console.info,
}) {
  const recent = new Map();
  return async (req, res, next = () => reply(res, 404, { ok: false })) => {
    if (req.url?.split("?")[0] !== "/api/contact") return next();
    try {
      if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        throw new ContactError(405, "Используйте отправку формы.");
      }
      if (!allowedOrigins.includes(req.headers.origin))
        throw new ContactError(403, "Отправьте заявку со страницы сайта.");
      if (
        req.headers["content-type"]?.split(";")[0].trim().toLowerCase() !==
        "application/json"
      )
        throw new ContactError(415, "Неверный формат данных формы.");
      if (Number(req.headers["content-length"]) > 8192)
        throw new ContactError(413, "Данные формы слишком большие.");
      const lead = validateContact(await readBody(req));
      const key = createHash("sha256")
        .update(JSON.stringify(lead))
        .digest("hex");
      for (const [hash, entry] of recent) {
        if (entry.expires <= Date.now()) recent.delete(hash);
      }
      let entry = recent.get(key);
      if (!entry) {
        if (recent.size >= 500)
          throw new ContactError(
            429,
            "Попробуйте отправить заявку немного позже.",
          );
        entry = { expires: Infinity };
        recent.set(key, entry);
        entry.promise = deliverContact(lead, senders, log).then((ok) => {
          if (ok) entry.expires = Date.now() + 60_000;
          else recent.delete(key);
          return ok;
        });
      }
      if (!(await entry.promise))
        throw new ContactError(
          502,
          "Не удалось подтвердить отправку заявки. Свяжитесь с нами по телефону или в Telegram.",
        );
      reply(res, 200, { ok: true });
    } catch (error) {
      reply(res, error instanceof ContactError ? error.status : 500, {
        ok: false,
        message:
          error instanceof ContactError
            ? error.message
            : "Не удалось отправить заявку. Попробуйте позже.",
      });
    }
  };
}
