type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
};

export function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-ink/68">{description}</p> : null}
    </div>
  );
}
