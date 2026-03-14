"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

const journeys = [
  {
    id: 1,
    name: "The Clay Coast",
    location: "Oaxaca, Mexico",
    tagline: "Fire, earth, and ancient hands. A week shaping clay with master potters in the highlands.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&q=80",
    tag: "Craft",
    duration: "7 days",
  },
  {
    id: 2,
    name: "Salt & Swell",
    location: "Basque Country, Spain",
    tagline: "Surfing the Atlantic and cooking over open fire with Basque chefs in one of Europe's great food cultures.",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80",
    tag: "Sea",
    duration: "8 days",
  },
  {
    id: 3,
    name: "High Atlas Immersion",
    location: "Morocco",
    tagline: "Weaving, trekking, and sharing meals in Berber mountain villages far above the noise of the medina.",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80",
    tag: "Culture",
    duration: "9 days",
  },
  {
    id: 4,
    name: "Tea & Timber",
    location: "Himachal Pradesh, India",
    tagline: "A week in a forest cabin learning natural dyeing, woodwork, and the art of unhurried mornings.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
    tag: "Retreat",
    duration: "6 days",
  },
  {
    id: 5,
    name: "Salt Pan Evenings",
    location: "Kutch, Gujarat",
    tagline: "India's most surreal landscape at its most quiet season. Craft, stars, and community fire.",
    image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=900&q=80",
    tag: "Night",
    duration: "7 days",
  },
];

export default function FeaturedJourneys() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev]   = useState(false);
  const [canNext, setCanNext]   = useState(true);
  const [current, setCurrent]   = useState(0);

  const updateButtons = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    // work out which card is most visible
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
    // Native smooth scroll — no snap-mandatory fighting JS
    el.scrollTo({ left: idx * (cardW + 28), behavior: "smooth" });
  };

  return (
    <section
      className="juno-section"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="juno-container">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span
              className="font-heading text-[9px] tracking-[0.38em] uppercase block mb-5"
              style={{ color: "var(--sage)" }}
            >
              Featured Journeys
            </span>
            <h2
              className="font-serif italic leading-[1.06]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--navy)" }}
            >
              Carefully curated,
              <br />
              deeply considered.
            </h2>
          </div>

          {/* Arrow controls + View all — all in one row */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => goTo(current - 1)}
              disabled={!canPrev}
              aria-label="Previous journey"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: `1px solid ${canPrev ? "var(--ochre)" : "rgba(42,77,106,0.15)"}`,
                background: "transparent",
                color: canPrev ? "var(--navy)" : "rgba(61,61,61,0.25)",
                cursor: canPrev ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                transition: "all 0.25s ease",
                flexShrink: 0,
              }}
            >
              ←
            </button>
            <button
              onClick={() => goTo(current + 1)}
              disabled={!canNext}
              aria-label="Next journey"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: `1px solid ${canNext ? "var(--ochre)" : "rgba(42,77,106,0.15)"}`,
                background: "transparent",
                color: canNext ? "var(--navy)" : "rgba(61,61,61,0.25)",
                cursor: canNext ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                transition: "all 0.25s ease",
                flexShrink: 0,
              }}
            >
              →
            </button>

            <Link
              href="/trips"
              className="font-heading text-[11px] tracking-[0.2em] uppercase border-b pb-1 transition-opacity duration-300 hover:opacity-50 ml-2"
              style={{ color: "var(--navy)", borderColor: "var(--border-accent)" }}
            >
              View all journeys →
            </Link>
          </div>
        </div>

        {/* ── Carousel ──
            Key: NO snap-mandatory (it fights smooth JS scrollTo),
            scroll-behavior comes from the JS scrollTo call itself.       */}
        <div className="relative -mx-5 md:mx-0">
          <div
            ref={carouselRef}
            className="no-scrollbar"
            style={{
              display: "flex",
              gap: "1.75rem",
              overflowX: "auto",
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
              paddingBottom: "6px",
              /* intentionally no scroll-snap — JS handles positioning */
            }}
          >
            {journeys.map((journey) => (
              <Link
                href={`/trips/${journey.id}`}
                key={journey.id}
                className="group flex flex-col"
                style={{
                  flex: "0 0 clamp(260px, 28vw, 320px)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--card-radius)",
                  overflow: "hidden",
                  background: "var(--warm-white, #FDFAF4)",
                  textDecoration: "none",
                  transition: "transform 0.35s ease, box-shadow 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(27,58,82,0.11)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5" }}>
                  <div
                    className="group-hover:scale-[1.05]"
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url('${journey.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform 0.7s ease",
                    }}
                  />
                  {/* gradient */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(27,58,82,0.52) 0%, transparent 58%)",
                      transition: "opacity 0.4s",
                    }}
                  />
                  {/* Tag pill */}
                  <span
                    className="font-heading"
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      fontSize: "8px",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      padding: "7px 14px",
                      background: "rgba(247,243,234,0.95)",
                      color: "var(--navy)",
                    }}
                  >
                    {journey.tag}
                  </span>
                </div>

                {/* Body */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "2rem 2.2rem 2.2rem",
                    flex: 1,
                    borderTop: "1px solid var(--border-subtle)",
                    background: "var(--cream)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      className="font-heading"
                      style={{ fontSize: "8.5px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--sage)" }}
                    >
                      {journey.location}
                    </span>
                    <span
                      className="font-heading"
                      style={{ fontSize: "8.5px", letterSpacing: "0.15em", color: "var(--sand)" }}
                    >
                      {journey.duration}
                    </span>
                  </div>

                  <h3
                    className="font-serif italic"
                    style={{ fontSize: "clamp(1.35rem, 2vw, 1.7rem)", color: "var(--navy)", lineHeight: 1.1 }}
                  >
                    {journey.name}
                  </h3>

                  <p
                    className="font-heading"
                    style={{ fontSize: "0.875rem", color: "rgba(44,44,44,0.68)", fontWeight: 300, lineHeight: 1.7 }}
                  >
                    {journey.tagline}
                  </p>


                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}