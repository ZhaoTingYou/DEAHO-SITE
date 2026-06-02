import Link from 'next/link';
import {setRequestLocale} from 'next-intl/server';

import {Reveal} from '@/components/motion/reveal';
import {SafeImage} from '@/components/safe-image';
import {SectionIntro} from '@/components/section-intro';
import {SpecialtyDetailTriplet} from '@/components/specialty/specialty-detail-triplet';
import {SpecialtyProcess} from '@/components/specialty/specialty-process';
import type {Locale} from '@/i18n/routing';
import {imageExists} from '@/lib/image-exists';
import {withLocale} from '@/lib/site-map';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

type Props = {
  params: Promise<{locale: Locale}>;
};

export default async function TechniquePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content =
    locale === 'en' ? enMessages.specialtyPages.technique : koMessages.specialtyPages.technique;
  const processSteps = content.process.steps.map((step) => ({
    ...step,
    hasImage: imageExists(step.image)
  }));
  const detailItems = content.details.items.map((item, index) => ({
    ...item,
    number: String(index + 1).padStart(2, '0'),
    hasImage: imageExists(item.image)
  }));

  return (
    <main className="bg-bg text-text">
      <section className="relative overflow-hidden bg-white pt-28">
        <div
          className="pointer-events-none absolute inset-x-0 top-32 text-center font-heading text-[clamp(96px,22vw,320px)] font-semibold leading-none text-primary/[0.035]"
          aria-hidden="true"
        >
          PROCESS
        </div>
        <div className="relative mx-auto grid min-h-[92dvh] max-w-[1440px] items-center gap-12 px-container py-section lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal className="max-w-3xl space-y-7">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
              {content.hero.eyebrow}
            </p>
            <h1 className="font-heading text-[clamp(58px,9vw,126px)] font-semibold leading-none text-primary">
              {content.hero.title}
            </h1>
            <p className="max-w-2xl font-body text-body leading-[1.75] text-text">
              {content.hero.subtitle}
            </p>
          </Reveal>
          <Reveal className="relative">
            <SafeImage
              filename={content.hero.image}
              alt={content.hero.subtitle}
              aspect="aspect-[21/9] lg:aspect-[16/9]"
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-section">
        <div className="mx-auto max-w-[1440px] px-container">
          <Reveal>
            <SectionIntro
              eyebrow={content.process.eyebrow}
              title={content.process.title}
              variant="specialty"
            >
              <p>{content.process.body}</p>
            </SectionIntro>
          </Reveal>
        </div>
      </section>

      <SpecialtyProcess steps={processSteps} />

      <section className="bg-white py-section">
        <div className="mx-auto max-w-[1440px] space-y-14 px-container">
          <Reveal>
            <SectionIntro
              eyebrow={content.details.eyebrow}
              title={content.details.title}
              variant="specialty"
            >
              <p>{content.details.body}</p>
            </SectionIntro>
          </Reveal>
          <SpecialtyDetailTriplet items={detailItems} />
        </div>
      </section>

      <section className="bg-bg py-section">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-container lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="order-2 space-y-6 lg:order-1">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-accent">
              {content.bespoke.eyebrow}
            </p>
            <h2 className="font-heading text-[clamp(42px,7vw,88px)] font-semibold leading-tight text-primary">
              {content.bespoke.title}
            </h2>
            <p className="max-w-2xl font-body text-body leading-[1.75] text-text">
              {content.bespoke.body}
            </p>
            <Link
              href={withLocale(locale, '/specialty/collection')}
              className="link-sweep font-body text-sm font-semibold uppercase tracking-[0.12em]"
            >
              {content.bespoke.cta}
            </Link>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <SafeImage
              filename={content.bespoke.image}
              alt={content.bespoke.body}
              aspect="aspect-[4/3]"
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
