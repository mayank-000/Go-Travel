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
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname  = usePathname();
  const router    = useRouter();
  const isHome    = pathname === "/";
  const navRef    = useRef<HTMLElement>(null);

  /* ── Enhanced scroll shadow with gradient ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
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

  /* ── Close menu on route change - FIXED ── */
  useEffect(() => {
    // Use a timeout to avoid synchronous setState in effect
    const timer = setTimeout(() => {
      setMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

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
            ? "rgba(245,241,232,0.85)"
            : "rgba(245,241,232,0.6)",
          backdropFilter:       scrolled ? "blur(24px) saturate(1.2)" : "blur(12px) saturate(1.1)",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "blur(12px) saturate(1.1)",
          borderBottom: scrolled
            ? "1px solid rgba(139,101,63,0.25)"
            : "1px solid rgba(139,101,63,0.08)",
          boxShadow: scrolled 
            ? "0 8px 32px rgba(139,101,63,0.12)" 
            : "0 4px 16px rgba(139,101,63,0.04)",
        }}
      >
        {/* Ambient glow bar at top */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-60"
          style={{
            background: "linear-gradient(to right, transparent, var(--gold), transparent)",
          }}
        />

        <div className="juno-container flex items-center justify-between" style={{ height: "72px" }}>

          {/* ── Logo: JUNO with animation ── */}
          <button
            onClick={() => isHome ? smoothScrollTo(0, 900) : router.push("/")}
            className="flex items-center gap-3 bg-transparent border-none p-0 group"
            style={{ cursor: "none" }}
          >
            {/* Logo image with hover effect */}
            <div 
              className="relative overflow-hidden"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <img
                src="/JUNO_LOGO.png"
                alt="JUNO"
                className="group-hover:scale-110 group-hover:rotate-12"
                style={{
                  width:     "100%",
                  height:    "100%",
                  objectFit: "contain",
                  transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle, rgba(201,160,90,0.3) 0%, transparent 70%)",
                  transition: "opacity 0.4s ease",
                }}
              />
            </div>
            
            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span
                className="font-serif italic group-hover:text-ochre"
                style={{
                  fontSize:    "1.5rem",
                  letterSpacing: "0.04em",
                  color:       "var(--charcoal)",
                  transition:  "color 0.3s ease",
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
                  fontWeight:    600,
                }}
              >
                Journeys
              </span>
            </div>
          </button>

          {/* ── Desktop links with enhanced hover ── */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => {
              const isActive = isHome ? activeId === link.sectionId : pathname === link.href;
              const isHovered = hoveredLink === link.sectionId;
              
              return (
                <a
                  key={link.sectionId}
                  href={isHome ? `#${link.sectionId}` : link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                  onMouseEnter={() => setHoveredLink(link.sectionId)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="font-heading relative group"
                  style={{
                    fontSize:      "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--ochre)" : "var(--charcoal)",
                    textDecoration: "none",
                    transition:    "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                    fontWeight:    isActive ? 600 : 500,
                    opacity:       isActive ? 1 : 0.7,
                    transform:     isHovered ? "translateY(-2px)" : "translateY(0)",
                  }}
                >
                  {link.label}
                  
                  {/* Active indicator - animated dot */}
                  {isActive && (
                    <span
                      className="nav-active-dot"
                      style={{
                        position: "absolute",
                        top: "-8px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        backgroundColor: "var(--ochre)",
                        boxShadow: "0 0 8px rgba(201,160,90,0.6)",
                      }}
                    />
                  )}
                  
                  {/* Active underline */}
                  <span
                    style={{
                      position:        "absolute",
                      bottom:          "-6px",
                      left:            0,
                      height:          "2px",
                      width:           isActive ? "100%" : "0%",
                      backgroundColor: "var(--ochre)",
                      transition:      "width 0.4s cubic-bezier(0.16,1,0.3,1)",
                      boxShadow:       isActive ? "0 2px 8px rgba(201,160,90,0.3)" : "none",
                    }}
                  />
                  
                  {/* Hover underline */}
                  <span
                    className="group-hover:w-full"
                    style={{
                      position:        "absolute",
                      bottom:          "-6px",
                      left:            0,
                      height:          "1px",
                      width:           "0%",
                      backgroundColor: "var(--ochre)",
                      opacity:         0.4,
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
              className="hidden md:inline-flex font-heading items-center gap-2 group relative overflow-hidden"
              style={{
                fontSize:        "9px",
                letterSpacing:   "0.22em",
                textTransform:   "uppercase",
                padding:         "0.8rem 2rem",
                background:      "var(--ochre)",
                color:           "var(--cream)",
                fontWeight:      600,
                textDecoration:  "none",
                transition:      "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                boxShadow:       "0 4px 16px rgba(139,101,63,0.2)",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.transform   = "translateY(-2px) scale(1.02)";
                target.style.boxShadow   = "0 8px 24px rgba(139,101,63,0.35)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.transform   = "translateY(0) scale(1)";
                target.style.boxShadow   = "0 4px 16px rgba(139,101,63,0.2)";
              }}
            >
              <span className="relative z-10">Request Invite</span>
              
              <div className="nav-cta-shine" />
            </a>

            {/* Burger with animation */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] bg-transparent border-none relative"
              style={{ width: "32px", height: "32px", cursor: "none" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block transition-all duration-400 origin-center"
                  style={{
                    height:          "2px",
                    backgroundColor: "var(--charcoal)",
                    width:     i === 1 ? "22px" : "28px",
                    transform: menuOpen
                      ? i === 0 ? "rotate(45deg) translate(5px,5px)"
                      : i === 2 ? "rotate(-45deg) translate(5px,-5px)"
                      : "scaleX(0)"
                      : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Bottom glow effect */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-40"
          style={{
            background: "linear-gradient(to right, transparent, rgba(139,101,63,0.3), transparent)",
          }}
        />
      </nav>

      {/* ── Mobile fullscreen menu with animations ── */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-6 md:hidden"
        style={{
          backgroundColor: "var(--cream)",
          opacity:         menuOpen ? 1 : 0,
          pointerEvents:   menuOpen ? "all" : "none",
          transition:      "opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Decorative circles in background */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ opacity: 0.15 }}
        >
          <div
            className="absolute"
            style={{
              top: "10%",
              right: "5%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              border: "1px solid var(--ochre)",
              transform: menuOpen ? "scale(1)" : "scale(0)",
              transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: "15%",
              left: "10%",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              border: "1px solid var(--ochre)",
              transform: menuOpen ? "scale(1)" : "scale(0)",
              transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          />
        </div>

        {/* Logo in menu */}
        <div 
          className="flex items-center gap-3 mb-6"
          style={{
            transform: menuOpen ? "scale(1)" : "scale(0.8)",
            opacity: menuOpen ? 1 : 0,
            transition: "all 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          <img
            src="/JUNO_LOGO.png"
            alt="JUNO"
            style={{ 
              width: "40px", 
              height: "40px", 
              objectFit: "contain",
            }}
          />
          <span className="font-serif italic text-2xl" style={{ color: "var(--charcoal)" }}>
            JUNO
          </span>
        </div>

        {navLinks.map((link, i) => (
          <a
            key={link.sectionId}
            href={isHome ? `#${link.sectionId}` : link.href}
            onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
            className="font-serif italic relative group"
            style={{
              fontSize:        "clamp(1.8rem, 7vw, 2.6rem)",
              color:           activeId === link.sectionId ? "var(--ochre)" : "var(--charcoal)",
              textDecoration:  "none",
              transform:       menuOpen ? "translateY(0)" : "translateY(30px)",
              opacity:         menuOpen ? 1 : 0,
              transition:      `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
            }}
          >
            {link.label}
            <span
              className="absolute left-0 bottom-0 h-0.5 w-0 group-hover:w-full bg-ochre"
              style={{ transition: "width 0.4s ease" }}
            />
          </a>
        ))}

        <a
          href={isHome ? "#contact" : "/contact"}
          onClick={(e) => handleNavClick(e, "/contact", "contact")}
          className="font-heading mt-4 relative overflow-hidden group"
          style={{
            fontSize:        "10px",
            letterSpacing:   "0.25em",
            textTransform:   "uppercase",
            padding:         "1.2rem 3rem",
            background:      "var(--ochre)",
            color:           "var(--cream)",
            fontWeight:      600,
            textDecoration:  "none",
            opacity:         menuOpen ? 1 : 0,
            transform:       menuOpen ? "translateY(0)" : "translateY(20px)",
            transition:      `all 0.5s cubic-bezier(0.16,1,0.3,1) ${navLinks.length * 0.08}s`,
            boxShadow:       "0 8px 24px rgba(139,101,63,0.25)",
          }}
        >
          <span className="relative z-10">Request Invite</span>
          <div
            className="absolute inset-0 bg-ochre-dark opacity-0 group-hover:opacity-100"
            style={{ transition: "opacity 0.3s ease" }}
          />
        </a>
      </div>

      <style jsx>{`
        .nav-active-dot {
          animation: pulse 2s ease-in-out infinite;
        }

        .nav-cta-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: translateX(-100%);
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .group:hover .nav-cta-shine {
          opacity: 1;
          animation: shine 0.6s ease forwards;
        }

        @keyframes pulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 1; }
          50% { transform: translateX(-50%) scale(1.2); opacity: 0.8; }
        }

        @keyframes shine {
          to { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}