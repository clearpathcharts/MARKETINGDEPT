/**
 * Telegram — direct Bot API. No middleman.
 * Needs: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (channel like @clearpathtraderfreeaccount or numeric id)
 */
export function telegramReady() {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

export async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text.slice(0, 4096),
      disable_web_page_preview: false,
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.ok === false) {
    throw new Error(`Telegram: ${body.description || res.status}`);
  }
  return { messageId: body.result?.message_id };
}
