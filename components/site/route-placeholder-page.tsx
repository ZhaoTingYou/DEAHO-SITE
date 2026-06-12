import Link from 'next/link';

import type {Locale} from '@/i18n/routing';
import {SafeImage} from '@/components/safe-image';
import {type NavItem, withLocale} from '@/lib/site-map';

type RoutePage = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  sections?: NavItem[];
};

type RoutePlaceholderPageProps = {
  locale: Locale;
  page: RoutePage;
};

export function RoutePlaceholderPage({locale, page}: RoutePlaceholderPageProps) {
  return (
    <main className="bg-bg pt-20">
      <section className="mx-auto grid min-h-[72vh] max-w-[1440px] items-center gap-12 px-container py-section lg:grid-cols-[1fr_minmax(360px,520px)]">
        <div className="space-y-7">
          <p className="font-body text-eyebrow font-medium uppercase tracking-[0.22em] text-subtext">
            {page.eyebrow}
          </p>
          <h1 className="font-heading text-hero font-bold leading-none tracking-normal text-primary">
            {page.title}
          </h1>
          <p className="max-w-2xl font-body text-body text-text">{page.subtitle}</p>
        </div>
        <SafeImage filename={page.image} alt={page.title} aspect="aspect-[4/5]" priority />
      </section>

      {page.sections?.length ? (
        <section className="border-t border-hairline bg-white py-section">
          <div className="mx-auto max-w-[1440px] px-container">
            <div className="grid gap-5 md:grid-cols-3">
              {page.sections.map((section) => (
                <Link
                  key={section.href}
                  href={withLocale(locale, section.href)}
                  className="light-layer block p-8"
                >
                  <h2 className="mt-4 font-heading text-xl font-semibold text-primary">
                    {section.label}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
