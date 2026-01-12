import { useEffect, useRef } from "react";
import "./App.css";

function Section({ id, heading, eyebrow, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="section-heading">{heading}</h2>
        </div>
        <div className="section-body">{children}</div>
      </div>
    </section>
  );
}

function App() {
  const rootRef = useRef(null);

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
      <section className="hero">
        <div className="container">
          <div className="hero-card">
            <div className="hero-layout">
              <div className="hero-copy">
                <div className="hero-badge">
                  <span className="hero-dot" />
                  <span>Realtime chat, presence and unread built in React</span>
                </div>
                <h1 className="heading hero-heading">
                  Movie Explorer chat that feels alive, not static.
                </h1>
                <p className="subheading hero-subheading">
                  Presence, typing, grouped messages and offline states, all wired
                  into a production React app. Scroll through the states, then jump
                  straight into the real experience.
                </p>
                <div className="cta-row hero-cta">
                  <a
                    id="cta"
                    href={ctaHref}
                    className="btn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Open Movie Explorer</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => {
                      const section = document.getElementById("friends");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <span>Preview chat states</span>
                  </button>
                </div>
                <dl className="hero-metadata">
                  <div>
                    <dt>Presence</dt>
                    <dd>Online, away, offline</dd>
                  </div>
                  <div>
                    <dt>Messages</dt>
                    <dd>Grouped by sender and date</dd>
                  </div>
                  <div>
                    <dt>Typing</dt>
                    <dd>Live composer feedback</dd>
                  </div>
                  <div>
                    <dt>Network</dt>
                    <dd>Offline and retry flows</dd>
                  </div>
                </dl>
              </div>
              <div className="hero-preview">
                <div className="hero-preview-shell">
                  <div className="hero-preview-header">
                    <div className="hero-presence-pill">
                      <span className="status-dot status-online" />
                      <span className="name">Mia from Movie Explorer</span>
                    </div>
                    <span className="muted">Now</span>
                  </div>
                  <div className="chat">
                    <div className="bubble left">
                      Welcome to Movie Explorer. This is what real-time chat looks
                      like when everything is connected.
                    </div>
                    <div className="bubble right">
                      Presence, typing, unread and offline all live in one UI.
                    </div>
                    <div className="bubble left">
                      Try opening a conversation in the main app to see it live.
                    </div>
                    <div className="bubble left">
                      <span className="typing">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="friends"
        eyebrow="Friends & presence"
        heading="See who is online before you send."
      >
        <div className="grid friends-grid">
          <div className="card" data-reveal>
            <div className="presence">
              <div className="avatar">AL</div>
              <div>
                <div className="name">Alex Rivera</div>
                <div className="muted">On web • Watching trending sci-fi</div>
              </div>
              <span className="status-dot status-online" />
            </div>
            <p className="muted">
              Friend presence is synced from the backend, so online and away
              states stay accurate as people move across pages.
            </p>
          </div>
          <div className="card" data-reveal>
            <div className="presence">
              <div className="avatar">JP</div>
              <div>
                <div className="name">Jordan Park</div>
                <div className="muted">On mobile • Browsing watchlist</div>
              </div>
              <span className="status-dot status-away" />
            </div>
            <p className="muted">
              Presence ties into watchlists and discovery, so you can see what
              friends are exploring before you start a chat.
            </p>
          </div>
          <div className="card" data-reveal>
            <div className="presence">
              <div className="avatar">SY</div>
              <div>
                <div className="name">Samir Yao</div>
                <div className="muted">Last seen 12 min ago</div>
              </div>
              <span className="status-dot status-offline" />
            </div>
            <p className="muted">
              Offline and last-seen states reuse the same connection layer that
              powers notifications and chat delivery.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="create-chat"
        eyebrow="Create chat flow"
        heading="From discovery to conversation in three steps."
      >
        <div className="grid">
          <div className="card steps" data-reveal>
            <div className="step">
              <div className="step-num">1</div>
              <div>
                <div className="name">Pick a friend</div>
                <p className="muted">
                  Start from the friends list or a profile card, backed by the
                  same social graph as the main app.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div>
                <div className="name">Confirm the conversation</div>
                <p className="muted">
                  The backend ensures you are allowed to chat and creates or
                  reuses the correct thread.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div>
                <div className="name">Start typing</div>
                <p className="muted">
                  Composer connects to real-time typing indicators and grouped
                  messages instantly.
                </p>
              </div>
            </div>
          </div>
          <div className="card" data-reveal>
            <div className="chat">
              <div className="bubble left">
                Want to binge something cyberpunk tonight?
              </div>
              <div className="bubble right">
                Yes, queue up season 1 and I will join in 10.
              </div>
              <div className="bubble right">
                Chat stays pinned to your watchlist, so we never lose the thread.
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="conversation"
        eyebrow="Conversation showcase"
        heading="Grouped messages that stay readable as threads grow."
      >
        <div className="grid">
          <div className="card" data-reveal>
            <div className="list">
              <div className="list-item">
                <div>
                  <div className="name">Grouping by sender</div>
                  <p className="muted">
                    Consecutive messages from the same person collapse into a single
                    block, exactly like in the main chat UI.
                  </p>
                </div>
                <span className="badge">Today</span>
              </div>
              <div className="list-item">
                <div>
                  <div className="name">Date separators</div>
                  <p className="muted">
                    Readable dividers show when a new day begins, matching how
                    movie nights naturally split across evenings.
                  </p>
                </div>
                <span className="badge">Date</span>
              </div>
              <div className="list-item">
                <div>
                  <div className="name">Pending and delivered</div>
                  <p className="muted">
                    Pending messages animate in place and resolve when the backend
                    confirms delivery.
                  </p>
                </div>
                <span className="badge">Status</span>
              </div>
            </div>
          </div>
          <div className="card" data-reveal>
            <div className="chat">
              <div className="bubble left">
                Timeline uses transforms and opacity only, so scrolling stays
                smooth even on long conversations.
              </div>
              <div className="bubble right">
                Scroll-to-bottom behavior matches the real ChatConversation
                component in Movie Explorer.
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="notifications"
        eyebrow="Notifications & unread"
        heading="See what matters at a glance, not after a reload."
      >
        <div className="grid">
          <div className="card" data-reveal>
            <div className="list">
              <div className="list-item">
                <div>
                  <div className="name">Unread counts</div>
                  <p className="muted">
                    Conversation list badges update in real time when new messages
                    arrive in any thread.
                  </p>
                </div>
                <span className="badge">3</span>
              </div>
              <div className="list-item">
                <div>
                  <div className="name">New message ping</div>
                  <p className="muted">
                    Subtle micro-interactions draw your eye without interrupting
                    what you are watching.
                  </p>
                </div>
                <span className="badge">•</span>
              </div>
            </div>
          </div>
          <div className="card" data-reveal>
            <p className="muted">
              Unread state is computed from the same message stream as the
              conversation itself, so badges stay in sync even when you switch
              devices or refresh.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="offline"
        eyebrow="Offline & error states"
        heading="Graceful fallbacks when the network drops."
      >
        <div className="grid">
          <div className="card" data-reveal>
            <div className="banner">
              <span aria-hidden="true">⚠️</span>
              <div>
                <div className="name">You are offline</div>
                <p className="muted">
                  Messages stay queued locally until the WebSocket reconnects. The
                  main app uses this state to avoid losing drafts.
                </p>
              </div>
            </div>
          </div>
          <div className="card" data-reveal>
            <p className="muted">
              Error banners, retry buttons and disabled send states all map
              directly to the ChatConversation logic in the production app.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="design"
        eyebrow="Design system & accessibility"
        heading="The same design tokens that power Movie Explorer."
      >
        <div className="grid">
          <div className="card tokens" data-reveal>
            <div className="token">
              <div className="name">Motion tokens</div>
              <p className="muted">
                Timings and easings are tuned to feel quick but readable, with
                support for reduced motion preferences.
              </p>
            </div>
            <div className="token">
              <div className="name">Color system</div>
              <p className="muted">
                Background, surface and accent colors stay consistent with the main
                app&apos;s dark UI.
              </p>
            </div>
          </div>
          <div className="card" data-reveal>
            <p className="muted">
              Sections use semantic HTML, keyboard-focusable CTAs and visible focus
              rings. The showcase keeps the same accessibility goals as the core
              product.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}

export default App;
