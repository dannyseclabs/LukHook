import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";

import { Badge, Card, Container, PageHeader, Section } from "@/components/ui";
import { regions } from "@/lib/fishing-data";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Denmark Fishing Regions | LukHook",
  description: "Explore Danish fishing regions by water type, target fish, difficulty, weather exposure and legal checks."
};

export default function RegionsPage() {
  return (
    <main id="main-content">
      <Section>
        <Container>
          <PageHeader kicker="Regions" title="Fishing regions in Denmark" description="Use regions to match driving distance, weather exposure, water type and legal checks before choosing the exact spot." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <Link key={region.slug} href={`/regions/${region.slug}`} className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
                <Card interactive className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <MapPinned className="size-6 text-channel" aria-hidden="true" />
                    <Badge tone={region.difficulty === "Advanced" ? "danger" : "default"}>{region.difficulty}</Badge>
                  </div>
                  <h2 className="mt-5 text-pretty font-display text-2xl font-semibold text-ink group-hover:text-channel">{region.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/66">{region.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {region.typicalFish.slice(0, 4).map((fish) => (
                      <Badge key={fish}>{fish}</Badge>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-channel">
                    Open Region
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
