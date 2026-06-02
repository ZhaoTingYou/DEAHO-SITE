'use client';

import {AnimatePresence, motion} from 'framer-motion';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useMemo, useRef, useState} from 'react';

import {usePrefersReducedMotion} from '@/components/motion/reduced-motion-provider';
import type {Locale} from '@/i18n/routing';
import {externalLinks} from '@/lib/config';
import {isActivePath, navItems, withLocale} from '@/lib/site-map';

import {ExternalSiteLink} from './external-site-link';

type SiteHeaderProps = {
  locale: Locale;
};

type MegaMenuKey = 'LEGACY' | 'SPECIALTY';

const megaMenuDetails: Record<
  MegaMenuKey,
  {
    eyebrow: string;
    title: string;
    motif: string;
    descriptions: Record<string, string>;
  }
> = {
  LEGACY: {
    eyebrow: 'MEMORIAL HALL',
    title: 'Trust made permanent',
    motif: '38 / 200,000+',
    descriptions: {
      LOYALTY: '신의 · 오래도록 함께한 신뢰',
      CREDIBILITY: '신뢰 · 숫자로 증명되는 믿음',
      ACHIEVEMENT: '성취 · 기록으로 남은 인정'
    }
  },
  SPECIALTY: {
    eyebrow: 'CRAFT ANATOMY',
    title: 'Seven steps of precision',
    motif: '01-07',
    descriptions: {
      TECHNIQUE: '공정 · 7단계의 정성',
      COLLECTION: '작품 · 완성된 결과물'
    }
  }
};

const navListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.12
    }
  }
};

const navItemVariants = {
  hidden: {opacity: 0, y: -8},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.36, ease: [0.16, 1, 0.3, 1]}
  }
};

const instantItemVariants = {
  hidden: {opacity: 1, y: 0},
  visible: {opacity: 1, y: 0}
};

