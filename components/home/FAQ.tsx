"use client";

import { useState } from "react";

const faqs = [
  { q: "Who is JUNO actually for?", a: "People who are quietly tired of ordinary weekends. Professionals, creatives, and curious minds between 25–40 who want to make something real — and don't know where to start. If you felt something reading this page, it's probably for you." },
  { q: 'What does "invite-only" actually mean?', a: "It means we don't run open registrations. You request a seat, we have a brief conversation, and we make sure the fit is right — for you and for the group. It's not exclusive for the sake of ego. It's intentional for the sake of experience." },
  { q: "Do I need skills or experience?", a: "Bring none. Our artisans are extraordinary teachers. The only prerequisite is genuine curiosity." },
  { q: "What's included?", a: "Everything that removes friction — curated transport from Delhi, handpicked accommodation, all workshop sessions, most meals, and our team on the ground with you. The full breakdown is shared before you commit a single rupee." },
  { q: "How small is small?", a: "Twelve. That's the ceiling. We won't cross it." },
  { q: "What about safety?", a: "Every vehicle, partner, and property is personally vetted. You'll never be handed off to a stranger. Our team is present from departure to return." },
  { q: "Can I cancel?", a: "Life happens — we understand that. Our policy is fair and fully transparent. We'll walk you through it before you book." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="juno-section" style={{ backgroundColor: "var(--surface)" }}>
      <div className="juno-container">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mb-14 md:mb-16">
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
              FAQ
            </span>
            <h2
              className="font-serif italic"
              style={{
                fontSize:   "clamp(2.4rem,5vw,4rem)",
                lineHeight: 1.04,
                color:      "var(--text-primary)",
              }}
            >
              Real Answers.
              <br />
              <span style={{ color: "var(--gold)" }}>No Fine Print.</span>
            </h2>
          </div>
          <p
            className="font-heading self-end"
            style={{
              fontSize:   "clamp(0.875rem,1.4vw,1rem)",
              fontWeight: 300,
              color:      "var(--text-secondary)",
              maxWidth:   "400px",
              lineHeight: 1.8,
            }}
          >
            Everything you&apos;d want to know before saying yes. Still wondering
            something?{" "}
            <a
              href="#contact"
              style={{
                color:         "var(--gold)",
                borderBottom:  "1px solid rgba(201,160,90,0.3)",
                paddingBottom: "1px",
              }}
            >
              Just ask us.
            </a>
          </p>
        </div>

        {/* Accordion */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-8"
                  style={{
                    padding:    "1.75rem 0",
                    background: "none",
                    border:     "none",
                    cursor:     "none",
                    textAlign:  "left",
                    width:      "100%",
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-serif italic"
                    style={{
                      fontSize:   "clamp(1rem,1.8vw,1.2rem)",
                      color:      isOpen ? "var(--gold)" : "var(--text-primary)",
                      lineHeight: 1.3,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="font-heading shrink-0"
                    style={{
                      fontSize:   "1.4rem",
                      lineHeight: 1,
                      color:      isOpen ? "var(--gold)" : "rgba(255,255,255,0.25)",
                      transform:  isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.35s ease, color 0.3s ease",
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  style={{
                    display:          "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition:       "grid-template-rows 0.4s ease",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <p
                      className="font-heading"
                      style={{
                        fontSize:      "0.9rem",
                        lineHeight:    1.85,
                        fontWeight:    300,
                        color:         "var(--text-secondary)",
                        maxWidth:      "680px",
                        paddingBottom: "1.75rem",
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}