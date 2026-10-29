"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ChefExperienceSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const dishWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Text & Left Column Entrance
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // 2. Right Video Curtain Entrance
      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, x: 40, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.25,
          ease: "power4.out",
          scrollTrigger: {
            trigger: rightColRef.current,
            start: "top 80%",
          },
        }
      );

      // 3. Bottom Dish Entrance
      gsap.fromTo(
        dishWrapRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: dishWrapRef.current,
            start: "top 88%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const scrollToReservations = () => {
    smoothScrollTo("#reservations");
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#38380B] text-[#F0EDCC] py-[100px] px-6 lg:px-[102px] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-[143px]">
        {/* Left Column (#6698:18282): width 602, gap 60px */}
        <div ref={leftColRef} className="w-full lg:w-[602px] flex flex-col gap-[60px]">
          {/* Top Block: width 491.34, gap 27.21px */}
          <div className="w-full max-w-[491.34px] flex flex-col gap-[27.21px]">
            <h2
              ref={headlineRef}
              className="font-serif-title text-4xl lg:text-[48px] uppercase tracking-normal text-[#F0EDCC] leading-[1.05]"
            >
              A Celebration <br />
              of Flavor
            </h2>
            <p
              ref={descRef}
              className="font-manrope text-[18px] text-[#F0EDCC] leading-relaxed font-normal"
            >
              Watch your dish come to life right before your eyes as each step is
              revealed without pause. The process feels immersive, honest, and
              beautifully intentional.
            </p>
            <button
              onClick={scrollToReservations}
              className="btn-magnetic self-start bg-[#F36E3F] hover:bg-[#e25b2a] text-white font-manrope font-semibold text-[18px] px-[95px] py-[12px] shadow-lg shadow-[#F36E3F]/25 hover:shadow-xl cursor-pointer"
            >
              Reserve a Table
            </button>
          </div>

          {/* Bottom Row (#6698:18281): gap 24px */}
          <div ref={dishWrapRef} className="flex flex-col sm:flex-row items-center gap-[24px]">
            {/* Image: 234 x 191 */}
            <div
              data-cursor="view"
              className="w-full sm:w-[234px] h-[191px] relative shrink-0 overflow-hidden shadow-md cursor-pointer group"
            >
              <Image
                src="/assets/experience_dish.png"
                alt="Chef Experience Dish"
                fill
                sizes="(max-width: 640px) 100vw, 234px"
                className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
              />
            </div>
            {/* Text: width 344 */}
            <p className="w-full sm:w-[344px] font-manrope text-[18px] text-[#F0EDCC] leading-relaxed font-normal">
              Step inside an immersive mini-experience where our chefs plate,
              finish, and present select dishes right in front of you.
            </p>
          </div>
        </div>

        {/* Right Video / Image (#6698:18273): width 491.34, height 506.46 */}
        <div
          ref={rightColRef}
          data-cursor="play"
          onClick={() => setVideoModalOpen(true)}
          className="w-full sm:w-[491.34px] h-[380px] sm:h-[506.46px] relative shrink-0 overflow-hidden bg-black/20 cursor-pointer group shadow-2xl will-change-transform"
        >
          <Image
            src="/assets/chef_video.png"
            alt="Chef Plating"
            fill
            sizes="(max-width: 640px) 100vw, 491px"
            className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-400 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#F36E3F] text-white flex items-center justify-center pl-1 shadow-2xl animate-pulse-glow transition-transform duration-300 group-hover:scale-110">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Chef Plating Video Modal */}
      {videoModalOpen && (
        <div
          onClick={() => setVideoModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-modal bg-[#1D1D02] border border-[#F0EDCC]/20 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative text-[#F0EDCC]"
          >
            <div className="bg-[#38380B] px-6 py-4 flex items-center justify-between border-b border-[#F0EDCC]/15">
              <h3 className="font-serif-title text-xl text-white">
                Live Plating at the Pass
              </h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#F36E3F] text-white flex items-center justify-center text-xl transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/chef_video.png"
                alt="Chef Plating Video"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className={`object-cover transition-all duration-700 ${
                  isPlaying ? "filter brightness-100" : "filter brightness-50"
                }`}
              />

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

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-[#F36E3F] flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? "❚❚" : "▶"}
                  </button>
                  <span className="text-xs font-mono-tag text-white/80">
                    Live Plating Showcase (4K)
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
