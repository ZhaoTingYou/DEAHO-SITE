import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';

import {ContactForm} from '@/components/forms/contact-form';
import {Reveal} from '@/components/motion/reveal';
import {SectionIntro} from '@/components/section-intro';
import type {Locale} from '@/i18n/routing';
import {getPageMetadata} from '@/lib/seo';

type Props = {
  params: Promise<{locale: Locale}>;
  searchParams?: Promise<{type?: string}>;
};

const inquiryTypes = ['appointment', 'championship', 'bespoke', 'other'] as const;
type InquiryType = (typeof inquiryTypes)[number];

const copy = {
  ko: {
    eyebrow: 'CONTACT · 문의',
    title: '승리의 의미를 형태로',
    body: '임관, 우승, 맞춤 제작 상담은 확인 가능한 정보만 남겨 주세요. 결제나 카드 정보는 받지 않습니다.',
    infoTitle: 'Direct contact',
    address: '주소 확인 예정',
    phone: '전화 확인 예정',
    email: '이메일 확인 예정',
    hours: '영업시간 확인 예정',
    faqTitle: 'FAQ',
    faqs: [
      {
        question: '납기와 최소 수량은 어떻게 정하나요?',
        answer: '프로젝트 성격과 제작 사양을 확인한 뒤 상담에서 확정합니다.'
      },
      {
        question: '맞춤 제작은 무엇을 먼저 준비하면 되나요?',
        answer: '상징, 기록, 예산 범위, 원하는 일정만 준비해 주시면 함께 정리합니다.'
      }
    ]
  },
  en: {
    eyebrow: 'CONTACT',
    title: 'Shape the meaning of victory',
    body: 'For appointment, championship, and bespoke inquiries, leave only contactable project information. No payment or card information is collected.',
    infoTitle: 'Direct contact',
    address: 'Address to be confirmed',
    phone: 'Phone to be confirmed',
    email: 'Email to be confirmed',
    hours: 'Hours to be confirmed',
    faqTitle: 'FAQ',
    faqs: [
      {
        question: 'How are timelines and minimum quantities set?',
        answer: 'They are confirmed after reviewing the project scope and production specifications.'
      },
      {
        question: 'What should I prepare for bespoke work?',
        answer: 'Bring the symbols, records, budget range, and preferred timing. We will shape the rest together.'
      }
    ]
  }
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return getPageMetadata(locale, 'contact');
}

export default async function ContactPage({params, searchParams}: Props) {
  const {locale} = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const text = copy[locale];
  const defaultType = getInquiryType(query?.type);

  return (
    <main className="bg-bg text-text">
      <section className="bg-white pt-28">
        <div className="mx-auto grid min-h-[74dvh] max-w-[1440px] gap-12 px-container py-section lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <Reveal>
            <SectionIntro eyebrow={text.eyebrow} title={text.title}>
              <p>{text.body}</p>
            </SectionIntro>
          </Reveal>
          <Reveal className="bg-bg p-5 shadow-[0_24px_80px_rgba(16,29,48,0.08)] md:p-8">
            <ContactForm locale={locale} defaultType={defaultType} />
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-section">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-container lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-6 bg-white p-6 shadow-[0_18px_70px_rgba(16,29,48,0.06)] md:p-8">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-accent">
              {text.infoTitle}
            </p>
            {[text.address, text.phone, text.email, text.hours].map((item) => (
              <div key={item} className="border-t border-hairline pt-4 font-body text-[17px] leading-8 text-primary">
                {item}
              </div>
            ))}
          </Reveal>
          <Reveal className="space-y-5">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
              {text.faqTitle}
            </p>
            {text.faqs.map((item) => (
              <details key={item.question} className="group bg-white p-5 shadow-[0_12px_44px_rgba(16,29,48,0.05)]">
                <summary className="cursor-pointer font-body text-base font-semibold text-primary">
                  {item.question}
                </summary>
                <p className="mt-4 font-body text-sm leading-7 text-subtext">{item.answer}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function getInquiryType(type?: string): InquiryType {
  return inquiryTypes.includes(type as InquiryType) ? (type as InquiryType) : 'appointment';
}
