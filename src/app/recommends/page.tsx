import type { Metadata } from "next";
import { BookOpen, Compass, ShieldCheck } from "lucide-react";

import { RecommendationsExplorer } from "@/components/recommendations-explorer";
import { Badge, Card, Container, PageHeader, Section } from "@/components/ui";
import { recommendations } from "@/data/recommendations";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Łukasz Recommends | LukHook",
  description: "Practical gear picks for Polish anglers fishing Danish waters, curated by Łukasz Wojciechowski."
};

export default function RecommendsPage() {
  return (
    <main id="main-content">
      <Section className="border-b border-channel/16 pb-8">
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <PageHeader
            kicker="Łukasz Recommends"
            title="Practical gear picks for Polish anglers fishing Danish waters."
            description="Curated rods, reels, clothing, lures and small accessories that make sense for Danish coast, harbours, lakes and travel fishing."
            className="lg:block"
          >
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge tone="accent">
                <Compass className="size-3.5" aria-hidden="true" />
                Static gear guide
              </Badge>
              <Badge>
                <BookOpen className="size-3.5" aria-hidden="true" />
                Personal notes
              </Badge>
            </div>
          </PageHeader>

          <Card className="surface-soft">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 size-5 shrink-0 text-channel" aria-hidden="true" />
              <div>
                <p className="eyebrow">Recommendation note</p>
                <p className="mt-3 text-sm leading-6 text-ink/70">
                  Recommendations are personal and should be checked against your own fishing style, budget and local conditions.
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container>
          <RecommendationsExplorer recommendations={recommendations} />
        </Container>
      </Section>
    </main>
  );
}
