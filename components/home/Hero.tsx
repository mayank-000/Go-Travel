"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────
   JUNO Hero — Cinematic, Framer-level entrance
   Dependencies needed:
     npm install gsap @studio-freight/lenis
─────────────────────────────────────────────────────── */

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const tagRef      = useRef<HTMLSpanElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: typeof import("gsap").gsap | undefined;
    let ScrollTrigger: unknown;

    const run = async () => {
      const gsapMod = await import("gsap");
      const stMod   = await import("gsap/ScrollTrigger");
      gsap         = gsapMod.gsap;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(stMod.ScrollTrigger);

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* ─ Background zoom in from oversized ─ */
      if (bgRef.current) {
        gsap.set(bgRef.current, { scale: 1.15 });
        tl.to(bgRef.current, { scale: 1.04, duration: 2.4, ease: "power2.out" }, 0);
      }

      /* ─ Overlay fade down ─ */
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { opacity: 0 });
        tl.to(overlayRef.current, { opacity: 1, duration: 1.8 }, 0.2);
      }

      /* ─ Tag line slide up ─ */
      if (tagRef.current) {
        gsap.set(tagRef.current, { y: 20, opacity: 0 });
        tl.to(tagRef.current, { y: 0, opacity: 1, duration: 1 }, 0.6);
      }

      /* ─ Headline word-by-word ─ */
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".hero-line");
        gsap.set(lines, { y: "110%", opacity: 0 });
        tl.to(lines, {
          y: "0%",
          opacity: 1,
          duration: 1.1,
          stagger: 0.14,
          ease: "power4.out",
        }, 0.75);
      }

      /* ─ Sub text ─ */
      if (subRef.current) {
        gsap.set(subRef.current, { y: 24, opacity: 0 });
        tl.to(subRef.current, { y: 0, opacity: 1, duration: 1 }, 1.1);
      }

      /* ─ CTA buttons ─ */
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { y: 20, opacity: 0 });
        tl.to(ctaRef.current, { y: 0, opacity: 1, duration: 0.9 }, 1.3);
      }

      /* ─ Scroll indicator ─ */
      if (scrollRef.current) {
        gsap.set(scrollRef.current, { opacity: 0 });
        tl.to(scrollRef.current, { opacity: 0.4, duration: 0.8, delay: 0.4 }, 1.6);
      }

      /* ─ Parallax on scroll ─ */
      if (bgRef.current) {
        (ScrollTrigger as { create: (opts: Record<string, unknown>) => void }).create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self: { progress: number }) => {
            if (bgRef.current) {
              bgRef.current.style.transform = `scale(1.04) translateY(${self.progress * 120}px)`;
            }
          },
        });
      }
    };

    run();

    /* ─ Cursor tracking for magnetic text ─ */
    const onMove = (e: MouseEvent) => {
      const el = document.getElementById("juno-cursor");
      if (el) {
        el.style.left = e.clientX + "px";
        el.style.top  = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Cinematic background ── */}
      <div
        ref={bgRef}
        style={{
          position:           "absolute",
          inset:              0,
          backgroundImage:    "url('/coverP5.png')",
          backgroundSize:     "cover",
          backgroundPosition: "center center",
          transformOrigin:    "center center",
          zIndex:             0,
        }}
      />

      {/* ── Gradient overlay — rich dark vignette ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to top,
              rgba(5,5,5,0.97) 0%,
              rgba(5,5,5,0.70) 30%,
              rgba(5,5,5,0.25) 62%,
              rgba(5,5,5,0.08) 100%
            ),
            linear-gradient(to right,
              rgba(5,5,5,0.5) 0%,
              transparent 60%
            )
          `,
          zIndex: 1,
        }}
      />

      {/* ── Film grain ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          zIndex: 2,
        }}
      />

      {/* ── Ambient glow — bottom left ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%", left: "-5%",
          width: "55vw", height: "55vw",
          background: "radial-gradient(circle, rgba(201,160,90,0.07) 0%, transparent 65%)",
          zIndex: 2,
        }}
      />

      {/* ── Text content ── */}
      <div
        className="relative juno-container pb-16 md:pb-28"
        style={{ zIndex: 3, paddingTop: "8rem" }}
      >
        {/* Eyebrow */}
        <span
          ref={tagRef}
          className="font-heading block mb-7"
          style={{
            fontSize: "clamp(8px,1vw,10px)",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          India&apos;s First Invite-Only Experiential Journey Club
        </span>

        {/* Main headline — line-by-line reveal */}
        <h1
          ref={headlineRef}
          className="font-serif italic"
          style={{
            fontSize:   "clamp(3.2rem, 9vw, 9rem)",
            lineHeight: 0.95,
            color:      "var(--text-primary)",
            maxWidth:   "850px",
            marginBottom: "2rem",
          }}
        >
          <span className="line-reveal" style={{ display: "block", overflow: "hidden" }}>
            <span className="hero-line" style={{ display: "block" }}>Experience</span>
          </span>
          <span className="line-reveal" style={{ display: "block", overflow: "hidden", marginTop: "0.08em" }}>
            <span className="hero-line" style={{ display: "block", color: "var(--gold)" }}>
              JUNO.
            </span>
          </span>
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="font-heading"
          style={{
            fontSize:    "clamp(0.9rem, 1.6vw, 1.15rem)",
            fontWeight:  300,
            color:       "rgba(240,236,228,0.65)",
            maxWidth:    "420px",
            lineHeight:  1.75,
            marginBottom: "2.5rem",
          }}
        >
          A quiet circle of people who choose depth over noise,
          and making over scrolling.
        </p>

        {/* CTA row */}
        <div ref={ctaRef} style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link
            href="/invite"
            className="font-heading"
            style={{
              fontSize:        "clamp(9px,1vw,11px)",
              letterSpacing:   "0.25em",
              textTransform:   "uppercase",
              padding:         "1rem 2.5rem",
              background:      "var(--gold)",
              color:           "#080808",
              fontWeight:      600,
              display:         "inline-flex",
              alignItems:      "center",
              gap:             "0.5rem",
              transition:      "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--gold-light)";
              (e.currentTarget as HTMLElement).style.transform  = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--gold)";
              (e.currentTarget as HTMLElement).style.transform  = "translateY(0)";
            }}
          >
            Request an Invitation →
          </Link>

          <a
            href="#about"
            className="font-heading"
            style={{
              fontSize:      "clamp(9px,1vw,11px)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color:         "rgba(240,236,228,0.5)",
              borderBottom:  "1px solid rgba(240,236,228,0.2)",
              paddingBottom: "2px",
              transition:    "color 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color       = "var(--gold)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color       = "rgba(240,236,228,0.5)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,236,228,0.2)";
            }}
          >
            Discover more ↓
          </a>
        </div>
      </div>

      {/* ── Scroll indicator — right side, vertical ── */}
      <div
        ref={scrollRef}
        className="absolute hidden md:flex flex-col items-center gap-3"
        style={{ right: "2.5rem", bottom: "2.5rem", zIndex: 3 }}
      >
        <div
          className="h-16 w-px"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--gold))",
            animation:  "scrollPulse 2s ease-in-out infinite",
          }}
        />
        <span
          className="font-heading"
          style={{
            fontSize:    "8px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color:       "var(--gold)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
      </div>

      {/* ── Bottom border accent ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height:     "1px",
          background: "linear-gradient(to right, transparent, rgba(201,160,90,0.4), transparent)",
          zIndex:     3,
        }}
      />

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%       { opacity: 0.9; transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  );
}