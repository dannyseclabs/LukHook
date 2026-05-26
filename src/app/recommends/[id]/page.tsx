import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ExternalLink, Fish, ShieldCheck, XCircle } from "lucide-react";

import { Badge, ButtonLink, Card, Container, PageHeader, Section } from "@/components/ui";
import { getRecommendationById, recommendations } from "@/data/recommendations";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return recommendations.map((recommendation) => ({ id: recommendation.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const recommendation = getRecommendationById(id);

  return {
    title: recommendation ? `${recommendation.name} | Łukasz Recommends` : "Gear recommendation",
    description: recommendation?.shortDescription,
    alternates: recommendation ? { canonical: `/recommends/${recommendation.id}` } : undefined
  };
}

export default async function RecommendationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recommendation = getRecommendationById(id);

  if (!recommendation) {
    notFound();
  }

  const related = recommendations.filter((item) => item.id !== recommendation.id && item.category === recommendation.category).slice(0, 3);

  return (
    <main id="main-content">
      <Section className="border-b border-channel/16 pb-8">
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <PageHeader kicker="Łukasz Recommends" title={recommendation.name} description={recommendation.shortDescription} className="lg:block">
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge tone="accent">{recommendation.category}</Badge>
              <Badge>{recommendation.priceRange}</Badge>
              <Badge tone={recommendation.beginnerFriendly ? "accent" : "default"}>
                {recommendation.beginnerFriendly ? "Beginner friendly" : "Experienced choice"}
              </Badge>
            </div>
          </PageHeader>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border-soft bg-warm-gray shadow-map">
            <Image
              src={recommendation.image}
              alt=""
              fill
              preload
              sizes="(min-width: 1024px) 420px, 92vw"
              className="object-cover"
              style={{ objectPosition: recommendation.imagePosition ?? "50% 50%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/24 bg-white/82 p-4 backdrop-blur-md">
              <p className="eyebrow">Best use case</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-ink">{recommendation.useCase}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <article className="grid gap-5">
            <Card>
              <p className="eyebrow">Łukasz’s note</p>
              <p className="mt-4 text-lg leading-8 text-ink/76">{recommendation.whyLukaszRecommendsIt}</p>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-channel" aria-hidden="true" />
                  <h2 className="font-display text-2xl font-semibold text-ink">Pros</h2>
                </div>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink/68">
                  {recommendation.pros.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>

              <Card>
                <div className="flex items-center gap-3">
                  <XCircle className="size-5 text-copper" aria-hidden="true" />
                  <h2 className="font-display text-2xl font-semibold text-ink">Cons</h2>
                </div>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink/68">
                  {recommendation.cons.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </article>

          <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
            <Card className="surface-soft">
              <Fish className="size-5 text-channel" aria-hidden="true" />
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink">Targets</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {recommendation.targetFish.map((fish) => (
                  <span key={fish} className="tag">
                    {fish}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="surface-danger">
              <ShieldCheck className="size-5 text-copper" aria-hidden="true" />
              <p className="mt-4 text-sm leading-6 text-ink/72">
                Recommendations are personal and should be checked against your own fishing style, budget and local conditions.
              </p>
            </Card>

            {recommendation.externalLink ? (
              <ButtonLink href={recommendation.externalLink} variant="secondary">
                External link placeholder
                <ExternalLink className="size-4" aria-hidden="true" />
              </ButtonLink>
            ) : null}
          </aside>
        </Container>
      </Section>

      <Section className="border-t border-channel/16 bg-channel/8">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">More from this category</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink">{recommendation.category}</h2>
            </div>
            <ButtonLink href="/recommends" variant="secondary">
              All recommendations
            </ButtonLink>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {(related.length > 0 ? related : recommendations.filter((item) => item.id !== recommendation.id).slice(0, 3)).map((item) => (
              <Link key={item.id} href={`/recommends/${item.id}`} className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
                <Card interactive className="h-full">
                  <Badge>{item.category}</Badge>
                  <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-ink group-hover:text-channel">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/64">{item.shortDescription}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-copper">
                    View note
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
