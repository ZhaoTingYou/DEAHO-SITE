'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import {usePrefersReducedMotion} from '@/components/motion/reduced-motion-provider';
import {Reveal} from '@/components/motion/reveal';
import type {Locale} from '@/i18n/routing';

type GolfImageRef = {
  image: string;
};

export type GolfHeadOption = GolfImageRef & {
  id: string;
  label: string;
  kicker: string;
  caption: string;
};

export type GolfShaftOption = GolfImageRef & {
  id: string;
  label: string;
  caption: string;
};

export type GolfConfiguratorContent = {
  hero: {
    eyebrow: string;
    titleLines: string[];
    subtitle: string;
    image: string;
    specLabel: string;
  };
  statement: {
    titleLines: string[];
    body: string;
    image: string;
  };
  heads: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: GolfHeadOption[];
  };
  shafts: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: GolfShaftOption[];
  };
  engraving: {
    eyebrow: string;
    title: string;
    body: string;
    imagePrimary: string;
    imageDetail: string;
    specs: string[];
  };
  lifestyle: {
    eyebrow: string;
    title: string;
    body: string;
    imageBox: string;
    imageLifestyle: string;
    closing: string;
  };
  labels: {
    selectedHead: string;
    selectedShaft: string;
    headGroup: string;
    shaftGroup: string;
    inquiryCta: string;
  };
};

type GolfConfiguratorProps = {
  assets: Record<string, boolean>;
  content: GolfConfiguratorContent;
  locale: Locale;
};

