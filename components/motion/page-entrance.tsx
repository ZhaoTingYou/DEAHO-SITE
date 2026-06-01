'use client';

import {motion, type Variants} from 'framer-motion';

import {usePrefersReducedMotion} from './reduced-motion-provider';

const pageVariants: Variants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

const childVariants: Variants = {
  hidden: {opacity: 0, y: 40},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 1.2, ease: [0.16, 1, 0.3, 1]}
  }
};

const instantVariants: Variants = {
  hidden: {opacity: 0, y: 0},
  visible: {opacity: 1, y: 0, transition: {duration: 0.18}}
};

export function PageEntrance({children}: {children: React.ReactNode}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={prefersReducedMotion ? instantVariants : pageVariants}
    >
      {children}
    </motion.div>
  );
}

export function PageEntranceItem({children, className}: {children: React.ReactNode; className?: string}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div className={className} variants={prefersReducedMotion ? instantVariants : childVariants}>
      {children}
    </motion.div>
  );
}
