"use client";

import { useRef, useEffect, useState } from "react";
type AnimeModule = typeof import("animejs");

type WorkItem = {
  step: string;
  heading: string;
  paragraph: string;
  outcome: string;
  videoSrc: string;
  projectUrl?: string;
  reversed?: boolean;
};

const WORK_ITEMS: WorkItem[] = [
  {
    step: "01",
    heading: "Amurex",
    paragraph:
      "Invisible AI companion that organizes your workflows, retrieves what you need, and surfaces insights before you think to ask.",
    outcome: "2.8K+ Stars on GitHub",
    videoSrc: "/videos/amurex.mp4",
    projectUrl: "https://www.linkedin.com/posts/sanskar123_we-built-amurexai-an-invisible-ai-companion-activity-7319975003590955008-kW25",
  },
  {
    step: "02",
    heading: "Parsewise [YC X25]",
    paragraph:
      "Multi-document intelligence that gives answers to your risk teams, agents, and pipelines.",
    outcome: "Databricks Technology Partner",
    videoSrc: "/videos/parsewise.mp4",
    projectUrl: "https://www.linkedin.com/posts/y-combinator_parsewise-turns-complex-documents-into-validated-activity-7328554711484112896-5Clm",
    reversed: true,
  },
  {
    step: "03",
    heading: "Asteroid [YC W25]",
    paragraph:
      "AI that operates your browser so your operations team can stop doing what machines should.",
    outcome: "25+ Enterprise Customers",
    videoSrc: "/videos/asteroid.mp4",
    projectUrl: "https://www.linkedin.com/posts/y-combinator_asteroid-yc-w25-lets-startups-smes-and-activity-7300187947671109634--n2P",
  },
];

const CornerTicks = () => (
  <>
    <span className="absolute -top-2 -left-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
    <span className="absolute -top-2 -right-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
    <span className="absolute -bottom-2 -right-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
    <span className="absolute -bottom-2 -left-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
  </>
);

function ViewProjectLink({ href }: { href?: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    const el = linkRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const arrow = el.querySelector<HTMLSpanElement>("[data-arrow]");
    if (!arrow) return;

    import("animejs").then(({ createTimeline }) => {
      createTimeline({ defaults: { ease: "outQuad" } })
        .add(arrow, { translateX: [0, 6], duration: 160 })
        .add(arrow, { translateX: [6, 0], duration: 240 });
    });
  };

  return (
    <a
      ref={linkRef}
      href={href ?? "#"}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onMouseEnter={handleMouseEnter}
      className="inline-flex items-center gap-2 font-mono-display text-[0.75rem] tracking-[0.04em] text-nox-gold"
    >
      View project
      <span aria-hidden data-arrow className="inline-block">→</span>
    </a>
  );
}

function WorkCardTextPanel({ item, reversed }: { item: WorkItem; reversed?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        import("animejs").then((mod) => {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.style.opacity = "1";
            return;
          }
          mod.createTimeline({})
            .add(el, { opacity: 1, duration: 20, ease: "linear" }, 0)
            .add(el, { opacity: 0, duration: 20, ease: "linear" }, 20)
            .add(el, { opacity: 1, duration: 25, ease: "linear" }, 40);
        }).catch(() => {
          el.style.opacity = "1";
        });
      },
      { threshold: 0.15, rootMargin: "-60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-start justify-center py-8 lg:py-20 ${reversed ? "lg:pr-20" : "lg:pl-20"}`}
    >
      <div className="flex flex-col items-start gap-5">

        <div className="flex flex-col items-start gap-1">
          <span className="font-mono-display text-[0.625rem] tracking-[0.1em] text-nox-white/40">
            {item.step}
          </span>
          <h3 className="font-mono-display text-[1.5rem] uppercase tracking-[0.08em] text-nox-gold">
            {item.heading}:
          </h3>
        </div>

        <p className="font-mono-display text-[1rem] leading-relaxed tracking-[-0.02em] text-nox-white/70">
          {item.paragraph}
        </p>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 flex-none bg-nox-gold" aria-hidden />
          <p className="font-mono-display text-[0.75rem] uppercase tracking-[0.1em] text-nox-white">
            {item.outcome}
          </p>
        </div>

        <div data-panel-item>
          <ViewProjectLink href={item.projectUrl} />
        </div>

      </div>
    </div>
  );
}


