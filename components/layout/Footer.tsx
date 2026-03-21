'use client'
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--navy)",
        borderTop:       "1px solid rgba(201,160,90,0.1)",
      }}
    >
      <div className="juno-container py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-14">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div>
              <span
                className="font-serif italic block"
                style={{ fontSize: "2rem", color: "var(--gold)" }}
              >
                JUNO
              </span>
              <span
                className="font-heading"
                style={{
                  fontSize:      "7px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color:         "var(--gold)",
                }}
              >
                Journeys
              </span>
            </div>
            <p
              className="font-heading"
              style={{
                fontSize:   "0.875rem",
                fontWeight: 300,
                color:      "var(--gold-light)",
                maxWidth:   "260px",
                lineHeight: 1.8,
              }}
            >
              India&apos;s first invite-only experiential journey club. A quiet circle
              of people who choose depth over noise.
            </p>
            <p
              className="font-heading"
              style={{ fontSize: "0.8rem", color: "var(--clay)" }}
            >
              hello@junojourneys.in
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <p
              className="font-heading mb-3"
              style={{
                fontSize:      "9px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color:         "var(--surface)",
              }}
            >
              Explore
            </p>
            {[
              ["About",          "/about"],
              ["Upcoming Trips", "/trips"],
              ["Gallery",        "/gallery"],
              ["Blog",           "/blog"],
              ["FAQ",            "/faq"],
              ["Contact",        "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="font-heading w-fit transition-all duration-300"
                style={{ fontSize: "0.875rem", color: "var(--clay)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--clay)";
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Invite */}
          <div className="flex flex-col gap-5">
            <p
              className="font-heading"
              style={{
                fontSize:      "9px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color:         "var(--surface)",
              }}
            >
              Join Us
            </p>
            <p
              className="font-heading"
              style={{
                fontSize:   "0.875rem",
                fontWeight: 300,
                color:      "var(--gold)",
                lineHeight: 1.8,
              }}
            >
              Our journeys are invite-only, limited to 12 people. Apply to join
              the JUNO inner circle.
            </p>
            <Link
              href="/invite"
              className="font-heading w-fit"
              style={{
                fontSize:      "9px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                padding:       "0.75rem 1.75rem",
                border:        "1px solid rgba(201,160,90,0.35)",
                color:         "var(--gold)",
                transition:    "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background   = "rgba(201,160,90,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor  = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background   = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor  = "rgba(201,160,90,0.35)";
              }}
            >
              Request Invite →
            </Link>
            <p
              className="font-heading"
              style={{ fontSize: "0.8rem", color: "var(--gold-light)" }}
            >
              @junojourneys
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p
            className="font-heading"
            style={{ fontSize: "0.75rem", color: "var(--gold-light)", opacity: 0.6 }}
          >
            © {new Date().getFullYear()} JUNO Journeys. All rights reserved.
          </p>
          <p
            className="font-heading"
            style={{
              fontSize:      "9px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "var(--clay)",
              opacity:       0.4,
            }}
          >
            Curated with intention · Made in India
          </p>
        </div>
      </div>
    </footer>
  );
}