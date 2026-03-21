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

      if (bgRef.current) {
        gsap.set(bgRef.current, { scale: 1.15 });
        tl.to(bgRef.current, { scale: 1.04, duration: 2.4, ease: "power2.out" }, 0);
      }

      if (overlayRef.current) {
        gsap.set(overlayRef.current, { opacity: 0 });
        tl.to(overlayRef.current, { opacity: 1, duration: 1.8 }, 0.2);
      }

      if (tagRef.current) {
        gsap.set(tagRef.current, { y: 20, opacity: 0 });
        tl.to(tagRef.current, { y: 0, opacity: 1, duration: 1 }, 0.6);
      }

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

      if (subRef.current) {
        gsap.set(subRef.current, { y: 24, opacity: 0 });
        tl.to(subRef.current, { y: 0, opacity: 1, duration: 1 }, 1.1);
      }

      if (ctaRef.current) {
        gsap.set(ctaRef.current, { y: 20, opacity: 0 });
        tl.to(ctaRef.current, { y: 0, opacity: 1, duration: 0.9 }, 1.3);
      }

      if (scrollRef.current) {
        gsap.set(scrollRef.current, { opacity: 0 });
        tl.to(scrollRef.current, { opacity: 0.4, duration: 0.8, delay: 0.4 }, 1.6);
      }

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
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/coverP5.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          transformOrigin: "center center",
          zIndex: 0,
        }}
      />

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

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          zIndex: 2,
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%", left: "-5%",
          width: "55vw", height: "55vw",
          background: "radial-gradient(circle, rgba(201,160,90,0.07) 0%, transparent 65%)",
          zIndex: 2,
        }}
      />

      <div
        className="relative juno-container pb-16 md:pb-28"
        style={{ zIndex: 3, paddingTop: "8rem" }}
      >
        <span
          ref={tagRef}
          className="font-heading block mb-7"
          style={{
            fontSize: "clamp(8px,1vw,10px)",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: 700,
            textShadow: "0 2px 12px rgba(201,160,90,0.8), 0 0 30px rgba(201,160,90,0.4)",
            animation: "glow 2s ease-in-out infinite",
          }}
        >
          India&apos;s First Invite-Only Experiential Journey Club
        </span>

        {/* DRAMATICALLY IMPROVED "EXPERIENCE" TEXT */}
        <h1
          ref={headlineRef}
          className="font-serif italic"
          style={{
            fontSize: "clamp(3.2rem, 9vw, 9rem)",
            lineHeight: 0.95,
            maxWidth: "850px",
            marginBottom: "2rem",
          }}
        >
          <span className="line-reveal" style={{ display: "block", overflow: "hidden" }}>
            <span 
              className="hero-line" 
              style={{ 
                display: "block",
                color: "#FFFFFF",
                fontWeight: 600,
                textShadow: `
                  0 0 20px rgba(255,255,255,0.8),
                  0 0 40px rgba(255,255,255,0.6),
                  0 0 60px rgba(201,160,90,0.5),
                  0 4px 20px rgba(0,0,0,0.8),
                  0 8px 40px rgba(0,0,0,0.6)
                `,
                letterSpacing: "0.02em",
              }}
            >
              Experience
            </span>
          </span>
          <span className="line-reveal" style={{ display: "block", overflow: "hidden", marginTop: "0.08em" }}>
            <span 
              className="hero-line" 
              style={{ 
                display: "block", 
                color: "var(--gold)",
                fontWeight: 700,
                textShadow: `
                  0 0 30px rgba(201,160,90,1),
                  0 0 60px rgba(201,160,90,0.8),
                  0 0 90px rgba(201,160,90,0.6),
                  0 4px 20px rgba(0,0,0,0.8)
                `,
                animation: "titleGlow 3s ease-in-out infinite",
              }}
            >
              JUNO.
            </span>
          </span>
        </h1>

        <p
          ref={subRef}
          className="font-heading"
          style={{
            fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
            fontWeight: 400,
            color: "#FFFFFF",
            maxWidth: "420px",
            lineHeight: 1.75,
            marginBottom: "2.5rem",
            textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 4px 24px rgba(0,0,0,0.6)",
          }}
        >
          A quiet circle of people who choose depth over noise,
          and making over scrolling.
        </p>

        <div ref={ctaRef} style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link
            href="/invite"
            className="font-heading group relative overflow-hidden"
            style={{
              fontSize: "clamp(9px,1vw,11px)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "1.2rem 3rem",
              background: "var(--gold)",
              color: "#080808",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              boxShadow: "0 8px 32px rgba(201,160,90,0.5), 0 0 40px rgba(201,160,90,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--gold-light)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px) scale(1.05)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(201,160,90,0.6), 0 0 60px rgba(201,160,90,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--gold)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(201,160,90,0.5), 0 0 40px rgba(201,160,90,0.3)";
            }}
          >
            <span className="relative z-10">Request an Invitation</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative z-10 group-hover:translate-x-2 transition-transform duration-300">
              <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                transform: "translateX(-100%)",
                transition: "all 0.8s ease",
              }}
            />
          </Link>

          <a
            href="#about"
            className="font-heading"
            style={{
              fontSize: "clamp(9px,1vw,11px)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              borderBottom: "2px solid rgba(255,255,255,0.4)",
              paddingBottom: "4px",
              transition: "all 0.3s ease",
              fontWeight: 600,
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--gold)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
              (e.currentTarget as HTMLElement).style.textShadow = "0 0 20px rgba(201,160,90,0.8)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
              (e.currentTarget as HTMLElement).style.textShadow = "0 2px 8px rgba(0,0,0,0.6)";
            }}
          >
            Discover more ↓
          </a>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute hidden md:flex flex-col items-center gap-3"
        style={{ right: "2.5rem", bottom: "2.5rem", zIndex: 3 }}
      >
        <div
          className="h-16 w-px"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--gold))",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
        <span
          className="font-heading"
          style={{
            fontSize: "8px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gold)",
            writingMode: "vertical-rl",
            textShadow: "0 0 10px rgba(201,160,90,0.6)",
          }}
        >
          Scroll
        </span>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(201,160,90,0.4), transparent)",
          zIndex: 3,
        }}
      />

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%       { opacity: 0.9; transform: scaleY(1.15); }
        }
        @keyframes glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes titleGlow {
          0%, 100% { 
            text-shadow: 
              0 0 30px rgba(201,160,90,1),
              0 0 60px rgba(201,160,90,0.8),
              0 0 90px rgba(201,160,90,0.6),
              0 4px 20px rgba(0,0,0,0.8);
          }
          50% { 
            text-shadow: 
              0 0 40px rgba(201,160,90,1),
              0 0 80px rgba(201,160,90,0.9),
              0 0 120px rgba(201,160,90,0.7),
              0 4px 20px rgba(0,0,0,0.8);
          }
        }
      `}</style>
    </section>
  );
}