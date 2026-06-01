import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';

import {SafeImage} from '@/components/safe-image';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations('home');

  return (
    <main className="min-h-screen bg-bg">
      <section className="mx-auto grid min-h-screen w-full max-w-[1440px] items-center gap-12 px-container py-section lg:grid-cols-[1fr_minmax(360px,520px)]">
        <div className="space-y-8">
          <p className="font-body text-eyebrow font-medium uppercase tracking-[0.22em] text-subtext">
            {t('eyebrow')}
          </p>
          <h1 className="max-w-5xl font-heading text-hero font-bold leading-none tracking-[-0.01em] text-primary">
            {t('title')}
          </h1>
          <p className="max-w-2xl font-body text-body text-text">{t('subtitle')}</p>
        </div>
        <SafeImage filename={t('image')} alt={t('subtitle')} aspect="aspect-square" priority />
      </section>
    </main>
  );
}
