"use client";

import { useEffect, useRef } from "react";

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

  return (
    <section
      ref={sectionRef}
      className="juno-section"
      style={{ backgroundColor: "var(--deep)" }}
    >
      <div className="juno-container">

        {/* ── Header ── */}
        <div
          data-reveal
          className="flex items-center gap-6 mb-14 md:mb-16"
        >
          <span
            className="font-heading"
            style={{
              fontSize:      "9px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color:         "var(--sage)",
            }}
          >
            Our Philosophy
          </span>
          <div
            className="h-px flex-1 max-w-24"
            style={{ background: "linear-gradient(to right, rgba(201,160,90,0.4), transparent)" }}
          />
        </div>

        {/* ── Pillars ── */}
        <div
          data-reveal
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            border:        "1px solid rgba(201,160,90,0.12)",
            transitionDelay: "0.1s",
          }}
        >
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              className="group flex flex-col gap-6 relative overflow-hidden"
              style={{
                padding:     "clamp(2rem,4vw,3.5rem) clamp(1.5rem,3vw,2.5rem)",
                borderRight: i < pillars.length - 1 ? "1px solid rgba(201,160,90,0.12)" : "none",
                transition:  "background 0.6s ease",
                cursor:      "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(201,160,90,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* Ambient glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background:  "radial-gradient(circle at 50% 0%, rgba(201,160,90,0.06) 0%, transparent 70%)",
                  transition:  "opacity 0.6s ease",
                }}
              />

              {/* Number */}
              <span
                className="font-heading"
                style={{
                  fontSize:      "10px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color:         "var(--gold)",
                  opacity:       0.6,
                }}
              >
                {pillar.number}
              </span>

              {/* Icon */}
              <span
                className="font-serif"
                style={{
                  fontSize:   "3rem",
                  lineHeight: 1,
                  color:      "rgba(201,160,90,0.2)",
                  transition: "color 0.4s ease, transform 0.4s ease",
                  display:    "block",
                  transform:  "rotate(0deg)",
                }}
              >
                {pillar.icon}
              </span>

              {/* Title */}
              <h3
                className="font-serif italic"
                style={{
                  fontSize:   "clamp(2rem,3.5vw,3rem)",
                  lineHeight: 1.05,
                  color:      "var(--text-primary)",
                  transition: "color 0.4s ease",
                }}
              >
                {pillar.title}
              </h3>

              {/* Description */}
              <p
                className="font-heading"
                style={{
                  fontSize:   "clamp(0.8rem,1.2vw,0.9rem)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  color:      "var(--text-secondary)",
                }}
              >
                {pillar.description}
              </p>

              {/* Expanding line */}
              <div
                className="w-8 group-hover:w-20 h-px mt-auto"
                style={{
                  backgroundColor: "var(--gold)",
                  opacity:         0.5,
                  transition:      "width 0.5s ease",
                }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}