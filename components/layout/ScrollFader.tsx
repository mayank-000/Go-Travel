"use client";

import { useEffect, useRef, ReactNode } from "react";

/**
 * ScrollFader
 * Each child section starts blurred + slightly faded when it's below the viewport.
 * As you scroll into it, it sharpens and reveals — like lifting a veil.
 * Sections already read stay fully sharp. Only what's coming stays mysterious.
 */
export default function ScrollFader({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = wrapperRef.current
      ? (Array.from(wrapperRef.current.children) as HTMLElement[])
      : [];
    if (!sections.length) return;

    const tick = () => {
      const vh = window.innerHeight;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        // distanceBelow: 1 when top is exactly at bottom of viewport, 0 when at top of viewport
        const distanceBelow = rect.top / vh;

        if (distanceBelow > 0) {
          // Still below — blur proportionally (max blur when 1 screen away, 0 when entering)
          const t         = Math.min(1, distanceBelow);
          section.style.filter    = `blur(${(t * 0.2).toFixed(1)}px)`;
          section.style.opacity   = String(1 - t * 0.5);
          section.style.transform = `translateY(${(t * 32).toFixed(0)}px)`;
        } else {
          // In view or above — fully clear
          section.style.filter    = "blur(0px)";
          section.style.opacity   = "1";
          section.style.transform = "translateY(0px)";
        }

        section.style.transition = "filter 0.6s ease, opacity 0.6s ease, transform 0.6s ease";
        section.style.willChange = "filter, opacity, transform";
      });
    };

    window.addEventListener("scroll", tick, { passive: true });
    tick();
    return () => window.removeEventListener("scroll", tick);
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}