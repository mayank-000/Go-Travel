'use client'

import Link from "next/link";

export default function ClosingCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--obsidian)",
        paddingTop:      "clamp(6rem,12vw,10rem)",
        paddingBottom:   "clamp(6rem,12vw,10rem)",
      }}
    >
      {/* Large ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "90vw", height: "90vw",
          background: "radial-gradient(circle, rgba(201,160,90,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,160,90,0.25), transparent)" }}
      />

      <div
        className="juno-container text-center flex flex-col items-center relative z-10"
        style={{ gap: "2rem" }}
      >
        <span
          className="font-heading"
          style={{
            fontSize:      "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color:         "var(--sage)",
          }}
        >
          The Invitation
        </span>

        <h2
          className="font-serif italic"
          style={{
            fontSize:   "clamp(3rem,7vw,7rem)",
            lineHeight: 0.95,
            color:      "var(--text-primary)",
            maxWidth:   "800px",
          }}
        >
          This isn&apos;t for
          <br />
          everyone.
          <br />
          <span style={{ color: "var(--gold)" }}>Is it for you?</span>
        </h2>

        <p
          className="font-heading"
          style={{
            fontSize:   "clamp(0.875rem,1.4vw,1rem)",
            fontWeight: 300,
            color:      "var(--text-secondary)",
            maxWidth:   "420px",
            lineHeight: 1.8,
          }}
        >
          Twelve seats. Handpicked. No open registrations.
          If you felt something reading this page, you&apos;re probably who we&apos;re looking for.
        </p>

        <Link
          href="/invite"
          className="font-heading inline-flex items-center gap-3 mt-4"
          style={{
            fontSize:      "clamp(9px,1vw,11px)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            padding:       "1.1rem 3rem",
            background:    "var(--gold)",
            color:         "#080808",
            fontWeight:    600,
            transition:    "all 0.35s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background  = "var(--gold-light)";
            (e.currentTarget as HTMLElement).style.transform   = "translateY(-3px)";
            (e.currentTarget as HTMLElement).style.boxShadow   = "0 16px 48px rgba(201,160,90,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background  = "var(--gold)";
            (e.currentTarget as HTMLElement).style.transform   = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow   = "none";
          }}
        >
          Request an Invitation →
        </Link>

        {/* Decorative dots */}
        <div className="flex items-center gap-4 mt-8 opacity-20">
          <div className="w-10 h-px" style={{ backgroundColor: "var(--gold)" }} />
          <span className="font-serif italic" style={{ color: "var(--gold)", fontSize: "1.2rem" }}>✦</span>
          <div className="w-10 h-px" style={{ backgroundColor: "var(--gold)" }} />
        </div>
      </div>
    </section>
  );
}