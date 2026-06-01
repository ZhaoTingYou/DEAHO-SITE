'use client';

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode
} from 'react';

type MotionPreference = {
  prefersReducedMotion: boolean;
};

const ReducedMotionContext = createContext<MotionPreference>({
  prefersReducedMotion: false
});

export function ReducedMotionProvider({children}: {children: ReactNode}) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  const value = useMemo(() => ({prefersReducedMotion}), [prefersReducedMotion]);

  return (
    <ReducedMotionContext.Provider value={value}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function usePrefersReducedMotion() {
  return useContext(ReducedMotionContext).prefersReducedMotion;
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot() {
  return false;
}

function subscribeToReducedMotion(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);

  return () => {
    query.removeEventListener('change', callback);
  };
}
