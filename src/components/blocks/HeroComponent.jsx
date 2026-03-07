
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import HeroLottie from "./HeroLottie";
import StayInspired from "./StayInspired";

export default function HeroComponent() {
  return (
    <section className="relative overflow-visible bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      <div className="container mt-0 xs:mt-20 relative mx-auto grid min-h-[calc(100vh-72px)] grid-cols-1 items-center gap-10 px-4 py-12 sm:py-16 md:grid-cols-2 md:gap-12 md:px-6 lg:px-8">
        <div className="text-left">
          <p className="mb-4 xs:hidden inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-cyan-200 uppercase">
            Future Ready Homes
          </p>

          <h1 className="mb-4 text-4xl leading-tight font-bold text-balance text-white sm:text-5xl lg:text-6xl">
            AquaSmart
            <span className="block bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Smart Living, Simplified
            </span>
          </h1>

          <p className="mb-7 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Experience connected comfort with intelligent lighting, security, and
            energy control designed for modern families.
          </p>

          <div className="flex flex-col items-start gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full bg-linear-to-r from-blue-500 to-cyan-400 text-slate-950 hover:from-blue-400 hover:to-cyan-300 sm:w-auto"
            >
              <Link href="/category">Explore Products</Link>
            </Button>

            {/* <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-cyan-300/40 bg-transparent text-cyan-100 hover:bg-cyan-300/10 sm:w-auto"
            >
              <Link href="/contact">Talk to an Expert</Link>
            </Button> */}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg md:max-w-none">
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-500/25 to-cyan-400/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border-none p-2 ">
            <HeroLottie />
          </div>
        </div>
      </div>
      <StayInspired />
    </section>
  );
}
