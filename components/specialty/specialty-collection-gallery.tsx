'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useMemo, useState} from 'react';
import {AnimatePresence, LayoutGroup, motion} from 'framer-motion';

import {EmptyState} from '@/components/empty-state';
import type {Locale} from '@/i18n/routing';

export type SpecialtyCollectionFilter = {
  id: string;
  label: string;
};

export type SpecialtyCollectionItem = {
  id: string;
  title: string;
  caption: string;
  category: string;
  categoryLabel: string;
  image: string;
  hasImage: boolean;
};

type SpecialtyCollectionGalleryProps = {
  filters: SpecialtyCollectionFilter[];
  items: SpecialtyCollectionItem[];
  empty: {
    title: string;
    body: string;
  };
  filterLabel: string;
  locale: Locale;
};

export function SpecialtyCollectionGallery({
  filters,
  items,
  empty,
  filterLabel,
  locale
}: SpecialtyCollectionGalleryProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.id ?? 'all');
  const visibleItems = useMemo(
    () => (activeFilter === 'all' ? items : items.filter((item) => item.category === activeFilter)),
    [activeFilter, items]
  );

  return (
    <LayoutGroup>
      <div className="space-y-10">
        <div className="flex flex-wrap gap-3" role="group" aria-label={filterLabel}>
          {filters.map((filter) => {
            const isActive = filter.id === activeFilter;

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={`min-h-11 border px-5 py-2.5 font-body text-[12px] font-semibold uppercase tracking-[0.16em] transition duration-hover ease-brand ${
                  isActive
                    ? 'border-accent bg-accent text-white'
                    : 'border-hairline bg-white text-primary hover:border-primary/40'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {visibleItems.length === 0 ? (
          <EmptyState title={empty.title} body={empty.body} />
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, index) => (
                <motion.article
                  layout
                  key={item.id}
                  initial={{opacity: 0, y: 24}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, scale: 0.96}}
                  transition={{duration: 0.38, delay: Math.min(index * 0.035, 0.16), ease: [0.16, 1, 0.3, 1]}}
                  className="bg-white p-3 shadow-[0_16px_52px_rgba(16,29,48,0.06)] transition duration-hover ease-brand hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(16,29,48,0.10)]"
                >
                  <Link
                    href={`/${locale}/specialty/collection/${item.id}`}
                    className="group block min-h-11 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    aria-label={`${item.title}: ${item.caption}`}
                  >
                    <div className="hover-zoom">
                      <div className="hover-zoom-media">
                        <CollectionImage item={item} />
                      </div>
                    </div>
                    <div className="space-y-2 px-2 pb-4 pt-5">
                      <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                        {item.categoryLabel}
                      </p>
                      <h2 className="font-heading text-[clamp(16px,1.5vw,19px)] font-semibold leading-snug text-primary">
                        {item.title}
                      </h2>
                      <p className="hidden font-body text-[13px] leading-6 text-text md:block">{item.caption}</p>
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

function CollectionImage({item}: {item: SpecialtyCollectionItem}) {
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
        alt={`${item.title} ${item.caption}`}
        fill
        sizes="(min-width: 1024px) 340px, 50vw"
        className="object-cover"
      />
    </div>
  );
}
