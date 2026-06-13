import type {MetadataRoute} from 'next';

import {routing} from '@/i18n/routing';
import {metadataBase} from '@/lib/seo';
import koMessages from '@/messages/ko.json';

const staticPaths = [
  '/',
  '/chronicle',
  '/legacy/loyalty',
  '/legacy/credibility',
  '/legacy/achievement',
  '/specialty/technique',
  '/specialty/collection',
  '/news',
  '/golf',
  '/golf/inquiry',
  '/contact'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const detailPaths = [
    ...koMessages.news.grid.cards.map((card) => `/news/${card.id}`),
    ...koMessages.specialtyPages.collection.gallery.items.map((item) => `/specialty/collection/${item.id}`)
  ];
  const lastModified = new Date();

  return [...staticPaths, ...detailPaths].flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path === '/' ? '' : path}`),
      lastModified,
      changeFrequency: path === '/' ? 'weekly' : 'monthly',
      priority: path === '/' ? 1 : 0.7
    }))
  );
}

function absoluteUrl(path: string) {
  return new URL(path, metadataBase).toString();
}
