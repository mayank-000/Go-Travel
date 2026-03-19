"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

const journeys = [
  {
    id: 1,
    name: "The Clay Coast",
    location: "Oaxaca, Mexico",
    // Unique: focuses on the sensory & time-slowing nature of craft
    tagline: "Your hands remember things your mind has forgotten. Seven days with master potters in the Oaxacan highlands to find out what they are.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&q=80",
    tag: "Craft",
    duration: "7 days",
  },
  {
    id: 2,
    name: "Salt & Swell",
    location: "Basque Country, Spain",
    // Unique: focuses on the contrast — wild ocean, civilised table
    tagline: "The Atlantic is brutal before breakfast. The txakoli is cold by evening. In between: a week of surf, fire, and one of the world's great food cultures.",
    image: "/beachP3.jpg",
    tag: "Sea",
    duration: "8 days",
  },
  {
    id: 3,
    name: "High Atlas Immersion",
    location: "Morocco",
    // Unique: focuses on the privilege of being welcomed
    tagline: "These villages don't appear on itineraries. Berber families open their homes, their looms, and their tables to a group of eight. You won't find this elsewhere.",
    image: "/trekkingWibeP4.jpg",
    tag: "Culture",
    duration: "9 days",
  },
  {
    id: 4,
    name: "Tea & Timber",
    location: "Himachal Pradesh, India",
    // Unique: focuses on pace and the craft of unhurried time
    tagline: "A forest cabin at altitude. Days shaped by woodwork, natural dyeing, and the discipline of doing one thing slowly. No itinerary. No rush. Just craft and cold air.",
    image: "/mountainP1.jpg",
    tag: "Retreat",
    duration: "6 days",
  },
  {
    id: 5,
    name: "Salt Pan Evenings",
    location: "Kutch, Gujarat",
    // Unique: focuses on scale, silence, and the night sky
    tagline: "India flattens out completely here. The sky takes over. Winter in the Rann means near-silence, a community of makers, and stars so dense they cast shadows.",
    image: "/desertP2.jpg",
    tag: "Night",
    duration: "7 days",
  },
];

export default function FeaturedJourneys() {
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
    <section className="juno-section" style={{ backgroundColor: "var(--cream)" }}>
      <div className="juno-container">

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

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => goTo(current - 1)}
              disabled={!canPrev}
              aria-label="Previous journey"
              style={{
                width:          "44px", height: "44px", borderRadius: "50%",
                border:         `1px solid ${canPrev ? "var(--ochre)" : "rgba(42,77,106,0.15)"}`,
                background:     "transparent",
                color:          canPrev ? "var(--navy)" : "rgba(61,61,61,0.25)",
                cursor:         canPrev ? "pointer" : "default",
                display:        "flex", alignItems: "center", justifyContent: "center",
                fontSize:       "1rem", transition: "all 0.25s ease", flexShrink: 0,
              }}
            >←</button>
            <button
              onClick={() => goTo(current + 1)}
              disabled={!canNext}
              aria-label="Next journey"
              style={{
                width:          "44px", height: "44px", borderRadius: "50%",
                border:         `1px solid ${canNext ? "var(--ochre)" : "rgba(42,77,106,0.15)"}`,
                background:     "transparent",
                color:          canNext ? "var(--navy)" : "rgba(61,61,61,0.25)",
                cursor:         canNext ? "pointer" : "default",
                display:        "flex", alignItems: "center", justifyContent: "center",
                fontSize:       "1rem", transition: "all 0.25s ease", flexShrink: 0,
              }}
            >→</button>
            <Link
              href="/trips"
              className="font-heading text-[11px] tracking-[0.2em] uppercase border-b pb-1 transition-opacity duration-300 hover:opacity-50 ml-2"
              style={{ color: "var(--navy)", borderColor: "var(--border-accent)" }}
            >
              View all journeys →
            </Link>
          </div>
        </div>

        <div className="relative -mx-5 md:mx-0">
          <div
            ref={carouselRef}
            className="no-scrollbar"
            style={{ display: "flex", gap: "1.75rem", overflowX: "auto", paddingLeft: "1.25rem", paddingRight: "1.25rem", paddingBottom: "6px" }}
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
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5" }}>
                  <div
                    className="group-hover:scale-[1.05]"
                    style={{
                      position: "absolute", inset: 0,
                      backgroundImage: `url('${journey.image}')`,
                      backgroundSize: "cover", backgroundPosition: "center",
                      transition: "transform 0.7s ease",
                    }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(27,58,82,0.52) 0%, transparent 58%)", transition: "opacity 0.4s" }} />
                  <span
                    className="font-heading"
                    style={{ position: "absolute", top: "16px", left: "16px", fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", padding: "7px 14px", background: "rgba(247,243,234,0.95)", color: "var(--navy)" }}
                  >
                    {journey.tag}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem 2.2rem 2.2rem", flex: 1, borderTop: "1px solid var(--border-subtle)", background: "var(--cream)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="font-heading" style={{ fontSize: "8.5px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--sage)" }}>
                      {journey.location}
                    </span>
                    <span className="font-heading" style={{ fontSize: "8.5px", letterSpacing: "0.15em", color: "var(--sand)" }}>
                      {journey.duration}
                    </span>
                  </div>
                  <h3 className="font-serif italic" style={{ fontSize: "clamp(1.35rem, 2vw, 1.7rem)", color: "var(--navy)", lineHeight: 1.1 }}>
                    {journey.name}
                  </h3>
                  <p className="font-heading" style={{ fontSize: "0.875rem", color: "rgba(44,44,44,0.68)", fontWeight: 300, lineHeight: 1.7 }}>
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