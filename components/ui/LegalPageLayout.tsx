import Link from "next/link";
import { ChevronRight } from "lucide-react";

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-max-black py-14 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #FFB51D 0%, transparent 50%)",
          }}
          aria-hidden
        />
        <div className="container-max relative">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/60"
          >
            <Link href="/" className="transition hover:text-max-base">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            <span className="text-white">{title}</span>
          </nav>
          <span className="section-tagline text-max-base">Legal</span>
          <h1 className="section-title mt-4 text-white">{title}</h1>
          <p className="mt-3 text-sm text-white/70 md:text-base">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-max">
          <article className="mx-auto max-w-3xl space-y-8 rounded-max border border-max-border bg-white p-8 shadow-card md:p-12">
            {children}
          </article>
        </div>
      </section>
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-max-black md:text-2xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-max-gray md:text-base">
        {children}
      </div>
    </div>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
