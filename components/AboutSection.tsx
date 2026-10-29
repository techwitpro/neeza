"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const descTitleRef = useRef<HTMLHeadingElement>(null);
  const descParaRef = useRef<HTMLParagraphElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const photo3Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const img3Ref = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      // 1. Label fade-in with slide
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );

      // 2. Webflow-style masked line-by-line slide-up with subtle angle
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
      gsap.fromTo(
        lines,
        { yPercent: 125, rotateZ: 1.5, opacity: 0 },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 1.35,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // 3. Right narrative fade & slide
      gsap.fromTo(
        [descTitleRef.current, descParaRef.current],
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // 4. Staggered Photo wrapper reveals with scale-down
      const photoWrappers = [photo1Ref.current, photo2Ref.current, photo3Ref.current];
      gsap.fromTo(
        photoWrappers,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          stagger: 0.18,
          ease: "power4.out",
          scrollTrigger: {
            trigger: photo1Ref.current,
            start: "top 85%",
          },
        }
      );

      // 5. Smooth natural parallax scrub across photos with varying speeds
      gsap.to(photo1Ref.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      gsap.to(photo2Ref.current, {
        y: -65,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });

      gsap.to(photo3Ref.current, {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.3,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full bg-[#F0EDCC] text-[#6A1B2A] py-[80px] overflow-hidden"
    >
      <div className="max-w-[1028px] mx-auto px-4 sm:px-6">
        {/* Top Editorial Row (1028px x 229px) */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-[60.47px] mb-[32px]">
          {/* Left: About NEEZA Label + Headline */}
          <div className="flex-1">
            <span
              ref={labelRef}
              className="font-inter font-semibold text-[9.83px] leading-[12.77px] tracking-[0.0692em] uppercase text-[#6A1B2A] block mb-[10px]"
            >
              About NEEZA
            </span>
            <h2 className="font-serif-title font-normal text-4xl sm:text-6xl lg:text-[78.61px] leading-[0.9] lg:leading-[70.75px] tracking-[-0.0096em] uppercase text-[#6A1B2A]">
              <span className="overflow-hidden block pb-1">
                <span ref={line1Ref} className="block will-change-transform">
                  We don’t do
                </span>
              </span>
              <span className="overflow-hidden block pb-1">
                <span ref={line2Ref} className="block will-change-transform">
                  breakfast
                </span>
              </span>
              <span className="overflow-hidden block pb-1">
                <span ref={line3Ref} className="block will-change-transform">
                  hours.
                </span>
              </span>
            </h2>
          </div>

          {/* Right Description Column (width: 302.36px) */}
          <div className="w-full lg:w-[302.36px] pt-[30.24px] flex flex-col gap-[18.14px]">
            <h3
              ref={descTitleRef}
              className="font-manrope font-normal text-[24px] leading-[28.78px] tracking-[-0.0252em] text-[#6A1B2A] will-change-transform"
            >
              Serious coffee, unserious hours.
            </h3>
            <p
              ref={descParaRef}
              className="font-inter font-normal text-[13px] leading-[19.28px] text-[#6A1B2A] will-change-transform"
            >
              A breakfast room in a former surf-repair shop on the road to Batu
              Bolong. Big windows, one long table, and pancakes until close.
            </p>
          </div>
        </div>

        {/* Bottom 3 Photos: alignItems: flex-end, gap 18px (#6698:17741) */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-[18px] pt-[20px]">
          {/* Photo 1: 283.46 x 423.31 */}
          <div
            ref={photo1Ref}
            data-cursor="view"
            className="w-full md:w-[283.46px] h-[360px] md:h-[423.31px] relative shrink-0 overflow-hidden shadow-lg group will-change-transform cursor-pointer"
          >
            <Image
              src="/assets/about_sunlit.png"
              alt="Sunlit corner of NEEZA with a terracotta wall"
              fill
              sizes="(max-width: 768px) 100vw, 283px"
              className="object-cover img-hover-zoom"
            />
          </div>

          {/* Photo 2: 424.82 x 302.36 */}
          <div
            ref={photo2Ref}
            data-cursor="view"
            className="w-full md:w-[424.82px] h-[260px] md:h-[302.36px] relative shrink-0 overflow-hidden shadow-lg group will-change-transform cursor-pointer"
          >
            <Image
              src="/assets/about_table.png"
              alt="Breakfast table in hard morning light"
              fill
              sizes="(max-width: 768px) 100vw, 425px"
              className="object-cover img-hover-zoom"
            />
          </div>

          {/* Photo 3: 283.46 x 362.83 */}
          <div
            ref={photo3Ref}
            data-cursor="view"
            className="w-full md:w-[283.46px] h-[300px] md:h-[362.83px] relative shrink-0 overflow-hidden shadow-lg group will-change-transform cursor-pointer"
          >
            <Image
              src="/assets/about_guest.png"
              alt="Guest laughing with a flat white outside NEEZA"
              fill
              sizes="(max-width: 768px) 100vw, 283px"
              className="object-cover img-hover-zoom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
