"use client";

import { useEffect, useRef, useState } from "react";

export default function NarrativeBlock() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

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
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Parallax effect for images
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setScrollOffset(scrollProgress * 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="juno-section overflow-hidden relative"
      style={{ backgroundColor: "var(--surface)" }}
    >
      {/* Top border accent */}
      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,160,90,0.25), transparent)", marginBottom: "0" }} />

      {/* Subtle animated background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(ellipse at 70% 30%, rgba(201,160,90,0.04) 0%, transparent 50%)`,
        }}
      />

      <div className="juno-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Text ── */}
          <div
            data-reveal
            className="flex flex-col gap-7 max-w-xl"
          >
            <span
              className="font-heading"
              style={{
                fontSize:      "9px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color:         "var(--ochre)",
                fontWeight:    600,
              }}
            >
              Who We Are
            </span>

            <h2
              className="font-serif italic"
              style={{
                fontSize:   "clamp(2.2rem, 4vw, 3.8rem)",
                lineHeight: 1.06,
                color:      "var(--charcoal)",
              }}
            >
              We are not a
              <br />
              travel agency.
            </h2>

            <div 
              className="w-12 h-px" 
              style={{ 
                backgroundColor: "var(--ochre)", 
                boxShadow: "0 0 10px rgba(201,160,90,0.3)",
              }} 
            />

            <p
              className="font-heading"
              style={{
                fontSize:   "clamp(0.95rem,1.4vw,1.05rem)",
                fontWeight: 300,
                color:      "var(--charcoal)",
                lineHeight: 1.8,
                opacity:    0.8,
              }}
            >
              JUNO was born from a belief that modern life has severed us from
              the things that make us feel most alive — making, moving, sharing,
              and being present with others who care.
            </p>

            <p
              className="font-heading"
              style={{
                fontSize:   "clamp(0.95rem,1.4vw,1.05rem)",
                fontWeight: 300,
                color:      "var(--charcoal)",
                lineHeight: 1.8,
                opacity:    0.8,
              }}
            >
              We curate small-group journeys that place culture, craft, and
              connection at the centre. Every detail is considered. Every
              experience is earned.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              {[
                "8 people maximum per journey",
                "Embedded with local artisans and communities",
                "No tourist infrastructure — only lived experience",
              ].map((point, idx) => (
                <div 
                  key={point} 
                  className="flex items-start gap-4 group"
                  style={{
                    transform: "translateX(0)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
                >
                  <span
                    style={{
                      width:           "20px",
                      height:          "20px",
                      borderRadius:    "50%",
                      border:          "1.5px solid var(--ochre)",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      flexShrink:      0,
                      marginTop:       "2px",
                      color:           "var(--ochre)",
                      fontSize:        "10px",
                      fontWeight:      600,
                      background:      "rgba(201,160,90,0.08)",
                      transition:      "all 0.3s ease",
                    }}
                  >
                    ✓
                  </span>
                  <p
                    className="font-heading"
                    style={{
                      fontSize:   "0.95rem",
                      color:      "var(--charcoal)",
                      fontWeight: 300,
                      opacity:    0.75,
                    }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Image collage with parallax - DESKTOP ONLY ── */}
          <div
            data-reveal
            className="relative hidden xl:block"
            style={{
              height:           "520px",
              transitionDelay:  "0.15s",
            }}
          >
            {/* Large image with parallax */}
            <div
              style={{
                position:           "absolute",
                top: 0, right: 0,
                width:              "74%",
                height:             "80%",
                backgroundImage:    "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80')",
                backgroundSize:     "cover",
                backgroundPosition: "center",
                border:             "2px solid rgba(201,160,90,0.2)",
                boxShadow:          "0 20px 60px rgba(0,0,0,0.15)",
                transform:          `translateY(${scrollOffset * 0.3}px)`,
                transition:         "transform 0.1s linear",
              }}
            />
            
            {/* Small offset image with counter parallax */}
            <div
              style={{
                position:           "absolute",
                bottom: "24px", left: 0,
                width:              "50%",
                height:             "42%",
                backgroundImage:    "url('https://images.unsplash.com/photo-1493770348161-369560ae357d?w=500&q=80')",
                backgroundSize:     "cover",
                backgroundPosition: "center",
                border:             "2px solid rgba(201,160,90,0.35)",
                boxShadow:          "0 30px 80px rgba(0,0,0,0.25)",
                transform:          `translateY(${scrollOffset * -0.2}px)`,
                transition:         "transform 0.1s linear",
              }}
            />

            {/* Decorative rings with subtle animation */}
            <div
              style={{
                position:     "absolute",
                bottom:       "60px",
                right:        "30px",
                width:        "90px",
                height:       "90px",
                borderRadius: "50%",
                border:       "1.5px solid rgba(201,160,90,0.2)",
                animation:    "pulse 3s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position:     "absolute",
                bottom:       "75px",
                right:        "45px",
                width:        "60px",
                height:       "60px",
                borderRadius: "50%",
                border:       "1.5px solid rgba(201,160,90,0.15)",
                animation:    "pulse 3s ease-in-out infinite 0.5s",
              }}
            />
          </div>

          {/* NO IMAGE ON MOBILE/TABLET - Text takes full width */}

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}