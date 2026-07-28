/**
 * ClearPath private publisher — Buffer-style queue for education posts.
 * Live sends go through Zapier MCP (Cursor) after explicit confirmation.
 */

export type PublishChannelId = "youtube" | "telegram" | "discord";

export type PublishJobStatus = "draft" | "queued" | "ready" | "sent" | "failed";

export interface PublishChannel {
  id: PublishChannelId;
  name: string;
  capability: string;
  zapierAction: string;
  defaultTarget: string;
  videoMode: "upload_file" | "link_in_message";
}

export interface PublishJob {
  id: string;
  createdAt: string;
  scheduledFor: string | null;
  title: string;
  caption: string;
  videoUrl: string;
  videoFileName: string;
  channels: PublishChannelId[];
  calmConfirmed: boolean;
  educationOnlyConfirmed: boolean;
  status: PublishJobStatus;
  notes: string;
}

export const PUBLISH_CHANNELS: PublishChannel[] = [
  {
    id: "youtube",
    name: "YouTube",
    capability: "Upload video (Zapier: youtube_upload_video)",
    zapierAction: "youtube_upload_video",
    defaultTarget: "ClearPath YouTube channel",
    videoMode: "upload_file",
  },
  {
    id: "telegram",
    name: "Telegram",
    capability: "Send message + link (Zapier: telegram_send_message)",
    zapierAction: "telegram_send_message",
    defaultTarget: "@clearpathtraderfreeaccount",
    videoMode: "link_in_message",
  },
  {
    id: "discord",
    name: "Discord",
    capability: "Channel message + link (Zapier: discord_send_channel_message)",
    zapierAction: "discord_send_channel_message",
    defaultTarget: "announcements / general (pick channel at send time)",
    videoMode: "link_in_message",
  },
];

const STORAGE_KEY = "clearpath-publish-queue-v1";

export function loadPublishQueue(): PublishJob[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PublishJob[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePublishQueue(jobs: PublishJob[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function createJobId(): string {
  return `pub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function buildFanOutPackage(job: PublishJob): string {
  const lines: string[] = [
    "CLEARPATH PUBLISH PACKAGE",
    `Job: ${job.id}`,
    `Title: ${job.title}`,
    `Scheduled: ${job.scheduledFor ?? "ASAP (after confirmation)"}`,
    `Status: ${job.status}`,
    "",
    "MISSION CHECKS",
    `- Calm / no flash: ${job.calmConfirmed ? "YES" : "NO"}`,
    `- Education only (not brokerage): ${job.educationOnlyConfirmed ? "YES" : "NO"}`,
    "",
    "CAPTION",
    job.caption,
    "",
    `Video URL: ${job.videoUrl || "(none — attach file for YouTube via Cursor/Zapier)"}`,
    `Local file name: ${job.videoFileName || "(none)"}`,
    "",
    "CHANNELS",
  ];

  for (const id of job.channels) {
    const ch = PUBLISH_CHANNELS.find((c) => c.id === id);
    if (!ch) continue;
    lines.push(`- ${ch.name} → ${ch.zapierAction} → ${ch.defaultTarget}`);
    if (ch.id === "telegram") {
      lines.push(
        `  text: ${job.title}\n\n${job.caption}${job.videoUrl ? `\n\n${job.videoUrl}` : ""}\n\nNot a brokerage. https://clearpathtrader.com`,
      );
    }
    if (ch.id === "discord") {
      lines.push(
        `  content: **${job.title}**\n${job.caption}${job.videoUrl ? `\n${job.videoUrl}` : ""}\n_Education only — not a brokerage._`,
      );
    }
    if (ch.id === "youtube") {
      lines.push(
        `  title: ${job.title}`,
        `  description: ${job.caption}\n\nLearn more: https://clearpathtrader.com\nEducation / analytics only — not a brokerage.`,
        `  privacy_status: unlisted (recommend first) or public`,
        `  video: FILE REQUIRED (provide path when asking Cursor to send)`,
      );
    }
  }

  lines.push(
    "",
    "INSTRUCTIONS FOR CURSOR",
    "1. Confirm this exact package with the founder.",
    "2. Execute Zapier write actions only after approval.",
    "3. Report success/fail per channel.",
  );

  return lines.join("\n");
}

export function defaultCaptionFooter(): string {
  return "\n\nClearPath Trader — market education for calm learning.\nNot a brokerage. https://clearpathtrader.com";
}
