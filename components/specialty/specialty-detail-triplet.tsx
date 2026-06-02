'use client';

import Image from 'next/image';
import {motion} from 'framer-motion';

import {usePrefersReducedMotion} from '@/components/motion/reduced-motion-provider';

export type SpecialtyDetailItem = {
  number?: string;
  title: string;
  body?: string;
  image: string;
  hasImage: boolean;
};

type SpecialtyDetailTripletProps = {
  items: SpecialtyDetailItem[];
};

export function SpecialtyDetailTriplet({items}: SpecialtyDetailTripletProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item, index) => {
        const rotation = index % 2 === 0 ? -1.5 : 1.5;

        return (
          <motion.article
            key={item.image}
            className="bg-white p-4 shadow-[0_18px_62px_rgba(16,29,48,0.06)]"
            initial={prefersReducedMotion ? {opacity: 1} : {opacity: 0, scale: 1.1, rotate: rotation}}
            whileInView={{opacity: 1, scale: 1, rotate: 0}}
            viewport={{once: true, amount: 0.35}}
            transition={{duration: prefersReducedMotion ? 0.18 : 0.8, ease: [0.16, 1, 0.3, 1]}}
          >
            <div className="relative overflow-hidden">
              <DetailImage item={item} />
              <span
                className="pointer-events-none absolute -left-4 bottom-0 font-heading text-[clamp(86px,12vw,132px)] font-semibold leading-none text-primary/[0.08]"
                aria-hidden="true"
              >
                {item.number ?? '00'}
              </span>
            </div>
            <div className="space-y-3 px-1 py-5">
              <h3 className="font-heading text-[clamp(30px,4vw,44px)] font-semibold leading-tight text-primary">
                {item.title}
              </h3>
              {item.body ? (
                <p className="font-body text-[15px] leading-7 text-text">{item.body}</p>
              ) : null}
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

function DetailImage({item}: {item: SpecialtyDetailItem}) {
  if (!item.hasImage) {
    return (
      <div
        className="flex aspect-square w-full items-center justify-center break-all border border-hairline bg-bg p-4 text-center font-body text-[10px] font-semibold leading-5 tracking-[0.04em] text-subtext"
        role="img"
        aria-label={item.image}
      >
        {item.image}
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-bg">
      <Image
        src={`/images/${item.image}`}
        alt={item.title}
        fill
        sizes="(min-width: 1024px) 420px, 100vw"
        className="object-cover"
      />
    </div>
  );
}
