const testimonials = [
  {
    quote:
      "From the first touch of wet clay, I forgot I had a phone. Two days later I drove home in complete silence — and it was the best drive of my life.",
    name: "Arjun Mehta",
    role: "Product Designer, Bangalore",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    quote:
      "I've done yoga retreats, wellness weekends, meditation camps. Nothing came close to what happened when I actually made something with my hands.",
    name: "Priya Nair",
    role: "Strategy Consultant, Mumbai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    quote:
      "The group of strangers I arrived with are now some of the most interesting people in my life. That wasn't in the itinerary.",
    name: "Kabir Singh",
    role: "Architect, Delhi",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
];

export default function Testimonials() {
  return (
    <section className="juno-section" style={{ backgroundColor: "var(--navy)" }}>
      <div className="juno-container">

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <span
            className="font-heading text-[9px] tracking-[0.35em] uppercase block mb-5"
            style={{ color: "var(--sage)" }}
          >
            Traveler Testimonials
          </span>
          <h2
            className="font-serif italic mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--cream)" }}
          >
            Their words say what ours cannot.
          </h2>
          <p
            className="font-heading text-sm mx-auto"
            style={{ color: "rgba(248,244,236,0.45)", maxWidth: "460px", fontWeight: 300 }}
          >
            From the first touch of wet clay to the long drive home in silence —
            discover what our guests say about their journeys with JUNO.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col gap-5 p-6 md:p-7 rounded-[var(--card-radius)] border"
              style={{
                backgroundColor: "rgba(247,243,234,0.08)",
                borderColor: "rgba(228,184,150,0.22)",  
              }}
            >
              <span
                className="font-serif italic text-4xl leading-none"
                style={{ color: "var(--ochre)", opacity: 0.6 }}
              >
                
              </span>

              <p
                className="font-heading text-sm leading-relaxed flex-1"
                style={{ color: "rgba(248,244,236,0.88)", fontWeight: 300 }}
              >
                {t.quote}
              </p>

              <div className="w-8 h-px" style={{ backgroundColor: "rgba(219,175,132,0.3)" }} />

              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full bg-cover bg-center shrink-0"
                  style={{ backgroundImage: `url('${t.image}')` }}
                />
                <div>
                  <p className="font-heading text-sm font-medium" style={{ color: "var(--cream)" }}>
                    {t.name}
                  </p>
                  <p className="font-heading text-xs" style={{ color: "rgba(138,158,143,0.7)" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}