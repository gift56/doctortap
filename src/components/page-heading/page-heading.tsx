interface PageHeadingProps {
  title: string;
  description?: string;
}

export function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <header className="space-y-2">
      <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">
        {title}
      </h1>
      {description ? (
        <p className="text-sm text-text-muted">{description}</p>
      ) : null}
    </header>
  );
}
