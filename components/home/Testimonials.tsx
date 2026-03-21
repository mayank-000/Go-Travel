"use client";

import { useEffect, useRef, useState } from "react";

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="juno-section relative overflow-hidden"
      style={{
        backgroundColor: "var(--surface)",
        paddingTop:      "clamp(5rem,10vw,8rem)",
        paddingBottom:   "clamp(5rem,10vw,8rem)",
      }}
    >
      {/* Background ambient glow - scroll reactive */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: `${-10 + scrollProgress * 20}%`, 
          left: "50%", 
          transform: "translateX(-50%)",
          width: "80vw", 
          height: "60vh",
          background: "radial-gradient(ellipse, rgba(201,160,90,0.08) 0%, transparent 65%)",
          opacity: scrollProgress,
          transition: "top 0.3s ease, opacity 0.3s ease",
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
              color:         "var(--ochre)",
              fontWeight:    600,
            }}
          >
            Traveler Testimonials
          </span>
          <h2
            className="font-serif italic"
            style={{
              fontSize: "clamp(2rem,3.8vw,3.2rem)",
              color:    "var(--charcoal)",
            }}
          >
            Their words say what ours cannot.
          </h2>
          <p
            className="font-heading mx-auto mt-4"
            style={{
              fontSize:   "clamp(0.9rem,1.3vw,1rem)",
              fontWeight: 300,
              color:      "var(--charcoal)",
              opacity:    0.65,
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
                border:         "1.5px solid rgba(139,101,63,0.15)",
                background:     "var(--cream)",
                transitionDelay: `${i * 0.1}s`,
                transition:     `all 0.6s cubic-bezier(0.16,1,0.3,1)`,
                cursor:         "default",
                transform:      hoveredIndex === i ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                boxShadow:      hoveredIndex === i ? "0 30px 80px rgba(139,101,63,0.15)" : "0 10px 30px rgba(139,101,63,0.06)",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(201,160,90,0.08) 0%, transparent 70%)",
                  opacity:    hoveredIndex === i ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              />

              {/* Quote mark */}
              <span
                className="font-serif relative z-10"
                style={{
                  fontSize:   "3.5rem",
                  lineHeight: 0.8,
                  color:      "var(--ochre)",
                  opacity:    0.4,
                  display:    "block",
                  marginBottom: "1.25rem",
                  transform:  hoveredIndex === i ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                &quot;
              </span>

              {/* Quote */}
              <p
                className="font-heading flex-1 relative z-10"
                style={{
                  fontSize:      "clamp(0.95rem,1.2vw,1rem)",
                  lineHeight:    1.85,
                  fontWeight:    300,
                  color:         "var(--charcoal)",
                  opacity:       0.85,
                  marginBottom:  "2rem",
                }}
              >
                {t.quote}
              </p>

              {/* Divider */}
              <div
                className="h-px mb-5 relative z-10"
                style={{ 
                  backgroundColor: "rgba(139,101,63,0.25)",
                  width: hoveredIndex === i ? "60px" : "40px",
                  transition: "width 0.4s ease",
                }}
              />

              {/* Attribution */}
              <div className="flex items-center gap-4 relative z-10">
                <div
                  style={{
                    width:              "48px",
                    height:             "48px",
                    borderRadius:       "50%",
                    backgroundImage:    `url('${t.image}')`,
                    backgroundSize:     "cover",
                    backgroundPosition: "center",
                    border:             "2px solid rgba(139,101,63,0.2)",
                    flexShrink:         0,
                    transform:          hoveredIndex === i ? "scale(1.05)" : "scale(1)",
                    transition:         "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
                <div>
                  <p
                    className="font-heading"
                    style={{
                      fontSize:   "0.95rem",
                      fontWeight: 600,
                      color:      "var(--charcoal)",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-heading"
                    style={{
                      fontSize:   "0.8rem",
                      color:      "var(--charcoal)",
                      opacity:    0.5,
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

        {/* Bottom decorative */}
        <div 
          className="flex items-center justify-center gap-4 mt-16 opacity-25"
          data-reveal
        >
          <div className="w-12 h-px bg-ochre" />
          <span className="font-serif text-ochre text-xl">✦</span>
          <div className="w-12 h-px bg-ochre" />
        </div>

      </div>
    </section>
  );
}