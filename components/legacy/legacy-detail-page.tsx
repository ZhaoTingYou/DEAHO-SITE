import Link from 'next/link';

import {LegacyMetricGrid, type LegacyMetricItem} from '@/components/legacy/legacy-metric-grid';
import {LegacyPartnerWall} from '@/components/legacy/legacy-partner-wall';
import {Reveal, RevealItem} from '@/components/motion/reveal';
import {SafeImage} from '@/components/safe-image';
import {SectionIntro} from '@/components/section-intro';
import type {Locale} from '@/i18n/routing';
import {withLocale} from '@/lib/site-map';

type LegacyDetailContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
  };
  metrics: LegacyMetricItem[];
  statement?: string;
  partners?: {
    eyebrow: string;
    title: string;
    body: string;
    labels: string[];
  };
  gallery?: {
    eyebrow: string;
    title: string;
    items: Array<{
      title: string;
      image: string;
    }>;
  };
};

type LegacyDetailPageProps = {
  locale: Locale;
  content: LegacyDetailContent;
};

export function LegacyDetailPage({locale, content}: LegacyDetailPageProps) {
  return (
    <main className="bg-bg text-text">
      <section className="relative overflow-hidden bg-white pt-28">
        <div
          className="pointer-events-none absolute inset-x-0 top-32 text-center font-heading text-[clamp(96px,22vw,320px)] font-semibold leading-none text-primary/[0.035]"
          aria-hidden="true"
        >
          {content.hero.title}
        </div>
        <div className="relative mx-auto flex min-h-[92dvh] max-w-[1440px] flex-col items-center justify-center gap-12 px-container py-section text-center">
          <Reveal className="mx-auto max-w-5xl space-y-7">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
              {content.hero.eyebrow}
            </p>
            <h1 className="font-heading text-[clamp(58px,9vw,128px)] font-semibold leading-none text-primary">
              {content.hero.title}
            </h1>
            <p className="mx-auto max-w-3xl font-body text-body leading-[1.75] text-text">
              {content.hero.subtitle}
            </p>
          </Reveal>
          <Reveal className="w-full max-w-5xl">
            <SafeImage
              filename={content.hero.image}
              alt={content.hero.subtitle}
              aspect="aspect-[16/9]"
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bg py-section">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[clamp(120px,28vw,420px)] font-semibold leading-none text-primary/[0.035]"
          aria-hidden="true"
        >
          38
        </div>
        <div className="relative mx-auto max-w-[1440px] px-container">
          <LegacyMetricGrid
            items={content.metrics}
            locale={locale}
            variant={content.metrics.length > 2 ? 'compact' : 'monument'}
          />
          {content.statement ? (
            <Reveal className="mx-auto mt-12 max-w-3xl text-center font-body text-body leading-[1.75] text-text">
              <p>{content.statement}</p>
            </Reveal>
          ) : null}
        </div>
      </section>

      {content.partners ? (
        <section className="bg-white py-section">
          <div className="mx-auto max-w-[1440px] space-y-14 px-container">
            <Reveal>
              <SectionIntro
                eyebrow={content.partners.eyebrow}
                title={content.partners.title}
                variant="legacy"
              >
                <p>{content.partners.body}</p>
              </SectionIntro>
            </Reveal>
            <LegacyPartnerWall labels={content.partners.labels} />
          </div>
        </section>
      ) : null}

      {content.gallery ? (
        <section className="bg-white py-section">
          <div className="mx-auto max-w-[1440px] space-y-14 px-container">
            <Reveal>
              <SectionIntro
                eyebrow={content.gallery.eyebrow}
                title={content.gallery.title}
                variant="legacy"
              />
            </Reveal>
            <Reveal className="grid gap-5 md:grid-cols-2">
              {content.gallery.items.map((item) => (
                <RevealItem key={item.image}>
                  <article className="bg-bg p-4 shadow-[0_18px_60px_rgba(16,29,48,0.06)]">
                    <div className="hover-zoom">
                      <div className="hover-zoom-media">
                        <SafeImage
                          filename={item.image}
                          alt={item.title}
                          aspect="aspect-[3/2]"
                          variant="plain"
                        />
                      </div>
                    </div>
                    <h2 className="mt-5 font-body text-sm font-semibold uppercase tracking-[0.14em] text-subtext">
                      {item.title}
                    </h2>
                  </article>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="bg-bg py-section">
        <Reveal className="mx-auto max-w-4xl px-container text-center">
          <Link
            href={withLocale(locale, '/legacy')}
            className="link-sweep font-body text-sm font-semibold uppercase tracking-[0.12em]"
          >
            {locale === 'ko' ? 'Legacy로 돌아가기' : 'Back to legacy'}
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
