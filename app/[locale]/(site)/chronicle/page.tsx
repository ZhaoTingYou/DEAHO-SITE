import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import Link from 'next/link';

import {ChronicleTimeline} from '@/components/chronicle/chronicle-timeline';
import {Reveal} from '@/components/motion/reveal';
import {SafeImage} from '@/components/safe-image';
import {SectionIntro} from '@/components/section-intro';
import type {Locale} from '@/i18n/routing';
import {getPageMetadata} from '@/lib/seo';
import {withLocale} from '@/lib/site-map';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

type Props = {
  params: Promise<{locale: Locale}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return getPageMetadata(locale, 'chronicle');
}

export default async function ChroniclePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content = locale === 'en' ? enMessages.chronicle : koMessages.chronicle;

  return (
    <main className="bg-bg text-text">
      <section className="relative overflow-hidden pt-20">
        <div className="absolute bottom-0 left-[calc(var(--spacing-container)+20px)] top-20 hidden w-px bg-primary/22 md:block" aria-hidden="true" />
        <div className="mx-auto grid min-h-[88vh] max-w-[1440px] items-center gap-12 px-container py-section lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.86fr)]">
          <Reveal className="relative space-y-8 md:pl-12">
            <div className="absolute -left-1 top-1 hidden h-4 w-4 rounded-full border-2 border-accent bg-bg md:block" aria-hidden="true" />
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-accent">
              {content.hero.eyebrow}
            </p>
            <div className="space-y-4">
              <h1 className="font-heading text-[clamp(52px,7.5vw,100px)] font-bold leading-none tracking-normal text-primary">
                {content.hero.title.split(' ').map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </h1>
              <p className="font-heading text-[clamp(34px,4vw,58px)] font-semibold leading-tight text-primary">
                {content.hero.koreanTitle}
              </p>
            </div>
            <p className="max-w-2xl font-body text-body leading-[1.7] text-text">
              {content.hero.subtitle}
            </p>
          </Reveal>
          <Reveal>
            <div className="relative">
              <div className="absolute -left-7 top-10 hidden h-[72%] w-px bg-accent/70 lg:block" aria-hidden="true" />
              <SafeImage
                filename={content.hero.image}
                alt={content.hero.subtitle}
                aspect="aspect-[16/10]"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg pt-section">
        <div className="mx-auto max-w-[1440px] px-container">
          <Reveal>
            <SectionIntro
              eyebrow={content.timeline.eyebrow}
              title={content.timeline.title}
              variant="chronicle"
            >
              <p>{content.timeline.body}</p>
            </SectionIntro>
          </Reveal>
        </div>
      </section>

      <ChronicleTimeline items={content.timeline.items} locale={locale} />

      <section className="bg-white py-section">
        <Reveal className="mx-auto max-w-5xl space-y-8 px-container text-center">
          <p className="font-heading text-[clamp(42px,6vw,86px)] font-semibold leading-tight text-primary">
            {content.closing.title}
          </p>
          <p className="mx-auto max-w-2xl font-body text-body leading-[1.7] text-text">
            {content.closing.subtitle}
          </p>
          <Link
            href={withLocale(locale, '/legacy')}
            className="link-sweep font-body text-sm font-semibold uppercase tracking-[0.12em]"
          >
            {content.closing.cta}
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
