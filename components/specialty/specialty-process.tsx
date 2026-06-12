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
          <div className="mx-auto grid max-w-[1440px] gap-6 px-container lg:grid-cols-2">
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
        <div
          className="pointer-events-none absolute right-container top-28 font-heading text-[clamp(110px,18vw,280px)] font-semibold leading-none text-primary/[0.035]"
          aria-hidden="true"
        >
          {steps[activeIndex]?.number}
        </div>

        <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-[0.8fr_1.22fr_0.88fr] items-center gap-10 px-container py-12">
          <aside className="space-y-10">
            <div className="space-y-4">
              <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-subtext">
                PROCESS ANATOMY
              </p>
              <motion.p
                key={steps[activeIndex]?.number}
                initial={{opacity: 0, y: 14}}
                animate={{opacity: 1, y: 0}}
                transition={transition}
                className="font-heading text-[clamp(48px,6.5vw,84px)] font-semibold leading-none text-primary"
              >
                {steps[activeIndex]?.number}
              </motion.p>
            </div>

            <div className="space-y-3" aria-label="Specialty process steps">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="grid grid-cols-[44px_1fr] items-center gap-4"
                  aria-current={index === activeIndex ? 'step' : undefined}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center border font-numeric text-xs font-semibold transition duration-300 ${
                      index === activeIndex
                        ? 'border-accent bg-accent text-white'
                        : 'border-hairline bg-white text-subtext'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`font-body text-sm font-semibold uppercase tracking-[0.14em] transition duration-300 ${
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
            <div
              className="pointer-events-none absolute -left-10 bottom-0 z-20 font-heading text-[clamp(150px,16vw,250px)] font-semibold leading-none text-primary/[0.08]"
              aria-hidden="true"
            >
              {steps[activeIndex]?.number}
            </div>
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
      <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-accent">
        {step.number} / {step.label}
      </p>
      <h2 className="mt-6 font-heading text-[clamp(30px,4vw,52px)] font-semibold leading-none text-primary">
        {step.title}
      </h2>
      <p className="mt-7 max-w-md font-body text-[15px] leading-7 text-text">{step.body}</p>
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
    <article className="bg-bg p-4 shadow-[0_18px_60px_rgba(16,29,48,0.07)]">
      <div className="relative overflow-hidden">
        <ProcessImage step={step} />
        <span
          className="pointer-events-none absolute -left-5 bottom-0 font-heading text-[clamp(96px,24vw,150px)] font-semibold leading-none text-primary/[0.08]"
          aria-hidden="true"
        >
          {step.number}
        </span>
      </div>
      <div className="space-y-4 px-1 py-6">
        <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-accent">
          {step.number} / {step.label}
        </p>
        <h2 className="font-heading text-[clamp(26px,8vw,38px)] font-semibold leading-tight text-primary">
          {step.title}
        </h2>
        <p className="font-body text-[14px] leading-7 text-text">{step.body}</p>
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
