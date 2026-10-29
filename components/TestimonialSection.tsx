"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // 1. Card Rise Animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 75, scale: 0.93 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.25,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // 2. Headline Rise Animation
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
          },
        }
      );

      // 3. Background Parallax Scrub
      gsap.to(bgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: sectionRef }
  );

  // Subtle 3D Card tilt on mouse hover
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);

    gsap.to(cardRef.current, {
      rotateY: x * 6,
      rotateX: -y * 6,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-[100px] flex items-center justify-center overflow-hidden bg-[#1D1D02]"
    >
      {/* Background Image: testimonial_bg.png (#6702:21383) with Parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform scale-105">
        <Image
          src="/assets/testimonial_bg.png"
          alt="Atmosphere"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Center Column (#6702:21357): width 439px, gap 32px */}
      <div className="relative z-10 w-full max-w-[439px] px-4 flex flex-col items-center gap-[32px]">
        {/* Testimonial Card (#6702:21358): width 322.02, height 365.86, fill #5E5D18 */}
        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="relative w-[322.02px] h-[365.86px] bg-[#5E5D18] shrink-0 overflow-hidden shadow-2xl transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] will-change-transform"
        >
          {/* Top Left: Star Icon + 5.0 (#6702:21359, x: 18.14, y: 24.19) */}
          <div className="absolute left-[18.14px] top-[24.19px] z-10 flex items-center gap-[6.05px]">
            <Image
              src="/assets/star_rating.svg"
              alt="Star"
              width={15.12}
              height={15.12}
              className="w-[15.12px] h-[15.12px]"
            />
            <span className="font-serif-title font-normal text-[15.12px] leading-[21.17px] text-[#F0EDCC]">
              5.0
            </span>
          </div>

          {/* Top Right: Dish Image (#6702:21380, x: 96.61, y: 0, width: 225.4, height: 175.84) */}
          <div className="absolute left-[96.61px] top-0 w-[225.4px] h-[175.84px] overflow-hidden">
            <Image
              src="/assets/testimonial_dish.png"
              alt="Dish"
              fill
              sizes="225px"
              className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-108"
            />
          </div>

          {/* Quote & Author Container (x: 18.14, y: 196.54, width: 285.73) */}
          <div className="absolute left-[18.14px] top-[196.54px] w-[285.73px] flex flex-col gap-[13.61px]">
            {/* Quote (#6702:21370) */}
            <p className="font-manrope font-normal text-[18px] leading-[21.17px] text-[#F0EDCC]">
              “Dining at Platter is an experience in every sense. The flavors are
              bold & the interior makes every visit feel special.”
            </p>

            {/* Author Row (#6702:21371): gap 15.12px */}
            <div className="flex items-center gap-[15.12px] h-[46.87px]">
              {/* Avatar: 38.55 x 46.87 */}
              <div className="w-[38.55px] h-[46.87px] relative shrink-0 overflow-hidden">
                <Image
                  src="/assets/avatar_emma.png"
                  alt="Emma H."
                  fill
                  sizes="39px"
                  className="object-cover"
                />
              </div>

              {/* Name & City */}
              <div className="flex flex-col justify-center">
                <span className="font-serif-title font-normal text-[24px] leading-[25.4px] text-[#F0EDCC]">
                  Emma H.
                </span>
                <span className="font-manrope font-normal text-[18px] leading-[21.17px] text-[#F0EDCC]">
                  New York, NY
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Headline Below Card (#6702:21381): Young Serif 48px uppercase */}
        <h2
          ref={headlineRef}
          className="font-serif-title font-normal text-3xl sm:text-[48px] uppercase tracking-normal text-[#F0EDCC] text-center leading-[1.05]"
        >
          A Celebration <br />
          of Flavor
        </h2>
      </div>
    </section>
  );
}
