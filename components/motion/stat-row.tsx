'use client';

import {animate, useInView} from 'framer-motion';
import {useEffect, useRef} from 'react';

import {usePrefersReducedMotion} from './reduced-motion-provider';

export type StatItem = {
  value: number;
  suffix?: string;
  label: string;
};

type StatRowProps = {
  items: StatItem[];
  locale?: string;
};

export function StatRow({items, locale = 'ko'}: StatRowProps) {
  return (
    <div className="grid gap-6 border-y border-hairline py-10 md:grid-cols-3">
      {items.map((item) => (
        <StatCell key={`${item.value}-${item.label}`} item={item} locale={locale} />
      ))}
    </div>
  );
}

function StatCell({item, locale}: {item: StatItem; locale: string}) {
  const ref = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const unitRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.45});
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!inView || !valueRef.current) {
      return;
    }

    const formatter = new Intl.NumberFormat(locale);
    const valueNode = valueRef.current;
    const unitNode = unitRef.current;

    if (prefersReducedMotion) {
      valueNode.textContent = formatter.format(item.value);
      if (unitNode) {
        unitNode.style.opacity = '1';
        unitNode.style.transform = 'translateY(0)';
      }
      return;
    }

    const controls = animate(0, item.value, {
      duration: 2,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (latest) => {
        valueNode.textContent = formatter.format(Math.round(latest));
      },
      onComplete: () => {
        if (unitNode) {
          unitNode.style.opacity = '1';
          unitNode.style.transform = 'translateY(0)';
        }
      }
    });

    return () => {
      controls.stop();
    };
  }, [inView, item.value, locale, prefersReducedMotion]);

  return (
    <div ref={ref} className="space-y-4">
      <div className="font-numeric text-stat font-semibold text-primary">
        <span ref={valueRef}>0</span>
        {item.suffix ? (
          <span
            ref={unitRef}
            className="inline-block opacity-0 transition duration-500 ease-expo [transform:translateY(10px)]"
          >
            {item.suffix}
          </span>
        ) : null}
      </div>
      <p className="font-body text-sm font-medium uppercase tracking-[0.12em] text-subtext">
        {item.label}
      </p>
    </div>
  );
}
