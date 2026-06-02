import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';

import {Reveal} from '@/components/motion/reveal';
import {SafeImage} from '@/components/safe-image';
import {SectionIntro} from '@/components/section-intro';
import {SpecialtyCollectionGallery} from '@/components/specialty/specialty-collection-gallery';
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
  return getPageMetadata(locale, 'collection');
}

export default async function CollectionPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content =
    locale === 'en' ? enMessages.specialtyPages.collection : koMessages.specialtyPages.collection;
  const items = content.gallery.items.map((item) => ({
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
          WORKS
        </div>
        <div className="relative mx-auto grid min-h-[92dvh] max-w-[1440px] items-center gap-12 px-container py-section lg:grid-cols-[0.84fr_1.16fr]">
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
          <Reveal>
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
        <div className="mx-auto max-w-[1440px] space-y-12 px-container">
          <Reveal>
            <SectionIntro
              eyebrow={content.gallery.eyebrow}
              title={content.gallery.title}
              variant="specialty"
            />
          </Reveal>
          <SpecialtyCollectionGallery
            filters={content.gallery.filters}
            items={items}
            closeLabel={locale === 'ko' ? '닫기' : 'Close'}
            filterLabel={locale === 'ko' ? '작품 필터' : 'Collection filters'}
          />
        </div>
      </section>
    </main>
  );
}
