'use client';

import Lenis from 'lenis';
import {useEffect, type ReactNode} from 'react';

import {usePrefersReducedMotion} from './reduced-motion-provider';

export function LenisProvider({children}: {children: ReactNode}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isTouch) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      touchMultiplier: 1
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return children;
}
