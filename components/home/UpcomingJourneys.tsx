"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const trips = [
  {
    id: 1,
    title:       "Clay & Quiet",
    location:    "Khurja, Uttar Pradesh",
    when:        "Coming Soon",
    tag:         "Craft",
    image:       "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=700&q=80",
    description: "Two days. A wheel. Clay that won't cooperate until it does. You'll leave with something you made and a silence you didn't expect to find.",
  },
  {
    id: 2,
    title:       "Salt & Swell",
    location:    "Basque Country, Spain",
    when:        "Waitlist Open",
    tag:         "Sea",
    image:       "/beachP3.jpg",
    description: "Eight people. One coast. Dawn paddles, open-fire dinners, and evenings that stretch as long as you'll let them.",
  },
  {
    id: 3,
    title:       "High Atlas Immersion",
    location:    "High Atlas, Morocco",
    when:        "2026 · Spring",
    tag:         "Culture",
    image:       "/trekkingWibeP4.jpg",
    description: "Berber mountain villages that take a morning's walk to reach. Families who have woven these patterns for generations.",
  },
  {
    id: 4,
    title:       "Tea & Timber",
    location:    "Himachal Pradesh, India",
    when:        "Coming Soon",
    tag:         "Retreat",
    image:       "/mountainP1.jpg",
    description: "Cedar smoke at 6am. Frost on the window. Days built around woodwork, natural dye baths, and tea that actually tastes like where it grew.",
  },
  {
    id: 5,
    title:       "Salt Pan Evenings",
    location:    "Kutch, Gujarat",
    when:        "2026 · Winter",
    tag:         "Night",
    image:       "/desertP2.jpg",
    description: "The Rann in December is white, flat, and completely still. By day you make things. By night, the sky is the only thing that moves.",
  },
];

