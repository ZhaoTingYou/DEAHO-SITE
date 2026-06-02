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
  | 'golf'
  | 'contact'
  | 'golfInquiry';

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
    case 'contact':
      return {
        path: '/contact',
        title: locale === 'ko' ? 'CONTACT · 문의' : 'CONTACT',
        description:
          locale === 'ko'
            ? '승리의 의미를 형태로 남기는 상담을 시작합니다.'
            : 'Start a consultation to shape the meaning of victory.'
      };
    case 'golfInquiry':
      return {
        path: '/golf/inquiry',
        title: locale === 'ko' ? 'GOLF INQUIRY' : 'GOLF INQUIRY',
        description:
          locale === 'ko'
            ? '선택한 골프 브레이슬릿 구성을 바탕으로 상담을 요청합니다.'
            : 'Request a consultation based on your selected golf bracelet configuration.'
      };
  }
}

function withLocale(locale: Locale, path: string) {
  return `/${locale}${path === '/' ? '' : path}`;
}
