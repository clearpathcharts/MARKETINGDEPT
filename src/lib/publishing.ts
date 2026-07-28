/**
 * ClearPath private publisher — Buffer-style queue for education posts.
 * Live sends go through Zapier MCP (Cursor) after explicit confirmation.
 */

export type PublishChannelId =
  | "facebook"
  | "youtube"
  | "whatsapp"
  | "instagram"
  | "wechat"
  | "tiktok"
  | "douyin"
  | "reddit"
  | "snapchat"
  | "linkedin"
  | "lemon8"
  | "mastodon"
  | "telegram"
  | "discord";

export type PublishJobStatus = "draft" | "queued" | "ready" | "sent" | "failed";

export type ChannelWireStatus = "connected" | "partial" | "not_yet";

export interface PublishChannel {
  id: PublishChannelId;
  name: string;
  capability: string;
  zapierAction: string;
  defaultTarget: string;
  videoMode: "upload_file" | "link_in_message";
  status: ChannelWireStatus;
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
    id: "facebook",
    name: "Facebook",
    capability: "Page post via Zapier Facebook Pages",
    zapierAction: "Facebook Pages",
    defaultTarget: "CLEAR PATH Markets Science",
    videoMode: "link_in_message",
    status: "connected",
  },
  {
    id: "youtube",
    name: "YouTube",
    capability: "Upload video (Zapier: youtube_upload_video)",
    zapierAction: "youtube_upload_video",
    defaultTarget: "ClearPath YouTube channel",
    videoMode: "upload_file",
    status: "connected",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    capability: "WhatsApp Business — not connected yet",
    zapierAction: "WhatsApp Business",
    defaultTarget: "ClearPath WhatsApp channel",
    videoMode: "link_in_message",
    status: "not_yet",
  },
  {
    id: "instagram",
    name: "Instagram",
    capability: "Instagram for Business via Zapier",
    zapierAction: "Instagram for Business",
    defaultTarget: "Calm carousels / Reels (no flash)",
    videoMode: "link_in_message",
    status: "connected",
  },
  {
    id: "wechat",
    name: "WeChat",
    capability: "WeChat — not connected yet",
    zapierAction: "WeChat",
    defaultTarget: "China hub when staffed",
    videoMode: "link_in_message",
    status: "not_yet",
  },
  {
    id: "tiktok",
    name: "TikTok",
    capability: "TikTok — not connected yet",
    zapierAction: "TikTok",
    defaultTarget: "Calm edits only — flash risk",
    videoMode: "upload_file",
    status: "not_yet",
  },
  {
    id: "douyin",
    name: "Douyin",
    capability: "Douyin — not connected yet",
    zapierAction: "Douyin",
    defaultTarget: "China short-video hub",
    videoMode: "upload_file",
    status: "not_yet",
  },
  {
    id: "reddit",
    name: "Reddit",
    capability: "Reddit create_post via Zapier",
    zapierAction: "reddit create_post",
    defaultTarget: "ClearMarketScience — pick subreddit",
    videoMode: "link_in_message",
    status: "connected",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    capability: "Snapchat — not connected yet",
    zapierAction: "Snapchat",
    defaultTarget: "Needs Zapier app + auth",
    videoMode: "link_in_message",
    status: "not_yet",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    capability: "LinkedIn share via Zapier",
    zapierAction: "linkedin share",
    defaultTarget: "Education posts only",
    videoMode: "link_in_message",
    status: "connected",
  },
  {
    id: "lemon8",
    name: "Lemon8",
    capability: "Lemon8 — not connected yet",
    zapierAction: "Lemon8",
    defaultTarget: "Needs Zapier app + auth",
    videoMode: "link_in_message",
    status: "not_yet",
  },
  {
    id: "mastodon",
    name: "Mastodon",
    capability: "Mastodon — not connected yet",
    zapierAction: "Mastodon",
    defaultTarget: "Privacy-forward ND communities",
    videoMode: "link_in_message",
    status: "not_yet",
  },
  {
    id: "telegram",
    name: "Telegram",
    capability: "Send message + link (Zapier: telegram_send_message)",
    zapierAction: "telegram_send_message",
    defaultTarget: "@clearpathtraderfreeaccount",
    videoMode: "link_in_message",
    status: "connected",
  },
  {
    id: "discord",
    name: "Discord",
    capability: "Channel message + link (Zapier: discord_send_channel_message)",
    zapierAction: "discord_send_channel_message",
    defaultTarget: "announcements / general (pick channel at send time)",
    videoMode: "link_in_message",
    status: "connected",
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
    lines.push(`- ${ch.name} [${ch.status}] → ${ch.zapierAction} → ${ch.defaultTarget}`);
    if (ch.videoMode === "link_in_message") {
      lines.push(
        `  text: ${job.title}\n\n${job.caption}${job.videoUrl ? `\n\n${job.videoUrl}` : ""}\n\nNot a brokerage. https://clearpathtrader.com`,
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
    "2. Execute Zapier write actions only for CONNECTED channels after approval.",
    "3. Skip or flag NOT_YET channels until Zapier apps are enabled.",
    "4. Report success/fail per channel.",
  );

  return lines.join("\n");
}

export function defaultCaptionFooter(): string {
  return "\n\nClearPath Trader — market education for calm learning.\nNot a brokerage. https://clearpathtrader.com";
}
