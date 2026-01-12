import Section from "../Section";
import { Search } from "lucide-react";

export default function Discovery() {
  return (
    <Section id="discovery" eyebrow="Discovery" heading="Search and cards reveal intent before action" act="discovery">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="steps rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4" data-reveal>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for movies, people, genres"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
          <p className="text-sm mt-3 text-slate-600 dark:text-slate-300">Preview shows outcomes without commitment.</p>
        </div>
        <div className="chat rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4 grid gap-3" data-reveal>
          <div className="rounded-xl border border-slate-200/60 dark:border-slate-700/60 p-3 hover:shadow-lg transition">
            <p className="font-semibold text-slate-900 dark:text-white">Feature Card</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">Hover hints at action, selection isolates focus.</p>
          </div>
          <div className="rounded-xl border border-slate-200/60 dark:border-slate-700/60 p-3 hover:shadow-lg transition">
            <p className="font-semibold text-slate-900 dark:text-white">Trending Card</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">Relevance-driven animation improves scanability.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
