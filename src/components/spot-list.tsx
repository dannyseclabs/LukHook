import Link from "next/link";
import { Clock, MapPin } from "lucide-react";

import { Badge, Card } from "@/components/ui";
import { type FishingSpot, waterTypeLabels } from "@/lib/fishing-data";

export function SpotList({ spots }: { spots: FishingSpot[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {spots.map((spot) => (
        <Link key={spot.id} href={`/spots/${spot.id}`} className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
          <Card interactive className="h-full">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase text-channel">{spot.region}</p>
                <h3 className="mt-2 text-pretty font-display text-xl font-semibold leading-tight text-ink transition-colors group-hover:text-channel">{spot.name}</h3>
              </div>
              <span className={`marker-dot marker-${spot.type.replaceAll(" ", "-").replace("&", "and")} ${spot.difficulty === "Advanced" ? "marker-hot" : "marker-standard"}`} aria-hidden="true" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>
                <MapPin className="size-3.5" aria-hidden="true" />
                {waterTypeLabels[spot.type]}
              </Badge>
              <Badge>
                <Clock className="size-3.5" aria-hidden="true" />
                {spot.estimatedTime}
              </Badge>
              <Badge tone={spot.difficulty === "Advanced" ? "danger" : "default"}>{spot.difficulty}</Badge>
            </div>
            <p className="mt-4 text-sm leading-6 text-ink/66">{spot.species.join(", ")}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
