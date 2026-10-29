"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Signature Webflow masked text reveal & cinematic entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Background image cinematic reveal with smooth zoom-out
      tl.fromTo(
        bgRef.current,
        { scale: 1.18, opacity: 0.7 },
        { scale: 1.0, opacity: 1, duration: 2.4, ease: "power3.out" }
      )
        // 2. Masked headline lines rise up with subtle rotation
        .fromTo(
          [line1Ref.current, line2Ref.current],
          { yPercent: 125, rotateZ: 1.5, opacity: 0 },
          {
            yPercent: 0,
            rotateZ: 0,
            opacity: 1,
            duration: 1.35,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=1.9"
        )
        // 3. Subtitle fade & subtle slide
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
          "-=0.9"
        )
        // 4. Reserve Button elastic rise
        .fromTo(
          buttonWrapperRef.current,
          { opacity: 0, y: 24, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        );

      // Smooth background scroll parallax scrub (subtle image depth only, text stays visible)
      gsap.to(bgRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  const scrollToReservations = () => {
    smoothScrollTo("#reservations");
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-[749px] flex items-center justify-center overflow-hidden bg-[#1D1D02] pt-[67.28px]"
    >
      {/* Background Image: edge-to-edge full width (#6698:17705) */}
      <div ref={bgRef} className="absolute inset-0 z-0 w-full h-full will-change-transform">
        <Image
          src="/assets/hero_bg.png"
          alt="Atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
        {/* Figma rgba(37, 39, 20, 0.5) tint */}
        <div className="absolute inset-0 bg-[#252714]/50" />
      </div>

      {/* Hero Content (#6698:17717): centered, width 987.08, gap 32px */}
      <div className="relative z-10 w-full max-w-[987.08px] mx-auto px-6 flex flex-col items-center gap-[32px] text-center">
        {/* Inner Column (#6698:17716): gap 29px */}
        <div className="w-full flex flex-col items-center gap-[29px]">
          {/* Heading Container (#6698:17767): width 725, gap 20px */}
          <div className="w-full max-w-[725px] flex flex-col items-center">
            <h1 className="font-serif-title text-[#F0EDCC] text-5xl sm:text-7xl lg:text-[82px] leading-[1.0] uppercase tracking-normal">
              <span className="overflow-hidden block pb-1">
                <span ref={line1Ref} className="block will-change-transform">
                  A Celebration
                </span>
              </span>
              <span className="overflow-hidden block pb-1">
                <span ref={line2Ref} className="block will-change-transform">
                  of Flavor
                </span>
              </span>
            </h1>
          </div>

          {/* Subtitle (#6685:16435) */}
          <p
            ref={subtitleRef}
            className="font-manrope text-[18px] leading-[21.17px] text-[#F0EDCC] max-w-[900px] text-center font-normal will-change-transform"
          >
            Experience a new era of fine dining inspired by creativity, comfort,
            and elegance.
          </p>
        </div>

        {/* Reserve Button */}
        <div ref={buttonWrapperRef}>
          <button
            onClick={scrollToReservations}
            className="btn-magnetic bg-[#F36E3F] hover:bg-[#e25b2a] text-white font-manrope font-semibold text-[18px] leading-[21.17px] px-[95px] py-[12px] shadow-lg shadow-[#F36E3F]/25 hover:shadow-xl cursor-pointer"
          >
            Reserve a Table
          </button>
        </div>
      </div>
    </section>
  );
}
