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
    <section className="juno-section" style={{ backgroundColor: "var(--surface)" }}>
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
              Featured Journeys
            </span>
            <h2
              className="font-serif italic"
              style={{
                fontSize:   "clamp(2rem,4vw,3.5rem)",
                lineHeight: 1.05,
                color:      "var(--text-primary)",
              }}
            >
              Carefully curated,
              <br />
              deeply considered.
            </h2>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {[{ dir: -1, can: canPrev, label: "←" }, { dir: 1, can: canNext, label: "→" }].map(({ dir, can, label }) => (
              <button
                key={label}
                onClick={() => goTo(current + dir)}
                disabled={!can}
                style={{
                  width:      "44px",
                  height:     "44px",
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
            <Link
              href="/trips"
              className="font-heading ml-2"
              style={{
                fontSize:      "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color:         "var(--gold)",
                borderBottom:  "1px solid rgba(201,160,90,0.35)",
                paddingBottom: "2px",
                transition:    "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.5")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              View all →
            </Link>
          </div>
        </div>

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
            {journeys.map((j) => (
              <Link
                href={`/trips/${j.id}`}
                key={j.id}
                className="group flex flex-col"
                style={{
                  flex:        "0 0 clamp(260px,28vw,300px)",
                  border:      "1px solid rgba(255,255,255,0.06)",
                  overflow:    "hidden",
                  background:  "var(--panel)",
                  transition:  "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.3s ease",
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
                      position:           "absolute",
                      inset:              0,
                      backgroundImage:    `url('${j.image}')`,
                      backgroundSize:     "cover",
                      backgroundPosition: "center",
                      transition:         "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)" }} />
                  {/* Tag */}
                  <span
                    className="font-heading absolute"
                    style={{
                      top:           "14px",
                      left:          "14px",
                      fontSize:      "8px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      padding:       "6px 14px",
                      background:    "rgba(8,8,8,0.75)",
                      color:         "var(--gold)",
                      border:        "1px solid rgba(201,160,90,0.25)",
                    }}
                  >
                    {j.tag}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="font-heading" style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--sage)" }}>
                      {j.location}
                    </span>
                    <span className="font-heading" style={{ fontSize: "8px", letterSpacing: "0.15em", color: "var(--text-muted)" }}>
                      {j.duration}
                    </span>
                  </div>
                  <h3 className="font-serif italic" style={{ fontSize: "clamp(1.3rem,2vw,1.6rem)", color: "var(--text-primary)", lineHeight: 1.1 }}>
                    {j.name}
                  </h3>
                  <p className="font-heading" style={{ fontSize: "0.825rem", color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.75 }}>
                    {j.tagline}
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