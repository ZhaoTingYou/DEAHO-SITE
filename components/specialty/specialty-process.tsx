'use client';

import Image from 'next/image';
import {useRef, useState} from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue
} from 'framer-motion';

import {usePrefersReducedMotion} from '@/components/motion/reduced-motion-provider';

export type SpecialtyProcessStep = {
  number: string;
  label: string;
  title: string;
  body: string;
  image: string;
  hasImage: boolean;
};

type SpecialtyProcessProps = {
  steps: SpecialtyProcessStep[];
};

const transition = {duration: 0.55, ease: [0.16, 1, 0.3, 1]} as const;

export function SpecialtyProcess({steps}: SpecialtyProcessProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <>
      <MobileProcess steps={steps} />
      {prefersReducedMotion ? (
        <section className="hidden bg-white py-section md:block">
          <div className="mx-auto grid max-w-[1180px] gap-8 px-container lg:grid-cols-2">
            {steps.map((step) => (
              <ProcessCard key={step.number} step={step} />
            ))}
          </div>
        </section>
      ) : (
        <PinnedProcess steps={steps} />
      )}
    </>
  );
}

function PinnedProcess({steps}: SpecialtyProcessProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 22,
    mass: 0.28
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextIndex = Math.min(
      steps.length - 1,
      Math.max(0, Math.round(latest * (steps.length - 1)))
    );

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <section ref={containerRef} className="relative hidden h-[760vh] bg-bg md:block">
      <div className="sticky top-0 flex min-h-dvh items-center overflow-hidden bg-white pt-28">
        <div
          className="pointer-events-none absolute inset-y-0 left-[36%] w-px bg-primary/10"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-[0.8fr_1.22fr_0.88fr] items-center gap-12 px-container py-12">
          <aside className="space-y-10">
            <div className="space-y-4">
              <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.26em] text-subtext">
                PROCESS ANATOMY
              </p>
              <motion.p
                key={steps[activeIndex]?.number}
                initial={{opacity: 0, y: 14}}
                animate={{opacity: 1, y: 0}}
                transition={transition}
                className="font-heading text-[clamp(30px,3.4vw,48px)] font-semibold leading-none text-primary"
              >
                {steps[activeIndex]?.number}
              </motion.p>
            </div>

            <div className="space-y-3" aria-label="Specialty process steps">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="grid grid-cols-[40px_1fr] items-center gap-4"
                  aria-current={index === activeIndex ? 'step' : undefined}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center border font-numeric text-[11px] font-semibold transition duration-300 ${
                      index === activeIndex
                        ? 'border-accent bg-accent text-white'
                        : 'border-hairline bg-white text-subtext'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`font-body text-[12px] font-semibold uppercase tracking-[0.16em] transition duration-300 ${
                      index === activeIndex ? 'text-primary' : 'text-subtext'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </aside>

          <div className="relative aspect-[3/2] overflow-hidden bg-bg shadow-[0_34px_110px_rgba(16,29,48,0.10)]">
            <div
              className="pointer-events-none absolute inset-6 z-20 border border-white/70"
              aria-hidden="true"
            />
            {steps.map((step, index) => (
              <ProcessVisualLayer
                key={step.number}
                step={step}
                index={index}
                count={steps.length}
                progress={progress}
              />
            ))}
          </div>

          <div className="relative min-h-[360px]">
            {steps.map((step, index) => (
              <ProcessCopyLayer
                key={step.number}
                step={step}
                index={index}
                count={steps.length}
                progress={progress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessVisualLayer({
  step,
  index,
  count,
  progress
}: {
  step: SpecialtyProcessStep;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const center = count === 1 ? 0 : index / (count - 1);
  const width = 1 / Math.max(1, count - 1);
  const opacity = useTransform(progress, [center - width, center, center + width], [0, 1, 0]);
  const scale = useTransform(progress, [center - width, center, center + width], [1.04, 1, 1.04]);

  return (
    <motion.div className="absolute inset-0" style={{opacity, scale}}>
      <ProcessImage step={step} />
    </motion.div>
  );
}

function ProcessCopyLayer({
  step,
  index,
  count,
  progress
}: {
  step: SpecialtyProcessStep;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const center = count === 1 ? 0 : index / (count - 1);
  const width = 1 / Math.max(1, count - 1);
  const opacity = useTransform(progress, [center - width * 0.72, center, center + width * 0.72], [0, 1, 0]);
  const y = useTransform(progress, [center - width, center, center + width], [32, 0, -32]);

  return (
    <motion.article className="absolute inset-0 flex flex-col justify-center" style={{opacity, y}}>
      <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.26em] text-accent">
        {step.number} / {step.label}
      </p>
      <h2 className="mt-5 font-heading text-[clamp(22px,2.4vw,32px)] font-semibold leading-[1.2] text-primary">
        {step.title}
      </h2>
      <p className="mt-6 max-w-md font-body text-[14px] leading-7 text-text">{step.body}</p>
    </motion.article>
  );
}

function MobileProcess({steps}: SpecialtyProcessProps) {
  return (
    <section className="bg-white py-section md:hidden">
      <div className="mx-auto space-y-7 px-container">
        {steps.map((step) => (
          <ProcessCard key={step.number} step={step} />
        ))}
      </div>
    </section>
  );
}

function ProcessCard({step}: {step: SpecialtyProcessStep}) {
  return (
    <article className="bg-bg p-3 shadow-[0_14px_50px_rgba(16,29,48,0.05)]">
      <ProcessImage step={step} />
      <div className="space-y-3.5 px-2 py-7">
        <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.26em] text-accent">
          {step.number} / {step.label}
        </p>
        <h2 className="font-heading text-[clamp(20px,5.5vw,26px)] font-semibold leading-snug text-primary">
          {step.title}
        </h2>
        <p className="font-body text-[13px] leading-6 text-text">{step.body}</p>
      </div>
    </article>
  );
}

function ProcessImage({step}: {step: SpecialtyProcessStep}) {
  if (!step.hasImage) {
    return (
      <div
        className="flex aspect-[3/2] w-full items-center justify-center break-all border border-hairline bg-white p-5 text-center font-body text-xs font-medium leading-5 tracking-[0.04em] text-subtext"
        role="img"
        aria-label={step.image}
      >
        {step.image}
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden bg-white">
      <Image
        src={`/images/${step.image}`}
        alt={`${step.number} ${step.title}`}
        fill
        sizes="(min-width: 1024px) 760px, 100vw"
        className="object-cover"
      />
    </div>
  );
}
