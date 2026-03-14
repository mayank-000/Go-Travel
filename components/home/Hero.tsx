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
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Cinematic background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[9000ms] ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85')`,
          transform: loaded ? "scale(1.04)" : "scale(1.13)",
        }}
      />

      {/* Layered gradient — bottom heavy so text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(27,59,87,0.92) 0%, rgba(27,59,87,0.45) 45%, rgba(27,59,87,0.08) 100%)",
        }}
      />

      {/* SVG grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
          opacity: 0.5,
        }}
      />

      {/* Content — juno-container for centered layout */}
      <div className="relative z-10 juno-container pb-20 md:pb-28 pt-16">

        {/* Top label */}
        <h2
          className="font-heading text-[13px] tracking-[0.38em] uppercase mb-7 transition-all duration-700"
          style={{
            color: "var(--sand)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            transitionDelay: "150ms",
          }}
        >
          India&apos;s First Invite-Only Experiential Journey Club
        </h2>

        {/* Main headline */}
        <h1
          className="font-serif italic leading-[1.02] mb-7 transition-all duration-700"
          style={{
            fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
            color: "var(--cream)",
            maxWidth: "780px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(22px)",
            transitionDelay: "300ms",
          }}
        >
          JUNO is
          <br />
          invite-only.
        </h1>

        {/* Subheadline */}
        <p
          className="font-heading text-base md:text-lg leading-relaxed mb-12 transition-all duration-700"
          style={{
            color: "rgba(252,250,233,0.85)",
            fontWeight: 300,
            maxWidth: "480px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "460ms",
          }}
        >
          A quiet circle of people who choose depth over noise,
          and making over scrolling.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(14px)",
            transitionDelay: "600ms",
          }}
        >
          <Link
            href="/invite"
            className="font-heading text-xs tracking-[0.22em] uppercase px-9 py-4 text-center transition-all duration-300 hover:opacity-85 w-fit"
            style={{ backgroundColor: "var(--ochre)", color: "var(--navy)" }}
          >
            Request Invite →
          </Link>
          <Link
            href="/trips"
            className="font-heading text-xs tracking-[0.22em] uppercase px-9 py-4 text-center border transition-all duration-300 hover:bg-white/10 w-fit"
            style={{
              borderColor: "rgba(252,250,233,0.3)",
              color: "var(--cream)",
            }}
          >
            View Journeys
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-3 transition-all duration-700"
        style={{ opacity: loaded ? 0.45 : 0, transitionDelay: "900ms" }}
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