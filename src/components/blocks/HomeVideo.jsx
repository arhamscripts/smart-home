"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 90;
const VIDEO_SRC = "/images/sectiontwo-video-new.mp4";

const chapters = [
  {
    start: 0.0,
    end: 0.3,
    tag: "Welcome to Aqua Electrical",
    title: "Powering Smarter Homes Across the Globe",
    description:
      "Aqua Electrical delivers world-class smart electrical solutions — engineered for reliability, built for the way you live.",
  },
  {
    start: 0.35,
    end: 0.65,
    tag: "Our Products",
    title: "Smart Switches. Seamless Control.",
    description:
      "From intelligent breaker panels to app-controlled sockets, our product range puts the power of your entire home in your hands.",
  },
  {
    start: 0.7,
    end: 1.0,
    tag: "Trusted by Thousands",
    title: "Your Home. Your Rules.",
    description:
      "Join thousands of homeowners who trust Aqua Electrical to automate, protect, and elevate their living spaces.",
  },
];

const FADE = 0.06;
const LERP = 0.1;

export default function HomeVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const framesRef = useRef([]);
  const chapterRefs = useRef([]);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const runningRef = useRef(false);
  const [isInView, setIsInView] = useState(false);
  const [useVideoFallback, setUseVideoFallback] = useState(false);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  // ── Extract frames from an offscreen video into ImageBitmap array ─────
  // The first frame is drawn to canvas immediately so the section isn't blank.
  // Remaining frames fill in progressively; the scroll handler uses whatever
  // frames are available so the section is interactive during extraction.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    const isIOS =
      typeof navigator !== "undefined" &&
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

    if (isIOS) {
      setUseVideoFallback(true);
      return;
    }

    const offscreen = document.createElement("video");
    offscreen.muted = true;
    offscreen.playsInline = true;
    offscreen.preload = "auto";
    offscreen.src = VIDEO_SRC;

    const seekTo = (time) =>
      new Promise((resolve) => {
        if (Math.abs(offscreen.currentTime - time) < 0.001) {
          resolve();
          return;
        }

        let finished = false;
        const done = () => {
          if (finished) return;
          finished = true;
          resolve();
        };

        const timeout = window.setTimeout(done, 800);
        offscreen.addEventListener(
          "seeked",
          () => {
            window.clearTimeout(timeout);
            done();
          },
          { once: true }
        );

        offscreen.currentTime = time;
      });

    const extract = async () => {
      // Wait until the browser has enough data to seek
      if (offscreen.readyState < 2) {
        await new Promise((r) =>
          offscreen.addEventListener("canplay", r, { once: true })
        );
      }
      if (cancelled) return;

      const { duration, videoWidth, videoHeight } = offscreen;
      if (!duration || !videoWidth) return;

      // Size canvas once
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      const ctx = canvas.getContext("2d", { alpha: false });
      ctxRef.current = ctx;

      // Extract frame 0 first → draw it immediately so the section isn't blank
      await seekTo(0);
      if (cancelled) return;
      if (typeof createImageBitmap !== "function") {
        setUseVideoFallback(true);
        return;
      }

      try {
        const first = await createImageBitmap(offscreen);
        framesRef.current.push(first);
        ctx.drawImage(first, 0, 0);
        setFirstFrameReady(true);
      } catch {
        setUseVideoFallback(true);
        return;
      }

      // Extract remaining frames
      for (let i = 1; i < FRAME_COUNT; i++) {
        if (cancelled) return;
        await seekTo((i / (FRAME_COUNT - 1)) * duration);
        if (cancelled) return;
        try {
          framesRef.current.push(await createImageBitmap(offscreen));
        } catch {
          setUseVideoFallback(true);
          return;
        }
      }
    };

    offscreen.load();
    extract();

    return () => {
      cancelled = true;
      offscreen.src = "";
    };
  }, []);

  // ── Scroll → lerp → draw frame + animate chapter text ────────────────
  useEffect(() => {
    let lastIdx = -1;

    const updateChapters = (progress) => {
      chapters.forEach((ch, i) => {
        const el = chapterRefs.current[i];
        if (!el) return;

        let opacity = 0;
        if (progress >= ch.start && progress <= ch.end) {
          const fadeIn = Math.min(1, (progress - ch.start) / FADE);
          const fadeOut = Math.min(1, (ch.end - progress) / FADE);
          opacity = Math.min(fadeIn, fadeOut);
        }

        const midpoint = (ch.start + ch.end) / 2;
        const shift = (progress - midpoint) * 80;

        el.style.opacity = opacity;
        el.style.transform = `translate3d(0, ${shift}px, 0)`;
        el.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
      });
    };

    const tick = () => {
      const target = targetRef.current;
      const current = currentRef.current;
      const next = current + (target - current) * LERP;

      const settled = Math.abs(next - target) < 0.0001;
      const value = settled ? target : next;
      currentRef.current = value;

      // Draw whichever frames are available so far (progressively improves)
      const frames = framesRef.current;
      const ctx = ctxRef.current;
      if (!useVideoFallback && ctx && frames.length > 0) {
        const idx = Math.round(value * (frames.length - 1));
        if (idx !== lastIdx) {
          lastIdx = idx;
          ctx.drawImage(frames[idx], 0, 0);
        }
      }

      updateChapters(value);

      if (settled) {
        runningRef.current = false;
        return;
      }
      requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      targetRef.current = Math.max(0, Math.min(1, -rect.top / scrollable));
      startLoop();
    };

    updateChapters(0);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [useVideoFallback]);

  // ── Visibility toggle ─────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setIsInView(e.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[250vh] w-full px-2 py-3 sm:h-[280vh] sm:p-6 lg:h-[300vh]">
      <div className="sticky top-2 h-[calc(100svh-1rem)] w-full overflow-hidden rounded-2xl sm:top-5 sm:h-[calc(100svh-3rem)] sm:rounded-3xl lg:h-[calc(100vh-3rem)]">
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            isInView && !useVideoFallback && firstFrameReady
              ? "opacity-100"
              : "opacity-0"
          }`}
        />

        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            isInView && (useVideoFallback || !firstFrameReady)
              ? "opacity-100"
              : "opacity-0"
          }`}
          src={VIDEO_SRC}
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
        />

        {/* Chapter text overlays */}
        {chapters.map((ch, i) => (
          <div
            key={i}
            ref={(el) => (chapterRefs.current[i] = el)}
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            <div className="mx-3 max-w-xl rounded-2xl bg-black/35 px-4 py-4 text-center text-white backdrop-blur-sm sm:mx-4 sm:max-w-2xl sm:px-6 sm:py-5">
              <p className="text-[11px] uppercase tracking-[0.18em] sm:text-sm">{ch.tag}</p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl md:text-5xl">
                {ch.title}
              </h2>
              <p className="mt-2 text-sm text-white/80 md:text-base">
                {ch.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
