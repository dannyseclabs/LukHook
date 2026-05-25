import { ShieldAlert } from "lucide-react";

import { ButtonLink, Card } from "@/components/ui";
import { legalSources } from "@/lib/fishing-data";

export function LegalNotice() {
  return (
    <Card className="surface-danger text-ink" as="aside">
      <div className="flex gap-3">
        <ShieldAlert className="mt-1 size-5 shrink-0 text-copper" aria-hidden="true" />
        <div>
          <h2 className="font-display text-xl font-semibold">Legal check before fishing</h2>
          <p className="mt-2 text-sm leading-6 text-ink/70">
            Danish fishing rules can change by species, area and season. Use this planner for trip preparation, then verify licence, minimum size, closed season and local access rules with official sources before fishing.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {legalSources.map((source) => (
              <ButtonLink key={source.href} href={source.href} target="_blank" rel="noreferrer" variant="secondary" size="sm">
                {source.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
