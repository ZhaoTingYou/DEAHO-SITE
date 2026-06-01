import Link from 'next/link';

import type {Locale} from '@/i18n/routing';
import {externalLinks} from '@/lib/config';
import {navItems, withLocale} from '@/lib/site-map';

import {ExternalSiteLink} from './external-site-link';

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({locale}: SiteFooterProps) {
  return (
    <footer className="border-t border-hairline bg-bg px-container py-14">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-[1fr_2fr]">
        <div className="space-y-4">
          <Link href={withLocale(locale, '/')} className="font-heading text-4xl font-semibold text-primary">
            DAEHO
          </Link>
          <p className="max-w-sm font-body text-sm leading-6 text-subtext">
            승리의 순간을, 영원의 형태로.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="footer-label">Navigation</p>
            <div className="mt-4 grid gap-3">
              {navItems.map((item) => (
                <Link key={item.href} href={withLocale(locale, item.href)} className="footer-link">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="footer-label">Other sites</p>
            <div className="mt-4 grid gap-3">
              <ExternalSiteLink label="OH" href={externalLinks.oh} className="footer-link" />
              <ExternalSiteLink label="VULCAN" href={externalLinks.vulcan} className="footer-link" />
            </div>
          </div>

          <div>
            <p className="footer-label">Locale</p>
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
