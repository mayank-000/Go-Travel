export default function NarrativeBlock() {
  return (
    <section
      className="py-32 md:py-40 overflow-hidden"
      style={{ backgroundColor: "var(--navy)" }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text */}
          <div className="flex flex-col gap-8">
            <span
              className="font-heading text-[9px] tracking-[0.35em] uppercase"
              style={{ color: "var(--sage)" }}
            >
              Who We Are
            </span>

            <h2
              className="font-serif italic leading-[1.1]"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                color: "var(--cream)",
              }}
            >
              We are not a
              <br />
              travel agency.
            </h2>

            <div
              className="w-16 h-px"
              style={{ backgroundColor: "var(--ochre)" }}
            />

            <p
              className="font-heading text-base leading-relaxed"
              style={{ color: "rgba(252,250,233,0.65)", fontWeight: 300 }}
            >
              JUNO was born from a belief that modern life has severed us from
              the things that make us feel most alive — making, moving, sharing,
              and being present with others who care.
            </p>

            <p
              className="font-heading text-base leading-relaxed"
              style={{ color: "rgba(252,250,233,0.65)", fontWeight: 300 }}
            >
              We curate small-group journeys that place culture, craft, and
              connection at the centre. Every detail is considered. Every
              experience is earned.
            </p>

            <div className="flex flex-col gap-4 mt-4">
              {[
                "8 people maximum per journey",
                "Embedded with local artisans and communities",
                "No tourist infrastructure — only lived experience",
              ].map((point) => (
                <div key={point} className="flex items-start gap-4">
                  <div
                    className="w-1 h-1 rounded-full mt-2.5 shrink-0"
                    style={{ backgroundColor: "var(--ochre)" }}
                  />
                  <p
                    className="font-heading text-sm"
                    style={{ color: "rgba(252,250,233,0.55)" }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="relative h-[520px] hidden md:block">
            {/* Main image */}
            <div
              className="absolute top-0 right-0 w-3/4 h-4/5 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80')",
              }}
            />
            {/* Secondary image */}
            <div
              className="absolute bottom-0 left-0 w-1/2 h-2/5 bg-cover bg-center border-4"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1493770348161-369560ae357d?w=500&q=80')",
                borderColor: "var(--navy)",
              }}
            />
            {/* Decorative element */}
            <div
              className="absolute bottom-12 right-6 font-serif italic text-6xl opacity-15 select-none"
              style={{ color: "var(--sand)" }}
            >
              ○
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}