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
      <section className="bg-white pt-28">
        <div className="mx-auto max-w-[1280px] px-container pb-[clamp(72px,8vw,128px)] pt-[clamp(64px,8vw,120px)]">
          <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.26em] text-subtext">
              {content.hero.eyebrow}
            </p>
            <h1 className="font-heading text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.12] text-primary">
              {content.hero.title}
            </h1>
            <LegacyLightSweepText
              lines={content.hero.lines}
              className="mx-auto max-w-2xl space-y-1.5 font-heading text-[clamp(17px,1.9vw,24px)] font-semibold leading-[1.4] text-primary"
            />
          </Reveal>
          <Reveal className="mx-auto mt-[clamp(48px,6vw,88px)] w-full max-w-[1180px]">
            <SafeImage
              filename={content.hero.image}
              alt={content.hero.lines.join(' ')}
              aspect="aspect-[21/9]"
              variant="plain"
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-section">
        <div className="mx-auto max-w-[1180px] space-y-[clamp(56px,6vw,88px)] px-container">
          <Reveal>
            <SectionIntro
              eyebrow={content.pillars.eyebrow}
              title={content.pillars.title}
              variant="legacy"
            />
          </Reveal>
          <Reveal className="grid gap-8 lg:grid-cols-3 lg:gap-10">
            {content.pillars.items.map((item) => (
              <RevealItem key={item.href}>
                <Link
                  href={withLocale(locale, item.href)}
                  className="group block h-full bg-white p-3 shadow-[0_14px_50px_rgba(16,29,48,0.05)] transition duration-hover ease-brand hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(16,29,48,0.09)]"
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
                  <div className="space-y-3.5 px-3 pb-8 pt-7 text-center">
                    <p className="font-body text-[10px] font-semibold uppercase tracking-[0.26em] text-subtext">
                      {item.eyebrow}
                    </p>
                    <h2 className="font-heading text-[clamp(19px,1.7vw,24px)] font-semibold leading-snug text-primary">
                      {item.title}
                    </h2>
                    <p className="mx-auto max-w-xs font-body text-[13px] leading-6 text-text">
                      {item.body}
                    </p>
                    <span className="link-sweep inline-flex pt-1 font-body text-[12px] font-semibold uppercase tracking-[0.16em]">
                      {item.cta}
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-section">
        <div className="mx-auto max-w-[1180px] space-y-[clamp(56px,6vw,88px)] px-container">
          <Reveal>
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
        <Reveal className="mx-auto max-w-3xl space-y-7 px-container text-center">
          <h2 className="font-heading text-[clamp(22px,2.4vw,32px)] font-semibold leading-[1.25] text-primary">
            {content.closing.title}
          </h2>
          <Link
            href={withLocale(locale, '/specialty')}
            className="link-sweep font-body text-[12px] font-semibold uppercase tracking-[0.16em]"
          >
            {content.closing.cta}
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
