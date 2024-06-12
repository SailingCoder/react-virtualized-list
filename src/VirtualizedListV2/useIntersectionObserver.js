import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';

const useIntersectionObserver = (nodes, onVisibilityChange, onEntryUpdate, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observerRef = useRef(null);
  const intersectingStates = useRef(new Map());

  const memoizedOptions = useMemo(() => ({ ...defaultOptions, ...options }), [options]);
  const memoizedOnVisibilityChange = useCallback(onVisibilityChange, [onVisibilityChange]);
  const memoizedOnEntryUpdate = useCallback(onEntryUpdate, [onEntryUpdate]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (memoizedOnEntryUpdate) memoizedOnEntryUpdate(entry);

        const prevIntersecting = intersectingStates.current.get(entry.target);
        const currIntersecting = entry.isIntersecting;
        if (prevIntersecting !== currIntersecting) {
          intersectingStates.current.set(entry.target, currIntersecting);
          if (memoizedOnVisibilityChange) memoizedOnVisibilityChange(currIntersecting, entry);
        }
      });
    }, memoizedOptions);

    if (nodes) {
      nodes.forEach(node => {
        if (node) {
          observerRef.current.observe(node);
        }
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [nodes, memoizedOnVisibilityChange, memoizedOnEntryUpdate, memoizedOptions]);

  const observe = useCallback((node) => {
    if (observerRef.current && node) {
      observerRef.current.observe(node);
    }
  }, []);

  const unobserve = useCallback((node) => {
    if (observerRef.current && node) {
      observerRef.current.unobserve(node);
    }
  }, []);

  return { observe, unobserve };
};

export default useIntersectionObserver;
