"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote:
      "From the first touch of wet clay, I forgot I had a phone. Two days later I drove home in complete silence — and it was the best drive of my life.",
    name: "Arjun Mehta",
    role: "Product Designer, Bangalore",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    quote:
      "I've done yoga retreats, wellness weekends, meditation camps. Nothing came close to what happened when I actually made something with my hands.",
    name: "Priya Nair",
    role: "Strategy Consultant, Mumbai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    quote:
      "The group of strangers I arrived with are now some of the most interesting people in my life. That wasn't in the itinerary.",
    name: "Kabir Singh",
    role: "Architect, Delhi",
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
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
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
      className="juno-section"
      style={{ backgroundColor: "var(--navy)" }}
    >
      <div className="juno-container">

        {/* Header */}
        <div
          data-reveal
          className="text-center mb-12 md:mb-14"
          style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity .75s ease, transform .75s ease" }}
        >
          <span
            className="font-heading text-[9px] tracking-[0.35em] uppercase block mb-5"
            style={{ color: "var(--sage)" }}
          >
            Traveler Testimonials
          </span>
          <h2
            className="font-serif italic mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--cream)" }}
          >
            Their words say what ours cannot.
          </h2>
          <p
            className="font-heading text-sm mx-auto"
            style={{ color: "rgba(248,244,236,0.45)", maxWidth: "460px", fontWeight: 300 }}
          >
            From the first touch of wet clay to the long drive home in silence —
            discover what our guests say about their journeys with JUNO.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-reveal
              className="flex flex-col gap-6 p-8 md:p-9 rounded-[var(--card-radius)] border transition-all duration-300 hover:bg-[rgba(247,243,234,0.11)]"
              style={{
                backgroundColor: "rgba(247,243,234,0.07)",
                borderColor: "rgba(228,184,150,0.2)",
                opacity: 0,
                transform: "translateY(28px)",
                transition: `opacity .75s ease ${i * 0.1}s, transform .75s ease ${i * 0.1}s`,
              }}
            >
              <span
                className="font-serif italic text-4xl leading-none"
                style={{ color: "var(--ochre)", opacity: 0.6 }}
              >
                &apos;
              </span>

              <p
                className="font-heading text-sm leading-relaxed flex-1"
                style={{ color: "rgba(248,244,236,0.88)", fontWeight: 300 }}
              >
                {t.quote}
              </p>

              <div className="w-8 h-px" style={{ backgroundColor: "rgba(219,175,132,0.3)" }} />

              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full bg-cover bg-center shrink-0"
                  style={{ backgroundImage: `url('${t.image}')` }}
                />
                <div>
                  <p className="font-heading text-sm font-medium" style={{ color: "var(--cream)" }}>
                    {t.name}
                  </p>
                  <p className="font-heading text-xs mt-0.5" style={{ color: "rgba(138,158,143,0.7)" }}>
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