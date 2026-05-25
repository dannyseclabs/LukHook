import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CloudSun, Fish, MapPinned, Waves } from "lucide-react";

import { LegalNotice } from "@/components/legal-notice";
import { MapShell } from "@/components/map-shell";
import { SpotList } from "@/components/spot-list";
import { Badge, ButtonLink, Card, Container, PageHeader, Section } from "@/components/ui";
import { getRegionBySlug, regions, spotsForRegion } from "@/lib/fishing-data";

export function generateStaticParams() {
  return regions.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  return {
    title: region ? `${region.name} Fishing Guide` : "Region guide",
    description: region?.summary
  };
}

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  const spots = spotsForRegion(region.name);

  return (
    <main id="main-content">
      <Section className="border-b border-channel/16 pb-8">
        <Container className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <PageHeader kicker="Region Guide" title={region.name} description={region.summary} className="lg:block">
            <div className="mt-6 flex flex-wrap gap-2">
              {region.typicalFish.map((fish) => (
                <Badge key={fish}>
                  <Fish className="size-3.5" aria-hidden="true" />
                  {fish}
                </Badge>
              ))}
            </div>
          </PageHeader>

          <Card>
            <p className="eyebrow">Planning Summary</p>
            <dl className="mt-4 grid gap-4">
              <div>
                <dt className="text-xs font-bold uppercase text-channel">Difficulty</dt>
                <dd className="mt-1 text-base font-semibold text-ink">{region.difficulty}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase text-channel">Best Styles</dt>
                <dd className="mt-1 text-sm leading-6 text-ink/68">{region.styles.join(", ")}</dd>
              </div>
            </dl>
            <ButtonLink href={`/map?region=${encodeURIComponent(region.name)}`} className="mt-5 w-full">
              Filter Map
              <MapPinned className="size-4" aria-hidden="true" />
            </ButtonLink>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Region Map</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Map view for {region.name}</h2>
            </div>
            <Badge tone="accent">
              <Waves className="size-3.5" aria-hidden="true" />
              {spots.length} local spots
            </Badge>
          </div>
          <MapShell />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card as="aside" className="surface-danger">
            <div className="flex items-center gap-3">
              <CloudSun className="size-5 text-copper" aria-hidden="true" />
              <h2 className="font-display text-2xl font-semibold text-ink">Weather & Legal Warnings</h2>
            </div>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink/70">
              {region.weatherLegalWarnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </Card>
          <div>
            <p className="eyebrow">Recommended Spots</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Good starting points</h2>
            <div className="mt-5">
              <SpotList spots={spots} />
            </div>
          </div>
        </Container>
      </Section>

      <Container className="pb-14">
        <LegalNotice />
        <div className="mt-6 flex flex-wrap gap-3">
          {regions
            .filter((item) => item.slug !== region.slug)
            .slice(0, 4)
            .map((item) => (
              <Link key={item.slug} href={`/regions/${item.slug}`} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-channel/24 bg-paper/52 px-3 py-2 text-sm font-semibold text-ink transition-[background-color,border-color,color] duration-200 hover:border-channel/48 hover:bg-channel/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
                {item.name}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ))}
        </div>
      </Container>
    </main>
  );
}
