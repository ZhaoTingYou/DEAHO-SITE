import type {Metadata} from 'next';

import type {Locale} from '@/i18n/routing';
import {getLocaleMessages} from '@/lib/locale-messages';

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
  | 'golf'
  | 'contact'
  | 'golfInquiry';

type PageSeo = {
  path: string;
  title: string;
  description: string;
};

export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');

export function getPageMetadata(locale: Locale, pageKey: PageKey): Metadata {
  const page = getPageSeo(locale, pageKey);
  return getDetailMetadata(locale, page.path, page.title, page.description);
}

export function getDetailMetadata(
  locale: Locale,
  path: string,
  pageTitle: string,
  description: string,
  image = '/images/home_hero.png'
): Metadata {
  const title = `${pageTitle} | DEAHO`;

  return {
    title,
    description,
    alternates: {
      canonical: withLocale(locale, path),
      languages: {
        ko: withLocale('ko', path),
        en: withLocale('en', path),
        'x-default': path
      }
    },
    openGraph: {
      title,
      description,
      url: withLocale(locale, path),
      siteName: 'DEAHO',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
      images: [
        {
          url: image,
          alt: 'DEAHO'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  };
}

function getPageSeo(locale: Locale, pageKey: PageKey): PageSeo {
  const messages = getLocaleMessages(locale);

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
    case 'contact':
      return {
        path: '/contact',
        title: messages.contact.hero.eyebrow,
        description: messages.contact.hero.body
      };
    case 'golfInquiry':
      return {
        path: '/golf/inquiry',
        title: messages.golfInquiry.hero.eyebrow,
        description: messages.golfInquiry.hero.body
      };
  }
}

function withLocale(locale: Locale, path: string) {
  return `/${locale}${path === '/' ? '' : path}`;
}
