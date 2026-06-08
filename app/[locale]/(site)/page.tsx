import {existsSync} from 'node:fs';
import path from 'node:path';

import type {Metadata} from 'next';
import Link from 'next/link';
import {setRequestLocale} from 'next-intl/server';

import {HomeHero} from '@/components/home/home-hero';
import {HomeNewsPopups, type HomeNewsPopupCard} from '@/components/home/home-news-popups';
import {Reveal, RevealItem} from '@/components/motion/reveal';
import {SafeImage} from '@/components/safe-image';
import type {Locale} from '@/i18n/routing';
import {getPageMetadata} from '@/lib/seo';
import {withLocale} from '@/lib/site-map';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

type Props = {
  params: Promise<{locale: Locale}>;
};

const brandRows = [
  ['pcn', 'KB 국민은행', 'NH농협은행', 'DOYAK', 'BHL', 'SHIFT UP', '신한은행', 'IPARTNERS', '우리은행', 'INNORED'],
  ['NC Entertainment', 'YeonSung Apparel', '전북은행', 'SC 제일은행', 'JK 프렌즈', 'Charm Technology', 'kakaobank', 'KREITs', 'Kbank', 'KRAFTON'],
  ['toss bank', 'KEB 하나은행', 'A Partners', '우리은행', 'INNORED', 'SHIFT UP', '신한은행', 'KRAFTON', 'Kbank', 'KB 국민은행']
];

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return getPageMetadata(locale, 'home');
}

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const messages = locale === 'en' ? enMessages : koMessages;
  const content = messages.home;
  const heroVideo = getHomeHeroVideo();
  const latestNews: HomeNewsPopupCard[] = messages.news.grid.cards.slice(0, 4).map((card) => ({
    ...card,
    hasImage: existsSync(path.join(process.cwd(), 'public', 'images', card.image))
  }));

  return <HomeContent content={content} heroVideo={heroVideo} latestNews={latestNews} locale={locale} />;
}

function getHomeHeroVideo() {
  const videoDir = path.join(process.cwd(), 'public', 'videos');
  const imageDir = path.join(process.cwd(), 'public', 'images');
  const mp4Candidates = ['home_hero.mp4', 'home.mp4'];
  const webmCandidates = ['home_hero.webm', 'home.webm'];
  const posterCandidates = ['home_video_poster.jpg', 'home_video_poster.png'];
  const mp4 = mp4Candidates.find((filename) => existsSync(path.join(videoDir, filename)));
  const webm = webmCandidates.find((filename) => existsSync(path.join(videoDir, filename)));
  const videoPoster = posterCandidates.find((filename) => existsSync(path.join(imageDir, filename)));

  return {
    videoSrc: mp4 ? `/videos/${mp4}` : undefined,
    webmSrc: webm ? `/videos/${webm}` : undefined,
    videoPoster
  };
}

type HomeContentProps = {
  content: typeof koMessages.home;
  heroVideo: {
    videoSrc?: string;
    webmSrc?: string;
    videoPoster?: string;
  };
  latestNews: HomeNewsPopupCard[];
  locale: Locale;
};

