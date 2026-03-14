"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { label: "About",          href: "/about",   sectionId: "about"     },
  { label: "Upcoming Trips", href: "/trips",   sectionId: "trips"     },
  { label: "Gallery",        href: "/gallery", sectionId: "gallery"   },
  { label: "Blog",           href: "/blog",    sectionId: "blog"      },
  { label: "FAQ",            href: "/faq",     sectionId: "faq"       },
  { label: "Contact",        href: "/contact", sectionId: "contact"   },
];

/** Smooth scroll with a slow, elegant custom ease — not the default browser snap */
function smoothScrollTo(targetY: number, duration = 1100) {
  const startY  = window.scrollY;
  const dist    = targetY - startY;
  const startT  = performance.now();

  // Ease in-out cubic
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    const elapsed  = now - startT;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + dist * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH   = 80; // navbar height
  const top    = el.getBoundingClientRect().top + window.scrollY - navH;
  smoothScrollTo(top, 1200);
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeId,  setActiveId]  = useState("");
  const pathname  = usePathname();
  const router    = useRouter();
  const isHome    = pathname === "/";

  /* ── Navbar background on scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Track which section is in view (home only) ── */
  useEffect(() => {
    if (!isHome) return;
    const ids = navLinks.map((l) => l.sectionId);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [isHome]);

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Close mobile menu on route change ── */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const forceLight = !isHome || scrolled;

  const handleNavClick = (
    e: React.MouseEvent,
    href: string,
    sectionId: string
  ) => {
    if (isHome) {
      e.preventDefault();
      setMenuOpen(false);
      scrollToSection(sectionId);
    } else {
      // Navigate to home then scroll after load
      e.preventDefault();
      router.push(`/#${sectionId}`);
    }
  };

  /* ── Handle hash on initial load (when navigating from another page) ── */
  useEffect(() => {
    if (!isHome) return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => scrollToSection(hash), 400);
    }
  }, [isHome]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          backgroundColor: forceLight ? "rgba(247,243,234,0.96)" : "transparent",
          backdropFilter:  forceLight ? "blur(18px)"              : "none",
          WebkitBackdropFilter: forceLight ? "blur(18px)"         : "none",
          borderBottom:    forceLight
            ? "1px solid rgba(201,139,45,0.15)"
            : "none",
        }}
      >
        <div className="juno-container flex items-center justify-between h-20">

          {/* Logo */}
          <button
            onClick={() => isHome ? smoothScrollTo(0, 900) : router.push("/")}
            className="flex flex-col leading-none bg-transparent border-none cursor-pointer"
          >
            <span
              className="font-serif italic text-2xl tracking-wide"
              style={{ color: forceLight ? "var(--navy)" : "var(--cream)" }}
            >
              JUNO
            </span>
            <span
              className="font-heading text-[9px] tracking-[0.28em] uppercase"
              style={{ color: forceLight ? "var(--sage)" : "rgba(212,165,116,0.8)" }}
            >
              Journeys
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isHome
                ? activeId === link.sectionId
                : pathname === link.href;

              return (
                <a
                  key={link.sectionId}
                  href={isHome ? `#${link.sectionId}` : link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                  className="font-heading text-[11px] tracking-[0.14em] uppercase relative group transition-opacity duration-300 hover:opacity-50"
                  style={{
                    color:          forceLight ? "var(--charcoal)" : "var(--cream)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                  {/* Active / hover underline */}
                  <span
                    className="absolute -bottom-1 left-0 h-px transition-all duration-400"
                    style={{
                      width:           isActive ? "100%" : "0%",
                      backgroundColor: "var(--ochre)",
                    }}
                  />
                  {!isActive && (
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                      style={{ backgroundColor: "var(--ochre)" }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA + Burger */}
          <div className="flex items-center gap-5">
            <a
              href={isHome ? "#contact" : "/contact"}
              onClick={(e) => handleNavClick(e, "/contact", "contact")}
              className="hidden md:inline-flex font-heading text-[11px] tracking-[0.18em] uppercase px-6 py-3 transition-all duration-300 hover:opacity-80"
              style={{
                backgroundColor: "var(--navy)",
                color:           "var(--cream)",
                textDecoration:  "none",
              }}
            >
              Request Invite
            </a>

            <button
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 bg-transparent border-none cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-px transition-all duration-300 origin-center"
                  style={{
                    backgroundColor: forceLight ? "var(--navy)" : "var(--cream)",
                    width:   i === 1 ? "1.2rem" : "1.5rem",
                    transform:
                      menuOpen
                        ? i === 0 ? "rotate(45deg) translate(4px,4px)"
                        : i === 2 ? "rotate(-45deg) translate(4px,-4px)"
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
        className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-6 md:hidden"
        style={{
          backgroundColor: "var(--navy)",
          opacity:         menuOpen ? 1 : 0,
          pointerEvents:   menuOpen ? "all" : "none",
          transition:      "opacity 0.45s ease",
        }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.sectionId}
            href={isHome ? `#${link.sectionId}` : link.href}
            onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
            className="font-serif italic"
            style={{
              fontSize:        "clamp(2rem, 8vw, 2.8rem)",
              color:           activeId === link.sectionId ? "var(--ochre)" : "var(--cream)",
              textDecoration:  "none",
              transform:                menuOpen ? "translateY(0)" : "translateY(14px)",
              opacity:                  menuOpen ? 1 : 0,
              transitionProperty:       "transform, opacity, color",
              transitionDuration:       "0.4s, 0.4s, 0.3s",
              transitionTimingFunction: "ease, ease, ease",
              transitionDelay:          menuOpen ? `${i * 55}ms` : "0ms",
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href={isHome ? "#contact" : "/contact"}
          onClick={(e) => handleNavClick(e, "/contact", "contact")}
          className="font-heading text-[11px] tracking-[0.22em] uppercase px-10 py-4 mt-4"
          style={{
            backgroundColor: "var(--ochre)",
            color:           "var(--navy)",
            textDecoration:  "none",
            opacity:                  menuOpen ? 1 : 0,
            transitionProperty:       "opacity",
            transitionDuration:       "0.4s",
            transitionTimingFunction: "ease",
            transitionDelay:          menuOpen ? `${navLinks.length * 55}ms` : "0ms",
          }}
        >
          Request Invite
        </a>
      </div>
    </>
  );
}