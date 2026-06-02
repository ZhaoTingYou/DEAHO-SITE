import type {Metadata} from 'next';
import Link from 'next/link';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {Reveal} from '@/components/motion/reveal';
import {SafeImage} from '@/components/safe-image';
import {CollectionDetailGallery} from '@/components/specialty/collection-detail-gallery';
import type {Locale} from '@/i18n/routing';
import {routing} from '@/i18n/routing';
import {imageExists} from '@/lib/image-exists';
import {getDetailMetadata} from '@/lib/seo';
import {withLocale} from '@/lib/site-map';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

type Props = {
  params: Promise<{locale: Locale; slug: string}>;
};

const detailImages = [
  'collection_detail_01.png',
  'collection_detail_02.png',
  'collection_detail_03.png',
  'collection_detail_04.png',
  'collection_detail_05.png'
];

const copy = {
  ko: {
    back: '작품 목록',
    specs: '작품 정보',
    story: '작품 이야기',
    material: '소재',
    stones: '보석',
    year: '연도',
    madeFor: '제작 대상',
    placeholder: '확인 예정',
    detailStrip: '세부 미감',
    processTitle: '본 작품에 적용된 공정',
    processCta: '공정 보기',
    ctaTitle: '이와 같은 작품을 의뢰하고 싶다면',
    cta: '맞춤 제작 문의',
    related: '관련 작품',
    thumbnailLabel: '작품 이미지 선택'
  },
  en: {
    back: 'Back to collection',
    specs: 'Work information',
    story: 'Work story',
    material: 'Material',
    stones: 'Stones',
    year: 'Year',
    madeFor: 'Made for',
    placeholder: 'To be confirmed',
    detailStrip: 'Detail studies',
    processTitle: 'Process applied to this work',
    processCta: 'View technique',
    ctaTitle: 'Interested in commissioning a work like this?',
    cta: 'Bespoke inquiry',
    related: 'Related works',
    thumbnailLabel: 'Select work image'
  }
};

export function generateStaticParams() {
  const slugs = koMessages.specialtyPages.collection.gallery.items.map((item) => item.id);
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({locale, slug})));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const item = getCollectionItem(locale, slug);

  if (!item) {
    return getDetailMetadata(locale, '/specialty/collection', 'COLLECTION', '');
  }

  return getDetailMetadata(locale, `/specialty/collection/${slug}`, item.title, item.caption, `/images/${item.image}`);
}

export default async function CollectionDetailPage({params}: Props) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const item = getCollectionItem(locale, slug);

  if (!item) {
    notFound();
  }

  const text = copy[locale];
  const images = [item.image, ...detailImages].map((filename) => ({
    filename,
    alt: `${item.title} ${item.caption}`,
    hasImage: imageExists(filename)
  }));
  const related = getCollectionItems(locale).filter((entry) => entry.id !== slug).slice(0, 4);
  const specs = [
    [text.material, text.placeholder],
    [text.stones, text.placeholder],
    [text.year, '20XX'],
    [text.madeFor, text.placeholder],
    [text.specs, item.categoryLabel]
  ];

  return (
    <main className="bg-bg text-text">
      <section className="bg-white pt-28">
        <div className="mx-auto max-w-[1440px] px-container py-section">
          <Link href={withLocale(locale, '/specialty/collection')} className="link-sweep font-body text-sm font-semibold uppercase tracking-[0.12em]">
            {text.back}
          </Link>
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.72fr)] lg:items-start">
            <Reveal>
              <CollectionDetailGallery images={images} thumbnailLabel={text.thumbnailLabel} />
            </Reveal>
            <Reveal className="lg:sticky lg:top-32">
              <aside className="space-y-8 bg-bg p-5 shadow-[0_24px_88px_rgba(16,29,48,0.08)] md:p-8">
                <div className="space-y-5">
                  <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-accent">
                    {item.categoryLabel}
                  </p>
                  <h1 className="font-heading text-[clamp(48px,7vw,94px)] font-semibold leading-none text-primary">
                    {item.title}
                  </h1>
                  <p className="font-body text-[17px] leading-8 text-text">{item.caption}</p>
                </div>
                <div className="space-y-1">
                  {specs.map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[0.8fr_1.2fr] gap-5 border-t border-hairline py-4 font-body text-sm">
                      <span className="font-semibold uppercase tracking-[0.14em] text-subtext">{label}</span>
                      <span className="text-right text-primary">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 border-l-2 border-accent bg-white px-5 py-4">
                  <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.18em] text-accent">
                    {text.story}
                  </p>
                  <p className="font-body text-[16px] leading-7 text-text">{item.caption}</p>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-bg py-section">
        <div className="mx-auto max-w-[1440px] space-y-8 px-container">
          <Reveal>
            <h2 className="font-heading text-[clamp(42px,6vw,82px)] font-semibold leading-none text-primary">
              {text.detailStrip}
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {detailImages.slice(0, 3).map((filename) => (
              <Reveal key={filename}>
                <div className="hover-zoom">
                  <div className="hover-zoom-media">
                    <SafeImage filename={filename} alt={text.detailStrip} aspect="aspect-square" variant="plain" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-section">
        <Reveal className="mx-auto max-w-5xl space-y-6 px-container text-center">
          <p className="font-heading text-[clamp(38px,6vw,74px)] font-semibold leading-tight text-primary">
            {text.processTitle}
          </p>
          <Link href={withLocale(locale, '/specialty/technique')} className="link-sweep inline-flex font-body text-sm font-semibold uppercase tracking-[0.12em]">
            {text.processCta}
          </Link>
        </Reveal>
      </section>

      <section className="bg-bg py-section">
        <div className="mx-auto max-w-[1440px] space-y-10 px-container">
          <Reveal className="grid gap-6 bg-white p-6 shadow-[0_24px_88px_rgba(16,29,48,0.07)] md:grid-cols-[1fr_auto] md:items-center">
            <p className="font-heading text-[clamp(36px,5vw,68px)] font-semibold leading-tight text-primary">
              {text.ctaTitle}
            </p>
            <Link href={withLocale(locale, `/contact?type=bespoke&source=collection&item=${slug}`)} className="min-h-12 border border-accent bg-accent px-6 py-3 text-center font-body text-sm font-semibold uppercase tracking-[0.14em] text-white transition duration-hover ease-brand hover:bg-primary">
              {text.cta}
            </Link>
          </Reveal>
          <Reveal>
            <h2 className="font-heading text-[clamp(38px,6vw,74px)] font-semibold leading-none text-primary">
              {text.related}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {related.map((entry) => (
              <Link
                key={entry.id}
                href={withLocale(locale, `/specialty/collection/${entry.id}`)}
                className="group block bg-white p-3 shadow-[0_14px_52px_rgba(16,29,48,0.055)] transition duration-hover ease-brand hover:-translate-y-1"
              >
                <SafeImage filename={entry.image} alt={entry.title} aspect="aspect-square" variant="plain" />
                <div className="space-y-2 px-1 py-4">
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    {entry.categoryLabel}
                  </p>
                  <h3 className="font-heading text-[28px] font-semibold leading-tight text-primary">
                    {entry.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function getCollectionItems(locale: Locale) {
  return locale === 'en'
    ? enMessages.specialtyPages.collection.gallery.items
    : koMessages.specialtyPages.collection.gallery.items;
}

function getCollectionItem(locale: Locale, slug: string) {
  return getCollectionItems(locale).find((item) => item.id === slug);
}
