import type {Metadata} from 'next';
import Link from 'next/link';
import {setRequestLocale} from 'next-intl/server';

import {Reveal, RevealItem} from '@/components/motion/reveal';
import {SafeImage} from '@/components/safe-image';
import {SectionIntro} from '@/components/section-intro';
import {SpecialtyDetailTriplet} from '@/components/specialty/specialty-detail-triplet';
import type {Locale} from '@/i18n/routing';
import {imageExists} from '@/lib/image-exists';
import {getPageMetadata} from '@/lib/seo';
import {withLocale} from '@/lib/site-map';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

type Props = {
  params: Promise<{locale: Locale}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return getPageMetadata(locale, 'specialty');
}

export default async function SpecialtyPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content = locale === 'en' ? enMessages.specialty : koMessages.specialty;
  const detailItems = content.details.items.map((item) => ({
    ...item,
    hasImage: imageExists(item.image)
  }));

  return (
    <main className="bg-bg text-text">
      <section className="relative overflow-hidden bg-white pt-28">
        <div
          className="pointer-events-none absolute inset-x-0 top-32 text-center font-heading text-[clamp(96px,22vw,320px)] font-semibold leading-none text-primary/[0.035]"
          aria-hidden="true"
        >
          01-07
        </div>
        <div className="relative mx-auto grid min-h-[100dvh] max-w-[1440px] items-center gap-12 px-container py-section lg:grid-cols-[0.88fr_1.12fr]">
          <Reveal className="max-w-3xl space-y-8">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
              {content.hero.eyebrow}
            </p>
            <div className="space-y-5">
              <h1 className="font-heading text-[clamp(54px,8vw,112px)] font-semibold leading-none text-primary">
                {content.hero.title}
              </h1>
              <p className="font-heading text-[clamp(34px,5vw,70px)] font-semibold leading-tight text-primary">
                {content.hero.koreanTitle}
              </p>
            </div>
            <p className="max-w-xl font-body text-body leading-[1.75] text-text">
              {content.hero.subtitle}
            </p>
            <div className="grid max-w-xl grid-cols-7 border-y border-hairline py-4">
              {['01', '02', '03', '04', '05', '06', '07'].map((step) => (
                <span
                  key={step}
                  className="font-numeric text-sm font-semibold text-subtext"
                  aria-hidden="true"
                >
                  {step}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="relative">
            <div
              className="pointer-events-none absolute -left-8 top-8 z-10 h-[72%] w-px bg-primary/20"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -left-12 top-8 z-10 font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent [writing-mode:vertical-rl]"
              aria-hidden="true"
            >
              Anatomy of Craft
            </div>
            <SafeImage
              filename={content.hero.image}
              alt={content.hero.subtitle}
              aspect="aspect-[21/9] lg:aspect-[4/3]"
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-section">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-container lg:grid-cols-[0.34fr_1fr]">
          <Reveal className="lg:sticky lg:top-32 lg:h-fit">
            <SectionIntro
              eyebrow={content.branches.eyebrow}
              title={content.branches.title}
              variant="specialty"
            />
          </Reveal>
          <Reveal className="grid gap-6 md:grid-cols-2">
            {content.branches.items.map((item, index) => (
              <RevealItem key={item.href}>
                <Link
                  href={withLocale(locale, item.href)}
                  className="group block h-full bg-white p-4 shadow-[0_18px_65px_rgba(16,29,48,0.06)] transition duration-hover ease-brand hover:-translate-y-1 hover:shadow-[0_30px_95px_rgba(16,29,48,0.11)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <div className="relative overflow-hidden">
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
                    <span
                      className="pointer-events-none absolute -left-4 bottom-0 font-heading text-[clamp(96px,14vw,170px)] font-semibold leading-none text-primary/[0.08]"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="space-y-4 px-2 py-7">
                    <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-accent">
                      {item.eyebrow}
                    </p>
                    <h2 className="font-heading text-[clamp(38px,5vw,64px)] font-semibold leading-none text-primary">
                      {item.title}
                    </h2>
                    <p className="max-w-md font-body text-[16px] leading-7 text-text">{item.body}</p>
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
        <Reveal className="mx-auto max-w-5xl space-y-8 px-container text-center">
          <h2 className="font-heading text-[clamp(42px,7vw,88px)] font-semibold leading-tight text-primary">
            {content.closing.title}
          </h2>
          <Link
            href={withLocale(locale, '/specialty/technique')}
            className="link-sweep font-body text-sm font-semibold uppercase tracking-[0.12em]"
          >
            {content.closing.cta}
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
