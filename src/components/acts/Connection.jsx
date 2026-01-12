import Section from "../Section";
import { MessageCircle } from "lucide-react";

export default function Connection() {
  return (
    <Section id="connection" eyebrow="Connection" heading="Friends morph into active conversation" act="connection">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4 grid gap-3" data-reveal>
          <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 p-3 list-item">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold grid place-items-center">AL</div>
              <p className="font-semibold text-slate-900 dark:text-white">Alex Rivera</p>
              <span className="ml-auto inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <MessageCircle className="w-4 h-4" />
                Online
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 p-3">
            <div className="grid gap-2">
              <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 px-3 py-2 max-w-[75%] list-item">
                Want to binge something cyberpunk tonight?
              </div>
              <div className="rounded-2xl border border-blue-300/60 dark:border-blue-800/60 bg-blue-600/90 text-white px-3 py-2 max-w-[75%] justify-self-end list-item">
                Yes, queue up season 1 and I will join in 10.
              </div>
              <div className="rounded-2xl border border-blue-300/60 dark:border-blue-800/60 bg-blue-600/90 text-white px-3 py-2 max-w-[75%] justify-self-end list-item">
                Chat stays pinned to watchlist, we never lose the thread.
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4 grid gap-3" data-reveal>
          <div className="grid gap-2">
            <div className="rounded-xl border border-slate-200/60 dark:border-slate-700/60 p-3 flex items-center justify-between">
              <p className="font-semibold text-slate-900 dark:text-white">Date separator</p>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">Today</span>
            </div>
            <div className="rounded-xl border border-slate-200/60 dark:border-slate-700/60 p-3 flex items-center justify-between">
              <p className="font-semibold text-slate-900 dark:text-white">Pending → Delivered</p>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">Status</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
