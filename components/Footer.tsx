"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // 1. Slogan Entrance
      gsap.fromTo(
        sloganRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Giant Wordmark Reveal with scale & subtle drift
      gsap.fromTo(
        wordmarkRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.35,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: "top 92%",
          },
        }
      );
    },
    { scope: footerRef }
  );

  const scrollTo = (id: string) => {
    smoothScrollTo(`#${id}`);
  };

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#F0EDCC] text-[#38380B] pt-[72px] pb-[40px] px-6 lg:px-[80px] overflow-hidden"
    >
      <div className="max-w-[1281px] mx-auto flex flex-col gap-[56px]">
        {/* Footer Introduction Row (#6838:2374, gap 96px) */}
        <div
          ref={introRef}
          className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-[96px]"
        >
          {/* Slogan (#6838:2375): 42px */}
          <div className="flex-1">
            <h2
              ref={sloganRef}
              className="font-manrope font-normal text-3xl sm:text-[42px] leading-[1.02em] text-[#38380B]"
            >
              Still serving sunrise.
            </h2>
          </div>

          {/* Columns: Explore & Contact */}
          <div className="flex items-start gap-12 sm:gap-[60px]">
            {/* Explore Column (#6838:2376, width 180, gap 14px) */}
            <div className="w-[120px] sm:w-[180px] flex flex-col gap-[14px]">
              <span className="font-mono-tag font-normal text-[12px] leading-[1.5em] text-[#38380B]">
                Explore
              </span>
              <ul className="flex flex-col gap-[14px] font-manrope font-normal text-[16px] leading-[1.5em] text-[#38380B]">
                <li>
                  <button
                    onClick={() => scrollTo("menu")}
                    className="nav-link-line hover:text-[#1D1D02] transition-colors cursor-pointer"
                  >
                    Menu
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("about")}
                    className="nav-link-line hover:text-[#1D1D02] transition-colors cursor-pointer"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("gallery")}
                    className="nav-link-line hover:text-[#1D1D02] transition-colors cursor-pointer"
                  >
                    Visit
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Column (#6838:2381, width 240, gap 14px) */}
            <div className="w-[160px] sm:w-[240px] flex flex-col gap-[14px]">
              <span className="font-mono-tag font-normal text-[12px] leading-[1.5em] text-[#38380B]">
                Say hi
              </span>
              <ul className="flex flex-col gap-[14px] font-manrope font-normal text-[16px] leading-[1.5em] text-[#38380B]">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link-line hover:text-[#1D1D02] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@neeza.com"
                    className="nav-link-line hover:text-[#1D1D02] transition-colors"
                  >
                    hello@neeza.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Giant Vector Wordmark (#6838:2730, width 1281, height 470) */}
        <div
          ref={wordmarkRef}
          className="w-full flex items-center justify-center select-none py-2 will-change-transform"
        >
          <Image
            src="/assets/footer_wordmark.svg"
            alt="NEEZA"
            width={1281}
            height={470}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Small Print Row (#6838:2393): padding 24px 0px 0px, border-t 1px */}
        <div className="pt-[24px] border-t border-[#38380B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tag text-[11px] text-[#38380B]">
          <p>© 2026 NEEZA. All-day dining and fine hospitality.</p>
          <p>Canggu, Bali  ◆  Open daily 7:00 – 17:00</p>
        </div>
      </div>
    </footer>
  );
}
