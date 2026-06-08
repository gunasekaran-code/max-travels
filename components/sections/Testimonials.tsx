"use client";
import { testimonials } from "@/lib/data";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// Google "G" logo SVG
function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "#FFB51D" : "#E3E3E3"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof testimonials)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 100;

  return (
    <div
      className="review-card flex-shrink-0 w-[300px] md:w-[320px] bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-[#E3E3E3] mx-3"
      style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Profile image with Google-style ring */}
          <div className="relative">
            <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#E3E3E3]">
              <img
                src={review.image}
                alt={review.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="font-semibold text-[15px] text-[#202124] leading-tight">{review.name}</p>
            <p className="text-[12px] text-[#70757A] mt-0.5">{review.date}</p>
          </div>
        </div>
        {/* Google logo top-right */}
        <GoogleLogo size={20} />
      </div>

      {/* Stars */}
      <div className="mb-2">
        <StarRating rating={review.rating} />
      </div>

      {/* Review text */}
      <div className="relative">
        {/* Opening quote mark */}
        <span className="text-[#FFB51D] text-3xl font-serif leading-none absolute -top-1 -left-1 select-none">"</span>
        <p className="text-[13.5px] text-[#3C4043] leading-[1.6] pl-4 pr-1">
          {isLong && !expanded ? review.text.slice(0, 100) + "..." : review.text}
          {/* Closing quote mark */}
          <span className="text-[#FFB51D] text-3xl font-serif leading-none align-bottom ml-0.5 select-none">"</span>
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#1A73E8] text-[12px] mt-1 hover:underline focus:outline-none"
          >
            {expanded ? "Show less" : "More"}
          </button>
        )}
      </div>

      {/* Footer: Google Maps style */}
      <div className="mt-4 pt-3 border-t border-[#E3E3E3] flex items-center gap-1.5">
        <GoogleLogo size={13} />
        <span className="text-[11px] text-[#70757A]">Posted on Google</span>
      </div>
    </div>
  );
}

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const positionRef = useRef(0);
  const SPEED = 0.6; // px per frame

  // Duplicate array for infinite scroll
  const items = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cardWidth = 320 + 24; // card width + mx-3*2
    const singleSetWidth = testimonials.length * cardWidth;

    const animate = () => {
      if (!isPausedRef.current) {
        positionRef.current += SPEED;
        // Reset when we've scrolled one full set
        if (positionRef.current >= singleSetWidth) {
          positionRef.current = 0;
        }
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };
  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 overflow-hidden bg-white">
      <div className="container-max px-4 md:px-8 mb-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FFF8E7] border border-[#FFB51D]/30 rounded-full px-4 py-1.5 mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFB51D">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-[13px] font-medium text-[#B8860B]">Our Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#202124] leading-tight">
              What People Say <br />
              <span className="text-[#FFB51D]">About Max</span>
            </h2>
          </div>

          {/* Google Reviews badge */}
          <a
            href="https://share.google/JFsrMRf5SkBflunxu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-[#E3E3E3] rounded-2xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow group self-start md:self-auto"
          >
            <GoogleLogo size={28} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[22px] text-[#202124] leading-none">5.0</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFB51D">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-[#70757A] mt-0.5 group-hover:text-[#1A73E8] transition-colors">
                See all reviews on Google
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Scrolling Track */}
      <div
        className="relative w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-28 z-10"
          style={{ background: "linear-gradient(to right, white, transparent)" }} />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 md:w-28 z-10"
          style={{ background: "linear-gradient(to left, white, transparent)" }} />

        <div className="flex pb-4 pt-2" style={{ width: "max-content" }} ref={trackRef}>
          {items.map((review, idx) => (
            <ReviewCard key={`${review.name}-${idx}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}