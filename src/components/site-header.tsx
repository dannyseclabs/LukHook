import Link from "next/link";
import Image from "next/image";
import { Anchor, Fish, MapPinned, UserRound } from "lucide-react";

import { ButtonLink, Container } from "@/components/ui";
import { fishGuides, regions } from "@/lib/fishing-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-channel/14 bg-white/82 shadow-[0_10px_34px_rgb(16_36_62_/_0.07)] backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-2.5">
        <Link href="/" className="group flex items-center gap-3" aria-label="LukHook home">
          <Image src="/lukhook-mark.svg" alt="" width={40} height={40} priority className="size-10 rounded-xl shadow-[0_10px_24px_rgb(16_36_62_/_0.1)]" />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-ink">LukHook</span>
            <span className="block text-xs font-semibold uppercase text-channel">Danish water, Polish instinct</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <Link className="nav-link" href="/">
            Home
          </Link>
          <Link className="nav-link" href="/map">
            Map
          </Link>
          <Link className="nav-link" href={`/regions/${regions[0].slug}`}>
            Regions
          </Link>
          <Link className="nav-link" href={`/fish/${fishGuides[0].slug}`}>
            Fish guides
          </Link>
          <Link className="nav-link" href="/about">
            About Łukasz
          </Link>
        </nav>

        <ButtonLink href="/map" size="sm" className="hidden sm:inline-flex">
          <Fish className="size-4" aria-hidden="true" />
          Explore Map
        </ButtonLink>
      </Container>
      <div className="flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        <Link className="mobile-chip" href="/">
          Home
        </Link>
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
        <Link className="mobile-chip" href="/about">
          <UserRound className="size-4" aria-hidden="true" />
          Łukasz
        </Link>
      </div>
    </header>
  );
}
