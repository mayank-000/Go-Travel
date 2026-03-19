"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="hero-section relative flex flex-col justify-end"
      style={{
        minHeight: "65svh",   /* mobile: shorter so content below is visible */
        overflow:  "hidden",  /* no straddling button any more, can be hidden */
      }}
    >
      <style>{`
        @media (min-width: 768px) {
          .hero-section { min-height: 100svh !important; }
          .hero-bg      { background-position: center center !important; }
        }
      `}</style>

      {/* ── Cinematic background
          Mobile: anchor to top so subject stays in frame on portrait screens
          Desktop (md+): restore original center positioning via inline style  */}
      <div
        className="hero-bg"
        style={{
          position:           "absolute",
          inset:              0,
          backgroundImage:    "url('/coverP5.png')",
          backgroundSize:     "cover",
          backgroundPosition: "center top",
          backgroundRepeat:   "no-repeat",
          transform:          loaded ? "scale(1.04)" : "scale(1.13)",
          transition:         "transform 9000ms ease-out",
          willChange:         "transform",
          zIndex:             0,
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(27,59,87,0.96) 0%, rgba(27,59,87,0.55) 38%, rgba(27,59,87,0.10) 72%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* SVG grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
          opacity: 0.5,
          zIndex:  2,
        }}
      />

      {/* Text content */}
      <div
        className="relative juno-container pt-24 pb-10 md:pb-20"
        style={{ zIndex: 3 }}
      >
        <h2
          className="font-heading text-[11px] sm:text-[13px] tracking-[0.38em] uppercase mb-5 sm:mb-7 transition-all duration-700"
          style={{
            color:           "var(--sand)",
            opacity:         loaded ? 1 : 0,
            transform:       loaded ? "translateY(0)" : "translateY(10px)",
            transitionDelay: "150ms",
          }}
        >
          India&apos;s First Invite-Only Experiential Journey Club
        </h2>

        <h1
          className="font-serif italic leading-[1.02] mb-5 sm:mb-7 transition-all duration-700"
          style={{
            fontSize:        "clamp(2.6rem, 7.5vw, 7rem)",
            color:           "var(--cream)",
            maxWidth:        "780px",
            opacity:         loaded ? 1 : 0,
            transform:       loaded ? "translateY(0)" : "translateY(22px)",
            transitionDelay: "300ms",
          }}
        >
          JUNO is
          <br />
          invite-only.
        </h1>

        <p
          className="font-heading text-sm md:text-lg leading-relaxed transition-all duration-700"
          style={{
            color:           "rgba(252,250,233,0.85)",
            fontWeight:      300,
            maxWidth:        "480px",
            opacity:         loaded ? 1 : 0,
            transform:       loaded ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "460ms",
          }}
        >
          A quiet circle of people who choose depth over noise, and making over
          scrolling.
        </p>
      </div>

      {/* Scroll indicator — desktop only */}
      <div
        className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-3 transition-all duration-700"
        style={{ opacity: loaded ? 0.45 : 0, transitionDelay: "900ms", zIndex: 3 }}
      >
        <span
          className="font-heading text-[9px] tracking-[0.3em] uppercase"
          style={{ color: "var(--cream)", writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div className="w-px h-10 animate-pulse" style={{ backgroundColor: "var(--sand)" }} />
      </div>
    </section>
  );
}