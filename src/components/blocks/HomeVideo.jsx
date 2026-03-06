"use client";

import { useEffect, useRef, useState } from "react";

export default function HomeVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isInViewZone, setIsInViewZone] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const progressRef = useRef(0);
  const touchStartYRef = useRef(0);
  const wheelDeltaRef = useRef(0);
  const rafIdRef = useRef(null);
  const lockScrollYRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
      video.pause();
      progressRef.current = 0;
      setIsVideoReady(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const checkZone = () => {
      const container = containerRef.current;
      if (!container) {
        ticking = false;
        return;
      }

      const rect = container.getBoundingClientRect();
      const active = rect.top <= 0 && rect.bottom > window.innerHeight;
      setIsInViewZone(active);

      if (active && !hasCompleted) {
        lockScrollYRef.current = container.offsetTop;
        setIsLocked(true);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(checkZone);
    };

    checkZone();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasCompleted]);

  useEffect(() => {
    if (!isLocked) return;

    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, lockScrollYRef.current);

    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [isLocked]);

  useEffect(() => {
    if (!isLocked || !isVideoReady || hasCompleted) return;

    const video = videoRef.current;
    if (!video) return;

    const applyProgress = () => {
      rafIdRef.current = null;

      const duration = video.duration || 0;
      if (!duration) return;

      // Convert scroll/wheel input to normalized 0..1 video progress.
      const nextProgress = Math.max(
        0,
        Math.min(1, progressRef.current + wheelDeltaRef.current * 0.00035)
      );

      wheelDeltaRef.current = 0;
      progressRef.current = nextProgress;
      video.currentTime = nextProgress * duration;

      if (nextProgress >= 1) {
        setHasCompleted(true);
        setIsLocked(false);
      }
    };

    const queueFrame = () => {
      if (rafIdRef.current) return;
      rafIdRef.current = requestAnimationFrame(applyProgress);
    };

    const onWheel = (event) => {
      event.preventDefault();
      wheelDeltaRef.current += event.deltaY;
      queueFrame();
    };

    const onTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event) => {
      event.preventDefault();
      const currentY = event.touches[0]?.clientY ?? 0;
      const deltaY = touchStartYRef.current - currentY;
      touchStartYRef.current = currentY;
      wheelDeltaRef.current += deltaY;
      queueFrame();
    };

    const onKeyDown = (event) => {
      const key = event.key;
      if (!["ArrowDown", "PageDown", " ", "ArrowUp", "PageUp"].includes(key)) {
        return;
      }

      event.preventDefault();

      if (key === "ArrowUp" || key === "PageUp") {
        wheelDeltaRef.current -= 120;
      } else {
        wheelDeltaRef.current += 120;
      }

      queueFrame();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [hasCompleted, isLocked, isVideoReady]);

  const showFixedVideo = isInViewZone || isLocked;

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full">
      <video
        ref={videoRef}
        className={`fixed top-0 left-0 z-0 h-full w-full object-cover transition-opacity duration-300 ${
          showFixedVideo ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/images/sectiontwo-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="pointer-events-none sticky top-0 z-10 flex h-screen items-center justify-center">
        <div className="rounded-2xl bg-black/35 px-6 py-4 text-center text-white backdrop-blur-sm">
          <p className="text-sm uppercase tracking-[0.18em]">Aqua Electrical</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-5xl">Innovative Solutions for Modern Homes</h2>
          <p className="mt-2 text-sm text-white/80 md:text-base">
            Experience the future of home automation with our cutting-edge smart devices and seamless integration.
          </p>
        </div>
      </div>
    </section>
  );
}


