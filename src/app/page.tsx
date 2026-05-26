import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Compass, Fish, MapPinned, ShieldCheck, Waves } from "lucide-react";

import { LegalNotice } from "@/components/legal-notice";
import { MapShell } from "@/components/map-shell";
import { SpotList } from "@/components/spot-list";
import { Badge, ButtonLink, Card, Container, Section, SectionTitle, StatCard } from "@/components/ui";
import { fishGuides, fishingSpots, regions } from "@/lib/fishing-data";

const heroStats = [
  { label: "Spots", value: fishingSpots.length },
  { label: "Species", value: fishGuides.length },
  { label: "Regions", value: regions.length },
  { label: "Beginner Spots", value: fishingSpots.filter((spot) => spot.difficulty === "Beginner").length }
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="relative isolate overflow-hidden border-b border-channel/16 bg-hero">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgb(248_250_252_/_0.9),rgb(255_255_255_/_0.76)_48%,rgb(234_223_200_/_0.42))]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-paper to-transparent" />
        <Container className="grid gap-8 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end lg:py-20">
          <div className="max-w-3xl">
            <Badge tone="accent" className="bg-white/72">
              <Compass className="size-3.5" aria-hidden="true" />
              Denmark planner for Polish anglers
            </Badge>
            <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl">
              Plan your next fishing trip in Denmark
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/72 text-pretty">
              A calm, map-first travel tool for Polish fishermen choosing Danish water, target fish, gear, tactics, timing and legal checks before the road north.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/map" size="lg">
                Explore Fishing Map
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={`/fish/${fishGuides[0].slug}`} variant="secondary" size="lg">
                Start With Sea Trout
              </ButtonLink>
            </div>
          </div>

          <Card className="surface-soft grid gap-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Trip Flow</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-ink">Choose → Filter → Fish</h2>
              </div>
              <MapPinned className="size-6 text-channel" aria-hidden="true" />
            </div>
            <div className="grid gap-3">
              {[
                ["Choose Fish", "Target sea trout, pike, perch, cod or flatfish", Fish],
                ["Choose Region", "Match wind, distance, water type and difficulty", Waves],
                ["Get Plan", "Metric gear, tactics, prep time and legal reminders", ShieldCheck]
              ].map(([title, body, Icon]) => (
                <div key={title as string} className="rounded-lg border border-channel/16 bg-channel/8 p-3">
                  <div className="flex items-start gap-3">
                    <Icon className="mt-0.5 size-4 shrink-0 text-channel" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{title as string}</p>
                      <p className="mt-1 text-xs leading-5 text-ink/62">{body as string}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {heroStats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
          <MapShell />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <SectionTitle kicker="Quick Targets" title="Start with the fish, not with guesswork" description="Each guide turns fish behavior into regions, tackle, timing and common mistakes to avoid." />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {fishGuides.map((fish) => (
              <Link key={fish.slug} href={`/fish/${fish.slug}`} className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
                <Card interactive className="h-full">
                  <Fish className="size-5 text-channel" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-ink group-hover:text-channel">{fish.name}</h3>
                  <p className="mt-2 text-xs leading-5 text-ink/60">{fish.bestMonths.slice(0, 3).join(", ")} · {fish.gear[0]}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-channel/16 bg-channel/8">
        <Container className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <SectionTitle kicker="Planner Logic" title="Built for decisions on the waterline" description="Filter by species, water type, difficulty, season and method. Each marker gives a compact plan: what to bring, how to fish, how long to reserve and what to verify legally." />
            <ButtonLink href="/map" className="mt-6">
              Open Interactive Map
              <MapPinned className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Water Type", "Coast, lake, river, pier, put & take", Waves],
              ["Preparation Time", "Short harbour sessions to full-day lake trips", Clock3],
              ["Legal Checks", "Licence, local access and closed seasons", CalendarDays]
            ].map(([title, body, Icon]) => (
              <Card key={title as string}>
                <Icon className="size-5 text-channel" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/64">{body as string}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle kicker="Recommended Starter Spots" title="A practical first dataset for Denmark" description="The app uses local JSON now, so the dataset can be extended or connected to a backend later." />
          <div className="mt-7">
            <SpotList spots={fishingSpots.slice(0, 4)} />
          </div>
        </Container>
      </Section>

      <Container className="pb-14">
        <LegalNotice />
      </Container>
    </main>
  );
}
