'use client';

import Image from 'next/image';
import {AnimatePresence, motion, useScroll, useSpring, useTransform, type MotionValue} from 'framer-motion';
import {useRef, useState} from 'react';

import {PlaceholderImg} from '@/components/placeholder-img';
import type {Locale} from '@/i18n/routing';

type ChronicleMilestone = {
  year: string;
  kicker: string;
  title: string;
  body: string;
  image: string;
  first?: boolean;
};

type ChronicleTimelineProps = {
  items: ChronicleMilestone[];
  locale: Locale;
};

const labels = {
  ko: {
    open: '이 해의 의미 보기',
    close: '접기',
    title: 'ARCHIVE NOTE',
    next: '다음 기록은 시간축을 따라 이어집니다.',
    previousYear: '이전 연도',
    nextYear: '다음 연도'
  },
  en: {
    open: 'Open archive note',
    close: 'Close',
    title: 'ARCHIVE NOTE',
    next: 'The next record continues along the timeline.',
    previousYear: 'Previous year',
    nextYear: 'Next year'
  }
};

const detailImages = ['chronicle_detail_01.png', 'chronicle_detail_02.png', 'chronicle_detail_03.png'];

export function ChronicleTimeline({items, locale}: ChronicleTimelineProps) {
  const timelineRef = useRef<HTMLElement>(null);
  const {scrollYProgress} = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.2']
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={timelineRef} className="relative overflow-hidden bg-bg py-section">
      <div className="absolute bottom-0 left-[30px] top-0 w-px bg-primary/18 md:hidden" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-section top-section hidden w-20 -translate-x-1/2 md:left-[43%] md:block" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 1 100" preserveAspectRatio="none">
          <path d="M 0.5 0 L 0.5 100" stroke="rgba(16,29,48,.16)" strokeWidth="0.04" fill="none" />
          <motion.path
            d="M 0.5 0 L 0.5 100"
            stroke="var(--primary)"
            strokeWidth="0.06"
            strokeLinecap="round"
            fill="none"
            style={{pathLength: smoothProgress}}
          />
        </svg>
      </div>

      <div className="mx-auto max-w-[1440px] space-y-16 px-container md:space-y-24">
        {items.map((item, index) => (
          <MilestoneEntry
            key={`${item.year}-${item.title}`}
            item={item}
            index={index}
            total={items.length}
            progress={smoothProgress}
            locale={locale}
            previousYear={items[index - 1]?.year}
            nextYear={items[index + 1]?.year}
            detailImage={detailImages[index % detailImages.length]}
          />
        ))}
      </div>
    </section>
  );
}

