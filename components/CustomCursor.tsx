"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [cursorState, setCursorState] = useState<{
    text: string;
    variant: "default" | "link" | "play" | "view" | "drag";
  }>({
    text: "",
    variant: "default",
  });

  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    // Only enable on devices with a mouse / precision pointer
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsPointerDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isPointerDevice || !cursorRef.current || !ringRef.current) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;

    // Zero-lag physics tracking with gsap.quickTo
    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3.out" });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([cursor, ring], { opacity: 1, duration: 0.3 });
        isVisible = true;
      }

      cursorX(e.clientX);
      cursorY(e.clientY);

      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, ring], { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    // Delegate hover listeners for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorEl = target.closest("[data-cursor]") as HTMLElement;
      const clickableEl = target.closest("a, button, input, select, textarea, [role='button']") as HTMLElement;

      if (cursorEl) {
        const type = cursorEl.getAttribute("data-cursor");
        if (type === "play") {
          setCursorState({ text: "PLAY", variant: "play" });
        } else if (type === "view") {
          setCursorState({ text: "VIEW", variant: "view" });
        } else if (type === "drag") {
          setCursorState({ text: "DRAG", variant: "drag" });
        }
      } else if (clickableEl) {
        setCursorState({ text: "", variant: "link" });
      } else {
        setCursorState({ text: "", variant: "default" });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isPointerDevice]);

  // Animate ring size and styling based on state
  useEffect(() => {
    if (!ringRef.current || !cursorRef.current) return;

    if (cursorState.variant === "play") {
      gsap.to(ringRef.current, {
        width: 68,
        height: 68,
        backgroundColor: "rgba(243, 110, 63, 0.9)",
        borderColor: "rgba(240, 237, 204, 0.8)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 });
    } else if (cursorState.variant === "view") {
      gsap.to(ringRef.current, {
        width: 64,
        height: 64,
        backgroundColor: "rgba(29, 29, 2, 0.85)",
        borderColor: "rgba(240, 237, 204, 0.7)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 });
    } else if (cursorState.variant === "link") {
      gsap.to(ringRef.current, {
        width: 44,
        height: 44,
        backgroundColor: "rgba(240, 237, 204, 0.12)",
        borderColor: "rgba(240, 237, 204, 0.5)",
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(cursorRef.current, {
        scale: 0.4,
        opacity: 0.6,
        duration: 0.2,
      });
    } else {
      gsap.to(ringRef.current, {
        width: 28,
        height: 28,
        backgroundColor: "transparent",
        borderColor: "rgba(240, 237, 204, 0.4)",
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(cursorRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
      });
    }
  }, [cursorState]);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* Outer Magnetic Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-9999 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F0EDCC]/40 flex items-center justify-center opacity-0 will-change-transform shadow-sm"
        style={{ width: 28, height: 28 }}
      >
        {cursorState.text && (
          <span
            ref={labelRef}
            className="font-mono-tag text-[10px] uppercase font-bold text-[#F0EDCC] tracking-wider select-none"
          >
            {cursorState.text}
          </span>
        )}
      </div>

      {/* Center Precise Dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-9999 -translate-x-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-[#F36E3F] opacity-0 will-change-transform"
      />
    </>
  );
}
