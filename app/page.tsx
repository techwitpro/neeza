"use client";

import React from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import HighlightsStorySection from "@/components/HighlightsStorySection";
import ChefExperienceSection from "@/components/ChefExperienceSection";
import TestimonialSection from "@/components/TestimonialSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import GallerySection from "@/components/GallerySection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Webflow-style smooth magnetic custom cursor */}
      <CustomCursor />

      <main className="min-h-screen bg-[#1D1D02] text-[#F0EDCC] selection:bg-[#F36E3F] selection:text-white">
        {/* 1. Header Navigation */}
        <Header />

        {/* 2. Hero Section (full-width, no horizontal margin) */}
        <Hero />

        {/* 3. About Section */}
        <AboutSection />

        {/* 4. The Menu Section */}
        <MenuSection />

        {/* 5. Today's Highlights & Philosophy & Space Section */}
        <HighlightsStorySection />

        {/* 6. Chef's Live Plating Section */}
        <ChefExperienceSection />

        {/* 7. Testimonial Section */}
        <TestimonialSection />

        {/* 8. Marquee Banner Section */}
        <MarqueeBanner />

        {/* 9. Gallery Stream Section */}
        <GallerySection />

        {/* 10. Table Reservation & Contact Section */}
        <ReservationSection />

        {/* 11. Footer Section */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
