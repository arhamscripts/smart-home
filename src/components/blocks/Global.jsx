"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCountUp } from "@/hooks/use-count-up";
import { Globe } from "../ui/globe";

/**
 * Counter component with animated number
 */
function Counter({ value, suffix = "", label, isInView }) {
  const count = useCountUp(value, 1500, isInView);

  return (
    <Card className="border-none  transition-shadow duration-300 bg-transparent shadow-none hover:shadow-none">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col space-y-2">
          <div className="text-3xl font-normal text-black sm:text-4xl lg:text-5xl">
            {count}
            {suffix && <span className="text-black">{suffix}</span>}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Global Operation Localization Section
 * Enterprise-grade section showcasing global presence with animated statistics
 */
export default function Global() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const stats = [
    { value: 140, suffix: "+", label: "Countries and regions" },
    { value: 40, suffix: "+", label: "Subsidiary corporation" },
    { value: 2300, suffix: "+", label: "Global distributor" },
    { value: 66, suffix: "%", label: "International talent localization rate" },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-muted py-16 sm:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative grid items-center gap-10 md:grid-cols-[1fr_1fr] lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] lg:gap-12">
          {/* Left Column - Content */}
          <div className="w-full space-y-4">
            {/* Heading with Blue Accent Bar */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-2 h-12 bg-linear-to-b from-blue-600 to-cyan-400 rounded" />
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                  Global Operation Localization
                </h2>
              </div>
            </div>
            <p className="mt-6 text-base font-medium text-muted-foreground sm:mt-10 sm:text-lg" >
              International subsidiaries all over the world
            </p>

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
              Our extensive
              network of subsidiaries and distributors ensures seamless service
              delivery and support worldwide, backed by a highly skilled
              international team committed to excellence.
            </p>

            {/* Learn More Button */}
            <Button
              size="lg"
              className="group w-full rounded-full border border-blue-600 bg-transparent text-foreground transition-all duration-300 hover:bg-linear-to-r hover:from-blue-600 hover:to-cyan-400 hover:text-white hover:shadow-lg sm:w-fit"
            >
              Learn more
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-1 pt-4 sm:grid-cols-2 bg-muted">
              {stats.map((stat, index) => (
                <Counter
                  key={index}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[280px] w-full overflow-hidden md:block md:min-h-[380px] lg:min-h-[560px]">
            <Globe />
          </div>
        </div>
      </div>
    </section>
  );
}
