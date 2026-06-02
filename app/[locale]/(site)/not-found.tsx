'use client';

import Link from 'next/link';
import {useParams} from 'next/navigation';

import type {Locale} from '@/i18n/routing';

const copy = {
  ko: {
    title: '페이지를 찾을 수 없습니다',
    body: '요청한 경로는 아직 준비되지 않았거나 이동되었습니다.',
    home: 'HOME',
    news: 'NEWS',
    contact: '문의하기'
  },
  en: {
    title: 'Page not found',
    body: 'The requested route is not ready yet or has moved.',
    home: 'HOME',
    news: 'NEWS',
    contact: 'Contact'
  }
};

export default function NotFound() {
  const params = useParams<{locale?: Locale}>();
  const locale = params.locale === 'en' ? 'en' : 'ko';
  const text = copy[locale];

  return (
    <main className="min-h-dvh bg-bg px-container py-section text-primary">
      <div className="mx-auto flex min-h-[72dvh] max-w-5xl flex-col justify-center gap-8 text-center">
        <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-accent">404</p>
        <h1 className="font-heading text-[clamp(54px,9vw,120px)] font-semibold leading-none">
          {text.title}
        </h1>
        <p className="mx-auto max-w-2xl font-body text-body leading-[1.75] text-text">{text.body}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={`/${locale}`} className="link-sweep font-body text-sm font-semibold uppercase tracking-[0.12em]">
            {text.home}
          </Link>
          <Link href={`/${locale}/news`} className="link-sweep font-body text-sm font-semibold uppercase tracking-[0.12em]">
            {text.news}
          </Link>
          <Link href={`/${locale}/contact`} className="link-sweep font-body text-sm font-semibold uppercase tracking-[0.12em]">
            {text.contact}
          </Link>
        </div>
      </div>
    </main>
  );
}
