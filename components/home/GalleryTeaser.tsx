"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });

      if (lightRef.current) {
        lightRef.current.style.left = `${e.clientX}px`;
        lightRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = cardsRef.current?.querySelectorAll(".gallery-card");
      if (!cards?.length) return;

      gsap.fromTo(
        ".gallery-title",
        { y: 100, opacity: 0 },
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

      gsap.fromTo(
        cards,
        { y: 200, opacity: 0, scale: 0.6, rotateX: 45, filter: "blur(20px)" },
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
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px);   opacity: 0.15; }
          50%       { transform: translateY(-28px); opacity: 0.3;  }
        }
        @keyframes shine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(220%);  }
        }
      `}</style>

      {/* Ambient glow — grows on scroll */}
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

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width:           "6px",
              height:          "6px",
              left:            `${10 + i * 6}%`,
              top:             `${20 + (i % 4) * 20}%`,
              background:      "var(--ochre)",
              opacity:         0.15,
              animation:       `float ${3 + i * 0.4}s ease-in-out infinite`,
              animationDelay:  `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height:    "2px",
          background: "linear-gradient(to right, transparent, var(--ochre), transparent)",
          boxShadow: "0 0 20px rgba(201,160,90,0.3)",
        }}
      />

      <div
        className="juno-container text-center flex flex-col items-center relative z-10"
        style={{ gap: "2rem" }}
      >
        {/* Eyebrow */}
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

        {/* Heading */}
        <h2
          className="font-serif gallery-title"
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
          className="font-heading mx-auto gallery-title"
          style={{
            fontSize: "clamp(1rem,1.4vw,1.1rem)",
            color: "var(--charcoal)",
            opacity: 0.75,
            maxWidth: "500px",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Every photograph holds a world. Step closer.
        </p>

        {/* Grid - 2 columns on mobile, 4 on desktop */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
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

        {/* CTA button */}
        <div className="text-center" style={{ marginTop: "clamp(4rem,8vw,6rem)" }}>
          <Link
            href="/gallery"
            className="font-heading inline-flex items-center gap-3 group relative overflow-hidden gallery-cta-button"
            style={{
              fontSize: "clamp(10px,1.1vw,11px)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--cream)",
              fontWeight: 600,
              padding: "1.3rem 3.2rem",
              border: "2px solid var(--ochre)",
              background: "var(--ochre)",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              boxShadow: "0 8px 32px rgba(139,101,63,0.3)",
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.transform = "translateY(-4px) scale(1.03)";
              target.style.boxShadow = "0 16px 48px rgba(139,101,63,0.4)";
              target.style.background = "var(--ochre-dark)";
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.transform = "translateY(0) scale(1)";
              target.style.boxShadow = "0 8px 32px rgba(139,101,63,0.3)";
              target.style.background = "var(--ochre)";
            }}
          >
            <>
              <span className="cta-text">Explore Gallery</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="group-hover:translate-x-1 transition-transform duration-300 cta-arrow"
              >
                <path
                  d="M1 8h14M9 2l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              
              <div className="cta-shine" />
            </>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .cta-text {
          position: relative;
          z-index: 1;
        }

        .cta-arrow {
          position: relative;
          z-index: 1;
        }

        .cta-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          animation: shine 3s ease-in-out infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
}

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
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(checkTouch);
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;
    
    // MAGNETIC EFFECT - Works on both desktop AND mobile now
    const depth = (index % 3) + 1;
    
    const moveX = (mousePos.x - 0.5) * depth * 30;    
    const moveY = (mousePos.y - 0.5) * depth * 20;  

    if (!isHovered) {
      cardRef.current.style.transform = `
        translateX(${moveX}px) 
        translateY(${moveY}px) 
        translateZ(${depth * 10}px)
      `;
    }
  }, [mousePos, index, isHovered]);

  // Touch handlers for mobile
  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="gallery-card group cursor-pointer"
      style={{
        position: "relative",
        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 35%, transparent 55%)",
            transition: "opacity 0.4s ease",
          }}
        />

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