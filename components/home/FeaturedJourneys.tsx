"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

const journeys = [
  {
    id: 1,
    name:     "The Clay Coast",
    location: "Oaxaca, Mexico",
    tagline:  "Your hands remember things your mind has forgotten. Seven days with master potters in the Oaxacan highlands to find out what they are.",
    image:    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&q=80",
    tag:      "Craft",
    duration: "7 days",
  },
  {
    id: 2,
    name:     "Salt & Swell",
    location: "Basque Country, Spain",
    tagline:  "The Atlantic is brutal before breakfast. The txakoli is cold by evening. In between: a week of surf, fire, and one of the world's great food cultures.",
    image:    "/beachP3.jpg",
    tag:      "Sea",
    duration: "8 days",
  },
  {
    id: 3,
    name:     "High Atlas Immersion",
    location: "Morocco",
    tagline:  "These villages don't appear on itineraries. Berber families open their homes, their looms, and their tables to a group of eight. You won't find this elsewhere.",
    image:    "/trekkingWibeP4.jpg",
    tag:      "Culture",
    duration: "9 days",
  },
  {
    id: 4,
    name:     "Tea & Timber",
    location: "Himachal Pradesh, India",
    tagline:  "A forest cabin at altitude. Days shaped by woodwork, natural dyeing, and the discipline of doing one thing slowly. No itinerary. No rush.",
    image:    "/mountainP1.jpg",
    tag:      "Retreat",
    duration: "6 days",
  },
  {
    id: 5,
    name:     "Salt Pan Evenings",
    location: "Kutch, Gujarat",
    tagline:  "India flattens out completely here. The sky takes over. Winter in the Rann means near-silence, a community of makers, and stars so dense they cast shadows.",
    image:    "/desertP2.jpg",
    tag:      "Night",
    duration: "7 days",
  },
];

