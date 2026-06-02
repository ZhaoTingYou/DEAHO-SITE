'use client';

import {motion, type Variants} from 'framer-motion';

import {usePrefersReducedMotion} from '@/components/motion/reduced-motion-provider';

type LegacyLightSweepTextProps = {
  lines: string[];
  className?: string;
};

export function LegacyLightSweepText({lines, className = ''}: LegacyLightSweepTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const lineVariants: Variants = prefersReducedMotion
    ? {
        hidden: {opacity: 0, y: 18},
        visible: (index: number) => ({
          opacity: 1,
          y: 0,
          transition: {duration: 0.18, delay: index * 0.08}
        })
      }
    : {
        hidden: {opacity: 1, clipPath: 'inset(0 100% 0 0)'},
        visible: (index: number) => ({
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          transition: {duration: 1, delay: index * 0.6, ease: [0.16, 1, 0.3, 1]}
        })
      };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.45}}
      className={className}
    >
      {lines.map((line, index) => (
        <motion.p
          key={line}
          custom={index}
          variants={lineVariants}
          className="relative overflow-hidden"
        >
          <span className="relative z-10">{line}</span>
          {!prefersReducedMotion ? (
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 z-20 w-1/3 bg-gradient-to-r from-white/0 via-white/85 to-white/0"
              initial={{x: '-120%', opacity: 0}}
              whileInView={{
                x: '260%',
                opacity: [0, 0.72, 0]
              }}
              viewport={{once: true, amount: 0.45}}
              transition={{
                duration: 1.1,
                delay: index * 0.6 + 0.12,
                ease: [0.22, 0.61, 0.36, 1]
              }}
            />
          ) : null}
        </motion.p>
      ))}
    </motion.div>
  );
}
