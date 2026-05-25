import Link from "next/link";
import Image from "next/image";
import { Anchor, Fish, MapPinned } from "lucide-react";

import { fishGuides, regions } from "@/lib/fishing-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/92 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="LukHook home">
          <Image src="/lukhook-mark.svg" alt="" width={44} height={44} priority className="size-11 rounded-lg shadow-map" />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-ink">LukHook</span>
            <span className="block text-xs font-medium uppercase tracking-normal text-ink/55">trip planner</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <Link className="nav-link" href="/map">
            Map
          </Link>
          <Link className="nav-link" href={`/regions/${regions[0].slug}`}>
            Regions
          </Link>
          <Link className="nav-link" href={`/fish/${fishGuides[0].slug}`}>
            Fish guides
          </Link>
        </nav>

        <Link href="/map" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-copper px-4 py-2 text-sm font-semibold text-ink shadow-map transition hover:bg-copper-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
          <Fish className="size-4" aria-hidden="true" />
          Explore map
        </Link>
      </div>
      <div className="flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        <Link className="mobile-chip" href="/map">
          <MapPinned className="size-4" aria-hidden="true" />
          Map
        </Link>
        <Link className="mobile-chip" href={`/regions/${regions[0].slug}`}>
          <Anchor className="size-4" aria-hidden="true" />
          Regions
        </Link>
        <Link className="mobile-chip" href={`/fish/${fishGuides[0].slug}`}>
          <Fish className="size-4" aria-hidden="true" />
          Fish
        </Link>
      </div>
    </header>
  );
}
