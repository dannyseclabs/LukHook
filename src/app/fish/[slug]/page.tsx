import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Fish, MapPinned, ShieldAlert, Target, Waves } from "lucide-react";

import { LegalNotice } from "@/components/legal-notice";
import { SpotList } from "@/components/spot-list";
import { Badge, ButtonLink, Card, Container, PageHeader, Section } from "@/components/ui";
import { fishGuides, getFishBySlug, spotsForFish } from "@/lib/fishing-data";

export function generateStaticParams() {
  return fishGuides.map((fish) => ({ slug: fish.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const fish = getFishBySlug(slug);

  return {
    title: fish ? `${fish.name} Fishing in Denmark` : "Fish guide",
    description: fish?.tagline
  };
}

export default async function FishPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fish = getFishBySlug(slug);

  if (!fish) {
    notFound();
  }

  const spots = spotsForFish(fish.name);

  return (
    <main id="main-content">
      <Section className="border-b border-channel/16 pb-8">
        <Container className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <PageHeader kicker="Fish Guide" title={fish.name} description={fish.tagline} className="lg:block">
            <div className="mt-6 flex flex-wrap gap-2">
              {fish.bestMonths.map((month) => (
                <Badge key={month} tone="accent">
                  {month}
                </Badge>
              ))}
            </div>
          </PageHeader>

          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Trip Timing</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-ink">Best Windows</h2>
              </div>
              <Clock className="size-5 text-channel" aria-hidden="true" />
            </div>
            <p className="mt-4 text-sm leading-6 text-ink/68">{fish.bestTimeOfDay}</p>
            <ButtonLink href={`/map?species=${encodeURIComponent(fish.name)}`} className="mt-5 w-full">
              Find Spots
              <MapPinned className="size-4" aria-hidden="true" />
            </ButtonLink>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            <GuideBlock icon={MapPinned} title="Where to Find" items={fish.whereToFind} />
            <GuideBlock icon={Target} title="Metric Gear Setup" items={fish.gear} />
            <GuideBlock icon={Waves} title="Lures & Methods" items={fish.lures} />
            <GuideBlock icon={Fish} title="Tactics" items={fish.tactics} />
            <GuideBlock icon={Clock} title="Beginner Mistakes" items={fish.beginnerMistakes} />
            <Card className="surface-danger">
              <ShieldAlert className="size-5 text-copper" aria-hidden="true" />
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink">Legal Note</h2>
              <p className="mt-4 text-sm leading-6 text-ink/72">{fish.legalNote}</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-channel/16 bg-channel/8">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Matching Spots</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Fishable water for {fish.name}</h2>
            </div>
            <ButtonLink href={`/map?species=${encodeURIComponent(fish.name)}`} variant="secondary">
              View On Map
            </ButtonLink>
          </div>
          <div className="mt-6">
            <SpotList spots={spots} />
          </div>
        </Container>
      </Section>

      <Container className="py-8">
        <LegalNotice />
        <div className="mt-6 flex flex-wrap gap-3">
          {fishGuides
            .filter((item) => item.slug !== fish.slug)
            .map((item) => (
              <Link key={item.slug} href={`/fish/${item.slug}`} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-channel/24 bg-paper/52 px-3 py-2 text-sm font-semibold text-ink transition-[background-color,border-color,color] duration-200 hover:border-channel/48 hover:bg-channel/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
                {item.name}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ))}
        </div>
      </Container>
    </main>
  );
}

function GuideBlock({ icon: Icon, title, items }: { icon: typeof MapPinned; title: string; items: string[] }) {
  return (
    <Card as="section" className="h-full">
      <Icon className="size-5 text-channel" aria-hidden="true" />
      <h2 className="mt-4 font-display text-2xl font-semibold text-ink">{title}</h2>
      <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink/68">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
