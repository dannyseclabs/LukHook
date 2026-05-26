"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { KeyboardEvent, PointerEvent, useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/components/ui";

const slides = [
  {
    title: "Best catch / family memory",
    image: "/journal/lukasz-bream-grass.jpeg",
    category: "Catch note",
    date: "May archive",
    region: "Polish waters",
    caption: "A warm field-session memory: heavy keepnet, wet grass and the kind of smile that starts a story.",
    position: "50% 48%"
  },
  {
    title: "Harbour evening / perch gear",
    image: "/journal/lukasz-riverside-net.jpeg",
    category: "Riverside",
    date: "Spring session",
    region: "Competition water",
    caption: "Practical gear, cold banks and a compact setup after a productive river session.",
    position: "50% 42%"
  },
  {
    title: "Magazine feature / archive scan",
    image: "/journal/lukasz-team-awards.jpeg",
    category: "Community",
    date: "Tournament day",
    region: "Angling club",
    caption: "The social side of fishing: shared trophies, muddy boots and a proper after-session photograph.",
    position: "50% 48%"
  },
  {
    title: "Cold morning / first cast",
    image: "/journal/lukasz-rain-session.jpeg",
    category: "Weather window",
    date: "Early spring",
    region: "Stillwater edge",
    caption: "Rain gear on, rods ready and enough grey sky to make the first cast feel earned.",
    position: "52% 42%"
  },
  {
    title: "Baltic light / early tide",
    image: "/journal/lukasz-tench-catch.jpeg",
    category: "Field journal",
    date: "Morning note",
    region: "Bank session",
    caption: "A quiet catch portrait with the honest texture of wet nets, cold hands and patient water.",
    position: "48% 38%"
  }
];

function getSlideStep(track: HTMLDivElement) {
  const slide = track.querySelector<HTMLElement>("[data-carousel-slide]");

  if (!slide) {
    return 1;
  }

  const styles = window.getComputedStyle(track);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");

  return slide.offsetWidth + (Number.isNaN(gap) ? 0 : gap);
}

export function PhotoJournalCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const step = getSlideStep(track);
    const nextIndex = Math.round(track.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(slides.length - 1, nextIndex)));
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    track.scrollTo({
      left: getSlideStep(track) * nextIndex,
      behavior: "smooth"
    });
    setActiveIndex(nextIndex);
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);
    updateActiveIndex();

    return () => {
      track.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [updateActiveIndex]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(slides.length - 1);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const track = trackRef.current;

    if (!track) {
      return;
    }

    dragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft
    };
    track.dataset.dragging = "true";
    track.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;

    if (!track || !dragRef.current.active) {
      return;
    }

    track.scrollLeft = dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX);
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    dragRef.current.active = false;
    delete track.dataset.dragging;

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div className="journal-carousel">
      <div
        ref={trackRef}
        className="journal-carousel-track"
        aria-label="Łukasz Wojciechowski photo journal carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerLeave={handlePointerEnd}
      >
        {slides.map((slide, index) => (
          <article
            key={slide.title}
            className="journal-slide group"
            data-carousel-slide
            aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 52vw, 88vw"
              className="journal-slide-image"
              style={{ objectPosition: slide.position }}
            />
            <div className="journal-slide-overlay" />
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 p-5">
              <span className="rounded-full bg-paper/90 px-3 py-1 text-[0.7rem] font-extrabold uppercase text-ink shadow-[0_10px_22px_rgb(16_36_62_/_0.12)]">
                {slide.category}
              </span>
              <span className="rounded-full border border-white/34 bg-ink/34 px-3 py-1 text-[0.7rem] font-bold uppercase text-white/88 backdrop-blur-md">
                {slide.region}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-normal text-white/72">{slide.date}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-white text-balance">{slide.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/78">{slide.caption}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2" aria-label="Photo journal pagination">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={cn("journal-dot", index === activeIndex && "journal-dot-active")}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="journal-arrow"
            aria-label="Previous photo"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="journal-arrow"
            aria-label="Next photo"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === slides.length - 1}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
