import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Fish, MapPin, ShieldAlert, Waves } from "lucide-react";

import { LegalNotice } from "@/components/legal-notice";
import { Badge, ButtonLink, Card, Container, PageHeader, Section } from "@/components/ui";
import { fishGuides, fishingSpots, getSpotById, slugify, waterTypeLabels } from "@/lib/fishing-data";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return fishingSpots.map((spot) => ({ id: spot.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const spot = getSpotById(id);

  return {
    title: spot ? `${spot.name} Fishing Guide` : "Fishing spot guide",
    description: spot ? `${spot.region} ${waterTypeLabels[spot.type]} guide for ${spot.species.join(", ")}.` : undefined,
    alternates: spot ? { canonical: `/spots/${spot.id}` } : undefined
  };
}

export default async function SpotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const spot = getSpotById(id);

  if (!spot) {
    notFound();
  }

  return (
    <main id="main-content">
      <Section className="border-b border-channel/16 pb-8">
        <Container className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <PageHeader kicker="Spot Guide" title={spot.name} description={`${spot.region} · ${waterTypeLabels[spot.type]} · ${spot.species.join(", ")}`} className="lg:block">
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>
                <MapPin className="size-3.5" aria-hidden="true" />
                {spot.region}
              </Badge>
              <Badge>
                <Waves className="size-3.5" aria-hidden="true" />
                {waterTypeLabels[spot.type]}
              </Badge>
              <Badge>
                <Clock className="size-3.5" aria-hidden="true" />
                {spot.estimatedTime}
              </Badge>
              <Badge tone={spot.difficulty === "Advanced" ? "danger" : "default"}>{spot.difficulty}</Badge>
            </div>
          </PageHeader>

          <Card>
            <p className="eyebrow">Targets</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {spot.species.map((species) => {
                const fishSlug = slugify(species);
                const hasGuide = fishGuides.some((fish) => fish.slug === fishSlug);
                const content = (
                  <>
                    <Fish className="size-3.5" aria-hidden="true" />
                    {species}
                  </>
                );

                return hasGuide ? (
                  <Link key={species} href={`/fish/${fishSlug}`} className="tag transition-[background-color,border-color,color] duration-200 hover:border-channel/60 hover:bg-channel/14 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
                    {content}
                  </Link>
                ) : (
                  <Badge key={species}>{content}</Badge>
                );
              })}
            </div>
            <p className="mt-5 text-sm leading-6 text-ink/68">Best months: {spot.bestMonths.join(", ")}</p>
            <ButtonLink href={`/map?region=${encodeURIComponent(spot.region)}`} className="mt-5 w-full">
              Open On Map
            </ButtonLink>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            <InfoBlock title="Recommended Gear" items={spot.recommendedGear} />
            <InfoBlock title="Tactics" items={spot.tactics} />
            <InfoBlock title="Methods" items={spot.methods} />
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="grid gap-4 lg:grid-cols-2">
          <Card className="surface-danger">
            <div className="flex items-center gap-3">
              <ShieldAlert className="size-5 text-copper" aria-hidden="true" />
              <h2 className="font-display text-2xl font-semibold text-ink">Safety & Legal Notes</h2>
            </div>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink/72">
              {[...spot.legalNotes, ...spot.safetyNotes].map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="font-display text-2xl font-semibold text-ink">Preparation Plan</h2>
            <ol className="mt-4 grid gap-2 text-sm leading-6 text-ink/68">
              <li>Check official licence and species rules for the exact date.</li>
              <li>Confirm weather, wind direction and access before leaving.</li>
              <li>Pack gear around the main method: {spot.methods.slice(0, 2).join(" or ")}.</li>
              <li>Reserve {spot.estimatedTime} for fishing plus travel and rigging time.</li>
            </ol>
            <ButtonLink href="/map" className="mt-6">
              Back To Map
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </Card>
        </Container>
      </Section>

      <Container className="pb-14">
        <LegalNotice />
      </Container>
    </main>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <Card as="section" className="h-full">
      <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
      <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink/68">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
