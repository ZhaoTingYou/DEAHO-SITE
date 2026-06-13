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
    <div className="grid gap-8 md:grid-cols-3 md:gap-10">
      {items.map((item, index) => {
        const rotation = index % 2 === 0 ? -1.5 : 1.5;

        return (
          <motion.article
            key={item.image}
            className="bg-white p-3 shadow-[0_14px_50px_rgba(16,29,48,0.05)]"
            initial={prefersReducedMotion ? {opacity: 1} : {opacity: 0, scale: 1.1, rotate: rotation}}
            whileInView={{opacity: 1, scale: 1, rotate: 0}}
            viewport={{once: true, amount: 0.35}}
            transition={{duration: prefersReducedMotion ? 0.18 : 0.8, ease: [0.16, 1, 0.3, 1]}}
          >
            <DetailImage item={item} />
            <div className="space-y-3 px-2 pb-5 pt-6">
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.26em] text-subtext">
                {item.number ?? String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="font-heading text-[clamp(17px,1.5vw,21px)] font-semibold leading-snug text-primary">
                {item.title}
              </h3>
              {item.body ? (
                <p className="font-body text-[13px] leading-6 text-text">{item.body}</p>
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
