'use client';

import {animate, motion, useInView} from 'framer-motion';
import {useEffect, useRef} from 'react';

import {usePrefersReducedMotion} from '@/components/motion/reduced-motion-provider';

export type LegacyMetricItem = {
  value: number;
  suffix?: string;
  label: string;
  pad?: number;
};

type LegacyMetricGridProps = {
  items: LegacyMetricItem[];
  locale: string;
  variant?: 'monument' | 'row' | 'compact';
  className?: string;
};

export function LegacyMetricGrid({
  items,
  locale,
  variant = 'row',
  className = ''
}: LegacyMetricGridProps) {
  const gridClass =
    variant === 'monument'
      ? 'grid min-h-[82dvh] place-items-center gap-10 py-section text-center md:grid-cols-3'
      : variant === 'compact'
        ? 'grid gap-5 sm:grid-cols-2'
        : 'grid gap-6 border-y border-hairline py-10 md:grid-cols-3';

  return (
    <div className={`${gridClass} ${className}`}>
      {items.map((item, index) => (
        <LegacyMetricCell
          key={`${item.label}-${item.value}-${index}`}
          item={item}
          locale={locale}
          variant={variant}
        />
      ))}
    </div>
  );
}

function LegacyMetricCell({
  item,
  locale,
  variant
}: {
  item: LegacyMetricItem;
  locale: string;
  variant: 'monument' | 'row' | 'compact';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const suffixRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.45});
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!inView || !valueRef.current) {
      return;
    }

    const valueNode = valueRef.current;
    const suffixNode = suffixRef.current;
    const formatter = new Intl.NumberFormat(locale);
    const formatValue = (value: number) => {
      const rounded = Math.round(value);

      if (item.pad) {
        return String(rounded).padStart(item.pad, '0');
      }

      return formatter.format(rounded);
    };

    if (prefersReducedMotion) {
      valueNode.textContent = formatValue(item.value);
      if (suffixNode) {
        suffixNode.style.opacity = '1';
        suffixNode.style.transform = 'translateY(0)';
      }
      return;
    }

    const controls = animate(0, item.value, {
      duration: 2,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (latest) => {
        valueNode.textContent = formatValue(latest);
      },
      onComplete: () => {
        if (suffixNode) {
          suffixNode.style.opacity = '1';
          suffixNode.style.transform = 'translateY(0)';
        }
      }
    });

    return () => controls.stop();
  }, [inView, item.pad, item.value, locale, prefersReducedMotion]);

  const valueClass =
    variant === 'monument'
      ? 'font-numeric text-[clamp(64px,11vw,180px)] font-semibold leading-none text-primary'
      : variant === 'compact'
        ? 'font-numeric text-[clamp(42px,7vw,76px)] font-semibold leading-none text-primary'
        : 'font-numeric text-stat font-semibold leading-none text-primary';

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {opacity: 1, y: 0} : {opacity: 0, y: 26}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1]}}
      className={variant === 'compact' ? 'border border-hairline bg-white p-7' : 'space-y-5'}
    >
      <div className={valueClass}>
        <span ref={valueRef}>0</span>
        {item.suffix ? (
          <span
            ref={suffixRef}
            className="inline-block opacity-0 transition duration-500 ease-expo [transform:translateY(10px)]"
          >
            {item.suffix}
          </span>
        ) : null}
      </div>
      <p className="mx-auto max-w-[16rem] font-body text-sm font-semibold uppercase tracking-[0.14em] text-subtext">
        {item.label}
      </p>
    </motion.div>
  );
}
