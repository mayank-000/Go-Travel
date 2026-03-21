"use client";

import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    number: "01",
    title:  "Create",
    description:
      "Every journey centres on making something — with hands, tools, and time. Craft is how we reconnect with culture and ourselves.",
    icon: "◎",
  },
  {
    number: "02",
    title:  "Explore",
    description:
      "We move slowly, intentionally, through landscapes that ask something of you. Not sightseeing — participation.",
    icon: "◌",
  },
  {
    number: "03",
    title:  "Restore",
    description:
      "Small groups, unhurried pace, nourishing food. JUNO journeys are designed to leave you more yourself than when you arrived.",
    icon: "◍",
  },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("revealed");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate progress from 0 to 1 as section moves through viewport
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + sectionHeight)
      ));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="juno-section relative overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Animated background gradient that follows scroll */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${50 + scrollProgress * 50}% ${30 + scrollProgress * 40}%, rgba(201,160,90,0.08) 0%, transparent 60%)`,
          transition: "background 0.3s ease",
        }}
      />

      <div className="juno-container relative z-10">

        {/* ── Header ── */}
        <div
          data-reveal
          className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-10 md:mb-16"
        >
          <span
            className="font-heading"
            style={{
              fontSize:      "9px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color:         "var(--ochre)",
              fontWeight:    600,
            }}
          >
            Our Philosophy
          </span>
          <div
            className="h-px flex-1 max-w-24"
            style={{ background: "linear-gradient(to right, var(--ochre), transparent)" }}
          />
        </div>

        {/* Large statement text - mobile optimized */}
        <h2
          data-reveal
          className="font-serif italic mb-12 md:mb-16"
          style={{
            fontSize:   "clamp(1.8rem, 5vw, 3rem)",
            lineHeight: 1.15,
            color:      "var(--charcoal)",
            maxWidth:   "800px",
          }}
        >
          Three principles guide
          <br />
          <span style={{ color: "var(--ochre)" }}>everything we create.</span>
        </h2>

        {/* ── Pillars ── Mobile: Stack, Desktop: Grid */}
        <div
          data-reveal
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{
            border:        "1px solid rgba(139,101,63,0.2)",
            transitionDelay: "0.1s",
            background:     "rgba(139,101,63,0.2)", // This creates the gap color
          }}
        >
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              className="group flex flex-col gap-4 md:gap-6 relative overflow-hidden"
              style={{
                padding:     "clamp(1.5rem,4vw,3.5rem) clamp(1.25rem,3vw,2.5rem)",
                background:  "var(--cream)",
                transition:  "all 0.6s cubic-bezier(0.16,1,0.3,1)",
                cursor:      "default",
                minHeight:   "280px", // Ensure consistent card height on mobile
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--warm-white)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(139,101,63,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--cream)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Ambient glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background:  "radial-gradient(circle at 50% 0%, rgba(139,101,63,0.08) 0%, transparent 70%)",
                  transition:  "opacity 0.6s ease",
                }}
              />

              {/* Top bar with number and icon */}
              <div className="flex items-start justify-between relative z-10">
                <span
                  className="font-heading"
                  style={{
                    fontSize:      "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color:         "var(--ochre)",
                    fontWeight:    600,
                  }}
                >
                  {pillar.number}
                </span>

                {/* Icon */}
                <span
                  className="font-serif group-hover:scale-110 group-hover:rotate-12"
                  style={{
                    fontSize:   "2.5rem",
                    lineHeight: 1,
                    color:      "rgba(139,101,63,0.25)",
                    transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                    display:    "block",
                  }}
                >
                  {pillar.icon}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-serif italic relative z-10"
                style={{
                  fontSize:   "clamp(1.6rem, 3.5vw, 2.4rem)",
                  lineHeight: 1.1,
                  color:      "var(--charcoal)",
                  transition: "color 0.4s ease",
                  marginTop:  "auto",
                }}
              >
                {pillar.title}
              </h3>

              {/* Description */}
              <p
                className="font-heading relative z-10"
                style={{
                  fontSize:   "clamp(0.875rem, 1.2vw, 0.95rem)",
                  lineHeight: 1.7,
                  fontWeight: 300,
                  color:      "var(--charcoal)",
                  opacity:    0.75,
                }}
              >
                {pillar.description}
              </p>

              {/* Expanding line */}
              <div
                className="w-8 group-hover:w-20 h-px mt-2 relative z-10"
                style={{
                  backgroundColor: "var(--ochre)",
                  transition:      "width 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div 
          className="flex items-center justify-center gap-4 mt-16 opacity-30"
          data-reveal
          style={{ transitionDelay: "0.3s" }}
        >
          <div className="w-12 h-px bg-ochre" />
          <span className="font-serif text-ochre text-xl">✦</span>
          <div className="w-12 h-px bg-ochre" />
        </div>

      </div>
    </section>
  );
}