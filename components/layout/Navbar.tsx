"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { label: "About",          href: "/about",   sectionId: "about"   },
  { label: "Journeys",       href: "/trips",   sectionId: "trips"   },
  { label: "Gallery",        href: "/gallery", sectionId: "gallery" },
  { label: "Blog",           href: "/blog",    sectionId: "blog"    },
  { label: "FAQ",            href: "/faq",     sectionId: "faq"     },
  { label: "Contact",        href: "/contact", sectionId: "contact" },
];

function smoothScrollTo(targetY: number, duration = 1100) {
  const startY = window.scrollY;
  const dist   = targetY - startY;
  const startT = performance.now();
  const ease   = (t: number) =>
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
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  smoothScrollTo(top, 1200);
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeId,  setActiveId]  = useState("");
  const pathname  = usePathname();
  const router    = useRouter();
  const isHome    = pathname === "/";
  const navRef    = useRef<HTMLElement>(null);

  /* ── scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── section active tracking ── */
  useEffect(() => {
    if (!isHome) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navLinks.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const handleNavClick = (e: React.MouseEvent, href: string, sectionId: string) => {
    if (isHome) {
      e.preventDefault();
      setMenuOpen(false);
      scrollToSection(sectionId);
    } else {
      e.preventDefault();
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <>
      {/* ── Custom cursor dot ── */}
      <div id="juno-cursor" />

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          backgroundColor: scrolled
            ? "rgba(245,241,232,0.95)"
            : "transparent",
          backdropFilter:       scrolled ? "blur(20px) saturate(1.1)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.1)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(139,101,63,0.15)"
            : "none",
        }}
      >
        <div className="juno-container flex items-center justify-between" style={{ height: "72px" }}>

          {/* ── Logo: JUNO with original colors ── */}
          <button
            onClick={() => isHome ? smoothScrollTo(0, 900) : router.push("/")}
            className="flex items-center gap-3 bg-transparent border-none p-0"
            style={{ cursor: "none" }}
          >
            {/* Logo image - no filter, show as-is */}
            <img
              src="/JUNO_LOGO.png"
              alt="JUNO"
              style={{
                width:     "44px",
                height:    "44px",
                objectFit: "contain",
              }}
            />
            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span
                className="font-serif italic"
                style={{
                  fontSize:    "1.5rem",
                  letterSpacing: "0.04em",
                  color:       "var(--text-primary)",
                }}
              >
                JUNO
              </span>
              <span
                className="font-heading"
                style={{
                  fontSize:      "7px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color:         "var(--ochre)",
                  marginTop:     "1px",
                  fontWeight:    500,
                }}
              >
                Journeys
              </span>
            </div>
          </button>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => {
              const isActive = isHome ? activeId === link.sectionId : pathname === link.href;
              return (
                <a
                  key={link.sectionId}
                  href={isHome ? `#${link.sectionId}` : link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                  className="font-heading relative group"
                  style={{
                    fontSize:      "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--ochre)" : "var(--text-secondary)",
                    textDecoration: "none",
                    transition:    "color 0.3s ease",
                    fontWeight:    isActive ? 500 : 400,
                  }}
                  onMouseEnter={(e) => { 
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; 
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = isActive
                      ? "var(--ochre)"
                      : "var(--text-secondary)";
                  }}
                >
                  {link.label}
                  {/* Active underline */}
                  <span
                    style={{
                      position:        "absolute",
                      bottom:          "-4px",
                      left:            0,
                      height:          "1.5px",
                      width:           isActive ? "100%" : "0%",
                      backgroundColor: "var(--ochre)",
                      transition:      "width 0.35s ease",
                    }}
                  />
                  {/* Hover underline */}
                  <span
                    className="group-hover:w-full"
                    style={{
                      position:        "absolute",
                      bottom:          "-4px",
                      left:            0,
                      height:          "1px",
                      width:           "0%",
                      backgroundColor: "rgba(139,101,63,0.35)",
                      transition:      "width 0.3s ease",
                    }}
                  />
                </a>
              );
            })}
          </div>

          {/* ── CTA + Burger ── */}
          <div className="flex items-center gap-5">
            <a
              href={isHome ? "#contact" : "/contact"}
              onClick={(e) => handleNavClick(e, "/contact", "contact")}
              className="hidden md:inline-flex font-heading items-center gap-2"
              style={{
                fontSize:        "9px",
                letterSpacing:   "0.22em",
                textTransform:   "uppercase",
                padding:         "0.7rem 1.6rem",
                background:      "var(--ochre)",
                color:           "var(--cream)",
                fontWeight:      600,
                textDecoration:  "none",
                transition:      "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background  = "var(--ochre-dark)";
                (e.currentTarget as HTMLElement).style.transform   = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background  = "var(--ochre)";
                (e.currentTarget as HTMLElement).style.transform   = "translateY(0)";
              }}
            >
              Request Invite
            </a>

            {/* Burger */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] bg-transparent border-none"
              style={{ width: "32px", height: "32px", cursor: "none" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block transition-all duration-300 origin-center"
                  style={{
                    height:          "1.5px",
                    backgroundColor: "var(--text-primary)",
                    width:     i === 1 ? "18px" : "24px",
                    transform: menuOpen
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

      {/* ── Mobile fullscreen menu ── */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-6 md:hidden"
        style={{
          backgroundColor: "var(--cream)",
          opacity:         menuOpen ? 1 : 0,
          pointerEvents:   menuOpen ? "all" : "none",
          transition:      "opacity 0.45s ease",
        }}
      >
        {/* Logo in menu - original colors */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/JUNO_LOGO.png"
            alt="JUNO"
            style={{ 
              width: "40px", 
              height: "40px", 
              objectFit: "contain",
            }}
          />
          <span className="font-serif italic text-2xl" style={{ color: "var(--text-primary)" }}>
            JUNO
          </span>
        </div>

        {navLinks.map((link, i) => (
          <a
            key={link.sectionId}
            href={isHome ? `#${link.sectionId}` : link.href}
            onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
            className="font-serif italic"
            style={{
              fontSize:        "clamp(1.8rem, 7vw, 2.6rem)",
              color:           activeId === link.sectionId ? "var(--ochre)" : "var(--text-primary)",
              textDecoration:  "none",
              transform:       menuOpen ? "translateY(0)" : "translateY(16px)",
              opacity:         menuOpen ? 1 : 0,
              transition:      `transform 0.4s ease ${i * 55}ms, opacity 0.4s ease ${i * 55}ms, color 0.3s ease`,
            }}
          >
            {link.label}
          </a>
        ))}

        <a
          href={isHome ? "#contact" : "/contact"}
          onClick={(e) => handleNavClick(e, "/contact", "contact")}
          className="font-heading mt-4"
          style={{
            fontSize:        "10px",
            letterSpacing:   "0.25em",
            textTransform:   "uppercase",
            padding:         "1rem 2.5rem",
            background:      "var(--ochre)",
            color:           "var(--cream)",
            fontWeight:      600,
            textDecoration:  "none",
            opacity:         menuOpen ? 1 : 0,
            transition:      `opacity 0.4s ease ${navLinks.length * 55}ms`,
          }}
        >
          Request Invite
        </a>
      </div>
    </>
  );
}