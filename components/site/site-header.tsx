'use client';

import {AnimatePresence, motion} from 'framer-motion';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useMemo, useState} from 'react';

import {externalLinks} from '@/lib/config';
import {isActivePath, navItems, withLocale} from '@/lib/site-map';
import type {Locale} from '@/i18n/routing';

import {ExternalSiteLink} from './external-site-link';

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({locale}: SiteHeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    LEGACY: false,
    SPECIALTY: false
  });

  const relativePath = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean);

    if (parts[0] === 'ko' || parts[0] === 'en') {
      return `/${parts.slice(1).join('/')}`;
    }

    return pathname || '/';
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24;
      setIsScrolled((current) => (current === next ? current : next));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const nextLocale = locale === 'ko' ? 'en' : 'ko';
  const currentLocaleLabel = locale.toUpperCase();
  const nextLocalePath = withLocale(nextLocale, relativePath === '/' ? '/' : relativePath);
  const koLocalePath = withLocale('ko', relativePath === '/' ? '/' : relativePath);
  const enLocalePath = withLocale('en', relativePath === '/' ? '/' : relativePath);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-500 ease-brand ${
        isScrolled || isMenuOpen ? 'border-b border-hairline bg-bg/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-x-10 px-container">
        <div className="hidden items-center gap-4 md:flex">
          <Link href={koLocalePath} className={`site-nav-link ${locale === 'ko' ? 'is-active' : ''}`}>
            KO
          </Link>
          <span className="h-3 w-px bg-hairline" aria-hidden="true" />
          <Link href={enLocalePath} className={`site-nav-link ${locale === 'en' ? 'is-active' : ''}`}>
            EN
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="relative h-4 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-px w-6 bg-primary transition duration-300 ${
                isMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-px w-6 bg-primary transition duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-px w-6 bg-primary transition duration-300 ${
                isMenuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </span>
        </button>

        <Link
          href={withLocale(locale, '/')}
          className="font-heading text-[28px] font-semibold tracking-normal text-primary"
        >
          DAEHO
        </Link>

        <div className="flex items-center justify-end gap-5 lg:pl-8">
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={withLocale(locale, item.href)}
                className={`site-nav-link ${isActivePath(relativePath, item.href) ? 'is-active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <ExternalSiteLink label="OH" href={externalLinks.oh} className="site-nav-link no-underline" />
            <ExternalSiteLink
              label="VULCAN"
              href={externalLinks.vulcan}
              className="site-nav-link no-underline"
            />
          </div>

          <Link
            href={nextLocalePath}
            className="inline-flex min-h-11 items-center font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-primary md:hidden"
          >
            {currentLocaleLabel}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{opacity: 0, y: -16}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -16}}
            transition={{duration: 0.3, ease: [0.22, 0.61, 0.36, 1]}}
            className="fixed inset-x-0 top-20 h-[calc(100dvh-80px)] overflow-y-auto bg-bg px-container py-10 md:hidden"
          >
            <motion.nav
              aria-label="Mobile navigation"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {transition: {staggerChildren: 0.06}}
              }}
              className="space-y-4"
            >
              {navItems.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const isExpanded = expanded[item.label];

                return (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: {opacity: 0, y: 16},
                      visible: {opacity: 1, y: 0}
                    }}
                    className="border-b border-hairline pb-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <Link
                        href={withLocale(locale, item.href)}
                        onClick={() => setIsMenuOpen(false)}
                        className={`font-heading text-[clamp(32px,10vw,52px)] font-semibold text-primary ${
                          isActivePath(relativePath, item.href) ? 'text-accent' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                      {hasChildren ? (
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
                          className="flex h-11 w-11 items-center justify-center border border-hairline bg-white text-2xl text-primary"
                          onClick={() =>
                            setExpanded((current) => ({
                              ...current,
                              [item.label]: !current[item.label]
                            }))
                          }
                        >
                          <span aria-hidden="true">{isExpanded ? '-' : '+'}</span>
                        </button>
                      ) : null}
                    </div>

                    {hasChildren && isExpanded ? (
                      <div className="mt-4 grid gap-3 pl-1">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={withLocale(locale, child.href)}
                            onClick={() => setIsMenuOpen(false)}
                            className="font-body text-sm font-semibold uppercase tracking-[0.14em] text-subtext"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                );
              })}
            </motion.nav>

            <div className="mt-12 border-t border-hairline pt-8">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-subtext">
                Other sites
              </p>
              <div className="mt-5 flex items-center gap-6">
                <Link href={koLocalePath} onClick={() => setIsMenuOpen(false)} className="site-nav-link">
                  KO
                </Link>
                <Link href={enLocalePath} onClick={() => setIsMenuOpen(false)} className="site-nav-link">
                  EN
                </Link>
                <ExternalSiteLink label="OH" href={externalLinks.oh} className="site-nav-link no-underline" />
                <ExternalSiteLink
                  label="VULCAN"
                  href={externalLinks.vulcan}
                  className="site-nav-link no-underline"
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
