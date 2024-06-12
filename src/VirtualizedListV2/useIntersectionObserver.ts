import { useEffect, useRef, useMemo, useCallback } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useIntersectionObserver = (
  nodes: (Element | null)[],
  onVisibilityChange?: ((isVisible: boolean, entry: IntersectionObserverEntry) => void) | null,
  onEntryUpdate?: ((entry: IntersectionObserverEntry) => void) | null,
  options: UseIntersectionObserverOptions = {}
) => {
  const defaultOptions: UseIntersectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observerRef = useRef<IntersectionObserver | null>(null);
  const intersectingStates = useRef<Map<Element, boolean>>(new Map());

  const memoizedOptions = useMemo(() => ({ ...defaultOptions, ...options }), [options]);
  const memoizedOnVisibilityChange = useCallback(onVisibilityChange ?? (() => {}), [onVisibilityChange]);
  const memoizedOnEntryUpdate = useCallback(onEntryUpdate ?? (() => {}), [onEntryUpdate]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        memoizedOnEntryUpdate(entry);

        const prevIntersecting = intersectingStates.current.get(entry.target);
        const currIntersecting = entry.isIntersecting;
        if (prevIntersecting !== currIntersecting) {
          intersectingStates.current.set(entry.target, currIntersecting);
          memoizedOnVisibilityChange(currIntersecting, entry);
        }
      });
    }, memoizedOptions);

    if (nodes) {
      nodes.forEach(node => {
        if (node) {
          observerRef.current?.observe(node);
        }
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [nodes, memoizedOptions, memoizedOnVisibilityChange, memoizedOnEntryUpdate, intersectingStates]);

  const observe = useCallback((node: Element | null) => {
    if (observerRef.current && node) {
      observerRef.current.observe(node);
    }
  }, []);

  const unobserve = useCallback((node: Element | null) => {
    if (observerRef.current && node) {
      observerRef.current.unobserve(node);
    }
  }, []);

  return { observe, unobserve };
};

export default useIntersectionObserver;
