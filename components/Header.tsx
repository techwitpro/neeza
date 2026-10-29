"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/scroll";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "/ Home", href: "#home" },
    { label: "/ About", href: "#about" },
    { label: "/ Gallery", href: "#gallery" },
    { label: "/ Our Menu", href: "#menu" },
    { label: "/ Reservations", href: "#reservations" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    smoothScrollTo(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "bg-[#F0EDCC]/90 backdrop-blur-md border-b border-[#4F4E0F]/15 shadow-[0_4px_24px_rgba(29,29,2,0.07)]"
          : "bg-[#F0EDCC] border-b border-[#4F4E0F]/10"
      }`}
    >
      <div className="w-full max-w-[1440px] h-[67.28px] mx-auto px-6 lg:px-[22.68px] flex items-center justify-between">
        {/* Logo (#6695:2195, 109 x 40) */}
        <a
          href="#home"
          onClick={(e) => handleScroll(e, "#home")}
          className="flex items-center transition-opacity hover:opacity-85"
          aria-label="NEEZA Home"
        >
          <Image
            src="/assets/header_logo.svg"
            alt="NEEZA"
            width={109}
            height={40}
            className="w-[109px] h-[40px] object-contain"
            priority
          />
        </a>

        {/* Navigation Links (#6695:2205, gap 21.17px) */}
        <nav className="hidden md:flex items-center gap-[21.17px]">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="nav-link-line font-serif-title font-bold text-[15.12px] leading-[21.17px] text-[#4F4E0F] hover:text-[#1D1D02] transition-colors py-1 select-none"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 text-[#4F4E0F] focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-[2px] bg-[#4F4E0F] transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[#4F4E0F] my-1 transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[#4F4E0F] transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown with smooth slide-down */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? "max-h-[300px] border-t border-[#4F4E0F]/15" : "max-h-0"
        } bg-[#F0EDCC]`}
      >
        <div className="px-6 py-4 flex flex-col gap-3 shadow-lg">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="font-serif-title font-bold text-[16px] text-[#4F4E0F] py-1.5 hover:text-[#1D1D02] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
