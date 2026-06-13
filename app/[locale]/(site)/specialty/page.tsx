import type {Metadata} from 'next';
import Link from 'next/link';
import {setRequestLocale} from 'next-intl/server';

import {Reveal, RevealItem} from '@/components/motion/reveal';
import {SafeImage} from '@/components/safe-image';
import {SectionIntro} from '@/components/section-intro';
import {SpecialtyDetailTriplet} from '@/components/specialty/specialty-detail-triplet';
import type {Locale} from '@/i18n/routing';
import {imageExists} from '@/lib/image-exists';
import {getLocaleMessages} from '@/lib/locale-messages';
import {getPageMetadata} from '@/lib/seo';
import {withLocale} from '@/lib/site-map';

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
  const messages = getLocaleMessages(locale);
  const content = messages.specialty;
  const detailItems = content.details.items.map((item) => ({
    ...item,
    hasImage: imageExists(item.image)
  }));

  return (
    <main className="bg-bg text-text">
      <section className="bg-white pt-28">
        <div className="mx-auto max-w-[1280px] px-container pb-[clamp(72px,8vw,128px)] pt-[clamp(64px,8vw,120px)]">
          <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.26em] text-subtext">
              {content.hero.eyebrow}
            </p>
            <div className="space-y-3">
              <h1 className="font-heading text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.12] text-primary">
                {content.hero.title}
              </h1>
              <p className="font-heading text-[clamp(17px,1.9vw,24px)] font-semibold leading-[1.4] text-primary">
                {content.hero.koreanTitle}
              </p>
            </div>
            <p className="mx-auto max-w-xl font-body text-[14px] leading-[1.85] text-text">
              {content.hero.subtitle}
            </p>
            <div className="mx-auto grid max-w-xs grid-cols-7 border-y border-hairline py-3.5">
              {['01', '02', '03', '04', '05', '06', '07'].map((step) => (
                <span
                  key={step}
                  className="font-numeric text-[11px] font-semibold tracking-[0.08em] text-subtext"
                  aria-hidden="true"
                >
                  {step}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="relative mx-auto mt-[clamp(48px,6vw,88px)] w-full max-w-[1180px]">
            <div
              className="pointer-events-none absolute -left-7 top-6 z-10 hidden h-[64%] w-px bg-primary/15 lg:block"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -left-11 top-6 z-10 hidden font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-accent [writing-mode:vertical-rl] lg:block"
              aria-hidden="true"
            >
              {messages.specialtyUi.anatomyLabel}
            </div>
            <SafeImage
              filename={content.hero.image}
              alt={content.hero.subtitle}
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
              eyebrow={content.branches.eyebrow}
              title={content.branches.title}
              variant="specialty"
            />
          </Reveal>
          <Reveal className="grid gap-8 md:grid-cols-2 md:gap-10">
            {content.branches.items.map((item, index) => (
              <RevealItem key={item.href}>
                <Link
                  href={withLocale(locale, item.href)}
                  className="group block h-full bg-white p-3 shadow-[0_14px_50px_rgba(16,29,48,0.05)] transition duration-hover ease-brand hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(16,29,48,0.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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
                  <div className="space-y-3.5 px-3 pb-8 pt-7">
                    <p className="font-body text-[10px] font-semibold uppercase tracking-[0.26em] text-accent">
                      {String(index + 1).padStart(2, '0')} — {item.eyebrow}
                    </p>
                    <h2 className="font-heading text-[clamp(20px,1.9vw,26px)] font-semibold leading-snug text-primary">
                      {item.title}
                    </h2>
                    <p className="max-w-md font-body text-[13px] leading-6 text-text">{item.body}</p>
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
        <Reveal className="mx-auto max-w-3xl space-y-7 px-container text-center">
          <h2 className="font-heading text-[clamp(22px,2.4vw,32px)] font-semibold leading-[1.25] text-primary">
            {content.closing.title}
          </h2>
          <Link
            href={withLocale(locale, '/specialty/technique')}
            className="link-sweep font-body text-[12px] font-semibold uppercase tracking-[0.16em]"
          >
            {content.closing.cta}
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
