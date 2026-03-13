"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Trips", href: "/trips" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          backgroundColor: scrolled ? "rgba(252,250,233,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(219,175,132,0.18)" : "none",
        }}
      >
        <div className="juno-container flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span
              className="font-serif italic text-2xl tracking-wide"
              style={{ color: scrolled ? "var(--navy)" : "var(--cream)" }}
            >
              JUNO
            </span>
            <span
              className="font-heading text-[9px] tracking-[0.28em] uppercase"
              style={{ color: scrolled ? "var(--sage)" : "rgba(219,175,132,0.8)" }}
            >
              Journeys
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-heading text-[11px] tracking-[0.14em] uppercase relative group transition-opacity duration-300 hover:opacity-50"
                style={{ color: scrolled ? "var(--charcoal)" : "var(--cream)" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: "var(--ochre)" }}
                />
              </Link>
            ))}
          </div>

          {/* Right: CTA + burger */}
          <div className="flex items-center gap-6">
            <Link
              href="/invite"
              className="hidden md:inline-flex font-heading text-[11px] tracking-[0.18em] uppercase px-6 py-3 transition-all duration-300 hover:opacity-85"
              style={{
                backgroundColor: "var(--navy)",
                color: "var(--cream)",
              }}
            >
              Request Invite
            </Link>

            {/* Burger */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-px transition-all duration-300 origin-center"
                  style={{
                    backgroundColor: scrolled ? "var(--navy)" : "var(--cream)",
                    width: i === 1 ? "1.25rem" : "1.5rem",
                    transform:
                      menuOpen
                        ? i === 0
                          ? "rotate(45deg) translate(4px, 4px)"
                          : i === 2
                          ? "rotate(-45deg) translate(4px, -4px)"
                          : "scaleX(0)"
                        : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-7 md:hidden transition-all duration-500"
        style={{
          backgroundColor: "var(--navy)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-serif italic transition-all duration-300 hover:opacity-50"
            style={{
              fontSize: "clamp(2rem, 8vw, 2.8rem)",
              color: "var(--cream)",
              transitionDelay: menuOpen ? `${i * 55}ms` : "0ms",
              transform: menuOpen ? "translateY(0)" : "translateY(14px)",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/invite"
          onClick={() => setMenuOpen(false)}
          className="font-heading text-[11px] tracking-[0.22em] uppercase px-10 py-4 mt-4 transition-all duration-300 hover:opacity-80"
          style={{
            backgroundColor: "var(--ochre)",
            color: "var(--navy)",
            transitionDelay: menuOpen ? `${navLinks.length * 55}ms` : "0ms",
          }}
        >
          Request Invite
        </Link>
      </div>
    </>
  );
}