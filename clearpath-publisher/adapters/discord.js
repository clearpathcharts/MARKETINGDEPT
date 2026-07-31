/**
 * Discord — direct webhook. No middleman.
 * Needs: DISCORD_WEBHOOK_URL (Server Settings → Integrations → Webhooks)
 */
export function discordReady() {
  return Boolean(process.env.DISCORD_WEBHOOK_URL);
}

export async function sendDiscord(text) {
  const res = await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: text.slice(0, 2000) }),
  });
  if (!res.ok && res.status !== 204) {
    const body = await res.text().catch(() => "");
    throw new Error(`Discord webhook: ${res.status} ${body.slice(0, 200)}`);
  }
  return { delivered: true };
}
