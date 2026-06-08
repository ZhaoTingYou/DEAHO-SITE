'use client';

import Image from 'next/image';
import {type CSSProperties, useEffect, useMemo, useRef, useState} from 'react';

export type ChronicleHorizontalSlide = {
  year: string;
  label: string;
  title: string;
  desc: string;
  image: string;
};

type ChronicleHorizontalProps = {
  ariaLabel: string;
  introLabel: string;
  slides: ChronicleHorizontalSlide[];
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const scrollLockKeys = new Set([
  ' ',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'End',
  'Home',
  'PageDown',
  'PageUp'
]);

export function ChronicleHorizontal({ariaLabel, introLabel, slides}: ChronicleHorizontalProps) {
  const stageRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const lineProgressRef = useRef(0);
  const controlsVisibleRef = useRef(false);
  const yearResetRef = useRef<number | null>(null);
  const firstYear = slides[0]?.year ?? '';
  const slideCount = Math.max(1, slides.length);
  const [progress, setProgress] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayYear, setDisplayYear] = useState(firstYear);
  const [yearSwitching, setYearSwitching] = useState(false);
  const [stageVisible, setStageVisible] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [introExiting, setIntroExiting] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const yearStops = useMemo(
    () => slides.map((slide, index) => ({index, year: slide.year})),
    [slides]
  );

  useEffect(() => {
    document.documentElement.classList.add('is-chronicle-intro-locked');
    document.body.classList.add('is-chronicle-intro-locked');
    window.scrollTo(0, 0);

    return () => {
      document.documentElement.classList.remove('is-chronicle-intro-locked');
      document.body.classList.remove('is-chronicle-intro-locked');
    };
  }, []);

  useEffect(() => {
    if (!introComplete) {
      return;
    }

    document.documentElement.classList.remove('is-chronicle-intro-locked');
    document.body.classList.remove('is-chronicle-intro-locked');
  }, [introComplete]);

  useEffect(() => {
    if (introComplete) {
      return;
    }

    let frame = 0;

    const forceTop = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        targetProgressRef.current = 0;
        smoothProgressRef.current = 0;
        lineProgressRef.current = 0;
        controlsVisibleRef.current = false;
        setLineProgress(0);
        setControlsVisible(false);
        window.scrollTo(0, 0);
      });
    };

    const preventScroll = (event: Event) => {
      event.preventDefault();
      forceTop();
    };

    const preventKeyScroll = (event: KeyboardEvent) => {
      if (!scrollLockKeys.has(event.key)) {
        return;
      }

      event.preventDefault();
      forceTop();
    };

    forceTop();
    document.addEventListener('wheel', preventScroll, {capture: true, passive: false});
    document.addEventListener('touchmove', preventScroll, {capture: true, passive: false});
    window.addEventListener('keydown', preventKeyScroll, {capture: true});
    window.addEventListener('scroll', forceTop, {passive: true});

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      document.removeEventListener('wheel', preventScroll, {capture: true});
      document.removeEventListener('touchmove', preventScroll, {capture: true});
      window.removeEventListener('keydown', preventKeyScroll, {capture: true});
      window.removeEventListener('scroll', forceTop);
    };
  }, [introComplete]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      const reducedTimer = window.setTimeout(() => {
        setStageVisible(true);
        setIntroExiting(true);
        setIntroComplete(true);
      }, 0);

      return () => window.clearTimeout(reducedTimer);
    }

    const stageTimer = window.setTimeout(() => setStageVisible(true), 2250);
    const exitTimer = window.setTimeout(() => setIntroExiting(true), 2750);
    const completeTimer = window.setTimeout(() => setIntroComplete(true), 5100);

    return () => {
      window.clearTimeout(stageTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    let frame = 0;

    const syncProgressFromStage = () => {
      const rect = stage.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = clamp(-rect.top / travel);
      const nextControlsVisible = rect.top <= 1 && rect.bottom > window.innerHeight;
      targetProgressRef.current = nextProgress;

      if (controlsVisibleRef.current !== nextControlsVisible) {
        controlsVisibleRef.current = nextControlsVisible;
        setControlsVisible(nextControlsVisible);
      }

      if (Math.abs(lineProgressRef.current - nextProgress) > 0.0005) {
        lineProgressRef.current = nextProgress;
        setLineProgress(nextProgress);
      }
    };

    const update = () => {
      frame = 0;
      syncProgressFromStage();
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    const animateProgress = () => {
      syncProgressFromStage();
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;
      const isMobile =
        window.innerWidth <= 960 || window.matchMedia('(max-aspect-ratio: 3 / 4)').matches;
      const next = isMobile ? target : current + (target - current) * 0.07;
      const settled = Math.abs(target - next) < 0.0005;
      const resolved = settled ? target : next;
      const nextIndex = Math.min(slides.length - 1, Math.round(resolved * (slides.length - 1)));

      smoothProgressRef.current = resolved;
      setProgress(resolved);
      setActiveIndex(Math.max(0, nextIndex));
      frameRef.current = window.requestAnimationFrame(animateProgress);
    };

    update();
    frameRef.current = window.requestAnimationFrame(animateProgress);
    window.addEventListener('scroll', requestUpdate, {passive: true});
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [slides.length]);

  useEffect(() => {
    const nextYear = slides[activeIndex]?.year ?? firstYear;

    if (nextYear === displayYear) {
      return;
    }

    if (yearResetRef.current) {
      window.clearTimeout(yearResetRef.current);
    }

    const switchTimer = window.setTimeout(() => {
      setYearSwitching(true);
      yearResetRef.current = window.setTimeout(() => {
        setDisplayYear(nextYear);
        setYearSwitching(false);
        yearResetRef.current = null;
      }, 600);
    }, 0);

    return () => {
      window.clearTimeout(switchTimer);

      if (yearResetRef.current) {
        window.clearTimeout(yearResetRef.current);
        yearResetRef.current = null;
      }
    };
  }, [activeIndex, displayYear, firstYear, slides]);

  const trackStyle = useMemo(
    () =>
      ({
        '--chronicle-shift': `${-progress * (slideCount - 1) * 100}vw`
      }) as CSSProperties,
    [progress, slideCount]
  );

  const scrollToChronicleYear = (index: number) => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const targetProgress = clamp(index / Math.max(1, slideCount - 1));
    const isMobile =
      window.innerWidth <= 960 || window.matchMedia('(max-aspect-ratio: 3 / 4)').matches;

    if (isMobile) {
      stage
        .querySelectorAll<HTMLElement>('.chronicle-slide')
        [index]?.scrollIntoView({behavior: 'smooth', block: 'start'});
      return;
    }

    const rect = stage.getBoundingClientRect();
    const stageTop = window.scrollY + rect.top;
    const travel = Math.max(1, rect.height - window.innerHeight);
    window.scrollTo({top: stageTop + targetProgress * travel, behavior: 'smooth'});
  };

  return (
    <main
      className={`chronicle-page is-day-theme ${stageVisible ? 'is-stage-visible' : ''} ${
        controlsVisible ? 'is-controls-visible' : ''
      }`}
    >
      <nav className="chronicle-year-nav" aria-label="Chronicle year navigation">
        {yearStops.map((stop) => (
          <button
            className={activeIndex === stop.index ? 'is-active' : ''}
            type="button"
            aria-current={activeIndex === stop.index ? 'step' : undefined}
            onClick={() => scrollToChronicleYear(stop.index)}
            key={`${stop.year}-${stop.index}`}
          >
            {stop.year}
          </button>
        ))}
      </nav>

      <section
        className="chronicle-stage"
        ref={stageRef}
        style={{'--chronicle-slides': slideCount} as CSSProperties}
        aria-label={ariaLabel}
      >
        <div className="chronicle-viewport">
          <div className="chronicle-bg-year" aria-hidden="true">
            <span className={yearSwitching ? 'is-switching' : ''}>{displayYear}</span>
          </div>

          <div className="chronicle-track" style={trackStyle}>
            {slides.map((slide, index) => {
              const textThreshold = Math.max(0, (index - 0.75) / Math.max(1, slideCount - 1));
              const imageThreshold = Math.max(0, (index - 0.65) / Math.max(1, slideCount - 1));
              const isTextVisible = progress >= textThreshold;
              const isImageVisible = progress >= imageThreshold;

              return (
                <section
                  className={[
                    'chronicle-slide',
                    index === activeIndex ? 'is-active' : '',
                    isTextVisible ? 'is-text-visible' : '',
                    isImageVisible ? 'is-image-visible' : ''
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  data-year={slide.year}
                  key={`${slide.year}-${slide.title}`}
                >
                  <div className="chronicle-content">
                    <div className="chronicle-copy">
                      <span>{slide.label}</span>
                      <h1>{slide.title}</h1>
                      <p>{slide.desc}</p>
                    </div>
                    <div className="chronicle-image-frame">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                      />
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <div className="chronicle-progress" aria-hidden="true">
        <i style={{width: `${lineProgress * 100}%`}} />
      </div>

      <div
        className={`chronicle-intro ${introExiting ? 'is-exiting' : ''} ${
          introComplete ? 'is-complete' : ''
        }`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 280 280">
          <circle cx="140" cy="140" r="135" />
        </svg>
        <span>{introLabel}</span>
      </div>
    </main>
  );
}
