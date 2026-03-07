"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 90;
const VIDEO_SRC = "/images/sectiontwo-video-new.mp4";

const chapters = [
  {
    start: 0.0,
    end: 0.3,
    tag: "Aqua Electrical",
    title: "Innovative Solutions for Modern Homes",
    description:
      "Experience the future of home automation with our cutting-edge smart devices and seamless integration.",
  },
  {
    start: 0.35,
    end: 0.65,
    tag: "Smart Living",
    title: "Connected. Intuitive. Effortless.",
    description:
      "Control every aspect of your home with a single touch — lighting, climate, security, and more.",
  },
  {
    start: 0.7,
    end: 1.0,
    tag: "The Future is Now",
    title: "Upgrade Your Home Today",
    description:
      "Discover our range of intelligent switches and automation systems designed for modern living.",
  },
];

const FADE = 0.06;
const LERP = 0.1;

export default function HomeVideo() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const framesRef = useRef([]);
  const chapterRefs = useRef([]);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const runningRef = useRef(false);
  const [isInView, setIsInView] = useState(false);

  // ── Extract frames from an offscreen video into ImageBitmap array ─────
  // The first frame is drawn to canvas immediately so the section isn't blank.
  // Remaining frames fill in progressively; the scroll handler uses whatever
  // frames are available so the section is interactive during extraction.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    const offscreen = document.createElement("video");
    offscreen.muted = true;
    offscreen.playsInline = true;
    offscreen.preload = "auto";
    offscreen.src = VIDEO_SRC;

    const seekTo = (time) =>
      new Promise((resolve) => {
        const done = () => resolve();
        offscreen.addEventListener("seeked", done, { once: true });
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
      try {
        const first = await createImageBitmap(offscreen);
        framesRef.current.push(first);
        ctx.drawImage(first, 0, 0);
      } catch {
        return; // createImageBitmap not supported — canvas stays blank
      }

      // Extract remaining frames
      for (let i = 1; i < FRAME_COUNT; i++) {
        if (cancelled) return;
        await seekTo((i / (FRAME_COUNT - 1)) * duration);
        if (cancelled) return;
        try {
          framesRef.current.push(await createImageBitmap(offscreen));
        } catch {
          return;
        }
      }
    };

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
        el.style.transform = `translateY(${shift}px)`;
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
      if (ctx && frames.length > 0) {
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
  }, []);

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
    <section ref={containerRef} className="relative h-[300vh] w-full p-6">
      <div className="sticky top-5 h-[calc(100vh-3rem)] w-full overflow-hidden rounded-3xl">
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Chapter text overlays */}
        {chapters.map((ch, i) => (
          <div
            key={i}
            ref={(el) => (chapterRefs.current[i] = el)}
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            <div className="rounded-2xl bg-black/35 px-6 py-5 text-center text-white backdrop-blur-sm max-w-2xl mx-4">
              <p className="text-sm uppercase tracking-[0.18em]">{ch.tag}</p>
              <h2 className="mt-2 text-3xl font-semibold md:text-5xl">
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
