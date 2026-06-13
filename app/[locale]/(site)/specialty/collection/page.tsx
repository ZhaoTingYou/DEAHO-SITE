import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';

import {Reveal} from '@/components/motion/reveal';
import {SafeImage} from '@/components/safe-image';
import {SectionIntro} from '@/components/section-intro';
import {SpecialtyCollectionGallery} from '@/components/specialty/specialty-collection-gallery';
import type {Locale} from '@/i18n/routing';
import {imageExists} from '@/lib/image-exists';
import {getLocaleMessages} from '@/lib/locale-messages';
import {getPageMetadata} from '@/lib/seo';

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
  const messages = getLocaleMessages(locale);
  const content = messages.specialtyPages.collection;
  const text = messages.collectionUi;
  const items = content.gallery.items.map((item) => ({
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
            <h1 className="font-heading text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.12] text-primary">
              {content.hero.title}
            </h1>
            <p className="mx-auto max-w-xl font-body text-[14px] leading-[1.85] text-text">
              {content.hero.subtitle}
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-[clamp(48px,6vw,88px)] w-full max-w-[1180px]">
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
        <div className="mx-auto max-w-[1280px] space-y-[clamp(48px,5vw,72px)] px-container">
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
            empty={text.empty}
            filterLabel={text.filtersLabel}
            locale={locale}
          />
        </div>
      </section>
    </main>
  );
}
