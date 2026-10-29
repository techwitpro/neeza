"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ReservationSection() {
  const [name, setName] = useState("J Smith");
  const [guests, setGuests] = useState("2 Guests");
  const [time, setTime] = useState("7:00 PM");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const sectionRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cols = [col1Ref.current, col2Ref.current, col3Ref.current];
      gsap.fromTo(
        cols,
        { opacity: 0, y: 55 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.16,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setReserved(true);
      setBookingCode(`NEZ-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 700);
  };

  return (
    <section
      ref={sectionRef}
      id="reservations"
      className="w-full bg-[#4F4E0F] text-[#F0EDCC] py-[100px] lg:py-[120px] px-6 lg:px-[153px] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-[60px]">
        {/* Column 1 (#6702:21646): width 429, height 332 */}
        <div
          ref={col1Ref}
          className="w-full lg:w-[429px] h-auto lg:h-[332px] flex flex-col justify-between"
        >
          <h2 className="font-serif-title font-normal text-4xl lg:text-[48px] uppercase tracking-normal text-[#F0EDCC] leading-[1.05]">
            A Celebration <br />
            of Flavor
          </h2>

          <div className="pt-8 lg:pt-0 flex flex-col gap-[15.12px]">
            <span className="font-serif-title text-[18px] leading-[21.17px] text-white font-normal">
              Follow us on
            </span>

            {/* 4 Social Icons: width 142.11, height 24.19, gap 15.12px */}
            <div className="flex items-center gap-[15.12px] h-[24.19px]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[24.19px] h-[24.19px] flex items-center justify-center opacity-90 hover:opacity-100 transition-transform duration-300 hover:scale-115"
                aria-label="Instagram"
              >
                <Image
                  src="/assets/icon_social_1.svg"
                  alt="Instagram"
                  width={18.14}
                  height={18.14}
                  className="w-[18.14px] h-[18.14px] invert"
                />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[24.19px] h-[24.19px] flex items-center justify-center opacity-90 hover:opacity-100 transition-transform duration-300 hover:scale-115"
                aria-label="Facebook"
              >
                <Image
                  src="/assets/icon_social_2.svg"
                  alt="Facebook"
                  width={24.19}
                  height={24.19}
                  className="w-[24.19px] h-[24.19px] invert"
                />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[24.19px] h-[24.19px] flex items-center justify-center opacity-90 hover:opacity-100 transition-transform duration-300 hover:scale-115"
                aria-label="X"
              >
                <Image
                  src="/assets/icon_social_3.svg"
                  alt="X"
                  width={18.14}
                  height={18.14}
                  className="w-[18.14px] h-[18.14px] invert"
                />
              </a>

              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[24.19px] h-[24.19px] flex items-center justify-center opacity-90 hover:opacity-100 transition-transform duration-300 hover:scale-115"
                aria-label="Pinterest"
              >
                <Image
                  src="/assets/icon_social_4.svg"
                  alt="Pinterest"
                  width={18.14}
                  height={18.14}
                  className="w-[18.14px] h-[18.14px] invert"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Reserve Your Table Form (#6702:21710): width 376.44 */}
        <div
          ref={col2Ref}
          className="w-full sm:w-[376.44px] shrink-0 flex flex-col gap-[15.12px]"
        >
          <h3 className="font-serif-title font-normal text-[21.17px] leading-[27.51px] text-white">
            Reserve Your Table
          </h3>

          {reserved ? (
            <div className="bg-[#38380B] p-6 rounded-[2px] flex flex-col gap-3 text-center animate-modal">
              <div className="w-12 h-12 bg-[#F36E3F] rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold animate-pulse-glow">
                ✓
              </div>
              <h4 className="font-serif-title text-xl text-white">
                Table Reserved!
              </h4>
              <p className="font-manrope text-xs text-[#F0EDCC]/85 leading-relaxed">
                Thank you, <span className="font-bold text-white">{name}</span>. Your reservation for{" "}
                <span className="font-bold text-white">{guests}</span> at{" "}
                <span className="font-bold text-white">{time}</span> is confirmed.
              </p>
              <div className="font-mono-tag text-xs text-[#F36E3F] bg-black/30 py-1.5 px-3 rounded">
                Ref: {bookingCode}
              </div>
              <button
                onClick={() => setReserved(false)}
                className="text-xs text-[#F0EDCC]/70 hover:text-white underline mt-2 cursor-pointer"
              >
                New reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleReserve} className="flex flex-col gap-[9.07px]">
              {/* Input 1: J Smith (376.44 x 45.35, fill #38380B) */}
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="J Smith"
                className="w-full h-[45.35px] bg-[#38380B] text-[#F0EDCC] placeholder-[#F0EDCC]/70 px-[12.09px] font-serif-title text-[15.12px] focus:outline-none focus:ring-1 focus:ring-[#F36E3F] transition-all duration-300"
              />

              {/* Row 2: 2 Dropdowns (width 183.69 each, height 45.35, gap 9.07px) */}
              <div className="flex gap-[9.07px] w-full">
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-[183.69px] h-[45.35px] bg-[#38380B] text-[#F0EDCC] px-[12.09px] font-serif-title text-[15.12px] focus:outline-none focus:ring-1 focus:ring-[#F36E3F] cursor-pointer transition-all duration-300"
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="3 Guests">3 Guests</option>
                  <option value="4 Guests">4 Guests</option>
                  <option value="5+ Guests">5+ Guests</option>
                </select>

                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-[183.69px] h-[45.35px] bg-[#38380B] text-[#F0EDCC] px-[12.09px] font-serif-title text-[15.12px] focus:outline-none focus:ring-1 focus:ring-[#F36E3F] cursor-pointer transition-all duration-300"
                >
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="5:30 PM">5:30 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="8:30 PM">8:30 PM</option>
                </select>
              </div>

              {/* Row 3: Email & Phone Inputs (width 183.69 each, height 45.35, gap 9.07px) */}
              <div className="flex gap-[9.07px] w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-[183.69px] h-[45.35px] bg-[#38380B] text-[#F0EDCC] placeholder-[#F0EDCC]/70 px-[12.09px] font-serif-title text-[15.12px] focus:outline-none focus:ring-1 focus:ring-[#F36E3F] transition-all duration-300"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-[183.69px] h-[45.35px] bg-[#38380B] text-[#F0EDCC] placeholder-[#F0EDCC]/70 px-[12.09px] font-serif-title text-[15.12px] focus:outline-none focus:ring-1 focus:ring-[#F36E3F] transition-all duration-300"
                />
              </div>

              {/* Row 4: Text Area (height 75.59, fill #38380B) */}
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="w-full h-[75.59px] bg-[#38380B] text-[#F0EDCC] placeholder-[#F0EDCC]/70 p-[12.09px] font-serif-title text-[15.12px] focus:outline-none focus:ring-1 focus:ring-[#F36E3F] resize-none transition-all duration-300"
              />

              {/* Button: Reserve (height 39.31, fill #F36E3F) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-magnetic w-full h-[39.31px] bg-[#F36E3F] hover:bg-[#e25b2a] text-white font-serif-title font-bold text-[15.12px] leading-[21.17px] flex items-center justify-center shadow-lg shadow-[#F36E3F]/25 hover:shadow-xl cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Confirming..." : "Reserve"}
              </button>
            </form>
          )}
        </div>

        {/* Column 3: Hours & Find US (#6702:21735): width 207.87 */}
        <div
          ref={col3Ref}
          className="w-full sm:w-[207.87px] shrink-0 flex flex-col justify-between h-auto lg:h-[332.46px] gap-8 lg:gap-[105px]"
        >
          {/* Opening Hours */}
          <div className="flex flex-col gap-[15.12px]">
            <h4 className="font-serif-title font-normal text-[18px] leading-[27.51px] text-white">
              Opening Hours
            </h4>
            <div className="flex flex-col gap-[12.09px] font-manrope font-normal text-[15.12px] leading-[21.17px] text-white">
              <p>Sat to thu: 11 AM - 10 PM</p>
              <p>Friday: 03 PM - 10 PM</p>
            </div>
          </div>

          {/* Find US */}
          <div className="flex flex-col gap-[15.12px]">
            <h4 className="font-serif-title font-normal text-[18px] leading-[27.51px] text-white">
              Find US
            </h4>
            <div className="flex flex-col gap-[12.09px] font-manrope font-normal text-[15.12px] leading-[21.17px] text-white">
              <a
                href="mailto:contact@grooic.com"
                className="flex items-center gap-[9.07px] hover:text-[#F36E3F] transition-colors"
              >
                <div className="w-[18.14px] h-[18.14px] shrink-0 flex items-center justify-center">
                  <Image
                    src="/assets/icon_email.svg"
                    alt="Email"
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] invert"
                  />
                </div>
                <span>contact@grooic.com</span>
              </a>

              <a
                href="tel:+19179003111"
                className="flex items-center gap-[9.07px] hover:text-[#F36E3F] transition-colors"
              >
                <div className="w-[18.14px] h-[18.14px] shrink-0 flex items-center justify-center">
                  <Image
                    src="/assets/icon_phone.svg"
                    alt="Phone"
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] invert"
                  />
                </div>
                <span>+19179003111</span>
              </a>

              <div className="flex items-center gap-[9.07px]">
                <div className="w-[18.14px] h-[18.14px] shrink-0 flex items-center justify-center">
                  <Image
                    src="/assets/icon_location.svg"
                    alt="Location"
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] invert"
                  />
                </div>
                <span>Wyoming 82801, USA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
