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
  filterLabel: string;
  locale: Locale;
};

const emptyCopy = {
  ko: {
    title: '등록된 작품이 없습니다',
    body: '선택한 분류의 작품 자료가 준비되면 이곳에 추가됩니다.'
  },
  en: {
    title: 'No works in this category',
    body: 'Works in the selected category will appear here once the archive is ready.'
  }
};

export function SpecialtyCollectionGallery({
  filters,
  items,
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
                className={`min-h-11 border px-5 py-3 font-body text-sm font-semibold uppercase tracking-[0.14em] transition duration-hover ease-brand ${
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
          <EmptyState title={emptyCopy[locale].title} body={emptyCopy[locale].body} />
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
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
                    <div className="space-y-2 px-1 py-4">
                      <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                        {item.categoryLabel}
                      </p>
                      <h2 className="font-heading text-[clamp(24px,4vw,34px)] font-semibold leading-tight text-primary">
                        {item.title}
                      </h2>
                      <p className="hidden font-body text-sm leading-6 text-text md:block">{item.caption}</p>
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
