import { LegalNotice } from "@/components/legal-notice";
import { MapShell } from "@/components/map-shell";
import { ButtonLink, Container, PageHeader, Section } from "@/components/ui";

export default function MapPage() {
  return (
    <main id="main-content">
      <Section className="pb-6">
        <Container>
          <PageHeader
            kicker="Interactive Map"
            title="Filter Danish fishing water like a trip planner"
            description="Use species, region, water type, difficulty, season and method to narrow the map. Click any marker or result for gear, tactics, timing and legal notes."
          >
            <ButtonLink href="/fish" variant="secondary">
              Fish Guides
            </ButtonLink>
          </PageHeader>
        </Container>
      </Section>
      <Container>
        <MapShell />
      </Container>
      <Container className="py-8">
        <LegalNotice />
      </Container>
    </main>
  );
}