export function GolfConfigurator({assets, content, locale}: GolfConfiguratorProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedHeadId, setSelectedHeadId] = useState(content.heads.items[0]?.id ?? '');
  const [selectedShaftId, setSelectedShaftId] = useState(content.shafts.items[0]?.id ?? '');

  const selectedHead = useMemo(
    () => content.heads.items.find((item) => item.id === selectedHeadId) ?? content.heads.items[0],
    [content.heads.items, selectedHeadId]
  );
  const selectedShaft = useMemo(
    () =>
      content.shafts.items.find((item) => item.id === selectedShaftId) ??
      content.shafts.items[0],
    [content.shafts.items, selectedShaftId]
  );
  const heroImage = selectedShaft?.image ?? content.hero.image;
  const heroAlt = `${selectedShaft?.label ?? content.hero.specLabel} ${content.hero.subtitle}`;
  const engravingSample = 'JUDY KIM 2026.05.03';
  const inquiryHref = `/${locale}/golf/inquiry?head=${selectedHead?.id ?? ''}&shaft=${selectedShaft?.id ?? ''}&engraving=${encodeURIComponent(engravingSample)}`;

  return (
    <main className="bg-bg text-text">
      <section className="relative min-h-dvh overflow-hidden bg-white pt-32">
        <div className="mx-auto grid min-h-[calc(100dvh-128px)] max-w-[1440px] gap-12 px-container pb-16 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
          <Reveal className="relative z-10 space-y-8">
            <div className="space-y-4">
              <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
                {content.hero.eyebrow}
              </p>
              <h1 className="font-heading text-[clamp(64px,11vw,150px)] font-semibold leading-[0.78] text-primary">
                {content.hero.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </div>
            <p className="max-w-xl font-body text-[18px] leading-8 text-text">
              {content.hero.subtitle}
            </p>
            <div className="grid max-w-lg grid-cols-2 border-y border-hairline py-4 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-subtext">
              <span>{content.labels.selectedHead}</span>
              <span className="text-right text-primary">{selectedHead?.label}</span>
              <span className="mt-3">{content.labels.selectedShaft}</span>
              <span className="mt-3 text-right text-primary">{selectedShaft?.label}</span>
            </div>
            <Link
              href={inquiryHref}
              className="consult-cta consult-cta--accent consult-cta--large w-fit"
            >
              <span className="consult-cta__label">{content.labels.inquiryCta}</span>
            </Link>
          </Reveal>

          <div className="relative min-h-[440px] lg:min-h-[650px]">
            <div className="golf-float-a absolute inset-x-0 top-4 overflow-hidden bg-white shadow-[0_32px_110px_rgba(16,29,48,0.08)]">
              <div className="relative aspect-[16/9] w-full">
                <GolfImage
                  filename={content.hero.image}
                  alt={content.hero.subtitle}
                  assets={assets}
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="golf-shadow absolute bottom-6 left-[12%] h-16 w-[72%] bg-primary/10 blur-2xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedShaft?.id ?? 'shaft'}
                initial={{opacity: 0, y: prefersReducedMotion ? 0 : 22, scale: 0.985}}
                animate={{opacity: 1, y: 0, scale: 1}}
                exit={{opacity: 0, y: prefersReducedMotion ? 0 : -12, scale: 0.985}}
                transition={{duration: prefersReducedMotion ? 0 : 0.42, ease: [0.16, 1, 0.3, 1]}}
                className="golf-float-b absolute bottom-0 right-0 w-[44%] min-w-[190px] bg-white p-3 shadow-[0_28px_86px_rgba(16,29,48,0.12)] md:w-[34%]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <GolfImage
                    filename={heroImage}
                    alt={heroAlt}
                    assets={assets}
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHead?.id ?? 'head'}
                initial={{opacity: 0, x: prefersReducedMotion ? 0 : -24}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: prefersReducedMotion ? 0 : 16}}
                transition={{duration: prefersReducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1]}}
                className="absolute bottom-8 left-0 w-[42%] min-w-[180px] border border-hairline bg-bg p-3 shadow-[0_20px_65px_rgba(16,29,48,0.09)] md:w-[30%]"
              >
                <div className="hover-zoom">
                  <div className="hover-zoom-media relative aspect-square w-full overflow-hidden bg-white">
                    <GolfImage
                      filename={selectedHead?.image ?? content.hero.image}
                      alt={selectedHead?.caption ?? content.hero.subtitle}
                      assets={assets}
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-bg py-section">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-container lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <Reveal className="space-y-8">
            <h2 className="font-heading text-[clamp(62px,9vw,128px)] font-semibold leading-[0.78] text-primary">
              {content.statement.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="max-w-xl font-body text-[19px] leading-9 text-text">
              {content.statement.body}
            </p>
          </Reveal>

          <motion.div
            initial={{opacity: 0, x: prefersReducedMotion ? 0 : 72}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true, amount: 0.35}}
            transition={{duration: prefersReducedMotion ? 0 : 0.82, ease: [0.16, 1, 0.3, 1]}}
            className="relative min-h-[420px]"
          >
            <div className="relative ml-auto aspect-[3/2] w-full overflow-hidden bg-white shadow-[0_30px_100px_rgba(16,29,48,0.09)] lg:w-[86%]">
              <GolfImage
                filename={content.statement.image}
                alt={content.statement.body}
                assets={assets}
                className="object-cover"
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`statement-${selectedHead?.id ?? 'head'}`}
                initial={{opacity: 0, y: prefersReducedMotion ? 0 : 26}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: prefersReducedMotion ? 0 : -14}}
                transition={{duration: prefersReducedMotion ? 0 : 0.38, ease: [0.16, 1, 0.3, 1]}}
                className="absolute bottom-0 left-0 w-[48%] border border-hairline bg-white p-3 shadow-[0_24px_72px_rgba(16,29,48,0.10)] md:w-[34%]"
              >
                <div className="relative aspect-square overflow-hidden">
                  <GolfImage
                    filename={selectedHead?.image ?? content.statement.image}
                    alt={selectedHead?.label ?? content.statement.body}
                    assets={assets}
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-section">
        <div className="mx-auto max-w-[1440px] space-y-12 px-container">
          <Reveal className="mx-auto max-w-3xl space-y-5 text-center">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
              {content.heads.eyebrow}
            </p>
            <h2 className="font-heading text-[clamp(42px,6vw,82px)] font-semibold leading-none text-primary">
              {content.heads.title}
            </h2>
            <p className="font-body text-[17px] leading-8 text-text">
              {content.heads.subtitle}
            </p>
          </Reveal>

          <div
            className="-mx-container grid auto-cols-[72%] grid-flow-col gap-4 overflow-x-auto px-container pb-3 [scroll-snap-type:x_mandatory] md:mx-0 md:grid-flow-row md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0"
            aria-label={content.labels.headGroup}
          >
            {content.heads.items.map((item, index) => {
              const isSelected = item.id === selectedHead?.id;

              return (
                <Reveal key={item.id} className="[scroll-snap-align:start]">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedHeadId(item.id)}
                    className={`group grid min-h-11 w-full cursor-pointer gap-5 bg-white p-3 text-left shadow-[0_18px_58px_rgba(16,29,48,0.06)] transition duration-hover ease-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                      isSelected
                        ? 'translate-y-1 border border-primary/55'
                        : 'border border-hairline hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_28px_86px_rgba(16,29,48,0.1)]'
                    }`}
                    style={{transitionDelay: `${Math.min(index * 35, 120)}ms`}}
                  >
                    <div className="hover-zoom">
                      <div className="hover-zoom-media relative aspect-square overflow-hidden bg-bg">
                        <GolfImage
                          filename={item.image}
                          alt={item.caption}
                          assets={assets}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <span className="grid gap-2 px-1 pb-2">
                      <span className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                        {item.kicker}
                      </span>
                      <span className="font-heading text-[30px] font-semibold leading-none text-primary">
                        {item.label}
                      </span>
                      <span className="font-body text-sm leading-6 text-subtext">
                        {item.caption}
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white pb-section">
        <div className="mx-auto max-w-[1440px] space-y-10 px-container">
          <Reveal className="grid gap-6 border-t border-primary/50 pt-12 lg:grid-cols-[0.58fr_1fr] lg:items-end">
            <div>
              <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
                {content.shafts.eyebrow}
              </p>
              <h2 className="mt-4 font-heading text-[clamp(42px,6vw,82px)] font-semibold leading-none text-primary">
                {content.shafts.title}
              </h2>
            </div>
            <p className="max-w-2xl font-body text-[17px] leading-8 text-text lg:justify-self-end">
              {content.shafts.subtitle}
            </p>
          </Reveal>

          <div
            className="-mx-container grid auto-cols-[70%] grid-flow-col gap-4 overflow-x-auto px-container pb-3 [scroll-snap-type:x_mandatory] md:mx-0 md:grid-flow-row md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0"
            aria-label={content.labels.shaftGroup}
          >
            {content.shafts.items.map((item) => {
              const isSelected = item.id === selectedShaft?.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedShaftId(item.id)}
                  className={`group min-h-11 cursor-pointer bg-white p-3 text-left shadow-[0_18px_58px_rgba(16,29,48,0.06)] transition duration-hover ease-brand [scroll-snap-align:start] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                    isSelected
                      ? 'translate-y-1 border border-primary/55'
                      : 'border border-hairline hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_28px_86px_rgba(16,29,48,0.1)]'
                  }`}
                >
                  <div className="hover-zoom">
                    <div className="hover-zoom-media relative aspect-[4/5] overflow-hidden bg-bg">
                      <GolfImage
                        filename={item.image}
                        alt={item.caption}
                        assets={assets}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 px-1 py-4">
                    <p className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
                      {item.label}
                    </p>
                    <p className="font-body text-sm leading-6 text-subtext">{item.caption}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-bg py-section">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-container lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <Reveal className="space-y-8">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
              {content.engraving.eyebrow}
            </p>
            <h2 className="font-heading text-[clamp(44px,7vw,96px)] font-semibold leading-none text-primary">
              {content.engraving.title}
            </h2>
            <p className="max-w-xl font-body text-[17px] leading-8 text-text">
              {content.engraving.body}
            </p>
            <div className="grid gap-5 pt-4">
              {content.engraving.specs.map((spec, index) => (
                <motion.div
                  key={spec}
                  initial={{opacity: 0}}
                  whileInView={{opacity: 1}}
                  viewport={{once: true, amount: 0.6}}
                  transition={{duration: prefersReducedMotion ? 0 : 0.38, delay: index * 0.08}}
                  className="grid grid-cols-[72px_1fr] items-center gap-4"
                >
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="relative font-body text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                    <motion.span
                      aria-hidden="true"
                      className="absolute -left-20 top-1/2 h-px w-16 origin-left bg-primary/50"
                      initial={{scaleX: 0}}
                      whileInView={{scaleX: 1}}
                      viewport={{once: true, amount: 0.6}}
                      transition={{duration: prefersReducedMotion ? 0 : 0.42, delay: index * 0.1}}
                    />
                    {spec}
                  </span>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <div className="relative min-h-[620px]">
            <motion.div
              initial={{opacity: 0, y: prefersReducedMotion ? 0 : -48}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.25}}
              transition={{duration: prefersReducedMotion ? 0 : 0.76, ease: [0.16, 1, 0.3, 1]}}
              className="absolute left-0 top-0 w-[58%] bg-white p-3 shadow-[0_30px_96px_rgba(16,29,48,0.1)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <GolfImage
                  filename={content.engraving.imagePrimary}
                  alt={content.engraving.title}
                  assets={assets}
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{opacity: 0, y: prefersReducedMotion ? 0 : 54}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.25}}
              transition={{duration: prefersReducedMotion ? 0 : 0.78, delay: 0.12, ease: [0.16, 1, 0.3, 1]}}
              className="absolute bottom-0 right-0 w-[66%] bg-white p-3 shadow-[0_34px_110px_rgba(16,29,48,0.12)]"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <GolfImage
                  filename={content.engraving.imageDetail}
                  alt={content.engraving.body}
                  assets={assets}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-section">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-container lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <Reveal className="grid gap-5 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div className="relative aspect-[4/3] overflow-hidden bg-bg shadow-[0_24px_86px_rgba(16,29,48,0.08)]">
              <div className="golf-ken-burns absolute inset-0">
                <GolfImage
                  filename={content.lifestyle.imageBox}
                  alt={content.lifestyle.title}
                  assets={assets}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-bg shadow-[0_24px_86px_rgba(16,29,48,0.08)]">
              <div className="golf-ken-burns absolute inset-0 [animation-delay:-4s]">
                <GolfImage
                  filename={content.lifestyle.imageLifestyle}
                  alt={content.lifestyle.body}
                  assets={assets}
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="space-y-8">
            <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
              {content.lifestyle.eyebrow}
            </p>
            <h2 className="font-heading text-[clamp(46px,7vw,92px)] font-semibold leading-none text-primary">
              {content.lifestyle.title}
            </h2>
            <p className="max-w-xl font-body text-[17px] leading-8 text-text">
              {content.lifestyle.body}
            </p>
            <div className="border-t border-primary/50 pt-8 font-heading text-[clamp(38px,5vw,72px)] font-semibold leading-tight text-primary">
              {content.lifestyle.closing}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function GolfImage({
  assets,
  alt,
  className,
  filename,
  priority = false
}: {
  assets: Record<string, boolean>;
  alt: string;
  className?: string;
  filename: string;
  priority?: boolean;
}) {
  if (!assets[filename]) {
    return (
      <div
        className="grid h-full min-h-44 w-full place-items-center break-all border border-hairline bg-bg p-5 text-center font-body text-xs font-semibold leading-5 tracking-[0.06em] text-subtext"
        role="img"
        aria-label={filename}
      >
        {filename}
      </div>
    );
  }

  return (
    <Image
      src={`/images/${filename}`}
      alt={alt}
      fill
      priority={priority}
      sizes="(min-width: 1280px) 760px, (min-width: 768px) 60vw, 100vw"
      className={className}
    />
  );
}
