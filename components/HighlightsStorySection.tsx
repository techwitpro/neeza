"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HighlightsStorySection() {
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const verticalImgRef = useRef<HTMLDivElement>(null);
  const dishImgRef = useRef<HTMLDivElement>(null);

  const highlights = [
    {
      title: "Grilled Herb Sea Bass",
      note: "Caught fresh at dawn, pan-crisped with wild sea fennel and lemon-infused cold pressed olive oil.",
    },
    {
      title: "Classic Italian Tiramisu",
      note: "Artisan savoiardi soaked in our 18-hour cold brew espresso and layered with velvet mascarpone.",
    },
    {
      title: "Citrus Garden Salad",
      note: "Organic microgreens, shaved radish, toasted pistachios, and blood orange champagne vinaigrette.",
    },
  ];

  useGSAP(
    () => {
      // Row 1 entrance
      gsap.fromTo(
        row1Ref.current,
        { opacity: 0, y: 55 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: row1Ref.current,
            start: "top 82%",
          },
        }
      );

      // Row 2 entrance
      gsap.fromTo(
        row2Ref.current,
        { opacity: 0, y: 55 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: row2Ref.current,
            start: "top 82%",
          },
        }
      );

      // Row 3 entrance
      gsap.fromTo(
        row3Ref.current,
        { opacity: 0, y: 55 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: row3Ref.current,
            start: "top 82%",
          },
        }
      );

      // Parallax scrub on Row 2 images
      if (verticalImgRef.current && dishImgRef.current) {
        gsap.to(verticalImgRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: row2Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.3,
          },
        });

        gsap.to(dishImgRef.current, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: row2Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  const scrollToReservations = () => {
    smoothScrollTo("#reservations");
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#1D1D02] text-[#F0EDCC] py-[100px] flex flex-col items-center gap-[50px] overflow-hidden"
    >
      {/* ROW 1 (#6838:2680): Video + Today's Highlights */}
      <div
        ref={row1Ref}
        className="w-full max-w-[1440px] px-6 lg:pl-[330px] lg:pr-12 flex flex-col lg:flex-row items-center gap-[57px]"
      >
        {/* Video: 576 x 311.43 with interactive play button */}
        <div
          data-cursor="play"
          onClick={() => setVideoModalOpen(true)}
          className="w-full max-w-[576px] h-[260px] sm:h-[311.43px] relative shrink-0 overflow-hidden bg-black/30 cursor-pointer group shadow-xl will-change-transform"
        >
          <Image
            src="/assets/highlight_video.png"
            alt="Highlights Video"
            fill
            sizes="(max-width: 768px) 100vw, 576px"
            className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
          />
          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-400 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#F36E3F] text-white flex items-center justify-center pl-1 shadow-xl shadow-[#F36E3F]/40 animate-pulse-glow transition-transform duration-300 group-hover:scale-110">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column (#6698:17754): width 291px, gap 25px */}
        <div className="w-full lg:w-[291px] flex flex-col gap-[25px]">
          <h3 className="font-serif-title text-[24px] leading-[31.45px] text-[#F0EDCC]">
            Today’s Highlights
          </h3>

          <div className="flex flex-col gap-[18.14px] w-full">
            {highlights.map((item, idx) => {
              const isOpen = activeHighlight === idx;
              return (
                <div
                  key={item.title}
                  onClick={() => setActiveHighlight(isOpen ? null : idx)}
                  className="w-full bg-[#5E5D18] hover:bg-[#6e6d1c] px-[15.12px] py-[9.07px] flex flex-col justify-center transition-all duration-300 cursor-pointer group rounded-[2px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif-title text-[18px] leading-[21.17px] text-[#F0EDCC] group-hover:text-white transition-colors">
                      {item.title}
                    </span>
                    <span
                      className={`text-sm text-[#F0EDCC]/80 transition-transform duration-300 select-none ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </div>

                  {/* Strictly closed by default, expands only when clicked */}
                  <div
                    className={`grid transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 pt-2"
                        : "grid-rows-[0fr] opacity-0 pt-0 pointer-events-none"
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">
                      <p className="text-xs font-manrope text-[#F0EDCC]/90 leading-relaxed border-t border-[#F0EDCC]/20 pt-2">
                        {item.note}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ROW 2 (#6838:2682): Image 291x427 + Story 593 + Dish 395x380 */}
      <div
        ref={row2Ref}
        className="w-full max-w-[1440px] px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-[42px]"
      >
        {/* Left Image: 291 x 427 */}
        <div
          ref={verticalImgRef}
          data-cursor="view"
          className="w-full sm:w-[291px] h-[400px] sm:h-[427px] relative shrink-0 overflow-hidden shadow-xl will-change-transform cursor-pointer group"
        >
          <Image
            src="/assets/story_vertical.png"
            alt="Artisan culinary plating"
            fill
            sizes="(max-width: 640px) 100vw, 291px"
            className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
          />
        </div>

        {/* Center Column: width 593, gap 43px */}
        <div className="w-full lg:w-[593px] flex flex-col gap-[43px]">
          <div className="flex flex-col gap-[11px]">
            <h2 className="font-serif-title text-4xl lg:text-[48px] uppercase tracking-normal text-[#F0EDCC] leading-[1.05]">
              A Celebration <br />
              of Flavor
            </h2>
            <p className="font-manrope text-[18px] text-[#F0EDCC] leading-relaxed font-normal">
              Platter was created for those who believe dining should inspire.
              Our chefs bring together global influences, modern presentation, &
              best ingredients to create a culinary experience that feels both
              familiar & refined.
            </p>
          </div>

          <button
            onClick={scrollToReservations}
            className="btn-magnetic self-start bg-[#F36E3F] hover:bg-[#e25b2a] text-white font-manrope font-semibold text-[18px] px-[95px] py-[12px] shadow-lg shadow-[#F36E3F]/20 cursor-pointer"
          >
            Reserve a Table
          </button>
        </div>

        {/* Right Image: 395 x 380 */}
        <div
          ref={dishImgRef}
          data-cursor="view"
          className="w-full sm:w-[395px] h-[340px] sm:h-[380px] relative shrink-0 overflow-hidden shadow-xl will-change-transform cursor-pointer group"
        >
          <Image
            src="/assets/story_dish.png"
            alt="Platter culinary dish"
            fill
            sizes="(max-width: 640px) 100vw, 395px"
            className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
          />
        </div>
      </div>

      {/* ROW 3 (#6838:2679): Space description 462 + Dual Atmosphere 360x332 */}
      <div
        ref={row3Ref}
        className="w-full max-w-[1440px] px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-[48px]"
      >
        {/* Left Column: width 462, gap 15px */}
        <div className="w-full lg:w-[462px] flex flex-col gap-[15px]">
          <h2 className="font-serif-title text-4xl lg:text-[48px] uppercase tracking-normal text-[#F0EDCC] leading-[1.05]">
            A Celebration <br />
            of Flavor
          </h2>
          <p className="font-manrope text-[18px] text-[#F0EDCC] leading-relaxed font-normal">
            Platter’s space brings together warmth and sophistication. Soft
            lighting, elegant textures, and modern art create a setting that
            feels alive with energy yet grounded in comfort. Every corner
            invites you to linger a little longer.
          </p>
        </div>

        {/* Right Dual Images: gap 25px, each 360 x 332 */}
        <div className="flex flex-col sm:flex-row items-center gap-[25px]">
          <div
            data-cursor="view"
            className="w-full sm:w-[360px] h-[300px] sm:h-[332px] relative shrink-0 overflow-hidden shadow-lg group cursor-pointer"
          >
            <Image
              src="/assets/atmosphere_1.png"
              alt="Dining atmosphere"
              fill
              sizes="(max-width: 640px) 100vw, 360px"
              className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
            />
          </div>
          <div
            data-cursor="view"
            className="w-full sm:w-[360px] h-[300px] sm:h-[332px] relative shrink-0 overflow-hidden shadow-lg group cursor-pointer"
          >
            <Image
              src="/assets/atmosphere_1.png"
              alt="Atmosphere details"
              fill
              sizes="(max-width: 640px) 100vw, 360px"
              className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
            />
          </div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {videoModalOpen && (
        <div
          onClick={() => setVideoModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-modal bg-[#1D1D02] border border-[#F0EDCC]/20 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative text-[#F0EDCC]"
          >
            {/* Top Bar */}
            <div className="bg-[#38380B] px-6 py-4 flex items-center justify-between border-b border-[#F0EDCC]/15">
              <h3 className="font-serif-title text-xl text-white">
                Today’s Culinary Highlights
              </h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#F36E3F] text-white flex items-center justify-center text-xl transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/highlight_video.png"
                alt="Culinary Highlights Video"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className={`object-cover transition-all duration-700 ${
                  isPlaying ? "filter brightness-100" : "filter brightness-50"
                }`}
              />

              {/* Play / Pause Toggle button */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute w-20 h-20 rounded-full bg-[#F36E3F] text-white flex items-center justify-center pl-1 shadow-2xl transition-transform hover:scale-110"
                >
                  <svg className="w-9 h-9 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}

              {/* Bottom Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-[#F36E3F] flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? "❚❚" : "▶"}
                  </button>
                  <span className="text-xs font-mono-tag text-white/80">
                    00:45 / 01:30 ◆ Kitchen Reel
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
