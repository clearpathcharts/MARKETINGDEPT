import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  CheckCircle2,
  Clock,
  Copy,
  Film,
  Send,
  Trash2,
  AlertTriangle,
  Youtube,
  MessageCircle,
} from "lucide-react";
import {
  PUBLISH_CHANNELS,
  buildFanOutPackage,
  createJobId,
  defaultCaptionFooter,
  loadPublishQueue,
  savePublishQueue,
  type PublishChannelId,
  type PublishJob,
} from "../lib/publishing";

function DiscordIcon({ className }: { className?: string }) {
  return <MessageCircle className={className} />;
}

const CHANNEL_ICONS: Record<PublishChannelId, React.ReactNode> = {
  youtube: <Youtube className="h-4 w-4" />,
  telegram: <Send className="h-4 w-4" />,
  discord: <DiscordIcon className="h-4 w-4" />,
};

export function Publishing() {
  const [queue, setQueue] = useState<PublishJob[]>([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState(defaultCaptionFooter().trimStart());
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFileName, setVideoFileName] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");
  const [channels, setChannels] = useState<PublishChannelId[]>([
    "youtube",
    "telegram",
    "discord",
  ]);
  const [calmConfirmed, setCalmConfirmed] = useState(false);
  const [educationOnlyConfirmed, setEducationOnlyConfirmed] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [copyNote, setCopyNote] = useState("");

  useEffect(() => {
    setQueue(loadPublishQueue());
  }, []);

  useEffect(() => {
    savePublishQueue(queue);
  }, [queue]);

  const selectedJob = useMemo(
    () => queue.find((j) => j.id === selectedJobId) ?? null,
    [queue, selectedJobId],
  );

  const canQueue =
    title.trim().length > 0 &&
    caption.trim().length > 0 &&
    channels.length > 0 &&
    calmConfirmed &&
    educationOnlyConfirmed;

  const toggleChannel = (id: PublishChannelId) => {
    setChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const resetComposer = () => {
    setTitle("");
    setCaption(defaultCaptionFooter().trimStart());
    setVideoUrl("");
    setVideoFileName("");
    setScheduledFor("");
    setCalmConfirmed(false);
    setEducationOnlyConfirmed(false);
    setChannels(["youtube", "telegram", "discord"]);
  };

  const queueJob = () => {
    if (!canQueue) return;
    const job: PublishJob = {
      id: createJobId(),
      createdAt: new Date().toISOString(),
      scheduledFor: scheduledFor ? new Date(scheduledFor).toISOString() : null,
      title: title.trim(),
      caption: caption.trim(),
      videoUrl: videoUrl.trim(),
      videoFileName,
      channels: [...channels],
      calmConfirmed,
      educationOnlyConfirmed,
      status: "queued",
      notes: "",
    };
    setQueue((prev) => [job, ...prev]);
    setSelectedJobId(job.id);
    resetComposer();
  };

  const markReady = (id: string) => {
    setQueue((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: "ready" } : j)),
    );
  };

  const removeJob = (id: string) => {
    setQueue((prev) => prev.filter((j) => j.id !== id));
    if (selectedJobId === id) setSelectedJobId(null);
  };

  const copyPackage = async (job: PublishJob) => {
    const pkg = buildFanOutPackage(job);
    try {
      await navigator.clipboard.writeText(pkg);
      setCopyNote("Publish package copied — paste into Cursor chat and say PUBLISH THIS");
      markReady(job.id);
    } catch {
      setCopyNote("Clipboard blocked — package shown below; select and copy manually.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase text-glow animate-molten-text">
            Publishing
          </h1>
          <p className="text-cyber-text-secondary text-sm mt-1 font-code">
            {"// CLEARPATH BUFFER · YOUTUBE + TELEGRAM + DISCORD · YOUR SOFTWARE"}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-cyber-warning/40 text-cyber-warning text-xs font-code">
          <AlertTriangle className="h-3.5 w-3.5" />
          LIVE SENDS REQUIRE CURSOR CONFIRMATION
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 space-y-6">
          <Card className="bg-cyber-bg border-cyber-border">
            <CardHeader className="border-b border-cyber-border/50 pb-4">
              <CardTitle className="font-tech text-cyber-text tracking-wider flex items-center gap-2">
                <Film className="h-5 w-5 text-cyber-primary" />
                COMPOSER
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-code text-cyber-text-muted uppercase mb-2">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Reading support without flashing tickers"
                  className="w-full h-10 rounded-md border border-cyber-border bg-cyber-bg-darker px-3 text-sm font-code text-cyber-text placeholder:text-cyber-text-muted focus:border-cyber-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-code text-cyber-text-muted uppercase mb-2">
                  Caption / description
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={6}
                  className="w-full rounded-md border border-cyber-border bg-cyber-bg-darker px-3 py-2 text-sm font-code text-cyber-text placeholder:text-cyber-text-muted focus:border-cyber-primary focus:outline-none resize-y"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-code text-cyber-text-muted uppercase mb-2">
                    Video URL (Telegram / Discord)
                  </label>
                  <input
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://... or YouTube watch URL after upload"
                    className="w-full h-10 rounded-md border border-cyber-border bg-cyber-bg-darker px-3 text-sm font-code text-cyber-text placeholder:text-cyber-text-muted focus:border-cyber-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-code text-cyber-text-muted uppercase mb-2">
                    Video file (YouTube upload)
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      setVideoFileName(e.target.files?.[0]?.name ?? "")
                    }
                    className="w-full text-sm font-code text-cyber-text-secondary file:mr-3 file:rounded file:border-0 file:bg-cyber-primary/20 file:px-3 file:py-2 file:text-cyber-primary"
                  />
                  {videoFileName && (
                    <p className="mt-1 text-xs font-code text-cyber-text-muted">
                      Recorded: {videoFileName} (path given to Cursor at send time)
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-code text-cyber-text-muted uppercase mb-2">
                  Schedule (optional)
                </label>
                <input
                  type="datetime-local"
                  value={scheduledFor}
                  onChange={(e) => setScheduledFor(e.target.value)}
                  className="h-10 rounded-md border border-cyber-border bg-cyber-bg-darker px-3 text-sm font-code text-cyber-text focus:border-cyber-primary focus:outline-none"
                />
              </div>

              <div>
                <p className="text-xs font-code text-cyber-text-muted uppercase mb-3">
                  Channels
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PUBLISH_CHANNELS.map((ch) => {
                    const on = channels.includes(ch.id);
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => toggleChannel(ch.id)}
                        className={`text-left p-3 rounded border transition-colors ${
                          on
                            ? "border-cyber-primary/50 bg-cyber-primary/10 text-cyber-primary"
                            : "border-cyber-border bg-cyber-bg-darker text-cyber-text-muted"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-code text-sm font-bold mb-1">
                          {CHANNEL_ICONS[ch.id]}
                          {ch.name}
                        </div>
                        <p className="text-[10px] font-code opacity-80 leading-relaxed">
                          {ch.capability}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded border border-cyber-warning/30 bg-cyber-warning/5 p-4 space-y-3">
                <p className="text-xs font-code text-cyber-warning uppercase tracking-wider">
                  Mission guardrails
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={calmConfirmed}
                    onChange={(e) => setCalmConfirmed(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="font-code text-sm text-cyber-text-secondary">
                    This video is calm — no strobing candles, rapid zooms, or flash patterns that
                    can trigger PTSD / seizures.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={educationOnlyConfirmed}
                    onChange={(e) => setEducationOnlyConfirmed(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="font-code text-sm text-cyber-text-secondary">
                    Education / analytics only — no brokerage, deposits, or signal claims.
                  </span>
                </label>
              </div>

              <button
                type="button"
                disabled={!canQueue}
                onClick={queueJob}
                className="w-full sm:w-auto px-6 py-3 rounded border border-cyber-primary/50 bg-cyber-primary/10 text-cyber-primary font-code font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyber-primary/20 transition-colors flex items-center justify-center gap-2"
              >
                <Clock className="h-4 w-4" />
                ADD TO QUEUE
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-2 space-y-6">
          <Card className="bg-cyber-bg border-cyber-border">
            <CardHeader className="border-b border-cyber-border/50 pb-4">
              <CardTitle className="font-tech text-cyber-text tracking-wider">
                QUEUE ({queue.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 max-h-[28rem] overflow-y-auto">
              {queue.length === 0 ? (
                <p className="p-6 font-code text-sm text-cyber-text-muted">
                  No posts yet. Compose an education video post and queue it.
                </p>
              ) : (
                <ul className="divide-y divide-cyber-border/40">
                  {queue.map((job) => (
                    <li key={job.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedJobId(job.id)}
                        className={`w-full text-left p-4 hover:bg-cyber-bg-darker transition-colors ${
                          selectedJobId === job.id ? "bg-cyber-primary/5" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-code text-sm font-bold text-cyber-text truncate">
                            {job.title}
                          </span>
                          <span className="text-[10px] font-code uppercase text-cyber-primary shrink-0">
                            {job.status}
                          </span>
                        </div>
                        <p className="font-code text-[10px] text-cyber-text-muted">
                          {job.channels.join(" · ")}
                          {job.scheduledFor
                            ? ` · ${new Date(job.scheduledFor).toLocaleString()}`
                            : " · ASAP"}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {selectedJob && (
            <Card className="bg-cyber-bg border-cyber-border">
              <CardHeader className="border-b border-cyber-border/50 pb-4">
                <CardTitle className="font-tech text-cyber-text tracking-wider text-base">
                  SELECTED JOB
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <p className="font-code text-sm text-cyber-text">{selectedJob.title}</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => copyPackage(selectedJob)}
                    className="px-3 py-2 rounded border border-cyber-primary/40 text-cyber-primary text-xs font-code font-bold hover:bg-cyber-primary/10 flex items-center gap-2"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    COPY PUBLISH PACKAGE
                  </button>
                  <button
                    type="button"
                    onClick={() => removeJob(selectedJob.id)}
                    className="px-3 py-2 rounded border border-cyber-danger/40 text-cyber-danger text-xs font-code font-bold hover:bg-cyber-danger/10 flex items-center gap-2"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    REMOVE
                  </button>
                </div>
                {copyNote && (
                  <p className="font-code text-xs text-[#39FF14] flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    {copyNote}
                  </p>
                )}
                <pre className="text-[10px] font-code text-cyber-text-muted bg-cyber-bg-darker border border-cyber-border rounded p-3 overflow-x-auto whitespace-pre-wrap max-h-64">
                  {buildFanOutPackage(selectedJob)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Card className="bg-cyber-bg-darker/40 border-cyber-border">
        <CardContent className="p-4 font-code text-xs text-cyber-text-muted leading-relaxed">
          Phase 1: your private Buffer UI + local queue. Phase 2 (next): Cursor executes Zapier
          writes (YouTube upload, Telegram @clearpathtraderfreeaccount, Discord channel) only after
          you paste a package and approve. Phase 3: direct APIs so MYEYES posts without the copy
          step.
        </CardContent>
      </Card>
    </div>
  );
}
