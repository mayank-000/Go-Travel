import Link from "next/link";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
    alt: "Hands shaping clay",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&q=80",
    alt: "Culinary craft",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&q=80",
    alt: "Ocean surfing",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
    alt: "Mountain landscape",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    alt: "Artisan at work",
    span: "",
  },
];

export default function GalleryTeaser() {
  return (
    <section style={{ backgroundColor: "var(--cream)" }}>

      {/* Tension line */}
      <div
        className="py-24 md:py-32 text-center border-b"
        style={{ borderColor: "rgba(219,175,132,0.18)" }}
      >
        <h2
          className="font-serif italic px-6"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            color: "var(--navy)",
            lineHeight: 1.25,
          }}
        >
          You have been everywhere.
          <br />
          But have you ever truly{" "}
          <span style={{ color: "var(--ochre)" }}>arrived?</span>
        </h2>
      </div>

      {/* Gallery section */}
      <div className="juno-container py-24 md:py-32">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span
              className="font-heading text-[9px] tracking-[0.35em] uppercase block mb-3"
              style={{ color: "var(--sage)" }}
            >
              Gallery
            </span>
            <p
              className="font-heading text-base md:text-lg"
              style={{ color: "rgba(44,44,44,0.65)", maxWidth: "420px", fontWeight: 300 }}
            >
              Ready to see the world JUNO opens up? Every image is a room you
              have not walked into yet.
            </p>
          </div>
          <Link
            href="/gallery"
            className="font-heading text-xs tracking-[0.2em] uppercase border-b pb-1 shrink-0 transition-opacity duration-300 hover:opacity-50"
            style={{ color: "var(--navy)", borderColor: "var(--ochre)" }}
          >
            View More →
          </Link>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 h-[420px] md:h-[520px]">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group ${img.span}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${img.src}')` }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: "rgba(27,59,87,0.25)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}