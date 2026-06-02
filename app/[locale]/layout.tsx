import type {Metadata} from 'next';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import '@/app/globals.css';
import {LenisProvider} from '@/components/motion/lenis-provider';
import {ReducedMotionProvider} from '@/components/motion/reduced-motion-provider';
import {routing, type Locale} from '@/i18n/routing';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Omit<Props, 'children'>): Promise<Metadata> {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'metadata'});

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/favicon.svg'
    }
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const localeClass = locale === 'ko' ? 'locale-ko' : 'locale-en';

  return (
    <html lang={locale} className={localeClass}>
      <body className="bg-bg text-text font-body">
        <NextIntlClientProvider messages={messages} locale={locale as Locale}>
          <ReducedMotionProvider>
            <LenisProvider>{children}</LenisProvider>
          </ReducedMotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
