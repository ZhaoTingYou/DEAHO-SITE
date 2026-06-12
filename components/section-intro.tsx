type SectionIntroProps = {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  align?: 'left' | 'center';
  variant?: 'default' | 'chronicle' | 'legacy' | 'news' | 'specialty';
};

export function SectionIntro({
  eyebrow,
  title,
  children,
  align = 'left',
  variant = 'default'
}: SectionIntroProps) {
  const variantClass = {
    default: '',
    chronicle: 'border-l border-primary/40 pl-5 md:pl-7',
    legacy: 'mx-auto max-w-5xl text-center',
    news: 'border-b-2 border-primary pb-5',
    specialty: 'border-l border-accent pl-5 md:pl-7'
  }[variant];
  const alignment = align === 'center' && variant === 'default' ? 'mx-auto text-center' : '';
  const titleClass =
    variant === 'legacy'
      ? 'font-heading text-[clamp(34px,5vw,64px)] font-semibold leading-none text-primary'
      : variant === 'news'
        ? 'font-heading text-[clamp(36px,5.8vw,68px)] font-bold leading-none text-primary'
        : 'font-heading text-h1 font-semibold text-primary';

  return (
    <div className={`max-w-3xl space-y-5 ${alignment} ${variantClass}`}>
      <p className="font-body text-eyebrow font-medium uppercase tracking-[0.22em] text-subtext">
        {eyebrow}
      </p>
      <h2 className={titleClass}>{title}</h2>
      {children ? <div className="font-body text-body text-text">{children}</div> : null}
    </div>
  );
}
