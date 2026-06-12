'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useMemo, useState} from 'react';
import {AnimatePresence, LayoutGroup, motion} from 'framer-motion';

import {EmptyState} from '@/components/empty-state';
import type {Locale} from '@/i18n/routing';

export type NewsFilter = {
  id: string;
  label: string;
};

export type NewsCard = {
  id: string;
  category: string;
  categoryLabel: string;
  date: string;
  title: string;
  image: string;
  hasImage: boolean;
};

type NewsJournalGridProps = {
  filters: NewsFilter[];
  cards: NewsCard[];
  empty: {
    title: string;
    body: string;
  };
  filterLabel: string;
  locale: Locale;
};

export function NewsJournalGrid({filters, cards, empty, filterLabel, locale}: NewsJournalGridProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.id ?? 'all');
  const visibleCards = useMemo(
    () => (activeFilter === 'all' ? cards : cards.filter((card) => card.category === activeFilter)),
    [activeFilter, cards]
  );

  return (
    <LayoutGroup>
      <div className="space-y-8">
        <div
          className="-mx-container flex gap-3 overflow-x-auto px-container pb-2 [scroll-snap-type:x_mandatory] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0"
          aria-label={filterLabel}
        >
          {filters.map((filter) => {
            const isActive = filter.id === activeFilter;

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={`relative min-h-11 shrink-0 cursor-pointer border px-4 py-3 font-body text-[12px] font-semibold uppercase tracking-[0.12em] transition duration-hover ease-brand [scroll-snap-align:start] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                  isActive
                    ? 'border-primary/30 bg-white text-primary'
                    : 'border-hairline bg-white/70 text-subtext hover:border-primary/30 hover:text-primary'
                }`}
              >
                {filter.label}
                {isActive ? (
                  <motion.span
                    layoutId="news-filter-underline"
                    className="absolute inset-x-4 bottom-2 h-px bg-accent"
                    transition={{duration: 0.32, ease: [0.16, 1, 0.3, 1]}}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        {visibleCards.length === 0 ? (
          <EmptyState title={empty.title} body={empty.body} />
        ) : (
          <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleCards.map((card, index) => (
                <motion.article
                  layout
                  key={card.id}
                  initial={{opacity: 0, y: 26}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, scale: 0.97}}
                  transition={{
                    duration: 0.38,
                    delay: Math.min(index * 0.04, 0.18),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="bg-white p-3 shadow-[0_16px_48px_rgba(16,29,48,0.055)] transition duration-hover ease-brand hover:-translate-y-1.5 hover:shadow-[0_30px_86px_rgba(16,29,48,0.11)]"
                >
                  <Link
                    href={`/${locale}/news/${card.id}`}
                    className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    aria-label={`${card.categoryLabel}: ${card.title}`}
                  >
                    <div className="hover-zoom">
                      <div className="hover-zoom-media">
                        <NewsCardImage card={card} />
                      </div>
                    </div>
                    <div className="space-y-4 px-1 py-5">
                      <motion.div
                        initial={{opacity: 0, y: 8}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.4}}
                        transition={{duration: 0.36, delay: 0.15, ease: [0.16, 1, 0.3, 1]}}
                        className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-subtext"
                      >
                        <span className="text-accent">{card.categoryLabel}</span>
                        <span className="h-3 w-px bg-hairline" aria-hidden="true" />
                        <span>{card.date}</span>
                      </motion.div>
                      <h3 className="font-heading text-[clamp(23px,2.2vw,31px)] font-semibold leading-tight text-primary">
                        {card.title}
                      </h3>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </LayoutGroup>
  );
}

function NewsCardImage({card}: {card: NewsCard}) {
  if (!card.hasImage) {
    return (
      <div
        className="flex aspect-[3/2] w-full items-center justify-center break-all border border-hairline bg-bg p-5 text-center font-body text-xs font-semibold leading-5 tracking-[0.06em] text-subtext"
        role="img"
        aria-label={card.image}
      >
        {card.image}
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden bg-bg">
      <Image
        src={`/images/${card.image}`}
        alt={`${card.categoryLabel} ${card.title}`}
        fill
        sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
