"use client";

import { useState, useEffect, useRef } from "react";

const faqs = [
  { q: "Who is JUNO actually for?",             a: "People who are quietly tired of ordinary weekends. Professionals, creatives, and curious minds between 25–40 who want to make something real — and don't know where to start. If you felt something reading this page, it's probably for you." },
  { q: 'What does "invite-only" actually mean?', a: "It means we don't run open registrations. You request a seat, we have a brief conversation, and we make sure the fit is right — for you and for the group. It's not exclusive for the sake of ego. It's intentional for the sake of experience." },
  { q: "Do I need skills or experience?",        a: "Bring none. Our artisans are extraordinary teachers. The only prerequisite is genuine curiosity." },
  { q: "What's included?",                       a: "Everything that removes friction — curated transport from Delhi, handpicked accommodation, all workshop sessions, most meals, and our team on the ground with you. The full breakdown is shared before you commit a single rupee." },
  { q: "How small is small?",                    a: "Twelve. That's the ceiling. We won't cross it." },
  { q: "What about safety?",                     a: "Every vehicle, partner, and property is personally vetted. You'll never be handed off to a stranger. Our team is present from departure to return." },
  { q: "Can I cancel?",                          a: "Life happens — we understand that. Our policy is fair and fully transparent. We'll walk you through it before you book." },
];

export default function FAQSection() {
  const [open, setOpen]                     = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerRevealed, setHeaderRevealed] = useState(false);
  const [accordionRevealed, setAccordionRevealed] = useState(false);
  const [decoRevealed, setDecoRevealed]     = useState(false);
  const [hoveredRow, setHoveredRow]         = useState<number | null>(null);

  const sectionRef   = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const decoRef      = useRef<HTMLDivElement>(null);

  /* ── scroll progress for bg gradient ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── intersection reveals ── */
  useEffect(() => {
    const makeObs = (setter: (v: boolean) => void, threshold = 0.15) =>
      new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true); },
        { threshold }
      );

    const o1 = makeObs(setHeaderRevealed,    0.2);
    const o2 = makeObs(setAccordionRevealed, 0.1);
    const o3 = makeObs(setDecoRevealed,      0.3);

    if (headerRef.current)    o1.observe(headerRef.current);
    if (accordionRef.current) o2.observe(accordionRef.current);
    if (decoRef.current)      o3.observe(decoRef.current);

    return () => { o1.disconnect(); o2.disconnect(); o3.disconnect(); };
  }, []);

  /* ── reveal helper ── */
  const reveal = (on: boolean, delay = 0): React.CSSProperties => ({
    opacity:    on ? 1 : 0,
    transform:  on ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      className="juno-section relative overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${30 + scrollProgress * 40}% ${40 + scrollProgress * 30}%, rgba(139,101,63,0.06) 0%, transparent 65%)`,
          transition: "background 0.3s ease",
          zIndex:     0,
        }}
      />

      <div className="juno-container relative" style={{ zIndex: 10 }}>

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mb-14 md:mb-16"
          style={reveal(headerRevealed)}
        >
          <div>
            <span
              className="font-heading block mb-5"
              style={{
                fontSize:      "9px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color:         "var(--ochre)",
                fontWeight:    600,
              }}
            >
              FAQ
            </span>
            <h2
              className="font-serif italic"
              style={{
                fontSize:   "clamp(2.4rem,5vw,4rem)",
                lineHeight: 1.04,
                color:      "var(--charcoal)",
              }}
            >
              Real Answers.
              <br />
              <span style={{ color: "var(--ochre)" }}>No Fine Print.</span>
            </h2>
          </div>

          <p
            className="font-heading self-end"
            style={{
              fontSize:   "clamp(0.95rem,1.4vw,1.05rem)",
              fontWeight: 300,
              color:      "var(--charcoal)",
              opacity:    0.75,
              maxWidth:   "400px",
              lineHeight: 1.8,
            }}
          >
            Everything you&apos;d want to know before saying yes. Still wondering
            something?{" "}
            <a
              href="#contact"
              style={{
                color:         "var(--ochre)",
                borderBottom:  "1.5px solid var(--ochre)",
                paddingBottom: "2px",
                transition:    "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.6")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Just ask us.
            </a>
          </p>
        </div>

        {/* ── Accordion ── */}
        <div
          ref={accordionRef}
          style={{
            borderTop: "1.5px solid rgba(139,101,63,0.15)",
            ...reveal(accordionRevealed, 80),
          }}
        >
          {faqs.map((item, i) => {
            const isOpen   = open === i;
            const isHovered = hoveredRow === i;

            return (
              <div
                key={i}
                style={{
                  borderBottom: "1.5px solid rgba(139,101,63,0.15)",
                  background:   isOpen
                    ? "rgba(139,101,63,0.025)"
                    : isHovered
                    ? "rgba(139,101,63,0.018)"
                    : "transparent",
                  transition:   "background 0.3s ease",
                }}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-8"
                  style={{
                    padding:    "2rem 0",
                    background: "none",
                    border:     "none",
                    cursor:     "none",
                    textAlign:  "left",
                    width:      "100%",
                  }}
                  aria-expanded={isOpen}
                >
                  {/* Question text */}
                  <span
                    className="font-serif italic"
                    style={{
                      fontSize:   "clamp(1.1rem,1.8vw,1.3rem)",
                      color:      isOpen ? "var(--ochre)" : "var(--charcoal)",
                      lineHeight: 1.3,
                      transform:  isOpen ? "translateX(4px)" : "translateX(0)",
                      transition: "color 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    {item.q}
                  </span>

                  {/* Icon circle */}
                  <div
                    style={{
                      flexShrink:     0,
                      width:          "40px",
                      height:         "40px",
                      borderRadius:   "50%",
                      border:         `1.5px solid ${isOpen ? "var(--ochre)" : "rgba(139,101,63,0.2)"}`,
                      background:     isOpen ? "rgba(139,101,63,0.08)" : "transparent",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      transition:     "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <span
                      style={{
                        fontSize:   "1.3rem",
                        lineHeight: 1,
                        color:      isOpen ? "var(--ochre)" : "rgba(42,38,35,0.35)",
                        transform:  isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), color 0.3s ease",
                        display:    "block",
                      }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </div>
                </button>

                {/* Answer — CSS grid trick for smooth height animation */}
                <div
                  style={{
                    display:          "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition:       "grid-template-rows 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <p
                      className="font-heading"
                      style={{
                        fontSize:      "clamp(0.9rem,1.2vw,1rem)",
                        lineHeight:    1.85,
                        fontWeight:    300,
                        color:         "var(--charcoal)",
                        opacity:       0.72,
                        maxWidth:      "680px",
                        paddingBottom: "2rem",
                        paddingLeft:   "4px",
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Decorative divider ── */}
        <div
          ref={decoRef}
          className="flex items-center justify-center gap-4 mt-16"
          style={{
            opacity: decoRevealed ? 0.25 : 0,
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 100ms",
          }}
        >
          <div style={{ width: "3rem", height: "1px", backgroundColor: "var(--ochre)" }} />
          <span className="font-serif" style={{ color: "var(--ochre)", fontSize: "1.25rem" }} aria-hidden="true">✦</span>
          <div style={{ width: "3rem", height: "1px", backgroundColor: "var(--ochre)" }} />
        </div>

      </div>
    </section>
  );
}