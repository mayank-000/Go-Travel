import Link from "next/link";

export default function InviteCTA() {
  return (
    <section
      className="relative py-40 md:py-56 overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Background texture circle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(219,175,132,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-8 md:px-12 text-center flex flex-col items-center gap-10">
        <span
          className="font-heading text-[9px] tracking-[0.4em] uppercase"
          style={{ color: "var(--sage)" }}
        >
          Join the Community
        </span>

        <h2
          className="font-serif italic leading-[1.05]"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            color: "var(--navy)",
          }}
        >
          Ready to journey
          <br />
          <span style={{ color: "var(--ochre)" }}>with intention?</span>
        </h2>

        <p
          className="font-heading text-base md:text-lg leading-relaxed max-w-lg"
          style={{ color: "rgba(44,44,44,0.55)", fontWeight: 300 }}
        >
          JUNO journeys are invite-only and limited to eight travellers. Tell us
          about yourself and the kind of experience you are seeking.
        </p>

        <Link
          href="/invite"
          className="font-heading text-sm tracking-[0.2em] uppercase px-12 py-5 transition-all duration-300 hover:opacity-85 mt-2"
          style={{
            backgroundColor: "var(--navy)",
            color: "var(--cream)",
          }}
        >
          Request an Invite
        </Link>

        {/* Decorative divider */}
        <div className="flex items-center gap-6 mt-8 opacity-30">
          <div className="w-16 h-px" style={{ backgroundColor: "var(--sand)" }} />
          <span className="font-serif italic text-xl" style={{ color: "var(--sand)" }}>
            ✦
          </span>
          <div className="w-16 h-px" style={{ backgroundColor: "var(--sand)" }} />
        </div>
      </div>
    </section>
  );
}