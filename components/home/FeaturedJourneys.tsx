import Link from "next/link";

const journeys = [
  {
    id: 1,
    name: "The Clay Coast",
    location: "Oaxaca, Mexico",
    tagline: "Fire, earth, and ancient hands. A week shaping clay with master potters.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&q=80",
    tag: "Craft",
    duration: "7 days",
  },
  {
    id: 2,
    name: "Salt & Swell",
    location: "Basque Country, Spain",
    tagline: "Surfing the Atlantic and cooking over fire with Basque chefs.",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80",
    tag: "Sea",
    duration: "8 days",
  },
  {
    id: 3,
    name: "High Atlas Immersion",
    location: "Morocco",
    tagline: "Weaving, trekking, and sharing meals in Berber mountain villages.",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80",
    tag: "Culture",
    duration: "9 days",
  },
];

export default function FeaturedJourneys() {
  return (
    <section
      className="juno-section"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="juno-container">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <span
              className="font-heading text-[9px] tracking-[0.35em] uppercase block mb-4"
              style={{ color: "var(--sage)" }}
            >
              Featured Journeys
            </span>
            <h2
              className="font-serif italic leading-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "var(--navy)",
              }}
            >
              Carefully curated,
              <br />
              deeply considered.
            </h2>
          </div>
          <Link
            href="/trips"
            className="font-heading text-xs tracking-[0.2em] uppercase border-b pb-1 w-fit transition-all duration-300 hover:opacity-60 shrink-0"
            style={{
              color: "var(--navy)",
              borderColor: "var(--border-accent)",
            }}
          >
            View all journeys →
          </Link>
        </div>

        {/* Journey carousel */}
        <div className="relative -mx-4 md:mx-0">
          <div className="flex gap-5 md:gap-7 overflow-x-auto scroll-smooth pb-2 md:pb-3 px-4 md:px-0 snap-x snap-mandatory">
            {journeys.map((journey) => (
              <Link
                href={`/trips/${journey.id}`}
                key={journey.id}
                className="group flex flex-col min-w-[260px] max-w-sm md:max-w-none md:flex-1 snap-start overflow-hidden rounded-(--card-radius) border shadow-sm bg-cream"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-4/5 rounded-t-(--card-radius)">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${journey.image}')` }}
                />
                {/* overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-40"
                  style={{
                    background: "linear-gradient(to top, rgba(42,77,106,0.5) 0%, transparent 60%)",
                  }}
                />
                  {/* Tag */}
                  <span
                    className="absolute top-4 left-4 font-heading text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm"
                    style={{
                      backgroundColor: "var(--cream)",
                      color: "var(--navy)",
                    }}
                  >
                    {journey.tag}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="flex flex-col gap-5 px-7 py-8 md:px-9 md:py-10 flex-1 rounded-b-(--card-radius) border-t"
                  style={{ backgroundColor: "var(--cream)", borderColor: "var(--border-subtle)" }}
                >
                <div className="flex items-center justify-between">
                  <span
                    className="font-heading text-[9px] tracking-[0.25em] uppercase"
                    style={{ color: "var(--sage)" }}
                  >
                    {journey.location}
                  </span>
                  <span
                    className="font-heading text-[9px] tracking-[0.15em]"
                    style={{ color: "var(--sand)" }}
                  >
                    {journey.duration}
                  </span>
                </div>

                <h3
                  className="font-serif italic leading-tight"
                  style={{
                    fontSize: "clamp(1.4rem, 2vw, 1.75rem)",
                    color: "var(--navy)",
                  }}
                >
                  {journey.name}
                </h3>

                  <p
                    className="font-heading text-sm leading-relaxed"
                    style={{ color: "var(--charcoal)", opacity: 0.7 }}
                  >
                    {journey.tagline}
                  </p>

                  <span
                    className="font-heading text-xs tracking-[0.2em] uppercase mt-auto pt-4 border-t w-fit transition-all duration-300 group-hover:opacity-60"
                    style={{
                      color: "var(--navy)",
                      borderColor: "var(--border-accent)",
                    }}
                  >
                    Request Invite →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}