'use client';

import Image from 'next/image';
import {useEffect, useMemo, useRef, useState} from 'react';
import {AnimatePresence, LayoutGroup, motion} from 'framer-motion';

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
  closeLabel: string;
  filterLabel: string;
};

export function SpecialtyCollectionGallery({filters, items, closeLabel, filterLabel}: SpecialtyCollectionGalleryProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.id ?? 'all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const visibleItems = useMemo(
    () => (activeFilter === 'all' ? items : items.filter((item) => item.category === activeFilter)),
    [activeFilter, items]
  );
  const selectedItem = items.find((item) => item.id === selectedId) ?? null;

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedId(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

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

        <motion.div layout className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.button
                layout
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                initial={{opacity: 0, y: 24}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, scale: 0.96}}
                transition={{duration: 0.38, delay: Math.min(index * 0.035, 0.16), ease: [0.16, 1, 0.3, 1]}}
                className="group min-h-11 bg-white p-3 text-left shadow-[0_16px_52px_rgba(16,29,48,0.06)] transition duration-hover ease-brand hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(16,29,48,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                aria-label={`${item.title}: ${item.caption}`}
              >
                <motion.div layoutId={`collection-image-${item.id}`} className="hover-zoom">
                  <div className="hover-zoom-media">
                    <CollectionImage item={item} />
                  </div>
                </motion.div>
                <div className="space-y-2 px-1 py-4">
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    {item.categoryLabel}
                  </p>
                  <h2 className="font-heading text-[clamp(24px,4vw,34px)] font-semibold leading-tight text-primary">
                    {item.title}
                  </h2>
                  <p className="hidden font-body text-sm leading-6 text-text md:block">{item.caption}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/90 px-5 py-8 backdrop-blur-sm"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`collection-dialog-title-${selectedItem.id}`}
            aria-describedby={`collection-dialog-caption-${selectedItem.id}`}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className="relative grid max-h-[88dvh] w-full max-w-5xl overflow-auto bg-white p-4 shadow-[0_34px_120px_rgba(16,29,48,0.16)] md:grid-cols-[1.15fr_0.85fr] md:gap-8 md:p-6"
              initial={{y: 24}}
              animate={{y: 0}}
              exit={{y: 24}}
              transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
              onClick={(event) => event.stopPropagation()}
            >
              <motion.div layoutId={`collection-image-${selectedItem.id}`}>
                <CollectionImage item={selectedItem} />
              </motion.div>
              <div className="flex flex-col justify-between gap-10 px-1 py-6 md:px-0">
                <div className="space-y-5">
                  <p className="font-body text-eyebrow font-semibold uppercase tracking-[0.22em] text-accent">
                    {selectedItem.categoryLabel}
                  </p>
                  <h2
                    id={`collection-dialog-title-${selectedItem.id}`}
                    className="font-heading text-[clamp(42px,8vw,76px)] font-semibold leading-none text-primary"
                  >
                    {selectedItem.title}
                  </h2>
                  <p
                    id={`collection-dialog-caption-${selectedItem.id}`}
                    className="font-body text-[17px] leading-8 text-text"
                  >
                    {selectedItem.caption}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setSelectedId(null)}
                  aria-label={closeLabel}
                  className="min-h-11 w-fit border border-primary px-5 py-3 font-body text-sm font-semibold uppercase tracking-[0.14em] text-primary transition duration-hover ease-brand hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {closeLabel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
