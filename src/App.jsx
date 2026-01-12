import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Search } from "lucide-react";
import "./App.css";

function Section({ id, heading, eyebrow, act, children }) {
  return (
    <section id={id} className="act py-24 border-b border-slate-200/60 dark:border-slate-800/60" data-act={act}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-slate-500 dark:text-slate-400">{eyebrow}</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{heading}</h2>
        </div>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </section>
  );
}

function App() {
  const rootRef = useRef(null);
  const MLink = motion.a;

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    if (window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.2,
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    if (!window.gsap || !window.ScrollTrigger) return;

    const ctx = window.gsap.context(() => {
      const heroTl = window.gsap.timeline();
      heroTl
        .from(".hero-badge", {
          opacity: 0,
          y: 10,
          duration: 0.4,
          ease: "power2.out",
        })
        .from(
          ".hero-heading",
          {
            opacity: 0,
            y: 24,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.15",
        )
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 18,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.25",
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 16,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".hero-metadata > *",
          {
            opacity: 0,
            y: 10,
            duration: 0.35,
            ease: "power2.out",
            stagger: 0.06,
          },
          "-=0.2",
        );

      window.gsap.utils.toArray(".section").forEach((section) => {
        const cards = section.querySelectorAll("[data-reveal]");
        if (!cards.length) return;

        window.gsap.set(cards, { opacity: 0, y: 32 });

        window.gsap.to(cards, {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        });
      });

      window.gsap.utils.toArray(".act").forEach((section) => {
        const act = section.getAttribute("data-act");
        const tl = window.gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom+=40% top",
            scrub: true,
            pin: true,
          },
        });

        if (act === "orientation") {
          tl
            .fromTo(
              section.querySelectorAll(".presence"),
              { opacity: 0, y: 40, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, stagger: 0.2, ease: "power3.out" },
            )
            .to(section.querySelectorAll(".status-dot"), {
              scale: 1.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              duration: 1.2,
            });
        }

        if (act === "discovery") {
          const friend = section.querySelector(".steps");
          const chat = section.querySelector(".chat");
          tl
            .fromTo(friend, { scale: 0.98, opacity: 0 }, { scale: 1, opacity: 1 })
            .to(friend, {
              filter: "brightness(0.9)",
              duration: 0.6,
              ease: "power2.out",
            })
            .fromTo(
              chat,
              { x: 60, opacity: 0 },
              { x: 0, opacity: 1, ease: "power2.out" },
            )
            .fromTo(
              section.querySelectorAll(".bubble"),
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out" },
            );
        }

        if (act === "connection") {
          const counter = section.querySelector(".unread-counter");
          if (counter) {
            const digits = counter.querySelectorAll(".digit");
            tl.to(digits, {
              yPercent: -100,
              stagger: 0.05,
              duration: 0.6,
              ease: "power3.out",
            });
          }
          tl.fromTo(
            section.querySelectorAll(".list-item"),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.12, ease: "power3.out" },
          );
        }

        if (act === "feedback") {
          tl.fromTo(
            section.querySelectorAll(".feedback-item"),
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: "power3.out" },
          );
        }

        if (act === "resilience") {
          tl
            .to(section, {
              filter: "saturate(0.6)",
              duration: 0.8,
              ease: "power2.out",
            })
            .fromTo(
              section.querySelector(".banner"),
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            )
            .to(section, {
              filter: "saturate(1)",
              duration: 0.8,
              ease: "power2.out",
            });
        }

        if (act === "cohesion") {
          tl.fromTo(
            section.querySelectorAll("[data-reveal]"),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" },
          );
        }
      });
    }, rootRef);

    return () => {
      if (ctx) ctx.revert();
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((t) => t.kill());
      }
    };
  }, []);

  const ctaHref =
    import.meta.env.MODE === "development"
      ? "http://localhost:5173/"
      : "https://cubewin07.github.io/movie-explorer";

  return (
    <main ref={rootRef}>
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

      <Section id="cohesion" eyebrow="Cohesion" heading="Repeated motion patterns and shared tokens" act="cohesion">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4" data-reveal>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Timings and easings repeat across features with reduced-motion support.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4" data-reveal>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Color, elevation and shape tokens match the product&apos;s dark UI.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}

export default App;
