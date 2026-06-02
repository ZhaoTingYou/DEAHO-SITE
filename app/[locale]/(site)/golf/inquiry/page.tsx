import type {Metadata} from 'next';
import Link from 'next/link';
import {setRequestLocale} from 'next-intl/server';

import {GolfInquiryForm} from '@/components/forms/golf-inquiry-form';
import {Reveal} from '@/components/motion/reveal';
import {SafeImage} from '@/components/safe-image';
import type {Locale} from '@/i18n/routing';
import {getPageMetadata} from '@/lib/seo';
import {withLocale} from '@/lib/site-map';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

type Props = {
  params: Promise<{locale: Locale}>;
  searchParams: Promise<{head?: string; shaft?: string; engraving?: string}>;
};

const copy = {
  ko: {
    eyebrow: 'GOLF INQUIRY',
    title: '구성을 확인하고 상담을 요청합니다',
    body: '이 단계는 결제가 아니라 상담 접수입니다. 카드 정보나 계좌 정보는 입력하지 않습니다.',
    summary: '내 구성',
    head: '클럽 헤드',
    shaft: '샤프트 컬러',
    engraving: '각인 예시',
    edit: '구성 다시 보기'
  },
  en: {
    eyebrow: 'GOLF INQUIRY',
    title: 'Confirm your configuration and request a consultation',
    body: 'This step submits a consultation request, not a payment. Do not enter card or account information.',
    summary: 'My configuration',
    head: 'Club head',
    shaft: 'Shaft color',
    engraving: 'Engraving sample',
    edit: 'Edit configuration'
  }
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return getPageMetadata(locale, 'golfInquiry');
}

export default async function GolfInquiryPage({params, searchParams}: Props) {
  const {locale} = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const text = copy[locale];
  const golf = locale === 'en' ? enMessages.golf : koMessages.golf;
  const selectedHead = golf.heads.items.find((item) => item.id === query.head) ?? golf.heads.items[0];
  const selectedShaft =
    golf.shafts.items.find((item) => item.id === query.shaft) ?? golf.shafts.items[0];
  const engravingSample = query.engraving?.trim().slice(0, 80) || 'JUDY KIM 2026.05.03';

  return (
    <main className="bg-bg text-text">
      <section className="bg-white pt-28">
        <div className="mx-auto grid min-h-[82dvh] max-w-[1440px] gap-12 px-container py-section lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal className="space-y-7">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-accent">
              {text.eyebrow}
            </p>
            <h1 className="font-heading text-[clamp(48px,8vw,104px)] font-semibold leading-none text-primary">
              {text.title}
            </h1>
            <p className="max-w-2xl font-body text-body leading-[1.75] text-text">{text.body}</p>
            <Link href={withLocale(locale, '/golf')} className="link-sweep inline-flex font-body text-sm font-semibold uppercase tracking-[0.12em]">
              {text.edit}
            </Link>
          </Reveal>
          <Reveal className="grid gap-5 bg-bg p-5 shadow-[0_24px_86px_rgba(16,29,48,0.08)] md:p-7">
            <SafeImage
              filename={selectedShaft.image}
              alt={`${selectedHead.label} ${selectedShaft.label}`}
              aspect="aspect-[4/3]"
              variant="plain"
              priority
            />
            <div className="space-y-4 bg-white p-5">
              <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-accent">
                {text.summary}
              </p>
              <SpecRow label={text.head} value={selectedHead.label} />
              <SpecRow label={text.shaft} value={selectedShaft.label} />
              <SpecRow label={text.engraving} value={engravingSample} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-section">
        <div className="mx-auto max-w-5xl px-container">
          <Reveal className="bg-white p-5 shadow-[0_24px_86px_rgba(16,29,48,0.07)] md:p-8">
            <GolfInquiryForm
              locale={locale}
              configuration={{
                head: selectedHead.label,
                shaft: selectedShaft.label,
                engraving: engravingSample
              }}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function SpecRow({label, value}: {label: string; value: string}) {
  return (
    <div className="flex items-center justify-between gap-5 border-t border-hairline pt-4 font-body text-sm">
      <span className="font-semibold uppercase tracking-[0.14em] text-subtext">{label}</span>
      <span className="text-right font-semibold text-primary">{value}</span>
    </div>
  );
}
