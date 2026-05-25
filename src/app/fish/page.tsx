import Link from "next/link";
import { ArrowRight, Fish } from "lucide-react";

import { Badge, Card, Container, PageHeader, Section } from "@/components/ui";
import { fishGuides } from "@/lib/fishing-data";

export default function FishIndexPage() {
  return (
    <main id="main-content">
      <Section>
        <Container>
          <PageHeader kicker="Fish Guides" title="Choose the target species first" description="Each guide works backwards from fish behavior into region choice, metric gear setup, lure selection, tactics, timing and legal checks." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fishGuides.map((fish) => (
              <Link key={fish.slug} href={`/fish/${fish.slug}`} className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
                <Card interactive className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <Fish className="size-6 text-channel" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase text-channel">{fish.bestMonths.length} months</span>
                  </div>
                  <h2 className="mt-5 text-pretty font-display text-2xl font-semibold text-ink group-hover:text-channel">{fish.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/66">{fish.tagline}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {fish.bestMonths.slice(0, 4).map((month) => (
                      <Badge key={month}>{month}</Badge>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-channel">
                    Open Guide
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
