"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ────────────────────────────────────────────────────────────
   GalleryTeaser — Magnetic Floating Cards
   
   A completely different approach:
   - Cards float in 3D space with parallax depth
   - Magnetic hover effects pull cards toward cursor
   - Dramatic sequential reveals with blur & scale
   - Ambient lighting that follows mouse
──────────────────────────────────────────────────────────── */

const images = [
  { src: "/desertP2.jpg",       alt: "Salt flats at dawn",      label: "Kutch, Gujarat" },
  { src: "/trekkingWibeP4.jpg", alt: "High Atlas trails",       label: "Morocco" },
  { src: "/mountainP1.jpg",     alt: "Cedar forest at altitude",label: "Himachal" },
  { src: "/beachP3.jpg",        alt: "Atlantic coast",          label: "Basque Country" },
  {
    src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80",
    alt: "Open fire dinner",
    label: "Oaxaca",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    alt: "Mountain landscape",
    label: "Patagonia",
  },
  {
    src: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80",
    alt: "Desert dunes",
    label: "Sahara",
  },
  {
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
    alt: "Sunset landscape",
    label: "Iceland",
  },
];

export default function GalleryTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });

      // Move ambient light
      if (lightRef.current) {
        lightRef.current.style.left = `${e.clientX}px`;
        lightRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP scroll animation
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = cardsRef.current?.querySelectorAll(".gallery-card");
      if (!cards?.length) return;

      // Title reveal
      gsap.fromTo(
        ".gallery-title",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

      // Cards cascade in with dramatic effect
      gsap.fromTo(
        cards,
        {
          y: 200,
          opacity: 0,
          scale: 0.6,
          rotateX: 45,
          filter: "blur(20px)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
          },
        }
      );
    };
    run();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--cream)",
        paddingTop: "clamp(4rem,8vw,7rem)",
        paddingBottom: "clamp(4rem,8vw,7rem)",
        perspective: "2000px",
      }}
    >
      {/* Ambient light that follows cursor */}
      <div
        ref={lightRef}
        className="fixed pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(201,160,90,0.15) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(80px)",
          transition: "left 0.3s ease, top 0.3s ease",
          zIndex: 1,
        }}
      />

      <div className="juno-container relative" style={{ zIndex: 2 }}>
        {/* Title Section */}
        <div className="text-center mb-12 gallery-title">
          <span
            className="font-heading block mb-4"
            style={{
              fontSize: "clamp(10px,1.1vw,12px)",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "var(--ochre)",
              fontWeight: 600,
            }}
          >
            Visual Stories
          </span>

          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(3rem,7vw,7rem)",
              lineHeight: 0.95,
              color: "var(--charcoal)",
              fontWeight: 400,
              marginBottom: "1.5rem",
            }}
          >
            Moments that
            <br />
            <em style={{ color: "var(--ochre)", fontStyle: "italic" }}>breathe</em>
          </h2>

          <p
            className="font-heading mx-auto"
            style={{
              fontSize: "clamp(1rem,1.4vw,1.1rem)",
              color: "var(--text-secondary)",
              maxWidth: "500px",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Every photograph holds a world. Step closer.
          </p>
        </div>

        {/* Floating Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {images.map((img, i) => (
            <FloatingCard
              key={i}
              image={img}
              index={i}
              mousePos={mousePos}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center" style={{ marginTop: "clamp(4rem,8vw,6rem)" }}>
          <Link
            href="/gallery"
            className="font-heading inline-flex items-center gap-3 group"
            style={{
              fontSize: "clamp(10px,1.1vw,11px)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--ochre)",
              fontWeight: 600,
              padding: "1.2rem 2.8rem",
              border: "2px solid var(--ochre)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--cream)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--ochre-dark)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--ochre)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--ochre)";
            }}
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-ochre to-ochre-dark"
              style={{
                transform: "translateX(-100%)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                zIndex: -1,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>Explore Gallery</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
              className="group-hover:translate-x-1"
            >
              <path
                d="M1 8h14M9 2l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Floating Card Component ── */
function FloatingCard({
  image,
  index,
  mousePos,
}: {
  image: { src: string; alt: string; label: string };
  index: number;
  mousePos: { x: number; y: number };
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax depth based on mouse position
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Disable parallax on mobile/touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    
    const depth = (index % 3) + 1; // Different depth layers
    const moveX = (mousePos.x - 0.5) * depth * 20;
    const moveY = (mousePos.y - 0.5) * depth * 15;

    if (!isHovered) {
      cardRef.current.style.transform = `
        translateX(${moveX}px) 
        translateY(${moveY}px) 
        translateZ(${depth * 10}px)
      `;
    }
  }, [mousePos, index, isHovered]);

  return (
    <div
      ref={cardRef}
      className="gallery-card group cursor-pointer"
      style={{
        position: "relative",
        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          overflow: "hidden",
          borderRadius: "2px",
          boxShadow: isHovered
            ? "0 30px 80px rgba(0,0,0,0.3)"
            : "0 10px 40px rgba(0,0,0,0.15)",
          transition: "box-shadow 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${image.src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: isHovered ? "scale(1.03)" : "scale(1)",
            transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 35%, transparent 55%)",
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Label */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            padding: "clamp(1rem,4vw,1.5rem) clamp(1rem,4vw,1.5rem) clamp(1.5rem,5vw,2rem)",
            transform: "translateY(0)",
            opacity: 1,
            transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span
            className="font-heading block"
            style={{
              fontSize: "clamp(10px,1.1vw,12px)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--cream)",
              fontWeight: 600,
              textShadow: "0 3px 12px rgba(0,0,0,0.9)",
              lineHeight: 1.3,
            }}
          >
            {image.label}
          </span>
        </div>

        {/* Shine effect on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
    </div>
  );
}