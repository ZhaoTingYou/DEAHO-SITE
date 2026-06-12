'use client';

import {useState} from 'react';

type GolfInquiryFormProps = {
  copy: GolfInquiryFormCopy;
  configuration?: {
    head: string;
    shaft: string;
    engraving: string;
  };
};

type GolfInquiryFormCopy = {
  name: string;
  contact: string;
  quantity: string;
  due: string;
  team: string;
  use: string;
  message: string;
  submit: string;
  success: string;
  fallback: string;
};

export function GolfInquiryForm({copy: text, configuration}: GolfInquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

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
