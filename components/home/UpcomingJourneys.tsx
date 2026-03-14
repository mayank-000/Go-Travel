import Link from "next/link";

export default function UpcomingJourneys() {
  return (
    <section className="juno-section" style={{ backgroundColor: "var(--cream)" }}>
      <div className="juno-container">

        {/* Header */}
        <div className="mb-10 md:mb-12">
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

        {/* Vertical journey cards carousel (image placeholder on top) */}
        <div className="relative -mx-4 md:mx-0">
          <div className="flex gap-5 md:gap-7 overflow-x-auto scroll-smooth pb-3 px-4 md:px-0 snap-x snap-mandatory no-scrollbar">
            {[
              {
                title: "Clay & Quiet",
                meta: "A Potter's Weekend, Khurja",
                location: "Khurja, Uttar Pradesh",
                when: "Coming Soon",
                tag: "Craft",
              },
              {
                title: "Salt & Swell",
                meta: "Surf & Fire, Basque Country",
                location: "Basque Country, Spain",
                when: "Waitlist Open",
                tag: "Sea",
              },
              {
                title: "High Atlas Immersion",
                meta: "Weaving & Walking, Morocco",
                location: "High Atlas, Morocco",
                when: "2026 · Spring",
                tag: "Culture",
              },
              {
                title: "Tea & Timber",
                meta: "Forest Cabin Week, Himachal",
                location: "Himachal Pradesh, India",
                when: "Coming Soon",
                tag: "Retreat",
              },
              {
                title: "Salt Pan Evenings",
                meta: "Craft & Stars, Kutch",
                location: "Kutch, Gujarat",
                when: "2026 · Winter",
                tag: "Night",
              },
            ].map((trip) => (
              <div
                key={trip.title}
                className="group flex flex-col min-w-[270px] max-w-sm md:min-w-[310px] snap-start rounded-[var(--card-radius)] border shadow-sm bg-cream overflow-hidden"
                style={{ borderColor: "var(--border-accent)" }}
              >
                {/* IMAGE AREA – add background later */}
                <div className="relative h-60 md:h-72 bg-[#e5ddcf]">
                  {/* Replace this background with your own image later:
                     e.g. style={{ backgroundImage: "url('/your-image.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} */}
                  <span
                    className="absolute top-5 left-5 font-heading text-[9px] tracking-[0.25em] uppercase px-3 py-1.5"
                    style={{ backgroundColor: "rgba(247,243,234,0.96)", color: "var(--navy)" }}
                  >
                    {trip.tag}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col gap-5 px-8 py-8 md:px-9 md:py-9 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="font-heading text-[9px] tracking-[0.22em] uppercase"
                      style={{ color: "var(--sage)" }}
                    >
                      📍 {trip.location}
                    </span>
                    <span
                      className="font-heading text-[9px] tracking-[0.22em] uppercase"
                      style={{ color: "var(--sand)" }}
                    >
                      📅 {trip.when}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3
                      className="font-serif italic leading-tight"
                      style={{
                        fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
                        color: "var(--navy)",
                      }}
                    >
                      {trip.title}
                    </h3>
                    <p
                      className="font-heading text-[11px] tracking-[0.15em] uppercase"
                      style={{ color: "var(--sage)" }}
                    >
                      {trip.meta}
                    </p>
                  </div>

                  <p
                    className="font-heading text-sm leading-relaxed"
                    style={{ color: "rgba(44,44,44,0.62)", fontWeight: 300 }}
                  >
                    Add your journey description here — enough lines so it feels
                    like a story, not a label.
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "var(--ochre)" }}
                    />
                    <span
                      className="font-heading text-xs tracking-[0.15em] uppercase"
                      style={{ color: "var(--ochre)" }}
                    >
                      Seats are limited.
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Promise */}
        <div
          className="mt-10 md:mt-12 p-6 md:p-8 rounded-[var(--card-radius)] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 justify-between border"
          style={{ backgroundColor: "rgba(42,77,106,0.05)", borderColor: "var(--border-subtle)" }}
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