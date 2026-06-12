import type {Metadata} from 'next';
import Link from 'next/link';
import {setRequestLocale} from 'next-intl/server';

import {LegacyLightSweepText} from '@/components/legacy/legacy-light-sweep-text';
import {LegacyMetricGrid} from '@/components/legacy/legacy-metric-grid';
import {Reveal, RevealItem} from '@/components/motion/reveal';
import {SafeImage} from '@/components/safe-image';
import {SectionIntro} from '@/components/section-intro';
import type {Locale} from '@/i18n/routing';
import {getLocaleMessages} from '@/lib/locale-messages';
import {getPageMetadata} from '@/lib/seo';
import {withLocale} from '@/lib/site-map';

type Props = {
  params: Promise<{locale: Locale}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return getPageMetadata(locale, 'legacy');
}

export default async function LegacyPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content = getLocaleMessages(locale).legacy;

  return (
    <main className="bg-bg text-text">
      <section className="relative overflow-hidden bg-white pt-28">
        <div
          className="pointer-events-none absolute inset-x-0 top-28 text-center font-heading text-[clamp(120px,28vw,380px)] font-semibold leading-none text-primary/[0.035]"
          aria-hidden="true"
        >
          38
        </div>
        <div className="relative mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col items-center justify-center gap-12 px-container py-section text-center">
          <Reveal className="mx-auto max-w-6xl space-y-8">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
              {content.hero.eyebrow}
            </p>
            <h1 className="font-heading text-[clamp(36px,6.6vw,80px)] font-semibold leading-none text-primary">
              {content.hero.title}
            </h1>
            <LegacyLightSweepText
              lines={content.hero.lines}
              className="mx-auto max-w-5xl space-y-3 font-heading text-[clamp(24px,4.2vw,52px)] font-semibold leading-[1.18] text-primary"
            />
          </Reveal>
          <Reveal className="w-full max-w-5xl">
            <SafeImage
              filename={content.hero.image}
              alt={content.hero.lines.join(' ')}
              aspect="aspect-[21/9]"
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-section">
        <div className="mx-auto max-w-[1440px] space-y-16 px-container">
          <Reveal>
            <SectionIntro
              eyebrow={content.pillars.eyebrow}
              title={content.pillars.title}
              variant="legacy"
            />
          </Reveal>
          <Reveal className="grid gap-6 lg:grid-cols-3">
            {content.pillars.items.map((item) => (
              <RevealItem key={item.href}>
                <Link
                  href={withLocale(locale, item.href)}
                  className="group block h-full bg-white p-4 shadow-[0_18px_65px_rgba(16,29,48,0.06)] transition duration-hover ease-brand hover:-translate-y-1 hover:shadow-[0_30px_95px_rgba(16,29,48,0.11)]"
                >
                  <div className="hover-zoom">
                    <div className="hover-zoom-media">
                      <SafeImage
                        filename={item.image}
                        alt={item.body}
                        aspect="aspect-[4/5]"
                        variant="plain"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 px-2 py-7 text-center">
                    <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
                      {item.eyebrow}
                    </p>
                    <h2 className="font-heading text-[clamp(26px,3vw,40px)] font-semibold leading-none text-primary">
                      {item.title}
                    </h2>
                    <p className="mx-auto max-w-sm font-body text-[14px] leading-7 text-text">
                      {item.body}
                    </p>
                    <span className="link-sweep inline-flex font-body text-sm font-semibold uppercase tracking-[0.12em]">
                      {item.cta}
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-heading text-[clamp(118px,22vw,360px)] font-semibold leading-none text-primary/[0.035]"
          aria-hidden="true"
        >
          LEGACY
        </div>
        <div className="relative mx-auto max-w-[1440px] px-container">
          <Reveal className="pt-section">
            <SectionIntro
              eyebrow={content.proof.eyebrow}
              title={content.proof.title}
              variant="legacy"
            />
          </Reveal>
          <LegacyMetricGrid items={content.proof.items} locale={locale} variant="monument" />
        </div>
      </section>

      <section className="bg-bg py-section">
        <Reveal className="mx-auto max-w-5xl space-y-8 px-container text-center">
          <h2 className="font-heading text-[clamp(32px,5vw,60px)] font-semibold leading-tight text-primary">
            {content.closing.title}
          </h2>
          <Link
            href={withLocale(locale, '/specialty')}
            className="link-sweep font-body text-sm font-semibold uppercase tracking-[0.12em]"
          >
            {content.closing.cta}
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
