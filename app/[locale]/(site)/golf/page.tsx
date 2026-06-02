import {setRequestLocale} from 'next-intl/server';

import {
  GolfConfigurator,
  type GolfConfiguratorContent
} from '@/components/golf/golf-configurator';
import type {Locale} from '@/i18n/routing';
import {imageExists} from '@/lib/image-exists';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

type Props = {
  params: Promise<{locale: Locale}>;
};

export default async function GolfPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content = (locale === 'en' ? enMessages.golf : koMessages.golf) as GolfConfiguratorContent;
  const filenames = collectGolfImages(content);
  const assets = Object.fromEntries(
    filenames.map((filename) => [filename, imageExists(filename)])
  );

  return <GolfConfigurator assets={assets} content={content} />;
}

function collectGolfImages(content: GolfConfiguratorContent) {
  return Array.from(
    new Set([
      content.hero.image,
      content.statement.image,
      content.engraving.imagePrimary,
      content.engraving.imageDetail,
      content.lifestyle.imageBox,
      content.lifestyle.imageLifestyle,
      ...content.heads.items.map((item) => item.image),
      ...content.shafts.items.map((item) => item.image)
    ])
  );
}
