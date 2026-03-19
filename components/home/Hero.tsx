"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    /*
      overflow-visible is REQUIRED — the button sits at bottom:0,
      translateY(50%) so half of it pokes into the next section.
      overflow:hidden would clip it away entirely.
      Extra padding-bottom gives the button enough room so it
      doesn't overlap the hero text on small screens.
    */
    <section
      className="relative flex flex-col justify-end"
      style={{ minHeight: "100svh", overflow: "visible", paddingBottom: "3rem" }}
    >
      {/* Cinematic background */}
      <div
        style={{
          position:           "absolute",
          inset:              0,
          backgroundImage:    "url('/coverP5.png')",
          backgroundSize:     "cover",
          backgroundPosition: "center center",
          backgroundRepeat:   "no-repeat",
          transform:          loaded ? "scale(1.04)" : "scale(1.13)",
          transition:         "transform 9000ms ease-out",
          willChange:         "transform",
          zIndex:             0,
        }}
      />

      {/* Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(27,59,87,0.94) 0%, rgba(27,59,87,0.50) 40%, rgba(27,59,87,0.10) 75%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* SVG grain */}
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
      <div className="relative juno-container pb-16 md:pb-20 pt-16" style={{ zIndex: 3 }}>
        <h2
          className="font-heading text-[13px] tracking-[0.38em] uppercase mb-7 transition-all duration-700"
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
          className="font-serif italic leading-[1.02] mb-7 transition-all duration-700"
          style={{
            fontSize:        "clamp(3.2rem, 7.5vw, 7rem)",
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
          className="font-heading text-base md:text-lg leading-relaxed transition-all duration-700"
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

      {/* ── Straddling button ──
          position:absolute bottom:0 + translateY(50%) in CSS
          makes it sit exactly on the seam between sections.     */}
      <Link
        href="/invite"
        className="invite-button"
        style={{
          opacity:         loaded ? 1 : 0,
          transition:      "opacity 0.7s ease, background-color 0.25s ease",
          transitionDelay: loaded ? "600ms" : "0ms",
        }}
      >
        Request Invite →
      </Link>

      {/* Scroll indicator */}
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