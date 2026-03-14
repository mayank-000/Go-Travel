import Link from "next/link";

export default function ClosingCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--navy)" }}  // FIXED: was var(--charcoal), now navy for continuity with Testimonials
    >
      {/* Radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(227,163,66,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Thin separator so it doesn't fully bleed into Testimonials */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ borderTop: "1px solid rgba(219,175,132,0.15)" }}
      />

      <div className="juno-container juno-section text-center flex flex-col items-center gap-8 relative z-10">

        <span
          className="font-heading text-[9px] tracking-[0.4em] uppercase"
          style={{ color: "var(--sage)" }}
        >
          The Invitation
        </span>

        <h2
          className="font-serif italic leading-[1.04]"
          style={{
            fontSize: "clamp(2.8rem, 6.5vw, 6rem)",
            color: "var(--cream)",
            maxWidth: "700px",
          }}
        >
          This isn&apos;t for everyone.
          <br />
          <span style={{ color: "var(--ochre)" }}>Is it for you?</span>
        </h2>

        <Link
          href="/invite"
          className="font-heading text-sm tracking-[0.22em] uppercase px-12 py-5 transition-all duration-300 hover:opacity-85 mt-2"
          style={{ backgroundColor: "var(--ochre)", color: "var(--navy)" }}
        >
          Request an Invitation →
        </Link>

        {/* Decorative */}
        <div className="flex items-center gap-5 mt-6 opacity-20">
          <div className="w-12 h-px" style={{ backgroundColor: "var(--sand)" }} />
          <span className="font-serif italic text-lg" style={{ color: "var(--sand)" }}>✦</span>
          <div className="w-12 h-px" style={{ backgroundColor: "var(--sand)" }} />
        </div>
      </div>
    </section>
  );
}