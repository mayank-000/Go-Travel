"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const trips = [
  {
    id: 1,
    title: "Clay & Quiet",
    meta: "A Potter's Weekend, Khurja",
    location: "Khurja, Uttar Pradesh",
    when: "Coming Soon",
    tag: "Craft",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=700&q=80",
    description:
      "You'll wake up before the kiln does. Spend two days learning what your hands are actually capable of. Leave with something you shaped — and a quiet you didn't expect.",
  },
  {
    id: 2,
    title: "Salt & Swell",
    meta: "Surf & Fire, Basque Country",
    location: "Basque Country, Spain",
    when: "Waitlist Open",
    tag: "Sea",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=700&q=80",
    description:
      "Eight people, one coast. Surf the Atlantic by day, cook over open fire by night.",
  },
  {
    id: 3,
    title: "High Atlas Immersion",
    meta: "Weaving & Walking, Morocco",
    location: "High Atlas, Morocco",
    when: "2026 · Spring",
    tag: "Culture",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=80",
    description:
      "Sit at the table of Berber families who have called these mountains home for centuries.",
  },
  {
    id: 4,
    title: "Tea & Timber",
    meta: "Forest Cabin Week, Himachal",
    location: "Himachal Pradesh, India",
    when: "Coming Soon",
    tag: "Retreat",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80",
    description:
      "Cedar smoke, cold mornings, and days that begin at dawn and end when the stars say so.",
  },
  {
    id: 5,
    title: "Salt Pan Evenings",
    meta: "Craft & Stars, Kutch",
    location: "Kutch, Gujarat",
    when: "2026 · Winter",
    tag: "Night",
    image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=700&q=80",
    description:
      "India's most surreal landscape at its most quiet season. Craft, community, and open sky.",
  },
];

