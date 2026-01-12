import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const MLink = motion.a;
  const ctaHref =
    import.meta.env.MODE === "development"
      ? "http://localhost:5173/"
      : "https://cubewin07.github.io/movie-explorer";
  return (
    <section className="py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800/60 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8 lg:p-12">
            <div className="flex flex-col gap-5">
              <div className="hero-badge inline-flex items-center gap-3 px-3 py-2 rounded-full border border-slate-200/60 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse-glow" />
                <span className="text-xs">Realtime chat, presence, typing and unread</span>
              </div>
              <h1 className="hero-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Motion that clarifies a real-time system
              </h1>
              <p className="hero-subheading text-slate-600 dark:text-slate-300 max-w-lg">
                Presence, typing, grouped messages, feedback and resilience — expressed with motion for clarity and trust.
              </p>
              <div className="flex items-center gap-3">
                <MLink
                  id="cta"
                  href={ctaHref}
                  className="hero-cta inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Experience it live</span>
                  <ArrowRight aria-hidden="true" />
                </MLink>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                  onClick={() => {
                    const section = document.getElementById("orientation");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>Preview the narrative</span>
                </button>
              </div>
              <dl className="hero-metadata grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Presence</dt>
                  <dd className="text-sm text-slate-700 dark:text-slate-200">Online, away, offline</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Messages</dt>
                  <dd className="text-sm text-slate-700 dark:text-slate-200">Grouped by sender and date</dd>
                </div>
              </dl>
            </div>
            <div className="flex justify-start lg:justify-end">
              <div className="w-full max-w-sm p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-br from-white/80 to-slate-50/60 dark:from-slate-900/70 dark:to-slate-900/40 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-slate-700 dark:text-slate-200">Mia from Movie Explorer</span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Now</span>
                </div>
                <div className="grid gap-2">
                  <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 px-3 py-2 max-w-[75%]">
                    Welcome to Movie Explorer. Real-time chat connected end-to-end.
                  </div>
                  <div className="rounded-2xl border border-blue-300/60 dark:border-blue-800/60 bg-blue-600/90 text-white px-3 py-2 max-w-[75%] justify-self-end">
                    Presence, typing, unread and offline in one UI.
                  </div>
                  <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 px-3 py-2 max-w-[75%]">
                    <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
