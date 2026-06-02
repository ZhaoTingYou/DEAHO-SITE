import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';

import {LegacyDetailPage} from '@/components/legacy/legacy-detail-page';
import type {Locale} from '@/i18n/routing';
import {getPageMetadata} from '@/lib/seo';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

type Props = {
  params: Promise<{locale: Locale}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return getPageMetadata(locale, 'credibility');
}

export default async function CredibilityPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content = locale === 'en' ? enMessages.legacyPages.credibility : koMessages.legacyPages.credibility;

  return <LegacyDetailPage locale={locale} content={content} />;
}
