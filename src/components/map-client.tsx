"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import { Clock, Filter, MapPin, ShieldAlert, SlidersHorizontal, Waves } from "lucide-react";

import { Badge, Button, ButtonLink, Card, FilterPanel, StatCard, cn } from "@/components/ui";
import { fishingSpots, type FishingSpot, waterTypeLabels } from "@/lib/fishing-data";

type Filters = {
  species: string;
  region: string;
  type: string;
  difficulty: string;
  season: string;
  method: string;
};

const emptyFilters: Filters = {
  species: "all",
  region: "all",
  type: "all",
  difficulty: "all",
  season: "all",
  method: "all"
};

function unique(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function markerClasses(spot: Pick<FishingSpot, "difficulty" | "type">) {
  const safeType = spot.type.replaceAll(" ", "-").replace("&", "and");
  const heat = spot.difficulty === "Advanced" ? "marker-hot" : "marker-standard";

  return `marker-${safeType} ${heat}`;
}

function iconForSpot(spot: FishingSpot) {
  return divIcon({
    className: "",
    html: `<span class="map-marker ${markerClasses(spot)}" aria-hidden="true"></span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
}

function SelectField({
  label,
  name,
  value,
  options,
  onChange
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="field-label">
      {label}
      <select name={name} value={value} onChange={(event) => onChange(event.target.value)} className="field-select">
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function FilterControls({
  filters,
  options,
  filteredSpots,
  activeSpotId,
  onFilterChange,
  onReset,
  onActiveSpotChange
}: {
  filters: Filters;
  options: {
    species: string[];
    regions: string[];
    types: string[];
    difficulties: string[];
    seasons: string[];
    methods: string[];
  };
  filteredSpots: FishingSpot[];
  activeSpotId?: string;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onReset: () => void;
  onActiveSpotChange: (id: string) => void;
}) {
  const hasFilters = Object.values(filters).some((value) => value !== "all");

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <SelectField label="Fish Species" name="species" value={filters.species} options={options.species} onChange={(value) => onFilterChange("species", value)} />
        <SelectField label="Region" name="region" value={filters.region} options={options.regions} onChange={(value) => onFilterChange("region", value)} />
        <SelectField label="Water Type" name="type" value={filters.type} options={options.types} onChange={(value) => onFilterChange("type", value)} />
        <SelectField label="Difficulty" name="difficulty" value={filters.difficulty} options={options.difficulties} onChange={(value) => onFilterChange("difficulty", value)} />
        <SelectField label="Season" name="season" value={filters.season} options={options.seasons} onChange={(value) => onFilterChange("season", value)} />
        <SelectField label="Method" name="method" value={filters.method} options={options.methods} onChange={(value) => onFilterChange("method", value)} />
      </div>

      <Button type="button" onClick={onReset} variant="secondary" className="w-full" disabled={!hasFilters}>
        <SlidersHorizontal className="size-4" aria-hidden="true" />
        Clear Filters
      </Button>

      <div className="border-t border-channel/16 pt-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Results</p>
            <p className="mt-1 font-display text-2xl font-semibold text-ink tabular-nums">{filteredSpots.length}</p>
          </div>
          <p className="text-right text-xs font-semibold uppercase text-channel">Matching Spots</p>
        </div>

        <div className="mt-3 grid max-h-[19rem] gap-2 overflow-y-auto pr-1">
          {filteredSpots.length ? (
            filteredSpots.map((spot) => (
              <button
                key={spot.id}
                type="button"
                onClick={() => onActiveSpotChange(spot.id)}
                className={cn(
                  "rounded-lg border px-3 py-3 text-left transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel",
                  activeSpotId === spot.id ? "border-channel/55 bg-channel/14 shadow-[inset_0_1px_0_rgb(253_240_213_/_0.05)]" : "border-channel/16 bg-paper/48 hover:border-channel/42 hover:bg-channel/10"
                )}
              >
                <span className="block text-sm font-semibold leading-5 text-ink">{spot.name}</span>
                <span className="mt-1 block text-xs font-semibold text-ink/56">{spot.region} · {waterTypeLabels[spot.type]} · {spot.difficulty}</span>
              </button>
            ))
          ) : (
            <div className="rounded-lg border border-channel/16 bg-paper/42 p-4">
              <p className="text-sm font-semibold text-ink">No Matching Spots</p>
              <p className="mt-1 text-xs leading-5 text-ink/62">Clear one filter or broaden the season.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MapClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeSpotId, setActiveSpotId] = useState(fishingSpots[0]?.id ?? "");

  const filters = useMemo<Filters>(
    () => ({
      species: searchParams.get("species") ?? emptyFilters.species,
      region: searchParams.get("region") ?? emptyFilters.region,
      type: searchParams.get("type") ?? emptyFilters.type,
      difficulty: searchParams.get("difficulty") ?? emptyFilters.difficulty,
      season: searchParams.get("season") ?? emptyFilters.season,
      method: searchParams.get("method") ?? emptyFilters.method
    }),
    [searchParams]
  );

  const options = useMemo(
    () => ({
      species: unique(fishingSpots.flatMap((spot) => spot.species)),
      regions: unique(fishingSpots.map((spot) => spot.region)),
      types: unique(fishingSpots.map((spot) => waterTypeLabels[spot.type])),
      difficulties: unique(fishingSpots.map((spot) => spot.difficulty)),
      seasons: unique(fishingSpots.flatMap((spot) => spot.bestMonths)),
      methods: unique(fishingSpots.flatMap((spot) => spot.methods))
    }),
    []
  );

  const filteredSpots = useMemo(() => {
    return fishingSpots.filter((spot) => {
      const typeLabel = waterTypeLabels[spot.type];
      return (
        (filters.species === "all" || spot.species.includes(filters.species)) &&
        (filters.region === "all" || spot.region === filters.region) &&
        (filters.type === "all" || typeLabel === filters.type) &&
        (filters.difficulty === "all" || spot.difficulty === filters.difficulty) &&
        (filters.season === "all" || spot.bestMonths.includes(filters.season)) &&
        (filters.method === "all" || spot.methods.includes(filters.method))
      );
    });
  }, [filters]);

  const activeSpot = filteredSpots.find((spot) => spot.id === activeSpotId) ?? filteredSpots[0];
  const beginnerCount = filteredSpots.filter((spot) => spot.difficulty === "Beginner").length;

  function updateFilter(key: keyof Filters, value: string) {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    router.replace(`${pathname}${nextParams.size ? `?${nextParams.toString()}` : ""}`, { scroll: false });
  }

  function resetFilters() {
    router.replace(pathname, { scroll: false });
  }

  const controls = (
    <FilterControls
      filters={filters}
      options={options}
      filteredSpots={filteredSpots}
      activeSpotId={activeSpot?.id}
      onFilterChange={updateFilter}
      onReset={resetFilters}
      onActiveSpotChange={setActiveSpotId}
    />
  );

  return (
    <div className="grid gap-4 xl:grid-cols-[304px_minmax(0,1fr)]">
      <details className="surface-panel rounded-xl p-4 xl:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ink">
          <span className="inline-flex items-center gap-2">
            <Filter className="size-4 text-channel" aria-hidden="true" />
            Filters
          </span>
          <span className="text-xs uppercase text-channel">{filteredSpots.length} Spots</span>
        </summary>
        <div className="mt-4">{controls}</div>
      </details>

      <FilterPanel className="hidden xl:block xl:sticky xl:top-24 xl:max-h-[calc(100dvh-7rem)] xl:overflow-y-auto">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow">Filters</p>
            <h2 className="mt-1 font-display text-2xl font-semibold leading-tight text-ink">Find Fishable Water</h2>
          </div>
          <Filter className="size-5 text-channel" aria-hidden="true" />
        </div>
        {controls}
      </FilterPanel>

      <section className="min-w-0">
        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Spots" value={filteredSpots.length} />
          <StatCard label="Species" value={options.species.length} />
          <StatCard label="Regions" value={options.regions.length} />
          <StatCard label="Beginner Friendly" value={beginnerCount} />
        </div>

        <div className="surface-card overflow-hidden rounded-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-channel/16 px-4 py-3 sm:px-5">
            <div>
              <p className="eyebrow">Denmark Map</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-ink">Fishing Spots Console</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>
                <span className="inline-block size-3 rounded-full bg-channel" aria-hidden="true" />
                Standard
              </Badge>
              <Badge tone="danger">
                <span className="inline-block size-3 rounded-full bg-copper" aria-hidden="true" />
                Hot / Advanced
              </Badge>
            </div>
          </div>

          <div className="map-frame">
            <MapContainer center={[56.15, 10.15]} zoom={6.4} scrollWheelZoom zoomControl={false} className="h-full w-full">
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ZoomControl position="bottomright" />
              {filteredSpots.map((spot) => (
                <Marker key={spot.id} position={spot.coordinates} icon={iconForSpot(spot)} eventHandlers={{ click: () => setActiveSpotId(spot.id) }}>
                  <Popup>
                    <div className="space-y-2">
                      <strong>{spot.name}</strong>
                      <p>{spot.region} · {waterTypeLabels[spot.type]}</p>
                      <p>{spot.species.join(", ")}</p>
                      <Link href={`/spots/${spot.id}`}>View Full Spot Guide</Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="border-t border-channel/16 p-4 sm:p-5">
            {activeSpot ? <ActiveSpot spot={activeSpot} /> : <EmptyMapState />}
          </div>
        </div>
      </section>
    </div>
  );
}

function ActiveSpot({ spot }: { spot: FishingSpot }) {
  return (
    <article className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <div>
        <div className="flex flex-wrap items-center gap-2">
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
        </div>
        <h2 className="mt-3 text-pretty font-display text-3xl font-semibold leading-tight text-ink">{spot.name}</h2>
        <p className="mt-3 text-sm leading-6 text-ink/66">{spot.species.join(", ")} · best months: {spot.bestMonths.join(", ")} · {spot.difficulty}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <MiniBlock title="Recommended Gear" items={spot.recommendedGear} />
          <MiniBlock title="Tactics" items={spot.tactics} />
        </div>
      </div>
      <Card className="surface-danger shadow-none">
        <div className="flex items-center gap-2 font-semibold text-ink">
          <ShieldAlert className="size-5 text-copper" aria-hidden="true" />
          Safety & Legal Notes
        </div>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/68">
          {[...spot.legalNotes, ...spot.safetyNotes].map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <ButtonLink href={`/spots/${spot.id}`} className="mt-5">
          View Full Spot Guide
        </ButtonLink>
      </Card>
    </article>
  );
}

function MiniBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase text-channel">{title}</h3>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/68">
        {items.slice(0, 5).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function EmptyMapState() {
  return (
    <Card className="shadow-none">
      <h2 className="font-display text-2xl font-semibold text-ink">No Matching Spots</h2>
      <p className="mt-2 text-sm leading-6 text-ink/66">Try removing one filter or choosing a broader season.</p>
    </Card>
  );
}