export default function UpcomingJourneys() {
  const carouselRef            = useRef<HTMLDivElement>(null);
  const sectionRef             = useRef<HTMLElement>(null);
  const [canPrev, setCanPrev]               = useState(false);
  const [canNext, setCanNext]               = useState(true);
  const [current, setCurrent]               = useState(0);
  const [hoveredCard, setHoveredCard]       = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerRevealed, setHeaderRevealed] = useState(false);
  const [cardsRevealed, setCardsRevealed]   = useState(false);
  const [stripRevealed, setStripRevealed]   = useState(false);

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

  /* ── reveal observers — each element gets its own ref ── */
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef  = useRef<HTMLDivElement>(null);
  const stripRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const makeObserver = (setter: (v: boolean) => void, threshold = 0.15) =>
      new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true); },
        { threshold }
      );

    const o1 = makeObserver(setHeaderRevealed, 0.2);
    const o2 = makeObserver(setCardsRevealed,  0.1);
    const o3 = makeObserver(setStripRevealed,  0.2);

    if (headerRef.current) o1.observe(headerRef.current);
    if (cardsRef.current)  o2.observe(cardsRef.current);
    if (stripRef.current)  o3.observe(stripRef.current);

    return () => { o1.disconnect(); o2.disconnect(); o3.disconnect(); };
  }, []);

  const goTo = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardW = (el.children[0] as HTMLElement)?.offsetWidth ?? 0;
    el.scrollTo({ left: idx * (cardW + 24), behavior: "smooth" });
  };

  /* ── shared transition for reveal ── */
  const revealStyle = (revealed: boolean, delay = 0): React.CSSProperties => ({
    opacity:    revealed ? 1 : 0,
    transform:  revealed ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      className="juno-section relative overflow-hidden"
      style={{ backgroundColor: "var(--panel)" }}
    >
      {/* Animated background gradient — moves as you scroll */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${40 + scrollProgress * 30}% 50%, rgba(139,101,63,0.07) 0%, transparent 65%)`,
          transition: "background 0.3s ease",
        }}
      />

      <div className="juno-container relative z-10">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
          style={revealStyle(headerRevealed)}
        >
          <div>
            <span
              className="font-heading block mb-5"
              style={{
                fontSize:      "9px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color:         "var(--sage)",
                fontWeight:    600,
              }}
            >
              Upcoming Journeys
            </span>
            <h2
              className="font-serif italic"
              style={{
                fontSize:   "clamp(2rem,4vw,3.5rem)",
                lineHeight: 1.05,
                color:      "var(--text-primary)",
              }}
            >
              A few seats.
              <br />
              Fewer chances to regret
              <br className="hidden md:block" /> not taking one.
            </h2>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-4 shrink-0">
            {[{ dir: -1, can: canPrev, label: "←" }, { dir: 1, can: canNext, label: "→" }].map(({ dir, can, label }) => (
              <button
                key={label}
                onClick={() => goTo(current + dir)}
                disabled={!can}
                style={{
                  width:          "44px",
                  height:         "44px",
                  borderRadius:   "50%",
                  border:         `1px solid ${can ? "var(--gold)" : "rgba(139,101,63,0.15)"}`,
                  background:     can ? "rgba(201,160,90,0.08)" : "transparent",
                  color:          can ? "var(--gold)" : "rgba(42,38,35,0.2)",
                  cursor:         can ? "none" : "default",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  fontSize:       "1rem",
                  transition:     "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  if (can) (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Carousel — NOT wrapped in a reveal div so cards are always visible ── */}
        <div
          ref={cardsRef}
          className="relative -mx-5 md:mx-0"
          style={revealStyle(cardsRevealed)}
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
              paddingBottom: "8px",
            }}
          >
            {trips.map((trip, idx) => {
              const hovered = hoveredCard === idx;
              return (
                <div
                  key={trip.id}
                  style={{
                    flex:          "0 0 clamp(260px,28vw,300px)",
                    border:        `2px solid ${hovered ? "var(--ochre)" : "rgba(139,101,63,0.12)"}`,
                    overflow:      "hidden",
                    background:    "var(--cream)",
                    cursor:        "none",
                    display:       "flex",
                    flexDirection: "column",
                    transform:     hovered ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
                    boxShadow:     hovered ? "0 40px 100px rgba(139,101,63,0.25)" : "0 10px 40px rgba(139,101,63,0.08)",
                    transition:    "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image */}
                  <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5" }}>
                    {/* Image bg — zoom on hover via React state */}
                    <div
                      style={{
                        position:           "absolute",
                        inset:              0,
                        backgroundImage:    `url('${trip.image}')`,
                        backgroundSize:     "cover",
                        backgroundPosition: "center",
                        transform:          hovered ? "scale(1.12)" : "scale(1)",
                        filter:             hovered ? "brightness(1.1)" : "brightness(1)",
                        transition:         "transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease",
                      }}
                    />
                    {/* Gradient overlay */}
                    <div
                      style={{
                        position:   "absolute",
                        inset:      0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                        opacity:    hovered ? 0.85 : 1,
                        transition: "opacity 0.5s ease",
                      }}
                    />
                    {/* Gold glow on hover */}
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
                      {trip.tag}
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
                      background:    "var(--cream)",
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
                        {trip.location}
                      </span>
                      <span
                        className="font-heading"
                        style={{
                          fontSize:      "8px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color:         "var(--charcoal)",
                          opacity:       0.45,
                        }}
                      >
                        {trip.when}
                      </span>
                    </div>

                    <h3
                      className="font-serif italic"
                      style={{
                        fontSize:   "clamp(1.3rem,2vw,1.6rem)",
                        color:      "var(--charcoal)",
                        lineHeight: 1.1,
                      }}
                    >
                      {trip.title}
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
                      {trip.description}
                    </p>

                    {/* CTA button */}
                    <div
                      className="mt-auto pt-4"
                      style={{ borderTop: "1px solid rgba(139,101,63,0.1)" }}
                    >
                      <button
                        className="font-heading inline-flex items-center gap-2"
                        style={{
                          fontSize:        "9px",
                          letterSpacing:   "0.25em",
                          textTransform:   "uppercase",
                          fontWeight:      600,
                          padding:         "10px 20px",
                          background:      hovered ? "var(--ochre)" : "transparent",
                          color:           hovered ? "var(--cream)" : "var(--ochre)",
                          border:          "1.5px solid var(--ochre)",
                          cursor:          "none",
                          transform:       hovered ? "translateX(4px)" : "translateX(0)",
                          transition:      "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                          boxShadow:       hovered ? "0 8px 24px rgba(139,101,63,0.3)" : "none",
                        }}
                      >
                        Request Invite
                        <svg
                          width="11" height="11" viewBox="0 0 16 16" fill="none"
                          style={{
                            transform:  hovered ? "translateX(3px)" : "translateX(0)",
                            transition: "transform 0.3s ease",
                          }}
                        >
                          <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom assurance strip ── */}
        <div
          ref={stripRef}
          className="mt-14 md:mt-16 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{
            border:     "1px solid var(--border-warm)",
            background: "rgba(139,101,63,0.03)",
            ...revealStyle(stripRevealed, 100),
          }}
        >
          <p
            className="font-serif italic"
            style={{
              fontSize:   "clamp(1rem,2vw,1.3rem)",
              color:      "var(--text-primary)",
              maxWidth:   "340px",
              lineHeight: 1.5,
            }}
          >
            We handle everything you&apos;d worry about. So you can forget that worry exists.
          </p>
          <div className="flex flex-col gap-3">
            {[
              "Vetted transport & stays",
              "Maximum 12 guests per journey",
              "Fair exchange with artisan communities",
            ].map((item) => (
              <p
                key={item}
                className="font-heading flex items-center gap-3"
                style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}
              >
                <span style={{ color: "var(--gold)" }}>✓</span>
                {item}
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}