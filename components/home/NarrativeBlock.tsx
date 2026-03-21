"use client";

import { useEffect, useRef } from "react";

export default function NarrativeBlock() {
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
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="juno-section overflow-hidden"
      style={{ backgroundColor: "var(--surface)" }}
    >
      {/* Top border accent */}
      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,160,90,0.2), transparent)", marginBottom: "0" }} />

      <div className="juno-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

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
                color:         "var(--gold)",
              }}
            >
              Who We Are
            </span>

            <h2
              className="font-serif italic"
              style={{
                fontSize:   "clamp(2.2rem, 4vw, 3.8rem)",
                lineHeight: 1.06,
                color:      "var(--text-primary)",
              }}
            >
              We are not a
              <br />
              travel agency.
            </h2>

            <div className="w-12 h-px" style={{ backgroundColor: "var(--gold)", opacity: 0.6 }} />

            <p
              className="font-heading"
              style={{
                fontSize:   "clamp(0.875rem,1.4vw,1rem)",
                fontWeight: 300,
                color:      "var(--text-secondary)",
                lineHeight: 1.8,
              }}
            >
              JUNO was born from a belief that modern life has severed us from
              the things that make us feel most alive — making, moving, sharing,
              and being present with others who care.
            </p>

            <p
              className="font-heading"
              style={{
                fontSize:   "clamp(0.875rem,1.4vw,1rem)",
                fontWeight: 300,
                color:      "var(--text-secondary)",
                lineHeight: 1.8,
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
              ].map((point) => (
                <div key={point} className="flex items-start gap-4">
                  <span
                    style={{
                      width:           "18px",
                      height:          "18px",
                      borderRadius:    "50%",
                      border:          "1px solid rgba(201,160,90,0.5)",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      flexShrink:      0,
                      marginTop:       "2px",
                      color:           "var(--gold)",
                      fontSize:        "9px",
                    }}
                  >
                    ✓
                  </span>
                  <p
                    className="font-heading"
                    style={{
                      fontSize:   "0.875rem",
                      color:      "rgba(240,236,228,0.65)",
                      fontWeight: 300,
                    }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Image collage ── */}
          <div
            data-reveal
            className="relative hidden md:block"
            style={{
              height:           "520px",
              transitionDelay:  "0.15s",
            }}
          >
            {/* Large image */}
            <div
              style={{
                position:           "absolute",
                top: 0, right: 0,
                width:              "74%",
                height:             "80%",
                backgroundImage:    "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80')",
                backgroundSize:     "cover",
                backgroundPosition: "center",
                border:             "1px solid rgba(201,160,90,0.15)",
              }}
            />
            {/* Small offset image */}
            <div
              style={{
                position:           "absolute",
                bottom: "24px", left: 0,
                width:              "50%",
                height:             "42%",
                backgroundImage:    "url('https://images.unsplash.com/photo-1493770348161-369560ae357d?w=500&q=80')",
                backgroundSize:     "cover",
                backgroundPosition: "center",
                border:             "1px solid rgba(201,160,90,0.3)",
                boxShadow:          "0 24px 60px rgba(0,0,0,0.5)",
              }}
            />
            {/* Decorative ring */}
            <div
              style={{
                position:     "absolute",
                bottom:       "60px",
                right:        "30px",
                width:        "90px",
                height:       "90px",
                borderRadius: "50%",
                border:       "1px solid rgba(201,160,90,0.18)",
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
                border:       "1px solid rgba(201,160,90,0.1)",
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}