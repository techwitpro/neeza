"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface GalleryPhoto {
  src: string;
  alt: string;
  title: string;
}

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const galleryImages: GalleryPhoto[] = [
    { src: "/assets/gallery_1.png", alt: "Gallery Moment 1", title: "Twilight Dining" },
    { src: "/assets/gallery_2.png", alt: "Gallery Moment 2", title: "Morning Pour" },
    { src: "/assets/gallery_3.png", alt: "Gallery Moment 3", title: "Artisan Greens" },
    { src: "/assets/gallery_4.png", alt: "Gallery Moment 4", title: "Batu Bolong Room" },
  ];

  useGSAP(
    () => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 55, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 82%",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="w-full bg-[#1D1D02] overflow-x-auto py-[20px]"
    >
      <div
        ref={cardsRef}
        className="w-max mx-auto px-4 flex items-center justify-center gap-[18.14px]"
      >
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            data-cursor="view"
            onClick={() => setSelectedPhoto(img)}
            className="relative w-[272.13px] h-[365.86px] shrink-0 border-[1.51px] border-[#F0EDCC] overflow-hidden group cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#F36E3F] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] will-change-transform"
          >
            {/* Image (fill) */}
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="272px"
              className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
            />

            {/* Social Icons Overlay on Hover (#6702:20307, width 142.11, height 24.19, gap 15.12px) */}
            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-center justify-center">
              <div className="flex items-center gap-[15.12px] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="w-[24.19px] h-[24.19px] flex items-center justify-center hover:scale-115 transition-transform">
                  <Image
                    src="/assets/icon_social_1.svg"
                    alt="Social 1"
                    width={18.14}
                    height={18.14}
                    className="w-[18.14px] h-[18.14px] invert"
                  />
                </div>
                <div className="w-[24.19px] h-[24.19px] flex items-center justify-center hover:scale-115 transition-transform">
                  <Image
                    src="/assets/icon_social_2.svg"
                    alt="Social 2"
                    width={24.19}
                    height={24.19}
                    className="w-[24.19px] h-[24.19px] invert"
                  />
                </div>
                <div className="w-[24.19px] h-[24.19px] flex items-center justify-center hover:scale-115 transition-transform">
                  <Image
                    src="/assets/icon_social_3.svg"
                    alt="Social 3"
                    width={18.14}
                    height={18.14}
                    className="w-[18.14px] h-[18.14px] invert"
                  />
                </div>
                <div className="w-[24.19px] h-[24.19px] flex items-center justify-center hover:scale-115 transition-transform">
                  <Image
                    src="/assets/icon_social_4.svg"
                    alt="Social 4"
                    width={18.14}
                    height={18.14}
                    className="w-[18.14px] h-[18.14px] invert"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-modal bg-[#1D1D02] border border-[#F0EDCC]/30 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center text-xl hover:bg-[#F36E3F] transition-colors cursor-pointer"
            >
              &times;
            </button>

            <div className="relative aspect-[4/3] w-full bg-black">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain"
              />
            </div>

            <div className="p-5 flex items-center justify-between text-[#F0EDCC]">
              <h3 className="font-serif-title text-xl">{selectedPhoto.title}</h3>
              <span className="font-mono-tag text-xs text-[#F36E3F] uppercase tracking-wider">
                @neeza.restaurant
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
