import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold leading-none transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel active:translate-y-px";

const buttonVariants: Record<Variant, string> = {
  primary: "border border-copper bg-copper text-paper shadow-[0_10px_24px_rgb(166_61_47_/_0.14)] hover:border-copper-light hover:bg-copper-light hover:shadow-[0_14px_30px_rgb(140_50_39_/_0.18)]",
  secondary: "border border-channel/25 bg-white/76 text-ink shadow-[inset_0_1px_0_rgb(255_255_255_/_0.8)] hover:border-channel/45 hover:bg-white",
  ghost: "border border-transparent bg-transparent text-channel hover:bg-channel/10 hover:text-ink"
};

const buttonSizes: Record<Size, string> = {
  sm: "min-h-10 px-3 text-xs",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-5 text-sm"
};

export function cn(...classes: Array<string | false | null | undefined>) {
  return clsx(classes);
}

export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export function Section({ className, ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={cn("py-10 sm:py-12 lg:py-14", className)} {...props} />;
}

export function Card({
  className,
  interactive = false,
  as: Component = "div",
  ...props
}: ComponentPropsWithoutRef<"div"> & { interactive?: boolean; as?: "div" | "article" | "aside" | "section" }) {
  return <Component className={cn("surface-card rounded-xl p-5", interactive && "card-hover", className)} {...props} />;
}

export function FilterPanel({ className, ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={cn("surface-panel rounded-xl p-4 sm:p-5", className)} {...props} />;
}

export function Badge({ className, tone = "default", ...props }: ComponentPropsWithoutRef<"span"> & { tone?: "default" | "accent" | "danger" }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold leading-tight",
        tone === "default" && "border-channel/30 bg-channel/10 text-ink/78",
        tone === "accent" && "border-channel/45 bg-channel/15 text-ink",
        tone === "danger" && "border-copper/35 bg-copper/10 text-ink",
        className
      )}
      {...props}
    />
  );
}

export function Button({ className, variant = "primary", size = "md", ...props }: ComponentPropsWithoutRef<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)} {...props} />;
}

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ComponentPropsWithoutRef<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)} {...props} />;
}

export function PageHeader({
  kicker,
  title,
  description,
  children,
  className
}: {
  kicker: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end", className)}>
      <div className="max-w-3xl">
        <p className="eyebrow">{kicker}</p>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.04] text-ink sm:text-5xl">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70 text-pretty">{description}</p> : null}
      </div>
      {children ? <div className="flex flex-wrap items-center gap-3 lg:justify-end">{children}</div> : null}
    </header>
  );
}

export function SectionTitle({
  kicker,
  title,
  description,
  className
}: {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="eyebrow">{kicker}</p>
      <h2 className="mt-3 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-ink/68 text-pretty">{description}</p> : null}
    </div>
  );
}

export function StatCard({ label, value, className }: { label: string; value: string | number; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border-soft bg-white/82 px-4 py-3 shadow-[0_12px_28px_rgb(16_36_62_/_0.045)]", className)}>
      <p className="font-display text-2xl font-semibold leading-none text-ink tabular-nums">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase text-channel">{label}</p>
    </div>
  );
}
