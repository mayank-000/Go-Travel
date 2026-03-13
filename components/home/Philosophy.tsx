"use client";

const pillars = [
  {
    number: "01",
    title: "Create",
    description:
      "Every journey centres on making something — with hands, tools, and time. Craft is how we reconnect with culture and ourselves.",
  },
  {
    number: "02",
    title: "Explore",
    description:
      "We move slowly, intentionally, through landscapes that ask something of you. Not sightseeing — participation.",
  },
  {
    number: "03",
    title: "Restore",
    description:
      "Small groups, unhurried pace, nourishing food. JUNO journeys are designed to leave you more yourself than when you arrived.",
  },
];

export default function Philosophy() {
  return (
    <section
      className="py-32 md:py-40"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        {/* Section label */}
        <div className="flex items-center gap-6 mb-20">
          <span
            className="font-heading text-[9px] tracking-[0.35em] uppercase"
            style={{ color: "var(--sage)" }}
          >
            Our Philosophy
          </span>
          <div
            className="h-px flex-1 max-w-24"
            style={{ backgroundColor: "var(--sand)", opacity: 0.4 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ backgroundColor: "rgba(219,175,132,0.15)" }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="group flex flex-col gap-8 p-10 md:p-14 transition-colors duration-500 hover:bg-[var(--navy)]"
              style={{ backgroundColor: "var(--cream)" }}
            >
              <span
                className="font-heading text-xs tracking-[0.2em] transition-colors duration-500 group-hover:opacity-50"
                style={{ color: "var(--sage)" }}
              >
                {pillar.number}
              </span>

              <h3
                className="font-serif italic transition-colors duration-500 group-hover:text-[var(--sand)]"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "var(--navy)",
                  lineHeight: 1.1,
                }}
              >
                {pillar.title}
              </h3>

              <p
                className="font-heading text-sm leading-relaxed transition-colors duration-500 group-hover:text-[rgba(252,250,233,0.65)]"
                style={{ color: "rgba(44,44,44,0.65)" }}
              >
                {pillar.description}
              </p>

              {/* Decorative line */}
              <div
                className="w-8 h-px mt-auto transition-all duration-500 group-hover:w-16"
                style={{ backgroundColor: "var(--ochre)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}