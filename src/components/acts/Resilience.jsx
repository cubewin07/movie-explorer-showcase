import Section from "../Section";

export default function Resilience() {
  return (
    <Section id="resilience" eyebrow="Resilience" heading="Offline transitions and recovery" act="resilience">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4" data-reveal>
          <div className="flex items-center gap-3 rounded-xl border border-red-300/60 dark:border-red-900/60 bg-red-100/60 dark:bg-red-950/40 p-3 text-red-800 dark:text-red-300">
            <span>⚠️</span>
            <div>
              <p className="font-semibold">You are offline</p>
              <p className="text-sm">Messages queue until reconnection restores flow.</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4" data-reveal>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Error banners, retry and disabled states map to the production chat logic.
          </p>
        </div>
      </div>
    </Section>
  );
}
