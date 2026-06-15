'use client';

import {type ElementType, useRef} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';

import {usePrefersReducedMotion} from './reduced-motion-provider';

type ScrollTextProps = {
  children: React.ReactNode;
  className?: string;
  /** Element to render. Defaults to a div. */
  as?: 'div' | 'p' | 'h1' | 'h2' | 'section';
};

/**
 * Scroll-linked text reveal: opacity and vertical offset are driven by the
 * element's scroll position, so the text keeps moving while the page scrolls
 * (Patek hand-finishing style), rather than snapping in once. Respects reduced
 * motion.
 */
export function ScrollText({children, className, as = 'div'}: ScrollTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.42']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [44, 0]);

  const MotionTag = motion[as] as ElementType;

  return (
    <MotionTag ref={ref} style={{opacity, y}} className={className}>
      {children}
    </MotionTag>
  );
}
