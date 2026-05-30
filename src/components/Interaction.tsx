"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export function Interaction() {
  const sectionRef    = useRef<HTMLElement | null>(null);
  const tileRef       = useRef<HTMLDivElement | null>(null);
  const workTextRef   = useRef<HTMLSpanElement | null>(null);
  const hairlineVRef  = useRef<HTMLDivElement | null>(null);  // vertical   |
  const hairlineHRef  = useRef<HTMLDivElement | null>(null);  // horizontal —
  const dialogRef       = useRef<HTMLDivElement | null>(null);
  const videoModalRef   = useRef<HTMLVideoElement | null>(null);
  const closeBtnRef     = useRef<HTMLButtonElement | null>(null);
  const playPauseBtnRef = useRef<HTMLButtonElement | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [mobileVideoOpen, setMobileVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const mobileCloseRef = useRef<HTMLButtonElement>(null);

  const closeVideo = useCallback(() => {
    setVideoOpen(false);
    (document.activeElement as HTMLElement)?.blur();
  }, []);


  /* ── Body-scroll lock while any modal is open ── */
  useEffect(() => {
    document.body.style.overflow = (videoOpen || mobileVideoOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [videoOpen, mobileVideoOpen]);

  /* ── Focus dialog/close button when either modal opens ── */
  useEffect(() => {
    if (videoOpen) { requestAnimationFrame(() => dialogRef.current?.focus()); }
  }, [videoOpen]);

  useEffect(() => {
    if (mobileVideoOpen) requestAnimationFrame(() => mobileCloseRef.current?.focus());
  }, [mobileVideoOpen]);

  /* ── ESC to close ── */
  useEffect(() => {
    if (!videoOpen && !mobileVideoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault(); e.stopPropagation();
        if (mobileVideoOpen) setMobileVideoOpen(false);
        else closeVideo();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [videoOpen, mobileVideoOpen, closeVideo]);

  /* ── Focus trap inside modal ── */
  useEffect(() => {
    if (!videoOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = [closeBtnRef.current, playPauseBtnRef.current].filter(Boolean) as HTMLButtonElement[];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [videoOpen]);

  const togglePlay = useCallback(() => {
    const v = videoModalRef.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setIsPlaying(true); }
    else { v.pause(); setIsPlaying(false); }
  }, []);

  /* ── Scroll-entry blink on "See our recent work" — mobile only ── */
  useEffect(() => {
    const text    = workTextRef.current;
    const section = sectionRef.current;
    if (!text || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: none)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        text.classList.remove("scroll-blink-entry");
        void text.offsetWidth; // force reflow to restart animation
        text.classList.add("scroll-blink-entry");
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* ── Cursor parallax ─────────────────────────────────────────────────────
     Tile  : FACTOR 0.46 / MAX 480×320  — wide travel matching original site.
     Crosshair lines move at the SAME translation as the tile so the "+"
     always passes through the tile centre regardless of cursor position.    */
  useEffect(() => {
    const section   = sectionRef.current;
    const tile      = tileRef.current;
    const lineV     = hairlineVRef.current;
    const lineH     = hairlineHRef.current;
    if (!section || !tile) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Touch / no-hover devices: tile is static and centered — skip parallax entirely
    if (window.matchMedia("(hover: none)").matches) {
      tile.style.opacity = "1";
      return;
    }

    const SMOOTHING_HZ = 3;
    const restingY = () => -0.45 * window.innerHeight;

    tile.style.opacity = "0";
    tile.style.transition = "opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1)";

    let targetX = 0, targetY = restingY();
    let currentX = 0, currentY = restingY();
    let lastTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const t = 1 - Math.exp(-SMOOTHING_HZ * dt);
      currentX += (targetX - currentX) * t;
      currentY += (targetY - currentY) * t;

      tile.style.transform = `translate3d(${currentX}px,${currentY}px,0)`;
      if (lineV) lineV.style.transform = `translateX(${currentX}px)`;
      if (lineH) lineH.style.transform = `translateY(${currentY}px)`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const rect  = section.getBoundingClientRect();
      const rawX  = e.clientX - (rect.left + rect.width  / 2);
      const rawY  = e.clientY - (rect.top  + rect.height / 2);
      const limitX = window.innerWidth  * 0.45;
      const limitY = window.innerHeight * 0.45;
      const elastic = (v: number, l: number) => {
        if (Math.abs(v) <= l) return v;
        return Math.sign(v) * (l + (Math.abs(v) - l) * 0.18);
      };
      targetX = elastic(rawX, limitX);
      targetY = elastic(rawY, limitY);
    };

    const onEnter = () => { tile.style.opacity = "1"; };
    const onLeave = () => {
      tile.style.opacity = "0";
      targetX = 0;
      targetY = restingY();
    };

    section.addEventListener("pointermove",  onMove,  { passive: true });
    section.addEventListener("pointerenter", onEnter);
    section.addEventListener("pointerleave", onLeave);

    let rafRunning = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!rafRunning) { rafRunning = true; lastTime = performance.now(); rafId = requestAnimationFrame(tick); }
        } else {
          if (rafRunning) { rafRunning = false; cancelAnimationFrame(rafId); }
        }
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(section);

    return () => {
      section.removeEventListener("pointermove",  onMove);
      section.removeEventListener("pointerenter", onEnter);
      section.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(rafId);
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        aria-label="Interactive preview"
        className="interaction-section relative flex min-h-[80dvh] md:min-h-[100dvh] items-center justify-center overflow-hidden"
      >
        {/* Background + hairlines — all clipped together by this overflow-hidden container */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/interaction-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            priority={false}
            className="object-cover object-center brightness-[0.65] contrast-[1.1]"
          />

          {/* Radial vignette */}
          <div
            aria-hidden
            className="absolute inset-0 z-[1]"
            style={{ background: "radial-gradient(ellipse at 50% 55%, transparent 25%, rgba(9,9,11,0.65) 65%, #09090b 100%)" }}
          />

          {/* Vertical hairline — follows tile X */}
          <div
            ref={hairlineVRef}
            aria-hidden
            className="absolute inset-0 z-[2] mx-auto w-px bg-nox-white/[0.27] will-change-transform"
          />
          {/* Horizontal hairline — follows tile Y */}
          <div
            ref={hairlineHRef}
            aria-hidden
            className="absolute inset-x-0 top-1/2 z-[2] h-px w-full bg-nox-white/[0.27] will-change-transform"
          />
        </div>

        {/* Video tile */}
        <div
          ref={tileRef}
          className="interaction-tile relative z-10 flex h-[8rem] w-[12rem] items-center justify-center will-change-transform md:h-[10rem] md:w-[15rem] lg:h-[13rem] lg:w-[19.5rem]"
        >
          {/* Play button */}
          <button
            type="button"
            onClick={() => {
              if (window.matchMedia("(hover: none)").matches) setMobileVideoOpen(true);
              else setVideoOpen(true);
            }}
            className="hover-blink absolute inset-0 z-30 flex items-center justify-center focus:outline-none"
            aria-label="Watch: See our recent work"
          >
            <span ref={workTextRef} className="inline-flex items-center gap-2 font-mono text-[0.75rem] tracking-[0.04em] leading-[1.2] text-nox-white">
              <span>[</span>
              <span aria-hidden className="flex h-2 w-1 items-center justify-center text-nox-gold">
                <svg width="100%" height="100%" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0L4.00037 4.00037L0 8.00074V4.00037V0Z" fill="currentColor" />
                </svg>
              </span>
              <span>See our recent work</span>
              <span>]</span>
            </span>
          </button>

          {/* Muted preview loop */}
          <div className="absolute inset-0 z-[1] overflow-hidden">
            <video
              autoPlay loop muted playsInline preload="metadata"
              suppressHydrationWarning
              className="h-full w-full object-cover"
            >
              <source src="/videos/parsewise-launch.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Dark overlay */}
          <div className="pointer-events-none absolute inset-0 z-[2] bg-nox-black/35" />

          {/* Corner markers */}
          <span aria-hidden className="absolute -left-1  -top-2    z-30 h-2 w-1 bg-nox-white" />
          <span aria-hidden className="absolute -right-1 -top-2    z-30 h-2 w-1 bg-nox-white" />
          <span aria-hidden className="absolute -bottom-2 -right-1 z-30 h-2 w-1 bg-nox-white" />
          <span aria-hidden className="absolute -bottom-2 -left-1  z-30 h-2 w-1 bg-nox-white" />
        </div>

      </section>

      {/* ════ Mobile native video modal ════ */}
      {mobileVideoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="See our recent work"
          className="fixed inset-0 z-[2200] flex flex-col items-center justify-center bg-nox-black/90"
          onClick={() => setMobileVideoOpen(false)}
        >
          <button
            ref={mobileCloseRef}
            type="button"
            onClick={() => setMobileVideoOpen(false)}
            className="absolute top-5 right-6 inline-flex min-h-[44px] items-center font-mono text-[0.75rem] tracking-[0.04em] leading-[1.2] text-nox-white"
          >
            [ Close the video (ESC) ]
          </button>
          <div
            className="relative w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              playsInline
              controls
              controlsList="nodownload"
              preload="metadata"
              className="w-full"
            >
              <source src="/videos/parsewise-launch.mp4" type="video/mp4" />
              <track kind="captions" src="/videos/parsewise-launch.vtt" srcLang="en" label="English" default />
            </video>
          </div>
        </div>
      )}

      {/* ════ Fullscreen video overlay ════ */}
      {videoOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="See our recent work"
          tabIndex={-1}
          className="fixed inset-0 z-[2200] flex flex-col items-center justify-center bg-nox-black/[0.94] outline-none"
          onClick={closeVideo}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeVideo}
            className="hover-blink absolute top-5 right-6 z-10 font-mono text-[0.75rem] tracking-[0.04em] leading-[1.2] text-nox-white"
          >
            [ Close the video (ESC) ]
          </button>

          <div
            className="relative mx-6 w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <span aria-hidden className="absolute -left-[1px]  -top-[2px]    z-10 h-2 w-1 bg-nox-white" />
            <span aria-hidden className="absolute -right-[1px] -top-[2px]    z-10 h-2 w-1 bg-nox-white" />
            <span aria-hidden className="absolute -bottom-[2px] -right-[1px] z-10 h-2 w-1 bg-nox-white" />
            <span aria-hidden className="absolute -bottom-[2px] -left-[1px]  z-10 h-2 w-1 bg-nox-white" />

            <div className="relative aspect-video w-full">
              <video
                ref={videoModalRef}
                autoPlay playsInline
                className="h-full w-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="/videos/parsewise-launch.mp4" type="video/mp4" />
                <track kind="captions" src="/videos/parsewise-launch.vtt" srcLang="en" label="English" default />
              </video>
              {/* Click-to-pause/play overlay — keeps focus off shadow DOM */}
              <button
                ref={playPauseBtnRef}
                type="button"
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <span className="flex h-12 w-12 items-center justify-center bg-nox-black/50 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  {isPlaying ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="3" y="2" width="4" height="12" fill="white"/>
                      <rect x="9" y="2" width="4" height="12" fill="white"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 2L13 8L3 14V2Z" fill="white"/>
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
