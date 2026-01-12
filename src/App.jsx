import { useEffect, useRef } from "react";
import "./App.css";
import Hero from "./components/Hero";
import Orientation from "./components/acts/Orientation";
import Discovery from "./components/acts/Discovery";
import Connection from "./components/acts/Connection";
import Feedback from "./components/acts/Feedback";
import Resilience from "./components/acts/Resilience";
import Cohesion from "./components/acts/Cohesion";

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
            .to(section, {
              filter: "saturate(1)",
              duration: 0.8,
              ease: "power2.out",
            });
          const banner = section.querySelector(".banner");
          if (banner) {
            tl.fromTo(
              banner,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            );
          }
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

  return (
    <main ref={rootRef}>
      <Hero />
      <Orientation />
      <Discovery />
      <Connection />
      <Feedback />
      <Resilience />
      <Cohesion />
    </main>
  );
}

export default App;
