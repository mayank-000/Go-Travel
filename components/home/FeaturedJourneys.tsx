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
      className="py-32 md:py-40"
      style={{ backgroundColor: "#F5F3E4" }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span
              className="font-heading text-[9px] tracking-[0.35em] uppercase block mb-4"
              style={{ color: "var(--sage)" }}
            >
              Upcoming Journeys
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
              borderColor: "var(--ochre)",
            }}
          >
            View all journeys →
          </Link>
        </div>

        {/* Journey cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {journeys.map((journey, i) => (
            <Link
              href={`/trips/${journey.id}`}
              key={journey.id}
              className="group flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/5]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${journey.image}')` }}
                />
                {/* overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-40"
                  style={{
                    background: "linear-gradient(to top, rgba(27,59,87,0.5) 0%, transparent 60%)",
                  }}
                />
                {/* Tag */}
                <span
                  className="absolute top-5 left-5 font-heading text-[9px] tracking-[0.25em] uppercase px-3 py-1.5"
                  style={{
                    backgroundColor: "rgba(252,250,233,0.9)",
                    color: "var(--navy)",
                  }}
                >
                  {journey.tag}
                </span>
              </div>

              {/* Content */}
              <div
                className="flex flex-col gap-3 p-6 flex-1"
                style={{ backgroundColor: "var(--cream)" }}
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
                  style={{ color: "rgba(44,44,44,0.6)" }}
                >
                  {journey.tagline}
                </p>

                <span
                  className="font-heading text-xs tracking-[0.2em] uppercase mt-auto pt-4 border-t w-fit transition-all duration-300 group-hover:opacity-60"
                  style={{
                    color: "var(--navy)",
                    borderColor: "rgba(219,175,132,0.3)",
                  }}
                >
                  Request Invite →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}