"use client";

import React from "react";
import Image from "next/image";

export default function MarqueeBanner() {
  const marqueeText =
    "ELEVATE YOUR NEXT MEAL WITH A DINING EXPERIENCE MADE TO IMPRESS.";

  return (
    <div className="w-full bg-[#F36E3F] py-[15.12px] overflow-hidden border-y-[1.51px] border-[#F0EDCC] relative select-none">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {Array(6)
          .fill(null)
          .map((_, idx) => (
            <div key={idx} className="flex items-center gap-[21.17px] mx-[21.17px]">
              <span className="font-serif-title font-normal text-3xl sm:text-[48px] leading-[53.22px] uppercase text-[#F0EDCC] tracking-normal">
                {marqueeText}
              </span>
              <div className="w-[45.35px] h-[45.35px] relative shrink-0">
                <Image
                  src="/assets/marquee_star.svg"
                  alt="Logo"
                  width={45.35}
                  height={45.35}
                  className="w-[45.35px] h-[45.35px] object-contain"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
