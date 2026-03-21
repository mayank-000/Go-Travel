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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [current, setCurrent] = useState(0);

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

  const goTo = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardW = (el.children[0] as HTMLElement)?.offsetWidth ?? 0;
    el.scrollTo({ left: idx * (cardW + 24), behavior: "smooth" });
  };

  return (
    <section className="juno-section" style={{ backgroundColor: "var(--panel)" }}>
      <div className="juno-container">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span
              className="font-heading block mb-5"
              style={{
                fontSize:      "9px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color:         "var(--sage)",
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

          <div className="flex items-center gap-4 shrink-0">
            {[{ dir: -1, can: canPrev, label: "←" }, { dir: 1, can: canNext, label: "→" }].map(({ dir, can, label }) => (
              <button
                key={label}
                onClick={() => goTo(current + dir)}
                disabled={!can}
                style={{
                  width:      "44px", height: "44px",
                  borderRadius: "50%",
                  border:     `1px solid ${can ? "var(--gold)" : "rgba(255,255,255,0.08)"}`,
                  background: can ? "rgba(201,160,90,0.08)" : "transparent",
                  color:      can ? "var(--gold)" : "rgba(255,255,255,0.2)",
                  cursor:     can ? "none" : "default",
                  display:    "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize:   "1rem",
                  transition: "all 0.25s ease",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative -mx-5 md:mx-0">
          <div
            ref={carouselRef}
            className="no-scrollbar"
            style={{
              display:      "flex",
              gap:          "1.5rem",
              overflowX:    "auto",
              paddingLeft:  "1.25rem",
              paddingRight: "1.25rem",
              paddingBottom: "8px",
            }}
          >
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="group flex flex-col"
                style={{
                  flex:       "0 0 clamp(260px,28vw,300px)",
                  border:     "1px solid rgba(255,255,255,0.06)",
                  overflow:   "hidden",
                  background: "var(--surface)",
                  cursor:     "none",
                  transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform   = "translateY(-8px)";
                  (e.currentTarget as HTMLElement).style.boxShadow   = "0 32px 80px rgba(0,0,0,0.6)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,160,90,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform   = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow   = "none";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5" }}>
                  <div
                    className="group-hover:scale-[1.06]"
                    style={{
                      position:           "absolute", inset: 0,
                      backgroundImage:    `url('${trip.image}')`,
                      backgroundSize:     "cover",
                      backgroundPosition: "center",
                      transition:         "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)" }} />
                  <span
                    className="font-heading absolute"
                    style={{
                      top: "14px", left: "14px",
                      fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase",
                      padding: "6px 14px",
                      background: "rgba(8,8,8,0.75)",
                      color: "var(--gold)",
                      border: "1px solid rgba(201,160,90,0.25)",
                    }}
                  >
                    {trip.tag}
                  </span>
                  <span
                    className="font-heading absolute"
                    style={{
                      bottom: "14px", left: "14px",
                      fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase",
                      padding: "5px 12px",
                      background: "rgba(8,8,8,0.8)",
                      color: "rgba(240,236,228,0.7)",
                    }}
                  >
                    {trip.when}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="font-heading" style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--sage)" }}>
                    {trip.location}
                  </span>
                  <h3 className="font-serif italic" style={{ fontSize: "clamp(1.3rem,2vw,1.6rem)", color: "var(--text-primary)", lineHeight: 1.1 }}>
                    {trip.title}
                  </h3>
                  <p className="font-heading" style={{ fontSize: "0.825rem", color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.75 }}>
                    {trip.description}
                  </p>

                  <div style={{ marginTop: "auto", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <span
                      className="font-heading"
                      style={{
                        fontSize:      "9px",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color:         "var(--gold)",
                        borderBottom:  "1px solid rgba(201,160,90,0.35)",
                        paddingBottom: "2px",
                      }}
                    >
                      Request Invite →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom assurance strip */}
        <div
          className="mt-14 md:mt-16 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{
            border:     "1px solid rgba(201,160,90,0.1)",
            background: "rgba(201,160,90,0.03)",
          }}
        >
          <p
            className="font-serif italic"
            style={{
              fontSize:  "clamp(1rem,2vw,1.3rem)",
              color:     "var(--text-primary)",
              maxWidth:  "340px",
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