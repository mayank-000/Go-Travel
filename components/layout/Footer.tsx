import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--navy)" }}>
      <div className="juno-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8 mb-16">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div>
              <span className="font-serif italic text-3xl block" style={{ color: "var(--cream)" }}>
                JUNO
              </span>
              <span
                className="font-heading text-[9px] tracking-[0.3em] uppercase"
                style={{ color: "var(--sage)" }}
              >
                Journeys
              </span>
            </div>
            <p
              className="font-heading text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(252,250,233,0.45)" }}
            >
              India's first invite-only experiential journey club. A quiet circle
              of people who choose depth over noise.
            </p>
            <p
              className="font-heading text-xs"
              style={{ color: "rgba(152,165,156,0.7)" }}
            >
              📧 hello@junojourneys.in
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <p
              className="font-heading text-[9px] tracking-[0.3em] uppercase mb-3"
              style={{ color: "var(--sage)" }}
            >
              Explore
            </p>
            {[
              ["About", "/about"],
              ["Upcoming Trips", "/trips"],
              ["Gallery", "/gallery"],
              ["Blog", "/blog"],
              ["FAQ", "/faq"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="font-heading text-sm transition-opacity duration-300 hover:opacity-50 w-fit"
                style={{ color: "rgba(252,250,233,0.65)" }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Invite */}
          <div className="flex flex-col gap-5">
            <p
              className="font-heading text-[9px] tracking-[0.3em] uppercase"
              style={{ color: "var(--sage)" }}
            >
              Join Us
            </p>
            <p
              className="font-heading text-sm leading-relaxed"
              style={{ color: "rgba(252,250,233,0.45)" }}
            >
              Our journeys are invite-only, limited to 12 people. Apply to join
              the JUNO inner circle.
            </p>
            <Link
              href="/invite"
              className="font-heading text-[11px] tracking-[0.2em] uppercase px-6 py-3 w-fit border transition-all duration-300 hover:opacity-70"
              style={{
                borderColor: "rgba(219,175,132,0.35)",
                color: "var(--sand)",
              }}
            >
              Request Invite →
            </Link>
            <p
              className="font-heading text-xs mt-2"
              style={{ color: "rgba(152,165,156,0.6)" }}
            >
              📱 @junojourneys
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-8 border-t"
          style={{ borderColor: "rgba(152,165,156,0.12)" }}
        >
          <p className="font-heading text-xs" style={{ color: "rgba(252,250,233,0.25)" }}>
            © {new Date().getFullYear()} JUNO Journeys. All rights reserved.
          </p>
          <p
            className="font-heading text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(152,165,156,0.4)" }}
          >
            Curated with intention · Made in India
          </p>
        </div>
      </div>
    </footer>
  );
}