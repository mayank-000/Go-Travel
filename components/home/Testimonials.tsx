"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote:
      "From the first touch of wet clay, I forgot I had a phone. Two days later I drove home in complete silence — and it was the best drive of my life.",
    name:  "Arjun Mehta",
    role:  "Product Designer, Bangalore",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    quote:
      "I've done yoga retreats, wellness weekends, meditation camps. Nothing came close to what happened when I actually made something with my hands.",
    name:  "Priya Nair",
    role:  "Strategy Consultant, Mumbai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    quote:
      "The group of strangers I arrived with are now some of the most interesting people in my life. That wasn't in the itinerary.",
    name:  "Kabir Singh",
    role:  "Architect, Delhi",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
];

export default function Testimonials() {
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
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="juno-section relative overflow-hidden"
      style={{
        backgroundColor: "var(--panel)",
        paddingTop:      "clamp(5rem,10vw,8rem)",
        paddingBottom:   "clamp(5rem,10vw,8rem)",
      }}
    >
      {/* Background ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0, left: "50%", transform: "translateX(-50%)",
          width: "80vw", height: "60vh",
          background: "radial-gradient(ellipse, rgba(201,160,90,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="juno-container relative z-10">

        {/* ── Header ── */}
        <div
          data-reveal
          className="text-center mb-16 md:mb-20"
        >
          <span
            className="font-heading block mb-5"
            style={{
              fontSize:      "9px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color:         "var(--sage)",
            }}
          >
            Traveler Testimonials
          </span>
          <h2
            className="font-serif italic"
            style={{
              fontSize: "clamp(2rem,3.8vw,3.2rem)",
              color:    "var(--text-primary)",
            }}
          >
            Their words say what ours cannot.
          </h2>
          <p
            className="font-heading mx-auto mt-4"
            style={{
              fontSize:   "0.875rem",
              fontWeight: 300,
              color:      "var(--text-muted)",
              maxWidth:   "480px",
              lineHeight: 1.8,
            }}
          >
            From the first touch of wet clay to the long drive home in silence —
            discover what our guests carry home from their journeys.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-reveal
              className="flex flex-col group relative overflow-hidden"
              style={{
                padding:        "clamp(2rem,3vw,2.5rem) clamp(1.5rem,2.5vw,2rem)",
                border:         "1px solid rgba(201,160,90,0.12)",
                background:     "rgba(255,255,255,0.025)",
                transitionDelay: `${i * 0.1}s`,
                transition:     `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, background 0.4s ease`,
                cursor:         "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(201,160,90,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,160,90,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,160,90,0.12)";
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(201,160,90,0.05) 0%, transparent 70%)",
                  transition: "opacity 0.5s ease",
                }}
              />

              {/* Quote mark */}
              <span
                className="font-serif"
                style={{
                  fontSize:   "3.5rem",
                  lineHeight: 0.8,
                  color:      "var(--gold)",
                  opacity:    0.35,
                  display:    "block",
                  marginBottom: "1.25rem",
                }}
              >
                `&quot;`
              </span>

              {/* Quote */}
              <p
                className="font-heading flex-1"
                style={{
                  fontSize:      "clamp(0.875rem,1.2vw,0.95rem)",
                  lineHeight:    1.85,
                  fontWeight:    300,
                  color:         "rgba(240,236,228,0.82)",
                  marginBottom:  "2rem",
                }}
              >
                {t.quote}
              </p>

              {/* Divider */}
              <div
                className="w-10 h-px mb-5"
                style={{ backgroundColor: "rgba(201,160,90,0.25)" }}
              />

              {/* Attribution */}
              <div className="flex items-center gap-4">
                <div
                  style={{
                    width:              "44px",
                    height:             "44px",
                    borderRadius:       "50%",
                    backgroundImage:    `url('${t.image}')`,
                    backgroundSize:     "cover",
                    backgroundPosition: "center",
                    border:             "1px solid rgba(201,160,90,0.2)",
                    flexShrink:         0,
                  }}
                />
                <div>
                  <p
                    className="font-heading"
                    style={{
                      fontSize:   "0.875rem",
                      fontWeight: 500,
                      color:      "var(--text-primary)",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-heading"
                    style={{
                      fontSize:   "0.75rem",
                      color:      "var(--text-muted)",
                      marginTop:  "2px",
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}