export function SiteHeader({locale}: SiteHeaderProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(0);
  const scrollDeltaRef = useRef(0);
  const [atTop, setAtTop] = useState(true);
  const [overHomeHero, setOverHomeHero] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [hasHeaderFocus, setHasHeaderFocus] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MegaMenuKey | null>(null);
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

  const koLocalePath = withLocale('ko', relativePath === '/' ? '/' : relativePath);
  const enLocalePath = withLocale('en', relativePath === '/' ? '/' : relativePath);
  const isHome = relativePath === '/';
  const contactLabel = locale === 'ko' ? 'CONTACT · 문의' : 'CONTACT';

  const clearMegaCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMegaMenu = (key: MegaMenuKey) => {
    clearMegaCloseTimer();
    setOpenMenu(key);
  };

  const scheduleMegaClose = () => {
    clearMegaCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen((open) => {
      const nextOpen = !open;

      if (nextOpen) {
        setIsHidden(false);
        setOpenMenu(null);
      }

      return nextOpen;
    });
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nextAtTop = y < 8;
      const heroExitY = Math.max(360, window.innerHeight - 96);
      const nextOverHomeHero = isHome && y < heroExitY;
      const shouldKeepHeaderVisible =
        isMenuOpen || openMenu !== null || isHeaderHovered || hasHeaderFocus;

      setAtTop((current) => (current === nextAtTop ? current : nextAtTop));
      setOverHomeHero((current) =>
        current === nextOverHomeHero ? current : nextOverHomeHero
      );

      if (nextAtTop || shouldKeepHeaderVisible) {
        scrollDeltaRef.current = 0;
        setIsHidden(false);
      } else {
        const delta = y - lastScrollYRef.current;
        scrollDeltaRef.current += delta;

        if (Math.abs(scrollDeltaRef.current) >= 8) {
          if (scrollDeltaRef.current > 0 && y > 120) {
            setIsHidden(true);
            setOpenMenu(null);
          }

          if (scrollDeltaRef.current < 0) {
            setIsHidden(false);
          }

          scrollDeltaRef.current = 0;
        }
      }

      lastScrollYRef.current = y;
    };

    lastScrollYRef.current = window.scrollY;
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [hasHeaderFocus, isHeaderHovered, isHome, isMenuOpen, openMenu]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      clearMegaCloseTimer();
    };
  }, []);

  const currentMegaItem = openMenu ? navItems.find((item) => item.label === openMenu) : undefined;
  const currentMegaDetails = openMenu ? megaMenuDetails[openMenu] : null;
  const isHeaderInteractive = isHeaderHovered || hasHeaderFocus;
  const isHomeHeroTransparent =
    isHome &&
    (overHomeHero || atTop) &&
    !isMenuOpen &&
    openMenu === null &&
    !isHeaderInteractive;
  const isSolid = !isHomeHeroTransparent && (!atTop || isMenuOpen || openMenu !== null || isHeaderInteractive);
  const navVariants = prefersReducedMotion ? {hidden: {}, visible: {}} : navListVariants;
  const itemVariants = prefersReducedMotion ? instantItemVariants : navItemVariants;

  return (
    <motion.header
      initial={false}
      animate={{y: isHidden ? '-100%' : '0%'}}
      transition={{
        duration: prefersReducedMotion ? 0 : isHidden ? 0.26 : 0.2,
        ease: [0.22, 0.61, 0.36, 1]
      }}
      onBlur={(event) => {
        const nextTarget = event.relatedTarget;

        if (nextTarget && event.currentTarget.contains(nextTarget as Node)) {
          return;
        }

        setHasHeaderFocus(false);
        scheduleMegaClose();
      }}
      onFocus={() => setHasHeaderFocus(true)}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => setIsHeaderHovered(false)}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter,color] duration-300 ease-brand ${
        isSolid
          ? 'border-b border-hairline bg-bg/95 text-primary shadow-[0_18px_60px_rgba(16,29,48,.08)] backdrop-blur-md [text-shadow:none]'
          : isHomeHeroTransparent
            ? 'border-b border-transparent bg-transparent text-white [text-shadow:0_1px_16px_rgba(16,29,48,.42)]'
            : 'border-b border-transparent bg-transparent text-primary [text-shadow:0_1px_16px_rgba(255,255,255,.72)]'
      }`}
    >
      <div className="hidden lg:block">
        <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between px-container">
          <Link
            href={withLocale(locale, '/')}
            className="inline-flex min-h-11 items-center font-heading text-[28px] font-semibold tracking-[0.18em]"
            aria-label="DAEHO home"
          >
            DAEHO
          </Link>

          <div className="flex items-center gap-5 font-body text-[12px] font-semibold uppercase tracking-[0.12em]">
            <div className="flex items-center gap-3" aria-label="Language switcher">
              <Link
                href={koLocalePath}
                className={`site-nav-link no-underline ${locale === 'ko' ? 'opacity-100' : 'opacity-60'}`}
                aria-current={locale === 'ko' ? 'page' : undefined}
              >
                KO
              </Link>
              <span className="opacity-40" aria-hidden="true">
                /
              </span>
              <Link
                href={enLocalePath}
                className={`site-nav-link no-underline ${locale === 'en' ? 'opacity-100' : 'opacity-60'}`}
                aria-current={locale === 'en' ? 'page' : undefined}
              >
                EN
              </Link>
            </div>

            <span className="h-3 w-px bg-current opacity-25" aria-hidden="true" />

            <div className="flex items-center gap-4">
              <ExternalSiteLink label="대호" href={externalLinks.daeho} className="site-nav-link no-underline" />
              <ExternalSiteLink label="OH" href={externalLinks.oh} className="site-nav-link no-underline" />
              <ExternalSiteLink label="VULCAN" href={externalLinks.vulcan} className="site-nav-link no-underline" />
            </div>

            <span className="h-3 w-px bg-current opacity-25" aria-hidden="true" />

            <Link
              href={withLocale(locale, '/contact')}
              className={`consult-cta ${isHomeHeroTransparent ? 'consult-cta--light' : 'consult-cta--accent'}`}
            >
              <span className="consult-cta__label">{contactLabel}</span>
              <span className="consult-cta__mark" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={`border-t transition-colors duration-300 ${isSolid ? 'border-hairline' : 'border-transparent'}`}>
          <div className="mx-auto flex h-14 max-w-[1440px] items-center px-container">
            <motion.nav
              aria-label="Primary navigation"
              initial="hidden"
              animate="visible"
              variants={navVariants}
              className="flex items-center gap-8"
            >
              {navItems.map((item) => {
                const megaKey = isMegaMenuKey(item.label) ? item.label : null;
                const hasMega = megaKey !== null;
                const active = isActivePath(relativePath, item.href);

                return (
                  <motion.div key={item.href} variants={itemVariants}>
                    <Link
                      href={withLocale(locale, item.href)}
                      className={`site-nav-link ${active ? 'is-active' : ''}`}
                      aria-current={active ? 'page' : undefined}
                      aria-haspopup={hasMega ? 'true' : undefined}
                      aria-expanded={hasMega ? openMenu === megaKey : undefined}
                      onMouseEnter={() => {
                        if (megaKey) {
                          openMegaMenu(megaKey);
                        }
                      }}
                      onMouseLeave={() => {
                        if (hasMega) {
                          scheduleMegaClose();
                        }
                      }}
                      onFocus={() => {
                        if (megaKey) {
                          openMegaMenu(megaKey);
                        }
                      }}
                      onClick={(event) => {
                        if (
                          megaKey &&
                          window.matchMedia('(hover: none)').matches &&
                          openMenu !== megaKey
                        ) {
                          event.preventDefault();
                          openMegaMenu(megaKey);
                          return;
                        }

                        setOpenMenu(null);
                      }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-container lg:hidden">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className="relative h-4 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-px w-6 bg-current transition duration-300 ${
                isMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-px w-6 bg-current transition duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-px w-6 bg-current transition duration-300 ${
                isMenuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </span>
        </button>

        <Link
          href={withLocale(locale, '/')}
          className="font-heading text-[28px] font-semibold tracking-[0.14em]"
          aria-label="DAEHO home"
        >
          DAEHO
        </Link>

        <div className="flex min-h-11 items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.12em]">
          <Link href={koLocalePath} className={locale === 'ko' ? 'opacity-100' : 'opacity-55'}>
            KO
          </Link>
          <span className="opacity-35" aria-hidden="true">
            /
          </span>
          <Link href={enLocalePath} className={locale === 'en' ? 'opacity-100' : 'opacity-55'}>
            EN
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {currentMegaItem && currentMegaDetails ? (
          <motion.div
            key={currentMegaItem.label}
            role="region"
            aria-label={`${currentMegaItem.label} submenu`}
            initial={prefersReducedMotion ? {opacity: 1, scaleY: 1} : {opacity: 0, scaleY: 0.96}}
            animate={{opacity: 1, scaleY: 1}}
            exit={prefersReducedMotion ? {opacity: 0, scaleY: 1} : {opacity: 0, scaleY: 0.98}}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.36,
              ease: [0.16, 1, 0.3, 1]
            }}
            onMouseEnter={clearMegaCloseTimer}
            onMouseLeave={scheduleMegaClose}
            className="absolute inset-x-0 top-full hidden origin-top overflow-hidden border-t border-hairline bg-bg text-primary shadow-[0_30px_90px_rgba(16,29,48,.12)] [text-shadow:none] lg:block"
          >
            <motion.div
              className="h-px origin-left bg-accent"
              initial={{scaleX: prefersReducedMotion ? 1 : 0}}
              animate={{scaleX: 1}}
              exit={{scaleX: prefersReducedMotion ? 1 : 0}}
              transition={{duration: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 0.61, 0.36, 1]}}
            />

            <div className="mx-auto grid max-w-[1440px] grid-cols-[0.8fr_1.7fr_0.7fr] gap-10 px-container py-9">
              <div>
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-subtext">
                  {currentMegaDetails.eyebrow}
                </p>
                <p className="mt-3 max-w-[16rem] font-heading text-[34px] font-semibold leading-none">
                  {currentMegaDetails.title}
                </p>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {transition: {staggerChildren: prefersReducedMotion ? 0 : 0.05}}
                }}
                className="grid gap-4"
              >
                {currentMegaItem.children?.map((child) => (
                  <motion.div
                    key={child.href}
                    variants={itemVariants}
                    className="border-b border-hairline last:border-b-0"
                  >
                    <Link
                      href={withLocale(locale, child.href)}
                      className="group grid min-h-16 gap-1 py-3"
                      onClick={() => setOpenMenu(null)}
                    >
                      <span className="font-body text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-300 group-hover:text-accent">
                        {child.label}
                      </span>
                      <span className="font-body text-sm leading-6 text-subtext">
                        {currentMegaDetails.descriptions[child.label]}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex items-center justify-end">
                <div className="grid h-28 w-36 place-items-center border border-hairline bg-white/80 px-5 text-right font-numeric text-[30px] font-semibold leading-none text-primary/35 shadow-[0_16px_45px_rgba(16,29,48,.08)]">
                  {currentMegaDetails.motif}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{opacity: 0, y: prefersReducedMotion ? 0 : -16}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: prefersReducedMotion ? 0 : -16}}
            transition={{duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 0.61, 0.36, 1]}}
            className="fixed inset-x-0 top-20 h-[calc(100dvh-80px)] overflow-y-auto bg-bg px-container py-10 text-primary [text-shadow:none] lg:hidden"
          >
            <motion.nav
              aria-label="Mobile navigation"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {transition: {staggerChildren: prefersReducedMotion ? 0 : 0.06}}
              }}
              className="space-y-4"
            >
              {navItems.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const isExpanded = expanded[item.label];
                const details = isMegaMenuKey(item.label) ? megaMenuDetails[item.label] : null;

                return (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    className="border-b border-hairline pb-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <Link
                        href={withLocale(locale, item.href)}
                        onClick={() => setIsMenuOpen(false)}
                        className={`font-heading text-[clamp(32px,10vw,52px)] font-semibold leading-tight ${
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
                            className="grid min-h-11 gap-1 font-body text-sm font-semibold uppercase tracking-[0.14em] text-subtext"
                          >
                            <span>{child.label}</span>
                            {details ? (
                              <span className="normal-case tracking-normal text-subtext/80">
                                {details.descriptions[child.label]}
                              </span>
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                );
              })}
            </motion.nav>

            <Link
              href={withLocale(locale, '/contact')}
              onClick={() => setIsMenuOpen(false)}
              className="consult-cta consult-cta--accent consult-cta--large mt-10 flex w-full"
            >
              <span className="consult-cta__label">{contactLabel}</span>
              <span className="consult-cta__mark" aria-hidden="true" />
            </Link>

            <div className="mt-12 border-t border-hairline pt-8">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-subtext">
                Other sites
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-primary">
                <ExternalSiteLink label="대호" href={externalLinks.daeho} className="site-nav-link no-underline" />
                <ExternalSiteLink label="OH" href={externalLinks.oh} className="site-nav-link no-underline" />
                <ExternalSiteLink label="VULCAN" href={externalLinks.vulcan} className="site-nav-link no-underline" />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function isMegaMenuKey(label: string): label is MegaMenuKey {
  return label === 'LEGACY' || label === 'SPECIALTY';
}