function WorkCard({ item }: { item: WorkItem }) {
  const articleRef = useRef<HTMLElement>(null);
  const playRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const animeRef = useRef<AnimeModule | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [mobileControlsOn, setMobileControlsOn] = useState(false);

  // Desktop: show controls in fullscreen, restore muted preview on exit
  useEffect(() => {
    const video = desktopVideoRef.current;
    if (!video) return;
    const onChange = () => {
      const fs =
        document.fullscreenElement ??
        (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement;
      if (fs === video) {
        video.controls = true;
        video.play().catch(() => {});
      } else {
        video.controls = false;
        video.muted = true;
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  // Mobile: fullscreen exit → restore muted silent preview
  useEffect(() => {
    const video = mobileVideoRef.current;
    if (!video) return;
    const restore = () => {
      video.muted = true;
      video.play().catch(() => {});
      setMobileControlsOn(false);
    };
    video.addEventListener("webkitendfullscreen", restore);
    const onFsChange = () => {
      const fs =
        document.fullscreenElement ??
        (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement;
      if (fs === video) {
        // Entering fullscreen — resume if browser paused during transition
        video.play().catch(() => {});
      } else if (!fs && video.controls) {
        // Exiting fullscreen — only restore this card (controls=true means it was the active one)
        restore();
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    return () => {
      video.removeEventListener("webkitendfullscreen", restore);
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
    };
  }, []);

  // Article entrance flicker animation
  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;
    el.style.opacity = "0";
    import("animejs").then((mod) => {
      animeRef.current = mod;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          observerRef.current?.disconnect();
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.style.opacity = "1";
            return;
          }
          mod.createTimeline({})
            .add(el, { opacity: 1, duration: 20, ease: "linear" }, 0)
            .add(el, { opacity: 0, duration: 20, ease: "linear" }, 20)
            .add(el, { opacity: 1, duration: 25, ease: "linear" }, 40);
        },
        { threshold: 0.1, rootMargin: "-80px 0px" }
      );
      observerRef.current.observe(el);
    }).catch(() => { el.style.opacity = "1"; });
    return () => observerRef.current?.disconnect();
  }, []);

  const handleMouseEnter = () => {
    const el = playRef.current;
    const mod = animeRef.current;
    if (!el || !mod) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      return;
    }
    mod.createTimeline({ defaults: { ease: "linear" } })
      .add(el, { opacity: 1, duration: 30 })
      .add(el, { opacity: 0, duration: 25 })
      .add(el, { opacity: 1, duration: 20 })
      .add(el, { opacity: 0, duration: 30 })
      .add(el, { opacity: 1, duration: 35 });
  };

  const handleMouseLeave = () => {
    const el = playRef.current;
    const mod = animeRef.current;
    if (!el || !mod) return;
    mod.animate(el, { opacity: 0, duration: 200, ease: "outQuad" });
  };

  const handleDesktopClick = () => {
    const video = desktopVideoRef.current;
    if (!video) return;
    const v = video as HTMLVideoElement & { webkitRequestFullscreen?: () => void };
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
    else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
  };

  return (
    <article
      ref={articleRef}
      className={`flex items-center py-8 md:py-12 lg:py-20 last:pb-0 flex-col ${item.reversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      {/* Mobile — pointer-events-none on video lets the button overlay catch the tap;
           once controls are on, button unmounts and video becomes fully interactive */}
      <div className="relative w-full lg:hidden aspect-[16/9] bg-nox-black">
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          controls={mobileControlsOn}
          controlsList="nodownload"
          suppressHydrationWarning
          className={`absolute inset-0 h-full w-full object-cover brightness-[0.8] ${mobileControlsOn ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <source src={item.videoSrc} type="video/mp4" />
        </video>
        {!mobileControlsOn && (
          <button
            type="button"
            aria-label={`Watch ${item.heading}`}
            className="absolute inset-0 z-10 h-full w-full border-0 bg-transparent"
            onClick={() => setMobileControlsOn(true)}
          />
        )}
        <CornerTicks />
      </div>

      {/* Desktop — hover play icon, click to fullscreen */}
      <button
        type="button"
        aria-label={`Watch ${item.heading}`}
        className="group relative hidden lg:block lg:flex-none lg:w-[65%] aspect-[16/9] cursor-crosshair bg-nox-black text-left"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleDesktopClick}
      >
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={desktopVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            controlsList="nodownload"
            suppressHydrationWarning
            className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-500 brightness-[0.8] group-hover:brightness-[0.55]"
          >
            <source src={item.videoSrc} type="video/mp4" />
          </video>
        </div>

        <div
          ref={playRef}
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[2.5rem] leading-none text-nox-white font-light">[</span>
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
              <path d="M1 1L19 12L1 23V1Z" fill="var(--color-nox-gold)" />
            </svg>
            <span className="font-mono text-[2.5rem] leading-none text-nox-white font-light">]</span>
          </div>
        </div>

        <CornerTicks />
      </button>

      <WorkCardTextPanel item={item} reversed={item.reversed} />
    </article>
  );
}


export function Work() {
  return (
    <section id="work" className="relative overflow-hidden bg-nox-black pb-16 md:pb-24">
      <div className="container mx-auto w-full max-w-[calc(100%-3rem)]">

        <div className="mb-10 md:mb-16 flex flex-col gap-6">
          <div data-heading-reveal className="flex items-center gap-2">
            <span aria-hidden className="font-mono-display text-[0.75rem] text-nox-gold">./</span>
            <span className="font-mono-display text-[0.75rem] text-nox-white/40">work</span>
          </div>

          <h2 className="font-display text-[2rem] leading-[1.2] tracking-[-0.04em]">
            <span data-heading-reveal className="block text-nox-white">Stories that did the work.</span>
            <span data-heading-reveal className="block text-nox-gold">Here&apos;s what happened.</span>
          </h2>

          <p data-heading-reveal className="max-w-[42ch] font-mono-display text-[1rem] leading-relaxed tracking-[-0.02em] text-nox-white/70">
            Every video here was built for a specific moment. It delivered.
          </p>
        </div>

        <div className="flex flex-col">
          {WORK_ITEMS.map((item) => (
            <WorkCard key={item.step} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
