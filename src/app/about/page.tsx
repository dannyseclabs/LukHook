import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen, CalendarDays, Compass, Fish, MapPinned, Mic, Newspaper, Quote, Waves } from "lucide-react";

import { PhotoJournalCarousel } from "@/components/photo-journal-carousel";
import { Badge, ButtonLink, Card, Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Łukasz Wojciechowski | LukHook",
  description: "Meet Łukasz Wojciechowski, a Polish angler exploring Danish waters and helping Polish fishermen plan better trips abroad."
};

const achievements = [
  { label: "Biggest sea trout", value: "74 cm", Icon: Fish },
  { label: "Danish regions explored", value: "8", Icon: MapPinned },
  { label: "Years fishing Denmark", value: "9+", Icon: CalendarDays },
  { label: "Favorite species", value: "Sea trout", Icon: Waves },
  { label: "Magazine appearances", value: "12", Icon: Newspaper }
];

const pressItems = [
  { title: "Baltic Angling Journal", body: "Feature story on spring sea trout and wind-led planning around Funen.", Icon: Newspaper },
  { title: "Outdoor Polska", body: "Interview about preparing Polish anglers for Danish coastal conditions.", Icon: Mic },
  { title: "Nordic Fishing Notes", body: "Guest article on reading eelgrass, stones and current on open coast.", Icon: BookOpen }
];

const timeline = [
  { year: "2016", text: "First longer Danish coastal trip, learning how quickly wind changes the plan." },
  { year: "2018", text: "Started mapping reliable sea trout water around Funen and Zealand." },
  { year: "2021", text: "Began helping Polish anglers prepare for licences, gear and local rules." },
  { year: "2024", text: "Expanded notes into a structured Denmark fishing planner concept." }
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <Section className="pb-8">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.8fr)] lg:items-end">
          <div className="max-w-3xl">
            <Badge tone="accent">
              <Compass className="size-3.5" aria-hidden="true" />
              Polish angler in Danish waters
            </Badge>
            <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl">
              Łukasz Wojciechowski
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-ink/72 text-pretty">
              Polish angler exploring Danish waters for years.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink/68 text-pretty">
              LukHook is built from practical notes: wind windows, coastal structure, local rules, metric gear and the small decisions that make a fishing trip abroad feel calmer.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/map">Explore The Map</ButtonLink>
              <ButtonLink href="/fish/sea-trout" variant="secondary">
                Sea Trout Notes
              </ButtonLink>
            </div>
          </div>

          <figure className="about-hero-photo">
            <Image
              src="/journal/lukasz-about-hero.jpeg"
              alt="Łukasz Wojciechowski smiling with a large catch on the grass"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="object-cover"
              style={{ objectPosition: "50% 48%" }}
            />
            <figcaption className="absolute inset-x-5 bottom-5 z-10 rounded-xl border border-white/24 bg-ink/48 px-4 py-3 text-sm font-semibold text-white/88 shadow-[0_18px_38px_rgb(16_36_62_/_0.18)] backdrop-blur-md">
              Field archive / heavy catch day
            </figcaption>
          </figure>
        </Container>
      </Section>

      <Container>
        <div className="editorial-rule" />
      </Container>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[0.72fr_1fr]">
          <div>
            <p className="eyebrow">Story</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight text-ink">
              A Polish perspective on Nordic fishing water.
            </h2>
          </div>
          <div className="grid gap-5 text-base leading-8 text-ink/72">
            <p>
              Łukasz started fishing Danish coasts the hard way: with too much gear, too little local context and a notebook full of wind directions. Over the years those rough notes turned into a calmer system for reading coastlines, fjords and harbour water.
            </p>
            <p>
              Sea trout became the teacher. Eelgrass, stones, current, cold fingers and empty dawns shaped the way he plans trips now: choose the fish, understand the region, pack light but correctly, then check the law before the first cast.
            </p>
            <p>
              LukHook is made for Polish anglers who want Denmark to feel less distant. It keeps the planning practical, metric and honest, with a respect for Baltic and Nordic fishing culture rather than internet shortcuts.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-mist/60">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Field Notes</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink">Experience, kept practical</h2>
            </div>
            <Badge tone="accent">Placeholder data for now</Badge>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {achievements.map(({ label, value, Icon }) => (
              <Card key={label}>
                <Icon className="size-5 text-channel" aria-hidden="true" />
                <p className="mt-5 font-display text-3xl font-semibold leading-none text-ink">{value}</p>
                <p className="mt-2 text-xs font-bold uppercase text-channel">{label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-7 grid gap-4 lg:grid-cols-[0.62fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">Photo journal</p>
              <h2 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight text-ink">
                Coastal memories, maps, wet gear and quiet mornings.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-ink/68 lg:justify-self-end">
              A visual archive of Łukasz’s fishing trips, catches, notes and Danish coastal moments.
            </p>
          </div>
          <PhotoJournalCarousel />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="surface-soft">
            <Quote className="size-6 text-channel" aria-hidden="true" />
            <blockquote className="mt-5 text-pretty font-display text-3xl font-semibold leading-tight text-ink">
              “Good fishing starts before the cast. It starts with weather, respect for water and knowing why you chose this place.”
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-channel">Łukasz Wojciechowski</p>
          </Card>

          <div>
            <p className="eyebrow">Media & Press</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink">Stories to be filled as the platform grows</h2>
            <div className="mt-6 grid gap-4">
              {pressItems.map(({ title, body, Icon }) => (
                <Card key={title} className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-start">
                  <Icon className="size-5 text-channel" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink/68">{body}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white/48">
        <Container className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="eyebrow">Timeline</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight text-ink">
              Trips that shaped the planner
            </h2>
          </div>
          <div className="grid gap-3">
            {timeline.map(({ year, text }) => (
              <div key={year} className="grid gap-4 border-b border-border-soft pb-4 sm:grid-cols-[90px_1fr]">
                <p className="font-display text-2xl font-semibold text-channel">{year}</p>
                <p className="text-sm leading-6 text-ink/70">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow">Philosophy</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight text-ink">
              Practical, calm, and close to the water.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink/68">
              The goal is not to promise fish. The goal is to help a Polish angler arrive prepared, understand the water faster and fish Denmark with more confidence.
            </p>
          </div>
          <ButtonLink href="/map">Plan A Danish Trip</ButtonLink>
        </Container>
      </Section>
    </main>
  );
}
