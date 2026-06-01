import {setRequestLocale} from 'next-intl/server';

import {RoutePlaceholderPage} from '@/components/site/route-placeholder-page';
import type {Locale} from '@/i18n/routing';
import {getRoutePage} from '@/lib/site-map';

type Props = {
  params: Promise<{locale: Locale}>;
};

export default async function CollectionPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <RoutePlaceholderPage locale={locale} page={getRoutePage('collection', locale)} />;
}
