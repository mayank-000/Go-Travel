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
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="juno-section overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="juno-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Text */}
          <div
            data-reveal
            className="flex flex-col gap-7 max-w-xl"
            style={{ opacity: 0, transform: "translateY(28px)", transition: "opacity .75s ease, transform .75s ease" }}
          >
            <span
              className="font-heading text-[9px] tracking-[0.35em] uppercase"
              style={{ color: "var(--sage)" }}
            >
              Who We Are
            </span>

            <h2
              className="font-serif italic leading-[1.08]"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", color: "var(--navy)" }}
            >
              We are not a
              <br />
              travel agency.
            </h2>

            <div className="w-14 h-px" style={{ backgroundColor: "var(--ochre)" }} />

            <p
              className="font-heading text-base leading-relaxed"
              style={{ color: "rgba(61,61,61,0.88)", fontWeight: 300 }}
            >
              JUNO was born from a belief that modern life has severed us from
              the things that make us feel most alive — making, moving, sharing,
              and being present with others who care.
            </p>

            <p
              className="font-heading text-base leading-relaxed"
              style={{ color: "rgba(61,61,61,0.88)", fontWeight: 300 }}
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
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
                    style={{ backgroundColor: "var(--ochre)" }}
                  />
                  <p className="font-heading text-sm" style={{ color: "rgba(61,61,61,0.8)" }}>
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div
            data-reveal
            className="relative h-[480px] hidden md:block"
            style={{
              opacity: 0,
              transform: "translateY(28px)",
              transition: "opacity .75s ease .18s, transform .75s ease .18s",
            }}
          >
            <div
              className="absolute top-0 right-0 w-3/4 h-4/5 bg-cover bg-center rounded-(--card-radius)"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80')",
              }}
            />
            <div
              className="absolute bottom-6 left-0 w-1/2 h-2/5 bg-cover bg-center border-4 rounded-(--card-radius) shadow-lg"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1493770348161-369560ae357d?w=500&q=80')",
                borderColor: "var(--border-accent)",
              }}
            />
            <div
              className="absolute bottom-10 right-8 font-serif italic text-6xl opacity-15 select-none"
              style={{ color: "var(--sand)" }}
            >
              ○
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}