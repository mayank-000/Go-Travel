'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ClosingCTA() {
  const sectionRef    = useRef<HTMLElement>(null);
  const eyebrowRef    = useRef<HTMLSpanElement>(null);
  const headingRef    = useRef<HTMLHeadingElement>(null);
  const paraRef       = useRef<HTMLParagraphElement>(null);
  const ctaRef        = useRef<HTMLAnchorElement>(null);

  const [scrollY, setScrollY]                 = useState(0);
  const [eyebrowOn, setEyebrowOn]             = useState(false);
  const [headingOn, setHeadingOn]             = useState(false);
  const [paraOn, setParaOn]                   = useState(false);
  const [ctaOn, setCtaOn]                     = useState(false);

  /* ── scroll progress for glow + particles ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      setScrollY(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── staggered reveal observers ── */
  useEffect(() => {
    const makeObs = (setter: (v: boolean) => void, threshold = 0.2) =>
      new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true); },
        { threshold }
      );

    const o1 = makeObs(setEyebrowOn, 0.3);
    const o2 = makeObs(setHeadingOn, 0.2);
    const o3 = makeObs(setParaOn,    0.2);
    const o4 = makeObs(setCtaOn,     0.2);

    if (eyebrowRef.current) o1.observe(eyebrowRef.current);
    if (headingRef.current) o2.observe(headingRef.current);
    if (paraRef.current)    o3.observe(paraRef.current);
    if (ctaRef.current)     o4.observe(ctaRef.current);

    return () => { o1.disconnect(); o2.disconnect(); o3.disconnect(); o4.disconnect(); };
  }, []);

  const reveal = (on: boolean, delay = 0): React.CSSProperties => ({
    opacity:    on ? 1 : 0,
    transform:  on ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--cream)",
        paddingTop:      "clamp(6rem,12vw,10rem)",
        paddingBottom:   "clamp(6rem,12vw,10rem)",
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px);   opacity: 0.15; }
          50%       { transform: translateY(-28px); opacity: 0.3;  }
        }
        @keyframes shine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(220%);  }
        }
      `}</style>

      {/* Ambient glow — grows on scroll */}
      <div
        className="absolute pointer-events-none"
        style={{
          top:       "50%",
          left:      "50%",
          transform: `translate(-50%,-50%) scale(${0.8 + scrollY * 0.3})`,
          width:     "90vw",
          height:    "90vw",
          background: "radial-gradient(circle, rgba(201,160,90,0.12) 0%, transparent 65%)",
          opacity:   scrollY,
          transition: "all 0.4s ease",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width:           "6px",
              height:          "6px",
              left:            `${10 + i * 6}%`,
              top:             `${20 + (i % 4) * 20}%`,
              background:      "var(--ochre)",
              opacity:         0.15,
              animation:       `float ${3 + i * 0.4}s ease-in-out infinite`,
              animationDelay:  `${i * 0.2}s`,
              transform:       `scale(${scrollY})`,
              transition:      "transform 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height:    "2px",
          background: "linear-gradient(to right, transparent, var(--ochre), transparent)",
          boxShadow: "0 0 20px rgba(201,160,90,0.3)",
        }}
      />

      <div
        className="juno-container text-center flex flex-col items-center relative z-10"
        style={{ gap: "2rem" }}
      >
        {/* Eyebrow */}
        <span
          ref={eyebrowRef}
          className="font-heading"
          style={{
            fontSize:      "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color:         "var(--ochre)",
            fontWeight:    600,
            ...reveal(eyebrowOn, 0),
          }}
        >
          The Invitation
        </span>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-serif italic"
          style={{
            fontSize:   "clamp(2.5rem,7vw,7rem)",
            lineHeight: 0.95,
            color:      "var(--charcoal)",
            maxWidth:   "800px",
            ...reveal(headingOn, 80),
          }}
        >
          This isn&apos;t for
          <br />
          everyone.
          <br />
          <span style={{ color: "var(--ochre)" }}>Is it for you?</span>
        </h2>

        {/* Body */}
        <p
          ref={paraRef}
          className="font-heading"
          style={{
            fontSize:   "clamp(0.95rem,1.4vw,1.05rem)",
            fontWeight: 300,
            color:      "var(--charcoal)",
            opacity:    paraOn ? 0.75 : 0,
            maxWidth:   "520px",
            lineHeight: 1.8,
            transform:  paraOn ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 160ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 160ms",
          }}
        >
          Twelve seats. Handpicked. No open registrations.
          If you felt something reading this page, you&apos;re probably who we&apos;re looking for.
        </p>

        {/* CTA button */}
        <Link
          ref={ctaRef}
          href="/invite"
          className="font-heading inline-flex items-center gap-3 mt-4 relative overflow-hidden"
          style={{
            fontSize:      "clamp(9px,1vw,11px)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            padding:       "1.3rem 3.5rem",
            background:    "var(--ochre)",
            color:         "var(--cream)",
            fontWeight:    600,
            transition:    "all 0.5s cubic-bezier(0.16,1,0.3,1)",
            boxShadow:     "0 12px 40px rgba(139,101,63,0.3)",
            ...reveal(ctaOn, 240),
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform  = "translateY(-6px) scale(1.03)";
            el.style.boxShadow  = "0 20px 60px rgba(139,101,63,0.45)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform  = "translateY(0) scale(1)";
            el.style.boxShadow  = "0 12px 40px rgba(139,101,63,0.3)";
          }}
        >
          <span className="relative z-10">Request an Invitation</span>
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            className="relative z-10"
            style={{ transition: "transform 0.3s ease" }}
          >
            <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          {/* Shine sweep */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
              transform:  "translateX(-100%)",
              animation:  "shine 3s ease-in-out infinite",
            }}
          />
        </Link>

        {/* Decorative dots — always visible, just fades in */}
        <div
          className="flex items-center gap-4 mt-8"
          style={{
            opacity:    ctaOn ? 0.3 : 0,
            transform:  ctaOn ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 360ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 360ms",
          }}
        >
          <div style={{ width: "3rem", height: "1px", backgroundColor: "var(--ochre)" }} />
          <span className="font-serif italic" style={{ color: "var(--ochre)", fontSize: "1.4rem" }} aria-hidden="true">✦</span>
          <div style={{ width: "3rem", height: "1px", backgroundColor: "var(--ochre)" }} />
        </div>
      </div>
    </section>
  );
}