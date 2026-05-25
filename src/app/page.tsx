import Link from "next/link";
import { ArrowRight, Clock3, Compass, Fish, MapPinned, ShieldCheck, Waves } from "lucide-react";

import { LegalNotice } from "@/components/legal-notice";
import { SectionHeading } from "@/components/section-heading";
import { SpotList } from "@/components/spot-list";
import { fishGuides, fishingSpots, regions } from "@/lib/fishing-data";

const heroStats = [
  { label: "starter spots", value: fishingSpots.length },
  { label: "regions", value: regions.length },
  { label: "fish guides", value: fishGuides.length }
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="relative isolate overflow-hidden border-b border-ink/10 bg-hero">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(0,48,73,.88),rgba(0,48,73,.58)_46%,rgba(102,155,188,.24))]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-paper to-transparent" />
        <div className="mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-7xl items-end gap-10 px-4 pb-10 pt-24 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
          <div className="max-w-3xl pb-8 text-ink">
            <p className="inline-flex items-center gap-2 rounded-md border border-ink/25 bg-ink/12 px-3 py-2 text-sm font-semibold backdrop-blur">
              <Compass className="size-4" aria-hidden="true" />
              Practical Denmark fishing planner
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl">
              Plan your next fishing trip in Denmark
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/82">
              Pick a target fish, scan the region, then get the gear, tactics, timing, difficulty and legal checks you need before you leave home.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/map" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-copper px-5 py-3 text-sm font-bold text-ink shadow-map transition hover:bg-copper-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                Explore fishing map
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href={`/fish/${fishGuides[0].slug}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-ink/25 bg-ink/10 px-5 py-3 text-sm font-bold text-ink backdrop-blur transition hover:bg-ink/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                Start with sea trout
              </Link>
            </div>
          </div>

          <div className="mb-8 grid gap-3 rounded-lg border border-ink/20 bg-ink/12 p-4 text-ink shadow-map backdrop-blur-md">
            <div className="grid grid-cols-3 gap-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-md bg-ink/12 p-3">
                  <p className="font-display text-3xl font-semibold">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-normal text-ink/68">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-md bg-ink/40 p-4">
              <p className="text-sm font-semibold text-ink/72">Fast workflow</p>
              <p className="mt-2 font-display text-2xl font-semibold leading-tight">Choose fish → choose region → get gear and tactics</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading kicker="Quick targets" title="Start with the fish, not with guesswork" description="Each target opens into locations, timing, tackle and the mistakes that usually cost new anglers the first fish." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {fishGuides.map((fish) => (
            <Link key={fish.slug} href={`/fish/${fish.slug}`} className="group rounded-lg border border-ink/10 bg-paper p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-channel/35 hover:shadow-map focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
              <Fish className="size-6 text-channel" aria-hidden="true" />
              <h2 className="mt-5 font-display text-2xl font-semibold text-ink group-hover:text-channel">{fish.name}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/62">{fish.bestMonths.slice(0, 3).join(", ")} · {fish.gear[0]}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-mist">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="eyebrow">Map-first MVP</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink">Built for decisions on the waterline</h2>
            <p className="mt-4 text-base leading-7 text-ink/68">
              Filter by species, water type, difficulty, season and method. Every marker gives a compact plan: what to bring, how to fish, how long to reserve and what to verify legally.
            </p>
            <Link href="/map" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-copper px-5 py-3 text-sm font-bold text-ink shadow-map transition hover:bg-copper-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
              Open interactive map
              <MapPinned className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Water type", "coast, lake, river, pier, put & take", Waves],
              ["Preparation time", "short harbour sessions to full day lake trips", Clock3],
              ["Legal checks", "licence, local access, closed seasons", ShieldCheck]
            ].map(([title, body, Icon]) => (
              <div key={title as string} className="rounded-lg border border-ink/10 bg-paper p-5">
                <Icon className="size-6 text-channel" aria-hidden="true" />
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{title as string}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/62">{body as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading kicker="Recommended starter spots" title="A practical first dataset for Denmark" description="The app uses local JSON now, so it is easy to replace, extend or connect to a backend later." />
        <div className="mt-8">
          <SpotList spots={fishingSpots.slice(0, 4)} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <LegalNotice />
      </section>
    </main>
  );
}