function MilestoneEntry({
  item,
  index,
  total,
  progress,
  locale,
  previousYear,
  nextYear,
  detailImage
}: {
  item: ChronicleMilestone;
  index: number;
  total: number;
  progress: MotionValue<number>;
  locale: Locale;
  previousYear?: string;
  nextYear?: string;
  detailImage: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLeft = index % 2 === 1;
  const text = labels[locale];
  const panelId = `chronicle-note-${index}`;
  const t = total === 1 ? 1 : index / (total - 1);
  const nodeScale = useTransform(progress, [Math.max(0, t - 0.035), t], [0.45, 1]);
  const nodeOpacity = useTransform(progress, [Math.max(0, t - 0.04), t], [0.25, 1]);
  const nodeFlash = useTransform(
    progress,
    [Math.max(0, t - 0.035), t, Math.min(1, t + 0.055)],
    ['rgba(122,34,48,0)', 'rgba(122,34,48,1)', 'rgba(122,34,48,0)']
  );

  return (
    <article className="relative grid gap-5 pl-16 md:grid-cols-[minmax(0,1fr)_80px_minmax(0,1.15fr)] md:items-center md:gap-0 md:pl-0">
      <div className={isLeft ? 'md:col-start-1 md:pr-8' : 'md:col-start-3 md:pl-8'}>
        <motion.div
          initial={{opacity: 0, x: isLeft ? -40 : 40}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true, amount: 0.28}}
          transition={{duration: 0.85, ease: [0.16, 1, 0.3, 1]}}
          className="bg-white p-4 shadow-[0_24px_80px_rgba(16,29,48,0.08)] md:p-5"
        >
          <motion.div
            initial={{filter: 'saturate(.65) brightness(.9)', opacity: 0.72}}
            whileInView={{filter: 'saturate(1) brightness(1)', opacity: 1}}
            viewport={{once: true, amount: 0.32}}
            transition={{duration: 1, ease: [0.16, 1, 0.3, 1]}}
            className="hover-zoom"
          >
            <div className="hover-zoom-media">
              <TimelineImage filename={item.image} alt={item.title} />
            </div>
          </motion.div>
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {item.first ? <FirstBadge /> : null}
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-subtext">
                {item.kicker}
              </span>
            </div>
            <h3 className="font-heading text-[clamp(28px,3vw,42px)] font-semibold leading-tight text-primary">
              {item.title}
            </h3>
            <p className="font-body text-[15px] leading-7 text-text">{item.body}</p>
            <button
              type="button"
              aria-expanded={isExpanded}
              aria-controls={panelId}
              onClick={() => setIsExpanded((value) => !value)}
              className="link-sweep font-body text-sm font-semibold uppercase tracking-[0.12em]"
            >
              {isExpanded ? text.close : text.open}
            </button>
            <AnimatePresence>
              {isExpanded ? (
                <motion.div
                  id={panelId}
                  initial={{opacity: 0, height: 0}}
                  animate={{opacity: 1, height: 'auto'}}
                  exit={{opacity: 0, height: 0}}
                  transition={{duration: 0.32, ease: [0.16, 1, 0.3, 1]}}
                  className="overflow-hidden"
                >
                  <div className="mt-2 border-l-2 border-accent bg-bg px-4 py-4">
                    <div className="grid gap-5 md:grid-cols-[0.92fr_1.08fr] md:items-start">
                      <TimelineImage filename={detailImage} alt={`${item.title} ${text.title}`} />
                      <div>
                        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                          {text.title} · {item.year}
                        </p>
                        <p className="mt-3 font-body text-[15px] leading-7 text-text">{item.body}</p>
                        <p className="mt-3 font-body text-[13px] leading-6 text-subtext">{text.next}</p>
                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-hairline pt-4 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-subtext">
                          {previousYear ? (
                            <span>
                              ← {text.previousYear} {previousYear}
                            </span>
                          ) : null}
                          {nextYear ? (
                            <span>
                              {text.nextYear} {nextYear} →
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div className="absolute left-0 top-2 flex items-start md:static md:col-start-2 md:row-start-1 md:flex-col md:items-center md:justify-center">
        <motion.span
          style={{scale: nodeScale, opacity: nodeOpacity, boxShadow: nodeFlash}}
          className="relative z-10 mt-2 h-4 w-4 rounded-full border-2 border-accent bg-bg md:mt-0 md:h-5 md:w-5"
          aria-hidden="true"
        />
      </div>

      <motion.div
        initial={{opacity: 0.3, y: 12, filter: 'blur(8px)'}}
        whileInView={{opacity: 1, y: 0, filter: 'blur(0px)'}}
        viewport={{once: true, amount: 0.5}}
        transition={{duration: 0.7, ease: [0.16, 1, 0.3, 1]}}
        className={`font-numeric text-[clamp(46px,6vw,88px)] font-semibold leading-none text-primary md:row-start-1 ${
          isLeft
            ? 'md:col-start-3 md:pl-8 md:text-left'
            : 'md:col-start-1 md:pr-8 md:text-right'
        }`}
      >
        {item.year}
      </motion.div>
    </article>
  );
}

function FirstBadge() {
  return (
    <motion.span
      initial={{scale: 0.8, opacity: 0}}
      whileInView={{scale: [0.8, 1.05, 1], opacity: 1}}
      viewport={{once: true, amount: 0.6}}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
      className="inline-flex bg-accent px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-on-navy"
    >
      FIRST
    </motion.span>
  );
}

function TimelineImage({filename, alt}: {filename: string; alt: string}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <PlaceholderImg filename={filename} aspect="aspect-[3/2]" />;
  }

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden bg-white">
      <Image
        src={`/images/${filename}`}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 520px, 100vw"
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
