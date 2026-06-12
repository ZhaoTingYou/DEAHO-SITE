'use client';

import {useState} from 'react';

export function ShareLinkButton({copy}: {copy: {label: string; copied: string}}) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({url});
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 3200);
    } catch {
      setIsCopied(false);
    }
  }

  return (
    <span className="inline-flex items-center gap-3">
      <button
        type="button"
        onClick={handleShare}
        className="min-h-11 border border-primary/20 bg-white px-4 py-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition duration-hover ease-brand hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {copy.label}
      </button>
      {isCopied ? (
        <span className="font-body text-xs font-semibold text-accent" role="status">
          {copy.copied}
        </span>
      ) : null}
    </span>
  );
}
