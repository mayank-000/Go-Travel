"use client";

import { useEffect, useRef, ReactNode } from "react";

/**
 * ScrollFader v2 — Framer-style scroll reveal
 *
 * Each direct child section:
 *  - Starts below viewport: blurred, faded, slightly scaled down
 *  - On scroll into view: springs into full clarity
 *  - Already-read sections: stay fully clear (no re-hiding)
 *
 * Uses a requestAnimationFrame loop for buttery 60fps updates.
 * Pairs with Lenis smooth scroll for best results.
 */
export default function ScrollFader({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = wrapperRef.current
      ? (Array.from(wrapperRef.current.children) as HTMLElement[])
      : [];
    if (!sections.length) return;

    /* Track which sections have been revealed */
    const revealed = new Set<HTMLElement>();

    let rafId: number;

    const tick = () => {
      const vh = window.innerHeight;

      sections.forEach((section) => {
        if (revealed.has(section)) return; /* already revealed, skip */

        const rect          = section.getBoundingClientRect();
        const distanceBelow = rect.top / vh; /* 1 = 1 screen below, 0 = at top */

        if (distanceBelow <= 0.05) {
          /* Fully in view — snap to revealed state */
          section.style.filter    = "blur(0px)";
          section.style.opacity   = "1";
          section.style.transform = "translateY(0px) scale(1)";
          revealed.add(section);
          return;
        }

        if (distanceBelow > 1.2) {
          /* Far below — just hide cheaply, no transition */
          section.style.transition = "none";
          section.style.filter    = "blur(6px)";
          section.style.opacity   = "0";
          section.style.transform = "translateY(48px) scale(0.985)";
          return;
        }

        /* In the "approaching" zone: animate in */
        const t = Math.min(1, distanceBelow);
        section.style.filter    = `blur(${(t * 3).toFixed(1)}px)`;
        section.style.opacity   = String(Math.max(0, 1 - t * 0.85));
        section.style.transform = `translateY(${(t * 48).toFixed(1)}px) scale(${1 - t * 0.015})`;
      });

      rafId = requestAnimationFrame(tick);
    };

    sections.forEach((s) => {
      s.style.transition  = "filter 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";
      s.style.willChange  = "filter, opacity, transform";
    });

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}