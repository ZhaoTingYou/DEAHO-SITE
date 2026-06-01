type SectionIntroProps = {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  align?: 'left' | 'center';
};

export function SectionIntro({
  eyebrow,
  title,
  children,
  align = 'left'
}: SectionIntroProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`max-w-3xl space-y-5 ${alignment}`}>
      <p className="font-body text-eyebrow font-medium uppercase tracking-[0.22em] text-subtext">
        {eyebrow}
      </p>
      <h2 className="font-heading text-h1 font-semibold text-primary">{title}</h2>
      {children ? <div className="font-body text-body text-text">{children}</div> : null}
    </div>
  );
}
