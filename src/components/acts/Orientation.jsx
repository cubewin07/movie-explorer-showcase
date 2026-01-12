import Section from "../Section";

export default function Orientation() {
  return (
    <Section id="orientation" eyebrow="Orientation" heading="Layout assembles and explains hierarchy" act="orientation">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="presence rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4" data-reveal>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold grid place-items-center">AL</div>
            <div className="flex-1">
              <p className="font-bold text-slate-900 dark:text-white">Alex Rivera</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">On web • Trending sci‑fi</p>
            </div>
            <span className="status-dot w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>
        <div className="presence rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4" data-reveal>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-white font-bold grid place-items-center">JP</div>
            <div className="flex-1">
              <p className="font-bold text-slate-900 dark:text-white">Jordan Park</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">On mobile • Watchlist</p>
            </div>
            <span className="status-dot w-2 h-2 rounded-full bg-yellow-500" />
          </div>
        </div>
        <div className="presence rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4" data-reveal>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white font-bold grid place-items-center">SY</div>
            <div className="flex-1">
              <p className="font-bold text-slate-900 dark:text-white">Samir Yao</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Last seen 12 min ago</p>
            </div>
            <span className="status-dot w-2 h-2 rounded-full bg-red-500" />
          </div>
        </div>
      </div>
    </Section>
  );
}
