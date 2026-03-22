"use client";

import { useEffect } from "react";

/**
 * CursorManager - Global cursor handler (OPTIMIZED)
 * Uses requestAnimationFrame for smooth 60fps cursor tracking
 * Only runs on desktop (hover: hover) devices
 */
export default function CursorManager() {
  useEffect(() => {
    // Check if device supports hover (desktop only)
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;

    const cursor = document.getElementById("juno-cursor");
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateCursor = () => {
      // Direct DOM update - fastest method
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      rafId = requestAnimationFrame(updateCursor);
    };

    // Add hover class to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], [onclick]'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
      });
    };

    // Initialize
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateCursor);
    addHoverListeners();

    // Re-add listeners when DOM changes (for dynamic content)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return null;
}