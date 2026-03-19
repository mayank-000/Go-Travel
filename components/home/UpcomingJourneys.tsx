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
    image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=700&q=80",
    // Unique: short, punchy — focused on the personal transformation
    description: "Two days. A wheel. Clay that won't cooperate until it does. You'll leave with something you made and a silence you didn't expect to find.",
  },
  {
    id: 2,
    title: "Salt & Swell",
    meta: "Surf & Fire, Basque Country",
    location: "Basque Country, Spain",
    when: "Waitlist Open",
    tag: "Sea",
    image: "/beachP3.jpg",
    // Unique: focused on the simplicity & rhythm of the days
    description: "Eight people. One coast. Dawn paddles, open-fire dinners, and evenings that stretch as long as you'll let them. Waitlist is moving fast.",
  },
  {
    id: 3,
    title: "High Atlas Immersion",
    meta: "Weaving & Walking, Morocco",
    location: "High Atlas, Morocco",
    when: "2026 · Spring",
    tag: "Culture",
    image: "/trekkingWibeP4.jpg",
    // Unique: focused on access — the rarity of the experience
    description: "Berber mountain villages that take a morning's walk to reach. Families who have woven these patterns for generations. Spring makes the passes passable.",
  },
  {
    id: 4,
    title: "Tea & Timber",
    meta: "Forest Cabin Week, Himachal",
    location: "Himachal Pradesh, India",
    when: "Coming Soon",
    tag: "Retreat",
    image: "/mountainP1.jpg",
    // Unique: focused on sensory detail & rhythm of the days
    description: "Cedar smoke at 6am. Frost on the window. Days built around woodwork, natural dye baths, and tea that actually tastes like where it grew.",
  },
  {
    id: 5,
    title: "Salt Pan Evenings",
    meta: "Craft & Stars, Kutch",
    location: "Kutch, Gujarat",
    when: "2026 · Winter",
    tag: "Night",
    image: "/desertP2.jpg",
    // Unique: focused on the strangeness of the place itself
    description: "The Rann in December is white, flat, and completely still. By day you make things. By night, the sky is the only thing that moves.",
  },
];

const SECTION_BG  = "#EDE5D5";
const CARD_BG     = "#F5EFE3";
const CARD_BORDER = "rgba(180,140,90,0.22)";

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
    <section className="juno-section" style={{ backgroundColor: SECTION_BG }}>
      <div className="juno-container">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="font-heading text-[9px] tracking-[0.38em] uppercase block mb-5" style={{ color: "var(--sage)" }}>
              Upcoming Journeys
            </span>
            <h2 className="font-serif italic leading-[1.06]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--navy)" }}>
              A few seats.
              <br />
              Fewer chances to regret
              <br className="hidden md:block" /> not taking one.
            </h2>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => goTo(current - 1)} disabled={!canPrev} aria-label="Previous"
              style={{ width: "44px", height: "44px", borderRadius: "50%", border: `1px solid ${canPrev ? "var(--ochre)" : "rgba(42,77,106,0.15)"}`, background: "transparent", color: canPrev ? "var(--navy)" : "rgba(61,61,61,0.25)", cursor: canPrev ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", transition: "all 0.25s ease", flexShrink: 0 }}
            >←</button>
            <button
              onClick={() => goTo(current + 1)} disabled={!canNext} aria-label="Next"
              style={{ width: "44px", height: "44px", borderRadius: "50%", border: `1px solid ${canNext ? "var(--ochre)" : "rgba(42,77,106,0.15)"}`, background: "transparent", color: canNext ? "var(--navy)" : "rgba(61,61,61,0.25)", cursor: canNext ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", transition: "all 0.25s ease", flexShrink: 0 }}
            >→</button>
          </div>
        </div>

        <div className="relative -mx-5 md:mx-0">
          <div
            ref={carouselRef}
            className="no-scrollbar"
            style={{ display: "flex", gap: "1.75rem", overflowX: "auto", paddingLeft: "1.25rem", paddingRight: "1.25rem", paddingBottom: "6px" }}
          >
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="group flex flex-col"
                style={{ flex: "0 0 clamp(260px, 28vw, 320px)", border: `1px solid ${CARD_BORDER}`, borderRadius: "var(--card-radius)", overflow: "hidden", background: CARD_BG, cursor: "pointer", transition: "transform 0.35s ease, box-shadow 0.35s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(100,70,20,0.1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5" }}>
                  <div
                    className="group-hover:scale-[1.05]"
                    style={{ position: "absolute", inset: 0, backgroundImage: `url('${trip.image}')`, backgroundSize: "cover", backgroundPosition: "center", transition: "transform 0.7s ease" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(27,58,82,0.52) 0%, transparent 58%)" }} />
                  <span className="font-heading" style={{ position: "absolute", top: "16px", left: "16px", fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", padding: "7px 14px", background: "rgba(240,232,216,0.95)", color: "var(--navy)" }}>
                    {trip.tag}
                  </span>
                  <span className="font-heading" style={{ position: "absolute", bottom: "16px", left: "16px", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 12px", background: "rgba(27,58,82,0.82)", color: "var(--sand)" }}>
                    {trip.when}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem 2.2rem 2.2rem", flex: 1, borderTop: `1px solid ${CARD_BORDER}`, background: CARD_BG }}>
                  <span className="font-heading" style={{ fontSize: "8.5px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--sage)" }}>
                    {trip.location}
                  </span>
                  <h3 className="font-serif italic" style={{ fontSize: "clamp(1.35rem, 2vw, 1.7rem)", color: "var(--navy)", lineHeight: 1.1 }}>
                    {trip.title}
                  </h3>
                  <p className="font-heading" style={{ fontSize: "0.875rem", color: "rgba(44,44,44,0.68)", fontWeight: 300, lineHeight: 1.7 }}>
                    {trip.description}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "auto", paddingTop: "1.25rem", borderTop: `1px solid ${CARD_BORDER}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--ochre)", flexShrink: 0 }} />
                      <span className="font-heading" style={{ fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)" }}>
                        Seats are limited.
                      </span>
                    </div>
                    <span className="font-heading" style={{ fontSize: "9.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--navy)", borderBottom: `1px solid rgba(180,140,90,0.4)`, paddingBottom: "3px", width: "fit-content", cursor: "pointer" }}>
                      Request Invite →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-16 md:mt-20 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12"
          style={{ background: "rgba(42,77,106,0.06)", border: "1px solid rgba(42,77,106,0.1)", borderRadius: "var(--card-radius)" }}
        >
          <p className="font-serif italic" style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)", color: "var(--navy)", maxWidth: "340px", lineHeight: 1.45 }}>
            We handle everything you&apos;d worry about. So you can forget that worry exists.
          </p>
          <div className="flex flex-col gap-3">
            {["Vetted transport & stays", "Maximum 12 guests per journey", "Fair exchange with artisan communities"].map((item) => (
              <p key={item} className="font-heading text-sm flex items-center gap-3" style={{ color: "rgba(44,44,44,0.65)" }}>
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