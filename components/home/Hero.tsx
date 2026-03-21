"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const tagRef      = useRef<HTMLSpanElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  /* ── Smooth cursor with rAF lerp ── */
  useEffect(() => {
    const el = document.getElementById("juno-cursor");
    if (!el) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX   = mouseX;
    let curY   = mouseY;
    let rafId  = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      // lerp factor 0.18 — fast enough to feel responsive, smooth enough to not jitter
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      el.style.left = curX + "px";
      el.style.top  = curY + "px";
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const run = async () => {
      const { gsap }         = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (bgRef.current) {
        gsap.set(bgRef.current, { scale: 1.12 });
        tl.to(bgRef.current, { scale: 1.04, duration: 2.4, ease: "power2.out" }, 0);
      }
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { opacity: 0 });
        tl.to(overlayRef.current, { opacity: 1, duration: 1.8 }, 0.2);
      }
      if (tagRef.current) {
        gsap.set(tagRef.current, { y: 18, opacity: 0 });
        tl.to(tagRef.current, { y: 0, opacity: 1, duration: 1 }, 0.6);
      }
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".hero-line");
        gsap.set(lines, { y: "110%", opacity: 0 });
        tl.to(lines, { y: "0%", opacity: 1, duration: 1.1, stagger: 0.14, ease: "power4.out" }, 0.75);
      }
      if (subRef.current) {
        gsap.set(subRef.current, { y: 22, opacity: 0 });
        tl.to(subRef.current, { y: 0, opacity: 1, duration: 1 }, 1.1);
      }
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { y: 18, opacity: 0 });
        tl.to(ctaRef.current, { y: 0, opacity: 1, duration: 0.9 }, 1.3);
      }
      if (scrollRef.current) {
        gsap.set(scrollRef.current, { opacity: 0 });
        tl.to(scrollRef.current, { opacity: 0.4, duration: 0.8, delay: 0.4 }, 1.6);
      }

      // Parallax on scroll
      if (bgRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            if (bgRef.current) {
              bgRef.current.style.transform = `scale(1.04) translateY(${self.progress * 120}px)`;
            }
          },
        });
      }
    };

    run();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Background image */}
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

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to top,
              rgba(5,5,5,0.95) 0%,
              rgba(5,5,5,0.65) 30%,
              rgba(5,5,5,0.22) 62%,
              rgba(5,5,5,0.06) 100%
            ),
            linear-gradient(to right,
              rgba(5,5,5,0.45) 0%,
              transparent 60%
            )
          `,
          zIndex: 1,
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          zIndex: 2,
        }}
      />

      {/* Subtle bottom-left glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%", left: "-5%",
          width:  "55vw",  height: "55vw",
          background: "radial-gradient(circle, rgba(201,160,90,0.05) 0%, transparent 65%)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="relative juno-container pb-16 md:pb-28"
        style={{ zIndex: 3, paddingTop: "8rem" }}
      >
        {/* Eyebrow */}
        <span
          ref={tagRef}
          className="font-heading block mb-7"
          style={{
            fontSize:      "clamp(8px,1vw,10px)",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color:         "var(--gold)",
            fontWeight:    600,
            opacity:       0.9,
          }}
        >
          India&apos;s First Invite-Only Experiential Journey Club
        </span>

        {/* Headline — toned down glow, warmer white */}
        <h1
          ref={headlineRef}
          className="font-serif italic"
          style={{
            fontSize:     "clamp(3.2rem, 9vw, 9rem)",
            lineHeight:   0.95,
            maxWidth:     "850px",
            marginBottom: "2rem",
          }}
        >
          <span style={{ display: "block", overflow: "hidden" }}>
            <span
              className="hero-line"
              style={{
                display:    "block",
                color:      "rgba(255,255,255,0.92)",
                fontWeight: 600,
                textShadow: "0 4px 24px rgba(0,0,0,0.7)",
                letterSpacing: "0.01em",
              }}
            >
              Experience
            </span>
          </span>
          <span style={{ display: "block", overflow: "hidden", marginTop: "0.08em" }}>
            <span
              className="hero-line"
              style={{
                display:    "block",
                color:      "var(--gold)",
                fontWeight: 700,
                textShadow: "0 0 40px rgba(201,160,90,0.45), 0 4px 20px rgba(0,0,0,0.7)",
              }}
            >
              JUNO.
            </span>
          </span>
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="font-heading"
          style={{
            fontSize:     "clamp(1rem, 1.6vw, 1.15rem)",
            fontWeight:   400,
            color:        "rgba(255,255,255,0.72)",
            maxWidth:     "420px",
            lineHeight:   1.75,
            marginBottom: "2.5rem",
            textShadow:   "0 2px 10px rgba(0,0,0,0.6)",
          }}
        >
          A quiet circle of people who choose depth over noise,
          and making over scrolling.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link
            href="/invite"
            className="font-heading relative overflow-hidden"
            style={{
              fontSize:      "clamp(9px,1vw,11px)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding:       "1.2rem 3rem",
              background:    "var(--gold)",
              color:         "#080808",
              fontWeight:    700,
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "0.75rem",
              transition:    "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              boxShadow:     "0 8px 32px rgba(201,160,90,0.35)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background  = "var(--gold-light)";
              el.style.transform   = "translateY(-4px) scale(1.04)";
              el.style.boxShadow   = "0 16px 48px rgba(201,160,90,0.5)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background  = "var(--gold)";
              el.style.transform   = "translateY(0) scale(1)";
              el.style.boxShadow   = "0 8px 32px rgba(201,160,90,0.35)";
            }}
          >
            <span className="relative z-10">Request an Invitation</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative z-10">
              <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <a
            href="#about"
            className="font-heading"
            style={{
              fontSize:      "clamp(9px,1vw,11px)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color:         "rgba(255,255,255,0.7)",
              borderBottom:  "1.5px solid rgba(255,255,255,0.3)",
              paddingBottom: "4px",
              transition:    "all 0.3s ease",
              fontWeight:    600,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color       = "var(--gold)";
              el.style.borderColor = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color       = "rgba(255,255,255,0.7)";
              el.style.borderColor = "rgba(255,255,255,0.3)";
            }}
          >
            Discover more ↓
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
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
            fontSize:      "8px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color:         "var(--gold)",
            writingMode:   "vertical-rl",
            opacity:       0.7,
          }}
        >
          Scroll
        </span>
      </div>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height:     "1px",
          background: "linear-gradient(to right, transparent, rgba(201,160,90,0.3), transparent)",
          zIndex:     3,
        }}
      />

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1);    }
          50%       { opacity: 0.8; transform: scaleY(1.12); }
        }
      `}</style>
    </section>
  );
}