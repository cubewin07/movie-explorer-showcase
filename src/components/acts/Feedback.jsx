import Section from "../Section";

export default function Feedback() {
  return (
    <Section id="feedback" eyebrow="Feedback" heading="Micro-interactions clarify outcomes" act="feedback">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4 grid gap-3" data-reveal>
          <div className="feedback-item flex items-center justify-between rounded-xl border border-slate-200/60 dark:border-slate-700/60 p-3">
            <p className="font-semibold text-slate-900 dark:text-white">Unread count</p>
            <span className="unread-counter relative overflow-hidden inline-flex px-2 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300">
              <span className="digit">0</span>
              <span className="digit">1</span>
              <span className="digit">2</span>
              <span className="digit">3</span>
              <span className="digit">4</span>
              <span className="digit">5</span>
              <span className="digit">6</span>
              <span className="digit">7</span>
              <span className="digit">8</span>
              <span className="digit">9</span>
            </span>
          </div>
          <div className="feedback-item flex items-center justify-between rounded-xl border border-slate-200/60 dark:border-slate-700/60 p-3">
            <p className="font-semibold text-slate-900 dark:text-white">New message ping</p>
            <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span>•</span>
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4" data-reveal>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Feedback stays in sync with the same message stream and presence signals used by chat.
          </p>
        </div>
      </div>
    </Section>
  );
}
