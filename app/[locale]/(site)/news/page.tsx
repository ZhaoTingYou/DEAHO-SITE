import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';

import {NewsJournalGrid, type NewsCard} from '@/components/news/news-journal-grid';
import {Reveal} from '@/components/motion/reveal';
import {SafeImage} from '@/components/safe-image';
import {SectionIntro} from '@/components/section-intro';
import type {Locale} from '@/i18n/routing';
import {imageExists} from '@/lib/image-exists';
import {getPageMetadata} from '@/lib/seo';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

type Props = {
  params: Promise<{locale: Locale}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return getPageMetadata(locale, 'news');
}

export default async function NewsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content = locale === 'en' ? enMessages.news : koMessages.news;
  const cards: NewsCard[] = content.grid.cards.map((card) => ({
    ...card,
    hasImage: imageExists(card.image)
  }));
  const tickerItems = [...content.masthead.ticker, ...content.masthead.ticker];

  return (
    <main className="bg-bg text-text">
      <section className="overflow-hidden bg-bg pt-28">
        <div className="mx-auto max-w-[1440px] px-container pb-8 pt-10 md:pt-14">
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.55fr)] lg:items-end">
            <h1 className="font-heading text-[clamp(92px,18vw,260px)] font-semibold leading-[0.78] text-primary">
              {content.masthead.title}
            </h1>
            <div className="space-y-5 pb-2 text-left lg:text-right">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-subtext">
                {content.masthead.issue}
              </p>
              <p className="font-body text-[15px] leading-7 text-text">
                {content.hero.subtitle}
              </p>
            </div>
          </Reveal>

          <div className="news-rule-line mt-7 h-px w-full bg-primary/70" aria-hidden="true" />

          <div className="mt-4 overflow-hidden border-y border-hairline bg-white/45 py-3">
            <div className="news-ticker-track flex w-max items-center gap-7 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {tickerItems.map((item, index) => (
                <span key={`${item}-${index}`} className="flex items-center gap-7">
                  <span>{item}</span>
                  <span className="h-1 w-1 bg-accent" aria-hidden="true" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-container lg:grid-cols-[minmax(280px,0.72fr)_1.28fr] lg:items-center">
          <Reveal className="space-y-6">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
              {content.hero.eyebrow}
            </p>
            <h2 className="font-heading text-[clamp(48px,7vw,96px)] font-semibold leading-none text-primary">
              {content.hero.title}
            </h2>
            <p className="max-w-lg font-body text-body leading-[1.7] text-text">
              {content.hero.subtitle}
            </p>
          </Reveal>
          <Reveal>
            <SafeImage
              filename={content.hero.image}
              alt={content.hero.subtitle}
              aspect="aspect-[21/9]"
              priority
              variant="plain"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-section">
        <div className="mx-auto max-w-[1440px] px-container">
          <Reveal className="group grid gap-10 bg-white p-4 shadow-[0_24px_90px_rgba(16,29,48,0.08)] md:p-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
            <div className="hover-zoom relative">
              <div className="hover-zoom-media">
                <SafeImage
                  filename={content.featured.image}
                  alt={content.featured.title}
                  aspect="aspect-[16/9] lg:aspect-[4/3]"
                  variant="plain"
                />
              </div>
              <div className="news-featured-veil pointer-events-none absolute inset-0 bg-bg/62 transition duration-hover ease-brand group-hover:bg-bg/28" />
            </div>
            <div className="flex flex-col justify-between gap-12 px-1 py-3 md:px-2 lg:py-6">
              <div className="space-y-7">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-[11px] font-semibold uppercase tracking-[0.18em]">
                  <span className="news-shine relative overflow-hidden text-accent">
                    {content.featured.eyebrow}
                  </span>
                  <span className="h-3 w-px bg-hairline" aria-hidden="true" />
                  <span className="text-subtext">{content.featured.category}</span>
                  <span className="text-subtext">{content.featured.date}</span>
                </div>
                <h2 className="font-heading text-[clamp(40px,6vw,76px)] font-semibold leading-none text-primary">
                  {content.featured.title}
                </h2>
                <p className="max-w-2xl font-body text-[17px] leading-8 text-text">
                  {content.featured.body}
                </p>
              </div>
              <div className="h-px w-full bg-hairline" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="news-grid" className="bg-white py-section">
        <div className="mx-auto max-w-[1440px] space-y-10 px-container">
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(280px,0.5fr)_1fr] lg:items-end">
            <SectionIntro
              eyebrow={content.grid.eyebrow}
              title={content.grid.title}
              variant="news"
            />
            <p className="max-w-2xl font-body text-[16px] leading-7 text-text lg:justify-self-end">
              {locale === 'ko'
                ? '새로운 제작 사례와 프로젝트 소식은 확인되는 순서대로 이 밝은 저널 지면에 남습니다.'
                : 'New production cases and project notes remain in this bright journal field as they are verified.'}
            </p>
          </Reveal>

          <Reveal>
            <NewsJournalGrid
              filters={content.grid.filters}
              cards={cards}
              filterLabel={locale === 'ko' ? '뉴스 필터' : 'News filters'}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
