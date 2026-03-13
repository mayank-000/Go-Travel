import Link from "next/link";

export default function UpcomingJourneys() {
  return (
    <section style={{ backgroundColor: "#F7F4E6" }}>
      <div className="juno-container py-24 md:py-36">

        {/* Header */}
        <div className="mb-14">
          <span
            className="font-heading text-[9px] tracking-[0.35em] uppercase block mb-4"
            style={{ color: "var(--sage)" }}
          >
            Upcoming Journeys
          </span>
          <h2
            className="font-serif italic leading-tight mb-5"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "var(--navy)",
            }}
          >
            A few seats.
            <br />
            Fewer chances to regret not taking one.
          </h2>
          <p
            className="font-heading text-base"
            style={{ color: "rgba(44,44,44,0.55)", maxWidth: "520px", fontWeight: 300 }}
          >
            Ready to make something real? Join us on our next journey and unlock
            an experience the city could never give you.
          </p>
        </div>

        {/* Featured trip card */}
        <div
          className="grid grid-cols-1 md:grid-cols-5 overflow-hidden"
          style={{ border: "1px solid rgba(219,175,132,0.3)" }}
        >
          {/* Image */}
          <div className="md:col-span-2 relative overflow-hidden min-h-[280px] md:min-h-0">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=700&q=80')",
              }}
            />
            {/* Tag */}
            <span
              className="absolute top-5 left-5 font-heading text-[9px] tracking-[0.25em] uppercase px-3 py-1.5"
              style={{ backgroundColor: "rgba(252,250,233,0.92)", color: "var(--navy)" }}
            >
              Craft
            </span>
          </div>

          {/* Content */}
          <div
            className="md:col-span-3 flex flex-col gap-5 p-8 md:p-12"
            style={{ backgroundColor: "var(--cream)" }}
          >
            <div className="flex flex-wrap items-center gap-4">
              <span
                className="font-heading text-[9px] tracking-[0.22em] uppercase"
                style={{ color: "var(--sage)" }}
              >
                📍 Khurja, Uttar Pradesh
              </span>
              <span
                className="font-heading text-[9px] tracking-[0.22em] uppercase"
                style={{ color: "var(--sand)" }}
              >
                📅 Coming Soon
              </span>
              <span
                className="font-heading text-[9px] tracking-[0.22em] uppercase"
                style={{ color: "var(--sage)" }}
              >
                👥 12 seats
              </span>
            </div>

            <h3
              className="font-serif italic leading-tight"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: "var(--navy)",
              }}
            >
              Clay &amp; Quiet
            </h3>
            <p
              className="font-heading text-[11px] tracking-[0.15em] uppercase"
              style={{ color: "var(--sage)" }}
            >
              A Potter's Weekend, Khurja
            </p>

            <p
              className="font-heading text-sm leading-relaxed"
              style={{ color: "rgba(44,44,44,0.62)", fontWeight: 300 }}
            >
              Coming soon to a quiet courtyard in Khurja. Wheel-thrown. Sun-dried.
              Fired at dawn. A weekend with a master potter and eleven strangers
              who will stop feeling like strangers.
            </p>

            <p
              className="font-heading text-xs"
              style={{ color: "rgba(44,44,44,0.45)" }}
            >
              Includes: Door-to-door transport · Curated stay · Full workshop access · Meals
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--ochre)" }}
              />
              <span
                className="font-heading text-xs tracking-[0.15em] uppercase"
                style={{ color: "var(--ochre)" }}
              >
                Seats are limited. Always.
              </span>
            </div>

            <Link
              href="/invite"
              className="font-heading text-xs tracking-[0.2em] uppercase px-8 py-4 w-fit mt-2 transition-all duration-300 hover:opacity-85"
              style={{ backgroundColor: "var(--ochre)", color: "var(--navy)" }}
            >
              I want in →
            </Link>
          </div>
        </div>

        {/* The Promise */}
        <div
          className="mt-10 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 justify-between"
          style={{ backgroundColor: "rgba(27,59,87,0.06)", border: "1px solid rgba(219,175,132,0.25)" }}
        >
          <p
            className="font-serif italic"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.35rem)",
              color: "var(--navy)",
              maxWidth: "340px",
              lineHeight: 1.4,
            }}
          >
            We handle everything you did not worry about. So you can forget that worry exists.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              "Vetted transport & stays",
              "Minimal group per journey",
              "Fair exchange with artisan communities",
            ].map((item) => (
              <p
                key={item}
                className="font-heading text-sm flex items-center gap-3"
                style={{ color: "rgba(44,44,44,0.65)" }}
              >
                <span style={{ color: "var(--ochre)" }}>✓</span>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}