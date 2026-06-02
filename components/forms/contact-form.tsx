'use client';

import {useState} from 'react';

import type {Locale} from '@/i18n/routing';

type ContactFormProps = {
  locale: Locale;
  defaultType?: InquiryType;
};

type InquiryType = 'appointment' | 'championship' | 'bespoke' | 'other';

const copy = {
  ko: {
    name: '이름',
    organization: '회사 / 팀',
    contact: '연락처',
    type: '문의 유형',
    message: '메시지',
    submit: '문의 보내기',
    success: '접수되었습니다. 확인 가능한 연락처로 다시 연락드리겠습니다.',
    fallback: '전송이 원활하지 않으면 직접 연락처로 문의해 주세요.',
    options: [
      {value: 'appointment', label: '임관반지'},
      {value: 'championship', label: '우승반지'},
      {value: 'bespoke', label: '맞춤제작'},
      {value: 'other', label: '기타'}
    ]
  },
  en: {
    name: 'Name',
    organization: 'Company / Team',
    contact: 'Contact',
    type: 'Inquiry type',
    message: 'Message',
    submit: 'Send inquiry',
    success: 'Inquiry received. We will follow up through the contact you provided.',
    fallback: 'If submission does not go through, use the direct contact details on this page.',
    options: [
      {value: 'appointment', label: 'Appointment ring'},
      {value: 'championship', label: 'Championship ring'},
      {value: 'bespoke', label: 'Bespoke'},
      {value: 'other', label: 'Other'}
    ]
  }
};

export function ContactForm({locale, defaultType = 'appointment'}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const text = copy[locale];

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        setIsSubmitted(true);
      }}
    >
      <TextField id="contact-name" label={text.name} name="name" />
      <TextField id="contact-organization" label={text.organization} name="organization" />
      <TextField id="contact-contact" label={text.contact} name="contact" />
      <label className="block space-y-2 font-body text-sm font-semibold uppercase tracking-[0.12em] text-subtext">
        <span>{text.type}</span>
        <select
          name="type"
          defaultValue={defaultType}
          className="min-h-12 w-full border-b border-primary/30 bg-transparent py-3 text-base normal-case tracking-normal text-primary outline-none transition duration-hover ease-brand focus:border-accent"
        >
          {text.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-2 font-body text-sm font-semibold uppercase tracking-[0.12em] text-subtext">
        <span>{text.message}</span>
        <textarea
          name="message"
          rows={6}
          className="w-full resize-none border-b border-primary/30 bg-transparent py-3 text-base normal-case tracking-normal text-primary outline-none transition duration-hover ease-brand focus:border-accent"
        />
      </label>
      <button
        type="submit"
        className="min-h-12 border border-accent bg-accent px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.14em] text-white transition duration-hover ease-brand hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {text.submit}
      </button>
      {isSubmitted ? (
        <div className="border-l-2 border-accent bg-bg px-4 py-3 font-body text-sm leading-6 text-primary" role="status">
          <p>{text.success}</p>
          <p className="mt-2 text-subtext">{text.fallback}</p>
        </div>
      ) : null}
    </form>
  );
}

function TextField({id, label, name}: {id: string; label: string; name: string}) {
  return (
    <label htmlFor={id} className="block space-y-2 font-body text-sm font-semibold uppercase tracking-[0.12em] text-subtext">
      <span>{label}</span>
      <input
        id={id}
        name={name}
        className="min-h-12 w-full border-b border-primary/30 bg-transparent py-3 text-base normal-case tracking-normal text-primary outline-none transition duration-hover ease-brand focus:border-accent"
      />
    </label>
  );
}
