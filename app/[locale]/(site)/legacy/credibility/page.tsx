import {setRequestLocale} from 'next-intl/server';

import {LegacyDetailPage} from '@/components/legacy/legacy-detail-page';
import type {Locale} from '@/i18n/routing';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

type Props = {
  params: Promise<{locale: Locale}>;
};

export default async function CredibilityPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content = locale === 'en' ? enMessages.legacyPages.credibility : koMessages.legacyPages.credibility;

  return <LegacyDetailPage locale={locale} content={content} />;
}
