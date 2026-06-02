import type {Metadata} from 'next';

import type {Locale} from '@/i18n/routing';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

type PageKey =
  | 'home'
  | 'chronicle'
  | 'legacy'
  | 'loyalty'
  | 'credibility'
  | 'achievement'
  | 'specialty'
  | 'technique'
  | 'collection'
  | 'news'
  | 'golf';

type PageSeo = {
  path: string;
  title: string;
  description: string;
};

const messagesByLocale = {
  ko: koMessages,
  en: enMessages
};

export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');

export function getPageMetadata(locale: Locale, pageKey: PageKey): Metadata {
  const page = getPageSeo(locale, pageKey);
  const title = `${page.title} | DEAHO`;

  return {
    title,
    description: page.description,
    alternates: {
      canonical: withLocale(locale, page.path),
      languages: {
        ko: withLocale('ko', page.path),
        en: withLocale('en', page.path),
        'x-default': page.path
      }
    },
    openGraph: {
      title,
      description: page.description,
      url: withLocale(locale, page.path),
      siteName: 'DEAHO',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/home_hero.png',
          alt: 'DEAHO'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: page.description,
      images: ['/images/home_hero.png']
    }
  };
}

function getPageSeo(locale: Locale, pageKey: PageKey): PageSeo {
  const messages = messagesByLocale[locale];

  switch (pageKey) {
    case 'home':
      return {
        path: '/',
        title: messages.home.title,
        description: messages.home.subtitle
      };
    case 'chronicle':
      return {
        path: '/chronicle',
        title: messages.chronicle.hero.title,
        description: messages.chronicle.hero.subtitle
      };
    case 'legacy':
      return {
        path: '/legacy',
        title: messages.legacy.hero.title,
        description: messages.legacy.hero.lines.join(' ')
      };
    case 'loyalty':
      return {
        path: '/legacy/loyalty',
        title: messages.legacyPages.loyalty.hero.title,
        description: messages.legacyPages.loyalty.hero.subtitle
      };
    case 'credibility':
      return {
        path: '/legacy/credibility',
        title: messages.legacyPages.credibility.hero.title,
        description: messages.legacyPages.credibility.hero.subtitle
      };
    case 'achievement':
      return {
        path: '/legacy/achievement',
        title: messages.legacyPages.achievement.hero.title,
        description: messages.legacyPages.achievement.hero.subtitle
      };
    case 'specialty':
      return {
        path: '/specialty',
        title: messages.specialty.hero.title,
        description: messages.specialty.hero.subtitle
      };
    case 'technique':
      return {
        path: '/specialty/technique',
        title: messages.specialtyPages.technique.hero.title,
        description: messages.specialtyPages.technique.hero.subtitle
      };
    case 'collection':
      return {
        path: '/specialty/collection',
        title: messages.specialtyPages.collection.hero.title,
        description: messages.specialtyPages.collection.hero.subtitle
      };
    case 'news':
      return {
        path: '/news',
        title: messages.news.hero.title,
        description: messages.news.hero.subtitle
      };
    case 'golf':
      return {
        path: '/golf',
        title: messages.golf.hero.titleLines.join(' '),
        description: messages.golf.hero.subtitle
      };
  }
}

function withLocale(locale: Locale, path: string) {
  return `/${locale}${path === '/' ? '' : path}`;
}
