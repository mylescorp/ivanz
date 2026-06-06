"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroCarouselSlides } from "@/lib/data/images";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 4500;

export function HeroServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroCarouselSlides.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const active = heroCarouselSlides[activeIndex];

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl lg:aspect-[5/4]">
      {heroCarouselSlides.map((slide, index) => (
        <div
          key={slide.label}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            index === activeIndex ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">
          Our Services
        </p>
        <p className="mt-1 font-heading text-xl font-bold text-white md:text-2xl">
          {active.label}
        </p>
      </div>

      <div className="absolute bottom-5 right-5 flex gap-1.5 md:bottom-6 md:right-6">
        {heroCarouselSlides.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === activeIndex
                ? "w-6 bg-gold"
                : "w-2 bg-white/50 hover:bg-white/80",
            )}
            aria-label={`Show ${slide.label}`}
          />
        ))}
      </div>
    </div>
  );
}
