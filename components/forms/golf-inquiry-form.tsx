'use client';

import {useState} from 'react';

import type {Locale} from '@/i18n/routing';

type GolfInquiryFormProps = {
  locale: Locale;
  configuration?: {
    head: string;
    shaft: string;
    engraving: string;
  };
};

const copy = {
  ko: {
    name: '이름',
    contact: '연락처',
    quantity: '수량',
    due: '희망 납기',
    team: '단체 / 팀 명',
    use: '용도',
    message: '메시지',
    submit: '상담 요청하기',
    success: '접수되었습니다. 영업일 기준 00일 내 연락드리겠습니다.',
    fallback: '전송이 원활하지 않으면 전화 또는 이메일로 바로 문의해 주세요.'
  },
  en: {
    name: 'Name',
    contact: 'Contact',
    quantity: 'Quantity',
    due: 'Desired delivery',
    team: 'Group / Team name',
    use: 'Use',
    message: 'Message',
    submit: 'Request consultation',
    success: 'Inquiry received. We will contact you within 00 business days.',
    fallback: 'If submission does not go through, contact us directly by phone or email.'
  }
};

export function GolfInquiryForm({locale, configuration}: GolfInquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const text = copy[locale];

  return (
    <form
      className="grid gap-6 md:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        setIsSubmitted(true);
      }}
    >
      {configuration ? (
        <>
          <input type="hidden" name="selectedHead" value={configuration.head} />
          <input type="hidden" name="selectedShaft" value={configuration.shaft} />
          <input type="hidden" name="engravingSample" value={configuration.engraving} />
        </>
      ) : null}
      <TextField id="golf-name" label={text.name} name="name" autoComplete="name" />
      <TextField id="golf-contact" label={text.contact} name="contact" type="tel" inputMode="tel" autoComplete="tel" />
      <TextField id="golf-quantity" label={text.quantity} name="quantity" type="number" inputMode="numeric" min="1" />
      <TextField id="golf-due" label={text.due} name="due" type="date" />
      <TextField id="golf-team" label={text.team} name="team" autoComplete="organization" />
      <TextField id="golf-use" label={text.use} name="use" />
      <label className="block space-y-2 font-body text-sm font-semibold uppercase tracking-[0.12em] text-subtext md:col-span-2">
        <span>{text.message}</span>
        <textarea
          name="message"
          rows={6}
          autoComplete="off"
          className="w-full resize-none border-b border-primary/30 bg-transparent py-3 text-base normal-case tracking-normal text-primary outline-none transition duration-hover ease-brand focus:border-accent"
        />
      </label>
      <div className="space-y-4 md:col-span-2">
        <button
          type="submit"
          className="min-h-12 border border-accent bg-accent px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.14em] text-white transition duration-hover ease-brand hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {text.submit}
        </button>
        {isSubmitted ? (
          <div className="border-l-2 border-accent bg-white px-4 py-3 font-body text-sm leading-6 text-primary" role="status">
            <p>{text.success}</p>
            <p className="mt-2 text-subtext">{text.fallback}</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}

function TextField({
  id,
  label,
  name,
  type = 'text',
  inputMode,
  autoComplete,
  min
}: {
  id: string;
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  autoComplete?: string;
  min?: string;
}) {
  return (
    <label htmlFor={id} className="block space-y-2 font-body text-sm font-semibold uppercase tracking-[0.12em] text-subtext">
      <span>{label}</span>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        min={min}
        className="min-h-12 w-full border-b border-primary/30 bg-transparent py-3 text-base normal-case tracking-normal text-primary outline-none transition duration-hover ease-brand focus:border-accent"
      />
    </label>
  );
}