export default function FeaturedJourneys() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

  const [canPrev, setCanPrev]               = useState(false);
  const [canNext, setCanNext]               = useState(true);
  const [current, setCurrent]               = useState(0);
  const [hoveredCard, setHoveredCard]       = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerRevealed, setHeaderRevealed] = useState(false);
  const [cardsRevealed, setCardsRevealed]   = useState(false);

  /* ── carousel scroll state ── */
  const updateButtons = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    const cardW = (el.children[0] as HTMLElement)?.offsetWidth ?? 0;
    setCurrent(Math.round(el.scrollLeft / (cardW + 24)));
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    updateButtons();
    return () => el.removeEventListener("scroll", updateButtons);
  }, [updateButtons]);

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

    const o1 = makeObs(setHeaderRevealed, 0.2);
    const o2 = makeObs(setCardsRevealed,  0.1);

    if (headerRef.current) o1.observe(headerRef.current);
    if (cardsRef.current)  o2.observe(cardsRef.current);

    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  const goTo = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardW = (el.children[0] as HTMLElement)?.offsetWidth ?? 0;
    el.scrollTo({ left: idx * (cardW + 24), behavior: "smooth" });
  };

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
      style={{ backgroundColor: "var(--surface)" }}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${40 + scrollProgress * 30}% 50%, rgba(139,101,63,0.06) 0%, transparent 65%)`,
          transition: "background 0.3s ease",
        }}
      />

      <div className="juno-container relative z-10">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
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
              Featured Journeys
            </span>
            <h2
              className="font-serif italic"
              style={{
                fontSize:   "clamp(2rem,4vw,3.5rem)",
                lineHeight: 1.05,
                color:      "var(--charcoal)",
              }}
            >
              Carefully curated,
              <br />
              deeply considered.
            </h2>
          </div>

          {/* Nav + View all */}
          <div className="flex items-center gap-4 shrink-0">
            {[{ dir: -1, can: canPrev, label: "←" }, { dir: 1, can: canNext, label: "→" }].map(({ dir, can, label }) => (
              <button
                key={label}
                onClick={() => goTo(current + dir)}
                disabled={!can}
                style={{
                  width:          "48px",
                  height:         "48px",
                  borderRadius:   "50%",
                  border:         `2px solid ${can ? "var(--ochre)" : "rgba(139,101,63,0.15)"}`,
                  background:     can ? "rgba(139,101,63,0.08)" : "transparent",
                  color:          can ? "var(--ochre)" : "rgba(42,38,35,0.2)",
                  cursor:         can ? "none" : "default",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  fontSize:       "1.1rem",
                  fontWeight:     600,
                  transition:     "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow:      can ? "0 4px 16px rgba(139,101,63,0.15)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (can) {
                    (e.currentTarget as HTMLElement).style.transform  = "scale(1.1)";
                    (e.currentTarget as HTMLElement).style.boxShadow  = "0 8px 24px rgba(139,101,63,0.25)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = can ? "0 4px 16px rgba(139,101,63,0.15)" : "none";
                }}
              >
                {label}
              </button>
            ))}

            <Link
              href="/trips"
              className="font-heading ml-2"
              style={{
                fontSize:      "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color:         "var(--ochre)",
                borderBottom:  "1.5px solid var(--ochre)",
                paddingBottom: "3px",
                transition:    "all 0.3s ease",
                fontWeight:    600,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity   = "0.6";
                (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity   = "1";
                (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
              }}
            >
              View all →
            </Link>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div
          ref={cardsRef}
          className="relative -mx-5 md:mx-0"
          style={reveal(cardsRevealed, 80)}
        >
          <div
            ref={carouselRef}
            className="no-scrollbar"
            style={{
              display:       "flex",
              gap:           "1.5rem",
              overflowX:     "auto",
              paddingLeft:   "1.25rem",
              paddingRight:  "1.25rem",
              paddingBottom: "12px",
            }}
          >
            {journeys.map((j, idx) => {
              const hovered = hoveredCard === idx;
              return (
                <Link
                  href={`/trips/${j.id}`}
                  key={j.id}
                  className="flex flex-col relative"
                  style={{
                    flex:        "0 0 clamp(260px,28vw,320px)",
                    border:      `2px solid ${hovered ? "var(--ochre)" : "rgba(139,101,63,0.12)"}`,
                    overflow:    "hidden",
                    background:  "var(--cream)",
                    transform:   hovered ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
                    boxShadow:   hovered ? "0 40px 100px rgba(139,101,63,0.25)" : "0 10px 40px rgba(139,101,63,0.08)",
                    transition:  "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Gold glow overlay */}
                  <div
                    style={{
                      position:      "absolute",
                      inset:         0,
                      background:    "radial-gradient(circle at 50% 0%, rgba(201,160,90,0.15) 0%, transparent 70%)",
                      opacity:       hovered ? 1 : 0,
                      transition:    "opacity 0.5s ease",
                      pointerEvents: "none",
                      zIndex:        1,
                    }}
                  />

                  {/* Image */}
                  <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5" }}>
                    <div
                      style={{
                        position:           "absolute",
                        inset:              0,
                        backgroundImage:    `url('${j.image}')`,
                        backgroundSize:     "cover",
                        backgroundPosition: "center",
                        transform:          hovered ? "scale(1.12)" : "scale(1)",
                        filter:             hovered ? "brightness(1.1)" : "brightness(1)",
                        transition:         "transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease",
                      }}
                    />
                    <div
                      style={{
                        position:   "absolute",
                        inset:      0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                        opacity:    hovered ? 0.85 : 1,
                        transition: "opacity 0.5s ease",
                      }}
                    />

                    {/* Tag */}
                    <span
                      className="font-heading absolute"
                      style={{
                        top:           "16px",
                        left:          "16px",
                        fontSize:      "8px",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        padding:       "8px 16px",
                        background:    "rgba(8,8,8,0.85)",
                        color:         "var(--gold)",
                        border:        "1.5px solid var(--gold)",
                        fontWeight:    600,
                        backdropFilter:"blur(8px)",
                        transform:     hovered ? "scale(1.05)" : "scale(1)",
                        boxShadow:     hovered ? "0 4px 16px rgba(201,160,90,0.4)" : "none",
                        transition:    "all 0.3s ease",
                      }}
                    >
                      {j.tag}
                    </span>
                  </div>

                  {/* Body */}
                  <div
                    style={{
                      padding:       "2rem 1.75rem",
                      display:       "flex",
                      flexDirection: "column",
                      gap:           "1rem",
                      flex:          1,
                      borderTop:     "2px solid rgba(139,101,63,0.08)",
                      position:      "relative",
                      zIndex:        10,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span
                        className="font-heading"
                        style={{
                          fontSize:      "8px",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color:         "var(--ochre)",
                          fontWeight:    600,
                        }}
                      >
                        {j.location}
                      </span>
                      <span
                        className="font-heading"
                        style={{
                          fontSize:      "8px",
                          letterSpacing: "0.15em",
                          color:         "var(--charcoal)",
                          opacity:       0.5,
                        }}
                      >
                        {j.duration}
                      </span>
                    </div>

                    <h3
                      className="font-serif italic"
                      style={{
                        fontSize:   "clamp(1.4rem,2vw,1.7rem)",
                        color:      "var(--charcoal)",
                        lineHeight: 1.1,
                      }}
                    >
                      {j.name}
                    </h3>

                    <p
                      className="font-heading"
                      style={{
                        fontSize:   "0.875rem",
                        color:      "var(--charcoal)",
                        fontWeight: 300,
                        lineHeight: 1.75,
                        opacity:    0.75,
                      }}
                    >
                      {j.tagline}
                    </p>

                    {/* CTA */}
                    <div
                      className="mt-auto pt-4"
                      style={{ borderTop: "1px solid rgba(139,101,63,0.1)" }}
                    >
                      <span
                        className="font-heading inline-flex items-center gap-2"
                        style={{
                          fontSize:      "9px",
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          color:         "var(--ochre)",
                          fontWeight:    600,
                          transform:     hovered ? "translateX(4px)" : "translateX(0)",
                          transition:    "transform 0.3s ease",
                        }}
                      >
                        Explore Journey
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}