/* Warm cream tones — same family as --cream but richer/darker */
const SECTION_BG  = "#EDE5D5";   /* warm parchment — clearly distinct from cream */
const CARD_BG     = "#F5EFE3";   /* slightly lighter warm card body              */
const CARD_BORDER = "rgba(180,140,90,0.22)"; /* warm ochre-tinted border         */

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
    setCurrent(Math.round(el.scrollLeft / (cardW + 28)));
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
    el.scrollTo({ left: idx * (cardW + 28), behavior: "smooth" });
  };

  return (
    <section
      className="juno-section"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="juno-container">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span
              className="font-heading text-[9px] tracking-[0.38em] uppercase block mb-5"
              style={{ color: "var(--sage)" }}
            >
              Upcoming Journeys
            </span>
            <h2
              className="font-serif italic leading-[1.06]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--navy)" }}
            >
              A few seats.
              <br />
              Fewer chances to regret
              <br className="hidden md:block" /> not taking one.
            </h2>
          </div>

          {/* Arrow controls */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => goTo(current - 1)}
              disabled={!canPrev}
              aria-label="Previous"
              style={{
                width:        "44px",
                height:       "44px",
                borderRadius: "50%",
                border:       `1px solid ${canPrev ? "var(--ochre)" : "rgba(42,77,106,0.15)"}`,
                background:   "transparent",
                color:        canPrev ? "var(--navy)" : "rgba(61,61,61,0.25)",
                cursor:       canPrev ? "pointer" : "default",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                fontSize:     "1rem",
                transition:   "all 0.25s ease",
                flexShrink:   0,
              }}
            >
              ←
            </button>
            <button
              onClick={() => goTo(current + 1)}
              disabled={!canNext}
              aria-label="Next"
              style={{
                width:        "44px",
                height:       "44px",
                borderRadius: "50%",
                border:       `1px solid ${canNext ? "var(--ochre)" : "rgba(42,77,106,0.15)"}`,
                background:   "transparent",
                color:        canNext ? "var(--navy)" : "rgba(61,61,61,0.25)",
                cursor:       canNext ? "pointer" : "default",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                fontSize:     "1rem",
                transition:   "all 0.25s ease",
                flexShrink:   0,
              }}
            >
              →
            </button>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className="relative -mx-5 md:mx-0">
          <div
            ref={carouselRef}
            className="no-scrollbar"
            style={{
              display:      "flex",
              gap:          "1.75rem",
              overflowX:    "auto",
              paddingLeft:  "1.25rem",
              paddingRight: "1.25rem",
              paddingBottom: "6px",
            }}
          >
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="group flex flex-col"
                style={{
                  flex:         "0 0 clamp(260px, 28vw, 320px)",
                  border:       `1px solid ${CARD_BORDER}`,
                  borderRadius: "var(--card-radius)",
                  overflow:     "hidden",
                  background:   CARD_BG,
                  cursor:       "pointer",
                  transition:   "transform 0.35s ease, box-shadow 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 16px 48px rgba(100,70,20,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* ── Image — identical structure to FeaturedJourneys ── */}
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5" }}>
                  <div
                    className="group-hover:scale-[1.05]"
                    style={{
                      position:           "absolute",
                      inset:              0,
                      backgroundImage:    `url('${trip.image}')`,
                      backgroundSize:     "cover",
                      backgroundPosition: "center",
                      transition:         "transform 0.7s ease",
                    }}
                  />
                  {/* gradient */}
                  <div
                    style={{
                      position:   "absolute",
                      inset:      0,
                      background: "linear-gradient(to top, rgba(27,58,82,0.52) 0%, transparent 58%)",
                    }}
                  />
                  {/* Tag pill */}
                  <span
                    className="font-heading"
                    style={{
                      position:      "absolute",
                      top:           "16px",
                      left:          "16px",
                      fontSize:      "8px",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      padding:       "7px 14px",
                      background:    "rgba(240,232,216,0.95)",
                      color:         "var(--navy)",
                    }}
                  >
                    {trip.tag}
                  </span>
                  {/* When badge — bottom left, warm navy bg */}
                  <span
                    className="font-heading"
                    style={{
                      position:      "absolute",
                      bottom:        "16px",
                      left:          "16px",
                      fontSize:      "8px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      padding:       "6px 12px",
                      background:    "rgba(27,58,82,0.82)",
                      color:         "var(--sand)",
                    }}
                  >
                    {trip.when}
                  </span>
                </div>

                {/* ── Body — same layout as FeaturedJourneys ── */}
                <div
                  style={{
                    display:       "flex",
                    flexDirection: "column",
                    gap:           "1rem",
                    padding:       "2rem 2.2rem 2.2rem",
                    flex:          1,
                    borderTop:     `1px solid ${CARD_BORDER}`,
                    background:    CARD_BG,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      className="font-heading"
                      style={{
                        fontSize:      "8.5px",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color:         "var(--sage)",
                      }}
                    >
                      {trip.location}
                    </span>
                  </div>

                  <h3
                    className="font-serif italic"
                    style={{
                      fontSize:   "clamp(1.35rem, 2vw, 1.7rem)",
                      color:      "var(--navy)",
                      lineHeight: 1.1,
                    }}
                  >
                    {trip.title}
                  </h3>

                  <p
                    className="font-heading"
                    style={{
                      fontSize:   "0.875rem",
                      color:      "rgba(44,44,44,0.68)",
                      fontWeight: 300,
                      lineHeight: 1.7,
                    }}
                  >
                    {trip.description}
                  </p>

                  {/* Seats are limited + Request Invite */}
                  <div
                    style={{
                      display:       "flex",
                      flexDirection: "column",
                      gap:           "0.75rem",
                      marginTop:     "auto",
                      paddingTop:    "1.25rem",
                      borderTop:     `1px solid ${CARD_BORDER}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          width:        "6px",
                          height:       "6px",
                          borderRadius: "50%",
                          background:   "var(--ochre)",
                          flexShrink:   0,
                        }}
                      />
                      <span
                        className="font-heading"
                        style={{
                          fontSize:      "9.5px",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color:         "var(--ochre)",
                        }}
                      >
                        Seats are limited.
                      </span>
                    </div>

                    <span
                      className="font-heading"
                      style={{
                        fontSize:      "9.5px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color:         "var(--navy)",
                        borderBottom:  `1px solid rgba(180,140,90,0.4)`,
                        paddingBottom: "3px",
                        width:         "fit-content",
                        cursor:        "pointer",
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

        {/* ── Promise strip ── */}
        <div
          className="mt-16 md:mt-20 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12"
          style={{
            background:   "rgba(42,77,106,0.06)",
            border:       "1px solid rgba(42,77,106,0.1)",
            borderRadius: "var(--card-radius)",
          }}
        >
          <p
            className="font-serif italic"
            style={{
              fontSize:   "clamp(1rem, 2vw, 1.35rem)",
              color:      "var(--navy)",
              maxWidth:   "340px",
              lineHeight: 1.45,
            }}
          >
            We handle everything you&apos;d worry about. So you can forget that worry
            exists.
          </p>
          <div className="flex flex-col gap-3">
            {[
              "Vetted transport & stays",
              "Maximum 12 guests per journey",
              "Fair exchange with artisan communities",
            ].map((item) => (
              <p
                key={item}
                className="font-heading text-sm flex items-center gap-3"
                style={{ color: "rgba(44,44,44,0.65)" }}
              >
                <span style={{ color: "var(--ochre)" }}>✓</span>
                {item}
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}