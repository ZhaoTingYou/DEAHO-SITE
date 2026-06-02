'use client';

import {motion, type Variants} from 'framer-motion';

import {usePrefersReducedMotion} from '@/components/motion/reduced-motion-provider';

import {HeroMedia} from './hero-media';

type HomeHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  poster: string;
  videoSrc?: string;
  webmSrc?: string;
};

export function HomeHero({
  eyebrow,
  title,
  subtitle,
  poster,
  videoSrc,
  webmSrc
}: HomeHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const words = title.split(' ');
  const titleVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12
      }
    }
  };
  const wordVariants: Variants = {
    hidden: {opacity: 0, y: prefersReducedMotion ? 0 : 40},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.18 : 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  const copyVariants: Variants = {
    hidden: {opacity: 0, y: prefersReducedMotion ? 0 : 18},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.18 : 0.65,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg">
      <HeroMedia
        poster={poster}
        videoSrc={videoSrc}
        webmSrc={webmSrc}
        priority
        className="absolute inset-0 h-[110%] w-full"
      />
      <div className="home-hero-mask absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] items-end px-container pb-24 pt-32 md:pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          className="home-hero-copy max-w-5xl space-y-7 md:space-y-8"
        >
          <motion.p
            variants={copyVariants}
            className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-primary"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={titleVariants}
            className="font-heading text-hero font-bold leading-none tracking-normal text-primary"
          >
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block overflow-hidden">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                  {index < words.length - 1 ? '\u00A0' : ''}
                </motion.span>
              </span>
            ))}
          </motion.h1>
          <motion.p
            variants={copyVariants}
            className="max-w-2xl font-body text-body leading-[1.7] text-text"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
      <div
        className="home-scroll-hint absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
        aria-hidden="true"
      >
        <span>Scroll</span>
        <span className="h-10 w-px bg-primary/50" />
      </div>
    </section>
  );
}
