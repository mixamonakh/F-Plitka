import nodemailer from "nodemailer";

const RECIPIENT = "19aikkan85@gmail.com";

export function contactText(lead) {
  return [
    "Новая заявка — Элит-Плит",
    `Услуга: ${lead.service}`,
    `Имя: ${lead.name || "Не указано"}`,
    `Телефон: ${lead.phone}`,
    `Почта: ${lead.email || "Не указана"}`,
    `Адрес: ${lead.address || "Не указан"}`,
    lead.service === "Укладка ступени"
      ? `Длина: ${lead.square ? `${lead.square} пог. м` : "Не указана"}`
      : `Площадь: ${lead.square ? `${lead.square} м²` : "Не указана"}`,
    "Согласие на обработку персональных данных: получено",
  ].join("\n");
}

export function createSenders(env, { fetchImpl = fetch } = {}) {
  return {
    async telegram(lead) {
      if (!env.TG_BOT_TOKEN || !env.TG_CHAT_ID)
        throw new Error("Telegram not configured");
      const response = await fetchImpl(
        `https://api.telegram.org/bot${env.TG_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: env.TG_CHAT_ID,
            text: contactText(lead),
            link_preview_options: { is_disabled: true },
          }),
          signal: AbortSignal.timeout(15_000),
        },
      );
      const data = await response.json();
      if (
        !response.ok ||
        !data.ok ||
        !data.result?.message_id ||
        String(data.result.chat?.id) !== String(env.TG_CHAT_ID)
      ) {
        throw new Error("Telegram did not confirm delivery");
      }
      return String(data.result.message_id);
    },
    async email(lead) {
      const port = Number(env.SMTP_PORT || 465);
      const from = env.SMTP_FROM?.trim() || env.SMTP_USER?.trim();
      if (
        !env.SMTP_HOST ||
        !env.SMTP_USER ||
        !env.SMTP_PASSWORD ||
        !from ||
        !Number.isInteger(port) ||
        port < 1 ||
        port > 65535
      ) {
        throw new Error("SMTP not configured");
      }
      const transport = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port,
        secure: port === 465,
        requireTLS: true,
        auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
        dnsTimeout: 10_000,
        disableFileAccess: true,
        disableUrlAccess: true,
      });
      try {
        const result = await transport.sendMail({
          from: { name: "Элит-Плит", address: from },
          to: RECIPIENT,
          ...(lead.email ? { replyTo: lead.email } : {}),
          subject: "Новая заявка — Элит-Плит",
          text: contactText(lead),
        });
        if (!result.accepted?.includes(RECIPIENT))
          throw new Error("SMTP did not accept recipient");
        return result.messageId;
      } finally {
        transport.close();
      }
    },
  };
}

export async function deliverContact(lead, senders, log = console.info) {
  const channels = Object.entries(senders);
  const results = await Promise.allSettled(
    channels.map(([, send]) => Promise.resolve().then(() => send(lead))),
  );
  // Provider errors may contain credentials or message content: never log them.
  results.forEach((result, index) =>
    log(
      JSON.stringify({
        event: "contact_delivery",
        channel: channels[index][0],
        accepted: result.status === "fulfilled",
        ...(result.status === "fulfilled" ? { receipt: result.value } : {}),
      }),
    ),
  );
  return results.some((result) => result.status === "fulfilled");
}
