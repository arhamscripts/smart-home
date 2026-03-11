"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Building2,
  Globe2,
  Handshake,
  Users,
} from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { Globe } from "../ui/globe";

function Counter({ stat, isInView, index }) {
  const count = useCountUp(stat.value, 1600 + index * 180, isInView);
  const Icon = stat.icon;

  return (
    <div
      className="group rounded-2xl bg-linear-to-br from-sky-200/60 via-white/80 to-cyan-200/60 p-px transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-18px_rgba(2,132,199,0.45)]"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0px)" : "translateY(12px)",
        transitionDelay: `${index * 90}ms`,
      }}
    >
      <div className="h-full rounded-2xl border border-white/70 bg-white/65 p-4 shadow-sm backdrop-blur-xl sm:p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl border border-sky-100 bg-sky-50/90 p-2.5 text-sky-700 transition-colors duration-300 group-hover:bg-sky-100">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {count}
              {stat.suffix && <span className="text-slate-900">{stat.suffix}</span>}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
              {stat.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
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
    {
      value: 140,
      suffix: "+",
      label: "Countries and regions",
      icon: Globe2,
    },
    {
      value: 40,
      suffix: "+",
      label: "Subsidiary corporations",
      icon: Building2,
    },
    {
      value: 2300,
      suffix: "+",
      label: "Global distributors",
      icon: Handshake,
    },
    {
      value: 66,
      suffix: "%",
      label: "International talent localization rate",
      icon: Users,
    },
  ];

  const orbitDots = [
    { top: "10%", left: "58%", delay: "0s" },
    { top: "22%", left: "80%", delay: "1s" },
    { top: "46%", left: "88%", delay: "1.8s" },
    { top: "72%", left: "74%", delay: "0.6s" },
    { top: "82%", left: "52%", delay: "1.2s" },
    { top: "66%", left: "26%", delay: "2.1s" },
    { top: "38%", left: "16%", delay: "0.9s" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.14),transparent_45%),radial-gradient(circle_at_100%_100%,rgba(14,165,233,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.3)_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.18]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div
            className="w-full"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0px)" : "translateY(16px)",
              transition: "all 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-2 shrink-0 rounded bg-linear-to-b from-sky-500 to-cyan-300" />
              <div>
                <h2 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl xl:text-[2.7rem] xl:leading-[1.08]">
                  Global Operation Localization
                </h2>
              </div>
            </div>

            <p className="mt-6 text-base font-medium text-slate-600 sm:mt-7 sm:text-lg">
              International subsidiaries all over the world
            </p>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
              Our extensive network of subsidiaries and distributors ensures
              seamless service delivery and support worldwide, backed by a
              highly skilled international team committed to excellence.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {stats.map((stat, index) => (
                <Counter
                  key={index}
                  stat={stat}
                  isInView={isInView}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div
            className="relative min-h-72.5 w-full md:min-h-105 lg:min-h-130"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0px)" : "translateY(18px)",
              transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* <div className="absolute inset-0 -z-10 m-auto h-[68%] w-[72%] rounded-full bg-radial-[at_center] from-sky-200/60 via-cyan-100/30 to-transparent blur-3xl" />

            <div className="absolute inset-0 m-auto h-[88%] w-[88%] rounded-full border border-sky-100/90 animate-[spin_28s_linear_infinite]" />
            <div className="absolute inset-0 m-auto h-[74%] w-[74%] rounded-full border border-cyan-100/80 animate-[spin_22s_linear_infinite_reverse]" />

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 520 520"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M98 214C161 130 267 116 344 168"
                stroke="url(#netLineA)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeDasharray="5 8"
                style={{ animation: "dashFlow 8s linear infinite" }}
              />
              <path
                d="M147 329C210 382 318 392 406 326"
                stroke="url(#netLineB)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeDasharray="5 8"
                style={{ animation: "dashFlow 10s linear infinite" }}
              />
              <path
                d="M115 276C209 241 317 251 402 276"
                stroke="url(#netLineC)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeDasharray="4 7"
                style={{ animation: "dashFlow 9s linear infinite reverse" }}
              />
              <defs>
                <linearGradient id="netLineA" x1="98" y1="214" x2="344" y2="168" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0EA5E9" stopOpacity="0.1" />
                  <stop offset="0.5" stopColor="#0EA5E9" stopOpacity="0.7" />
                  <stop offset="1" stopColor="#0EA5E9" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="netLineB" x1="147" y1="329" x2="406" y2="326" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#06B6D4" stopOpacity="0.1" />
                  <stop offset="0.5" stopColor="#06B6D4" stopOpacity="0.65" />
                  <stop offset="1" stopColor="#06B6D4" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="netLineC" x1="115" y1="276" x2="402" y2="276" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0284C7" stopOpacity="0.08" />
                  <stop offset="0.5" stopColor="#0284C7" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#0284C7" stopOpacity="0.08" />
                </linearGradient>
              </defs>
            </svg>

            {orbitDots.map((dot, index) => (
              <span
                key={index}
                className="pointer-events-none absolute block h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_0_6px_rgba(56,189,248,0.12),0_0_18px_rgba(14,165,233,0.55)]"
                style={{
                  top: dot.top,
                  left: dot.left,
                  animation: `floatDot ${4.5 + index * 0.4}s ease-in-out infinite`,
                  animationDelay: dot.delay,
                }}
              />
            ))} */}

            <Globe className="top-1/2 left-1/2 h-full w-full max-w-135 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatDot {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.45;
          }
          50% {
            transform: translate3d(0, -9px, 0);
            opacity: 1;
          }
        }

        @keyframes dashFlow {
          from {
            stroke-dashoffset: 80;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