function HomeContent({content, heroVideo, latestNews, locale}: HomeContentProps) {
  const currentPulse = {
    eyebrow: 'THE CURRENT PULSE',
    title: locale === 'ko' ? '지금, 대호' : 'DEAHO, Now',
    body: locale === 'ko' ? '그리고 지금도 만들고 있다.' : 'And we are still creating now.',
    question:
      locale === 'ko'
        ? '가장 자랑하고 싶은 아이템? 프로젝트?'
        : 'A piece or project worth remembering?'
  };

  return (
    <main className="min-h-screen bg-bg">
      <HomeHero
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        poster={content.image}
        videoPoster={heroVideo.videoPoster}
        videoSrc={heroVideo.videoSrc}
        webmSrc={heroVideo.webmSrc}
      />

      <section className="bg-white py-[clamp(96px,10vw,156px)]">
        <div className="mx-auto max-w-[1180px] space-y-20 px-container">
          <Reveal className="grid gap-10 lg:grid-cols-[minmax(220px,0.28fr)_minmax(0,0.72fr)] lg:items-center xl:gap-[72px]">
            <div className="max-w-[260px] space-y-3">
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-subtext">
                {currentPulse.eyebrow}
              </p>
              <h2 className="font-heading text-[clamp(30px,3.6vw,48px)] font-semibold leading-tight text-primary">
                {currentPulse.title}
              </h2>
              <p className="font-body text-[14px] leading-6 text-text">
                {currentPulse.body}
              </p>
            </div>

            <Link href={withLocale(locale, '/news')} className="group block">
              <div className="relative overflow-hidden bg-bg">
                <div className="hover-zoom">
                  <div className="hover-zoom-media">
                    <SafeImage
                      filename="news_featured.png.png"
                      alt={currentPulse.question}
                      aspect="aspect-[16/7]"
                      variant="plain"
                    />
                  </div>
                </div>
                <p className="absolute left-5 top-5 max-w-[88%] font-heading text-[clamp(15px,1.25vw,20px)] font-semibold leading-tight text-primary md:left-8 md:top-6">
                  {currentPulse.question}
                </p>
              </div>
            </Link>
          </Reveal>

          <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(220px,0.28fr)] lg:items-center xl:gap-[72px]">
            <Link href={withLocale(locale, '/specialty/collection')} className="group block">
              <div className="hover-zoom">
                <div className="hover-zoom-media">
                  <SafeImage
                    filename="home_ring_01.png"
                    alt={currentPulse.title}
                    aspect="aspect-[16/7]"
                    variant="plain"
                  />
                </div>
              </div>
            </Link>

            <div className="space-y-3 lg:max-w-[260px] lg:justify-self-end lg:text-right">
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-subtext">
                {currentPulse.eyebrow}
              </p>
              <p className="font-heading text-[clamp(30px,3.4vw,46px)] font-semibold leading-tight text-primary">
                {currentPulse.title}
              </p>
              <p className="font-body text-[14px] leading-6 text-text">
                {currentPulse.body}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white pb-[clamp(108px,10vw,168px)] pt-[clamp(36px,5vw,72px)]">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-container lg:grid-cols-[minmax(260px,0.42fr)_minmax(0,0.58fr)] lg:items-center xl:gap-20">
          <Reveal className="max-w-[440px] space-y-7">
            <div className="space-y-5">
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-subtext">
                {content.signature.eyebrow}
              </p>
              <h2 className="font-heading text-[clamp(34px,4.2vw,58px)] font-semibold leading-tight text-primary">
                {content.signature.title}
              </h2>
            </div>
            <p className="max-w-sm font-body text-[15px] leading-7 text-text">
              {content.signature.body}
            </p>
          </Reveal>

          <Reveal className="grid items-stretch gap-5 sm:grid-cols-3">
            {content.rings.slice(2, 5).map((item) => (
              <RevealItem key={item.image} className="h-full">
                <Link
                  href={withLocale(locale, '/specialty/collection')}
                  className="group grid h-full grid-rows-[auto_1fr] bg-white p-3 shadow-[0_18px_70px_rgba(16,29,48,0.055)] transition duration-hover ease-brand hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(16,29,48,0.10)]"
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
                  <div className="grid min-h-[142px] grid-rows-[auto_1fr] gap-2 px-1 pb-2 pt-5">
                    <h3 className="min-h-[2.4em] font-heading text-[clamp(22px,2vw,30px)] font-semibold leading-tight text-primary">
                      {item.title}
                    </h3>
                    <p className="self-end font-body text-[12px] leading-5 text-subtext">
                      {item.caption}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-[clamp(92px,10vw,150px)]">
        <div className="mx-auto max-w-[1180px] space-y-10 px-container">
          <Reveal className="max-w-[760px] space-y-5">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-subtext">
              LATEST NEWS
            </p>
            <h2 className="font-heading text-[clamp(30px,3.8vw,52px)] font-semibold leading-tight text-primary">
              {locale === 'ko' ? '최근 소식' : 'Latest News'}
            </h2>
          </Reveal>
          <Reveal>
            <HomeNewsPopups cards={latestNews} locale={locale} />
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden bg-white pb-section pt-[clamp(42px,6vw,90px)]">
        <div className="home-brand-marquee" aria-label={locale === 'ko' ? '협업 및 후원 브랜드' : 'Collaboration and sponsorship brands'}>
          {brandRows.map((row, rowIndex) => (
            <div className="home-brand-row" key={rowIndex}>
              {[...row, ...row].map((brand, brandIndex) => (
                <span key={`${brand}-${brandIndex}`}>{brand}</span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
