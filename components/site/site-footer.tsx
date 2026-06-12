import Link from 'next/link';

import type {Locale} from '@/i18n/routing';
import {externalLinks} from '@/lib/config';
import {getLocaleMessages} from '@/lib/locale-messages';
import {navItems, withLocale} from '@/lib/site-map';

import {ExternalSiteLink} from './external-site-link';

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({locale}: SiteFooterProps) {
  const text = getLocaleMessages(locale).common;
  const navLabels = text.navigation.items;
  const externalLabels = text.footer.externalSites;

  return (
    <footer className="border-t border-hairline bg-bg px-container py-14 text-primary">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-[1fr_2fr]">
        <div className="space-y-4">
          <Link href={withLocale(locale, '/')} className="font-heading text-3xl font-semibold text-primary">
            DAEHO
          </Link>
          <p className="max-w-sm font-body text-sm leading-6 text-subtext">
            {text.footer.tagline}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="footer-label">{text.footer.navigation}</p>
            <div className="mt-4 grid gap-3">
              {navItems.map((item) => (
                <Link key={item.href} href={withLocale(locale, item.href)} className="footer-link">
                  {navLabels[item.id as keyof typeof navLabels]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="footer-label">{text.footer.otherSites}</p>
            <div className="mt-4 grid gap-3">
              <ExternalSiteLink label={externalLabels.daeho} href={externalLinks.daeho} className="footer-link" />
              <ExternalSiteLink label={externalLabels.oh} href={externalLinks.oh} className="footer-link" />
              <ExternalSiteLink label={externalLabels.vulcan} href={externalLinks.vulcan} className="footer-link" />
            </div>
          </div>

          <div>
            <p className="footer-label">{text.footer.locale}</p>
            <div className="mt-4 flex gap-4">
              <Link href={withLocale('ko', '/')} className="footer-link">
                KO
              </Link>
              <Link href={withLocale('en', '/')} className="footer-link">
                EN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
