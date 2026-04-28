"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    badge: "Future Ready",
    title: "Imagine what",
    titleHighlight: "home could be",
    subTitle: "Hurry and take up to 35% off on selected smart home products",
    imageUrl: "/images/mtronic-pk-products-banner.webp",
  },
  {
    id: 2,
    badge: "Exclusive Range",
    title: "Smart Home",
    titleHighlight: "Essentials",
    subTitle: "Enjoy great prices across the range of smart home products",
    imageUrl: "/images/slide.png",
  },
  {
    id: 3,
    badge: "Smart Living",
    title: "Transform your",
    titleHighlight: "Living Space",
    subTitle: "Discover the latest in home automation technology at unbeatable prices",
    imageUrl: "/images/mtronic-german-engineering-banner.webp",
  },
  {
    id: 4,
    badge: "Premium Quality",
    title: "Luxury Smart",
    titleHighlight: "Control",
    subTitle: "Get up to 40% discount on exclusive smart home collections",
    imageUrl: "/images/luxury-living-bg.webp",
  },
];

const AUTOPLAY_SPEED = 2500;

export default function ImmersiveSlider() {
  const [current, setCurrent] = useState(0);

  // Simple auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
    }, AUTOPLAY_SPEED);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-slate-950 select-none">
      {/* Slide Images Container */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} // Simple crossfade
          className="absolute inset-0 z-0 h-full w-full bg-cover bg-center transform-gpu"
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
        >
          {/* Deep Cinematic Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Engine */}
      <div className="relative z-20 container flex h-full items-center mx-auto px-4 md:px-0 mt-10 sm:mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex w-full max-w-2xl xl:max-w-4xl flex-col items-start transform-gpu"
          >
            {/* Cyber / Tech Badge */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/30 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-[2px]">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-cyan-300">
                  {slide.badge}
                </span>
              </div>
            </div>

            {/* Typography */}
            <h1 className="mb-4 sm:mb-6 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl">
              {slide.title} <br />
              <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                {slide.titleHighlight}
              </span>
            </h1>

            <p className="mb-6 sm:mb-8 md:mb-10 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-base sm:text-lg font-light leading-relaxed text-slate-300 xl:text-xl">
              {slide.subTitle}
            </p>

            <div>
              <Button
                asChild
                size="lg"
                className="group rounded-full bg-slate-50 px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7 text-sm sm:text-base md:text-lg font-bold text-slate-950 transition-colors hover:bg-slate-200 cursor-pointer"
              >
                <Link href="/aqua-electrical" className="flex items-center gap-3">
                  <span>Explore Products</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation & Controls */}
      <div className="absolute bottom-8 sm:bottom-8 left-4 right-4 sm:left-12 sm:right-12 md:left-16 md:right-16 lg:left-24 lg:right-24 xl:left-32 xl:right-32 z-30 flex items-center justify-between pointer-events-none">
        {/* Slide Counter / Dots */}
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          <div className="hidden sm:block text-sm font-medium tracking-widest text-slate-400">
            0{current + 1}
            <span className="mx-2 text-slate-600">/</span>
            0{slides.length}
          </div>
          <div className="flex h-1 gap-1.5 sm:gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1 cursor-pointer rounded-full transition-all duration-300 ${
                  current === idx ? "w-8 sm:w-12 bg-cyan-400" : "w-3 sm:w-4 bg-slate-600 hover:bg-slate-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}