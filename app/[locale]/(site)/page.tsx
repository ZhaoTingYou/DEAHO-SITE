import {existsSync} from 'node:fs';
import path from 'node:path';

import Image from 'next/image';
import Link from 'next/link';
import {setRequestLocale} from 'next-intl/server';

import {HomeHero} from '@/components/home/home-hero';
import {Reveal, RevealItem} from '@/components/motion/reveal';
import {SafeImage} from '@/components/safe-image';
import {SectionIntro} from '@/components/section-intro';
import {StatRow, type StatItem} from '@/components/motion/stat-row';
import type {Locale} from '@/i18n/routing';
import {withLocale} from '@/lib/site-map';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

type Props = {
  params: Promise<{locale: Locale}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const content = locale === 'en' ? enMessages.home : koMessages.home;
  const heroVideo = getHomeHeroVideo();

  return <HomeContent content={content} heroVideo={heroVideo} locale={locale} />;
}

function getHomeHeroVideo() {
  const videoDir = path.join(process.cwd(), 'public', 'videos');
  const mp4Path = path.join(videoDir, 'home_hero.mp4');
  const webmPath = path.join(videoDir, 'home_hero.webm');

  return {
    videoSrc: existsSync(mp4Path) ? '/videos/home_hero.mp4' : undefined,
    webmSrc: existsSync(webmPath) ? '/videos/home_hero.webm' : undefined
  };
}

type HomeContentProps = {
  content: typeof koMessages.home;
  heroVideo: {
    videoSrc?: string;
    webmSrc?: string;
  };
  locale: Locale;
};

function HomeContent({content, heroVideo, locale}: HomeContentProps) {
  return (
    <main className="min-h-screen bg-bg">
      <HomeHero
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        poster={content.image}
        videoSrc={heroVideo.videoSrc}
        webmSrc={heroVideo.webmSrc}
      />

      <section className="bg-white py-section">
        <div className="mx-auto max-w-[1440px] space-y-12 px-container">
          <div className="grid gap-8 lg:grid-cols-[minmax(260px,420px)_1fr] lg:items-end">
            <Reveal>
              <SectionIntro
                eyebrow={content.signature.eyebrow}
                title={content.signature.title}
              >
                <p>{content.signature.body}</p>
              </SectionIntro>
            </Reveal>
            <Reveal className="lg:justify-self-end">
              <Link
                href={withLocale(locale, '/specialty/collection')}
                className="link-sweep font-body text-sm font-semibold uppercase tracking-[0.12em]"
              >
                {content.signature.cta}
              </Link>
            </Reveal>
          </div>

          <Reveal className="grid auto-cols-[78%] grid-flow-col gap-5 overflow-x-auto pb-3 [scroll-snap-type:x_mandatory] sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-5">
            {content.rings.map((item) => (
              <RevealItem key={item.image} className="[scroll-snap-align:start] sm:[scroll-snap-align:unset]">
                <Link
                  href={withLocale(locale, '/specialty/collection')}
                  className="group block h-full bg-white p-4 shadow-[0_18px_60px_rgba(16,29,48,0.06)] transition duration-hover ease-brand hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(16,29,48,0.10)]"
                >
                  <div className="hover-zoom">
                    <div className="hover-zoom-media">
                      <SafeImage
                        filename={item.image}
                        alt={item.caption}
                        aspect="aspect-square"
                        variant="plain"
                      />
                    </div>
                  </div>
                  <div className="mt-5 space-y-2">
                    <h3 className="font-heading text-2xl font-semibold text-primary">{item.title}</h3>
                    <p className="font-body text-sm leading-6 text-subtext">{item.caption}</p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bg py-section">
        <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true">
          <Image
            src="/images/home_stats_bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-[1440px] space-y-12 px-container">
          <Reveal>
            <SectionIntro eyebrow={content.stats.eyebrow} title={content.stats.title} />
          </Reveal>
          <Reveal>
            <StatRow items={content.stats.items as StatItem[]} locale={locale} />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-section">
        <div className="mx-auto max-w-[1440px] space-y-12 px-container">
          <Reveal>
            <SectionIntro eyebrow={content.pillars.eyebrow} title={content.pillars.title} />
          </Reveal>
          <Reveal className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {content.pillars.items.map((item) => (
              <RevealItem key={item.href}>
                <Link
                  href={withLocale(locale, item.href)}
                  className="group block h-full bg-bg p-4 shadow-[0_18px_60px_rgba(16,29,48,0.07)] transition duration-hover ease-brand hover:-translate-y-1 hover:shadow-[0_30px_95px_rgba(16,29,48,0.13)]"
                >
                  <div className="hover-zoom">
                    <div className="hover-zoom-media">
                      <SafeImage
                        filename={item.image}
                        alt={item.caption}
                        aspect="aspect-[3/4]"
                        variant="plain"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 px-1 py-6">
                    <h3 className="font-heading text-[clamp(30px,3vw,42px)] font-semibold leading-none text-primary">
                      {item.title}
                    </h3>
                    <p className="font-body text-[15px] leading-7 text-text">{item.caption}</p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-white pb-section">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-container pt-6 lg:grid-cols-[minmax(280px,0.82fr)_1.18fr] lg:items-center">
          <Reveal className="space-y-7">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
              {content.golf.eyebrow}
            </p>
            <h2 className="font-heading text-hero font-bold leading-none tracking-normal text-primary">
              {content.golf.title}
            </h2>
            <p className="max-w-xl font-body text-body leading-[1.7] text-text">
              {content.golf.subtitle}
            </p>
            <Link
              href={withLocale(locale, '/golf')}
              className="link-sweep font-body text-sm font-semibold uppercase tracking-[0.12em]"
            >
              {content.golf.cta}
            </Link>
          </Reveal>
          <Reveal>
            <SafeImage
              filename={content.golf.image}
              alt={content.golf.subtitle}
              aspect="aspect-[4/3]"
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
