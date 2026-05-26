"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { KeyboardEvent, PointerEvent, useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    title: "Harbour trout / Danish water",
    image: "/journal/lukasz-harbour-trout.jpeg",
    category: "Sea trout",
    date: "Cold water note",
    region: "Harbour edge",
    caption: "One of those fish that makes every cold finger and careful leader knot feel worth it.",
    position: "48% 44%"
  },
  {
    title: "Marsh trout / reed line",
    image: "/journal/lukasz-marsh-sea-trout.jpeg",
    category: "Sea trout",
    date: "Evening archive",
    region: "Reed coast",
    caption: "Heavy silver held low in the grass, with the calm confidence of a proper coastal memory.",
    position: "48% 44%"
  },
  {
    title: "Perch from winter reeds",
    image: "/journal/lukasz-perch-reeds.jpeg",
    category: "Perch",
    date: "Winter note",
    region: "Reed water",
    caption: "A clean perch portrait: cold air, muted reeds and the kind of colours anglers remember.",
    position: "50% 45%"
  },
  {
    title: "Big tench / quiet bank",
    image: "/journal/lukasz-tench-close.jpeg",
    category: "Tench",
    date: "Summer archive",
    region: "Bank session",
    caption: "Close, heavy and honest: a tench photo with muddy gear and no polished studio feeling.",
    position: "50% 44%"
  },
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
    title: "Net full / autumn grass",
    image: "/journal/lukasz-net-grass.jpeg",
    category: "Match day",
    date: "Autumn session",
    region: "Grass bank",
    caption: "A full keepnet, soft green light and the practical rhythm of a long session done right.",
    position: "50% 42%"
  },
  {
    title: "Thumbs up / full keepnet",
    image: "/journal/lukasz-net-thumbs.jpeg",
    category: "Catch note",
    date: "Field archive",
    region: "Stillwater bank",
    caption: "Personal, direct and familiar: exactly the kind of photo that belongs in an angler journal.",
    position: "50% 42%"
  },
  {
    title: "Blue kit / long session",
    image: "/journal/lukasz-blue-net-catch.jpeg",
    category: "Field journal",
    date: "Late light",
    region: "Grass bank",
    caption: "A late-day catch note with warm light, simple gear and a good reason to keep walking.",
    position: "50% 44%"
  },
  {
    title: "Carp portrait / wet grass",
    image: "/journal/lukasz-carp-portrait.jpeg",
    category: "Carp",
    date: "Rainy archive",
    region: "Green bank",
    caption: "A quiet carp frame, softened by rain gear and the saturated colours of a damp bank.",
    position: "50% 42%"
  },
  {
    title: "Pike by the river trees",
    image: "/journal/lukasz-pike-river.jpeg",
    category: "Pike",
    date: "River note",
    region: "Wooded river",
    caption: "A raw predator moment: winter trees, dark water and a pike with proper character.",
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
    title: "Podium light / water behind",
    image: "/journal/lukasz-podium-sun.jpeg",
    category: "Community",
    date: "Sunny podium",
    region: "Competition water",
    caption: "A brighter competition memory, where the water and the people tell the whole story.",
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
    title: "Reed platform / thumbs up",
    image: "/journal/lukasz-bank-selfie.jpeg",
    category: "Trip note",
    date: "Sunny bank",
    region: "Reed channel",
    caption: "A quick selfie from the swim, rods set and a simple green cap against open water.",
    position: "50% 42%"
  },
  {
    title: "Water setup / long pole",
    image: "/journal/lukasz-water-setup.jpeg",
    category: "Gear note",
    date: "Midday setup",
    region: "Reed water",
    caption: "A working platform, bait bowls and quiet water: the practical side of the journal.",
    position: "50% 42%"
  },
  {
    title: "Sunny catch / bank selfie",
    image: "/journal/lukasz-sunny-catch.jpeg",
    category: "Catch note",
    date: "Sunny archive",
    region: "Canal bank",
    caption: "A fast, imperfect and real catch photo with the energy of a good session.",
    position: "50% 42%"
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
    title: "Big net / field session",
    image: "/journal/lukasz-big-net-field.jpeg",
    category: "Match day",
    date: "Field archive",
    region: "Grass venue",
    caption: "A classic Polish angling memory: big net, open grass and a clear thumbs-up.",
    position: "50% 43%"
  },
  {
    title: "Bucket catch / roadside bank",
    image: "/journal/lukasz-bucket-catch.jpeg",
    category: "Catch note",
    date: "Autumn bank",
    region: "Town water",
    caption: "A simple keepnet portrait with the useful mess of a practical day by the water.",
    position: "50% 42%"
  },
  {
    title: "Platform selfie / team day",
    image: "/journal/lukasz-platform-selfie.jpeg",
    category: "Trip note",
    date: "Waterline",
    region: "Lake platform",
    caption: "Thumbs up from the platform, with rods stretching out and the session already underway.",
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
  const progress = `${((activeIndex + 1) / slides.length) * 100}%`;

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const step = getSlideStep(track);
    const maxScroll = track.scrollWidth - track.clientWidth;
    const nextIndex = maxScroll > 0 && track.scrollLeft >= maxScroll - 4 ? slides.length - 1 : Math.round(track.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(slides.length - 1, nextIndex)));
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    const maxScroll = track.scrollWidth - track.clientWidth;

    track.scrollTo({
      left: nextIndex === slides.length - 1 ? maxScroll : getSlideStep(track) * nextIndex,
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
        <div className="journal-progress" aria-label={`Photo ${activeIndex + 1} of ${slides.length}`}>
          <span className="journal-progress-count">
            {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <span className="journal-progress-track" aria-hidden="true">
            <span className="journal-progress-fill" style={{ width: progress }} />
          </span>
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
