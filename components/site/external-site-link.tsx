'use client';

type ExternalSiteLinkProps = {
  label: string;
  href: string;
  className?: string;
};

export function ExternalSiteLink({label, href, className = ''}: ExternalSiteLinkProps) {
  const isEnabled = href.length > 0;

  return (
    <a
      href={isEnabled ? href : '#'}
      target={isEnabled ? '_blank' : undefined}
      rel={isEnabled ? 'noopener' : undefined}
      aria-disabled={!isEnabled}
      tabIndex={isEnabled ? undefined : -1}
      onClick={(event) => {
        if (!isEnabled) {
          event.preventDefault();
        }
      }}
      className={`${className} ${isEnabled ? 'text-primary' : 'cursor-default text-primary/70'}`}
    >
      {label}
    </a>
  );
}
