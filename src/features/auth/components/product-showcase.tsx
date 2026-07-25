"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import { SHOWCASE_PILLS, SHOWCASE_SLIDES } from "../constants";
import { Starfield } from "./starfield";

const SLIDE_DURATION = 3500;
const TICK = 100;

type ProductShowcaseProps = {
  className?: string;
};

export const ProductShowcase = ({ className }: ProductShowcaseProps) => {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const total = SHOWCASE_SLIDES.length;
  const slide = SHOWCASE_SLIDES[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
      setProgress(0);
    },
    [total]
  );

  // Autoplay never pauses — only a dot click (or an arrow key) interrupts it.
  // Re-runs on activeIndex so those restart the countdown rather than
  // inheriting whatever was left of the previous slide's time.
  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    // Measured against the clock rather than counted in ticks: browsers throttle
    // intervals in background tabs, so a tick count would drift badly.
    let startedAt = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startedAt;

      if (elapsed >= SLIDE_DURATION) {
        startedAt = performance.now();
        setProgress(0);
        setActiveIndex((current) => (current + 1) % total);
        return;
      }

      setProgress(elapsed / SLIDE_DURATION);
    }, TICK);

    // Coming back to the tab restarts the current slide, so you always return
    // to a full one instead of a bar frozen wherever it was throttled.
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        startedAt = performance.now();
        setProgress(0);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeIndex, reduceMotion, total]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="What you can do with Polaris"
      className={cn(
        "relative flex flex-col overflow-hidden bg-sidebar",
        className
      )}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(activeIndex + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(activeIndex - 1);
        }
      }}
    >
      <Starfield />

      <div className="relative z-10 hidden items-center gap-2.5 p-8 lg:flex">
        <Image src="/logo.svg" alt="" width={34} height={34} priority />
        <span className="text-xl font-semibold tracking-tight">Polaris</span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10 lg:px-10 lg:py-0">
        <div className="min-h-16 space-y-1.5 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={`label-${slide.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-semibold lg:text-xl"
            >
              {slide.label}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${slide.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="mx-auto max-w-md text-balance text-sm text-muted-foreground"
            >
              {slide.sub}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="relative w-full max-w-3xl">
          <div className="absolute -inset-5 rounded-[28px] bg-ring/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-sidebar shadow-2xl">
            {/* Window chrome — makes the screenshot read as a running app
                rather than a picture floating on the page. */}
            <div className="flex h-9 items-center gap-3 border-b border-white/10 bg-background/60 px-3.5">
              <div className="flex shrink-0 items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`crumb-${slide.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="truncate font-mono text-[11px] text-muted-foreground"
                >
                  {slide.crumb}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Every slide stays mounted and cross-fades, so switching never
                waits on a fresh network request. */}
            <div className="relative aspect-5/3 bg-background">
              {SHOWCASE_SLIDES.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0,
                    scale: index === activeIndex ? 1 : 1.015,
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover object-top"
                  />
                </motion.div>
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-sidebar to-transparent" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {SHOWCASE_SLIDES.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={item.label}
                aria-current={isActive}
                className={cn(
                  "relative h-1.5 overflow-hidden rounded-full transition-all duration-300",
                  isActive
                    ? "w-8 bg-foreground/15"
                    : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                )}
              >
                {isActive && (
                  <span
                    className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-foreground/80"
                    style={{
                      transform: `scaleX(${reduceMotion ? 1 : progress})`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Read-only labels, not controls — they light up as autoplay reaches
          their slide so the row tracks the carousel without inviting a click. */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 px-6 pb-8 lg:pb-10">
        {SHOWCASE_PILLS.map((pill) => {
          const target = SHOWCASE_SLIDES.findIndex(
            (item) => item.id === pill.slideId
          );
          const isActive = target !== -1 && target === activeIndex;

          return (
            <div
              key={pill.label}
              className={cn(
                "flex select-none items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors",
                isActive
                  ? "border-ring/40 bg-ring/10 text-foreground"
                  : "border-white/10 bg-white/5 text-muted-foreground"
              )}
            >
              <pill.icon className="size-3.5" />
              <span>{pill.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
