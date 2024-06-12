import React, { useState, useRef, useEffect, useMemo, useCallback, CSSProperties } from 'react';
import useIntersectionObserver from './useIntersectionObserver';
import VirtualizedListItem from './VirtualizedListItem';

interface VirtualizedListProps<T> {
  listData: T[];
  renderItem: (itemData: T, fetchData: any) => React.ReactNode;
  refreshOnVisible?: boolean;
  fetchItemData?: ((item: T) => Promise<any>) | null;
  containerHeight?: string;
  itemStyle?: CSSProperties;
  listClassName?: string | null;
  itemClassName?: string | null;
  observerOptions?: IntersectionObserverInit;
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
  itemLoader?: React.ReactNode;
  emptyListMessage?: React.ReactNode;
}

const BUFFER_SIZE = 1;

const VirtualizedList = <T,>({
  listData = [],
  renderItem = (itemData) => (<>{itemData ? itemData : 'Loading ...'}</>),
  refreshOnVisible = false,
  fetchItemData = null,
  containerHeight = '400px',
  itemStyle = {}, 
  listClassName = null,
  itemClassName = null,
  observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 },
  onLoadMore = () => Promise.resolve(),
  hasMore = false,
  loader = '',
  endMessage = '',
  itemLoader = '',
  emptyListMessage = null,
}: VirtualizedListProps<T>) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleVisibilityChange = useCallback((isVisible: boolean, entry: IntersectionObserverEntry) => {
    const index = parseInt(entry.target.getAttribute('data-index')!, 10);
    setVisibleItems(prev => {
      const newVisibleItems = new Set(prev);
      if (isVisible) {
        newVisibleItems.add(index);
      } else {
        newVisibleItems.delete(index);
      }
      return newVisibleItems;
    });
  }, []);

  const handleSentinelIntersection = useCallback((isVisible: boolean) => {
    if (isVisible && hasMore && !loading) {
      setLoading(true);
      onLoadMore().finally(() => {
        setLoading(false);
      });
    }
  }, [hasMore, onLoadMore, loading]);

  const { observe, unobserve } = useIntersectionObserver(containerRef.current, handleVisibilityChange, null, observerOptions);

  useIntersectionObserver([sentinelRef.current], handleSentinelIntersection, null, { root: null, rootMargin: '0px', threshold: 1.0 });

  const visibleRange = useMemo(() => {
    const sortedVisibleItems = [...visibleItems].sort((a, b) => a - b);
    const firstVisible = sortedVisibleItems[0] || 0;
    const lastVisible = sortedVisibleItems[sortedVisibleItems.length - 1] || 0;
    // 设置缓存区
    return [Math.max(0, firstVisible - BUFFER_SIZE), Math.min(listData.length - 1, lastVisible + BUFFER_SIZE)];
  }, [visibleItems, listData.length]);

  useEffect(() => {
    containerRef.current.forEach((node, index) => {
      if (node && (index < visibleRange[0] || index > visibleRange[1])) {
        unobserve(node);
        containerRef.current[index] = null;
      }
    });
  }, [visibleRange, unobserve]);

  const handleRef = useCallback((node: HTMLDivElement | null, index: number) => {
    if (node) {
      containerRef.current[index] = node;
      observe(node);
    } else {
      if (containerRef.current[index]) {
        unobserve(containerRef.current[index]);
        containerRef.current[index] = null;
      }
    }
  }, [observe, unobserve]);

  const itemContainerStyle = useMemo(() => ({
    ...itemStyle,
  }), [itemStyle]);

  const renderItems = () => {
    return listData.length ? listData.map((item, index) => {
      if (index >= visibleRange[0] && index <= visibleRange[1]) {
        return (
          <div
            className={itemClassName || undefined}
            style={itemContainerStyle}
            ref={node => handleRef(node, index)}
            key={index}
            data-index={index}
          >
            <VirtualizedListItem
              item={listData[index]}
              isVisible={visibleItems.has(index)}
              refreshOnVisible={refreshOnVisible}
              fetchItemData={fetchItemData}
              itemLoader={itemLoader}
            >
              {renderItem}
            </VirtualizedListItem>
          </div>
        );
      }
      return null;
    }) : (
      emptyListMessage ? emptyListMessage : null
    );
  };

  return (
    <div className={listClassName || undefined} style={{ height: containerHeight, overflowY: 'auto' }}>
      {renderItems()}
      {listData.length ? hasMore ? (
        <div ref={sentinelRef} style={{ height: '1px' }}>{loader}</div>
      ) : (
        <div>{endMessage}</div>
      ) : null}
    </div>
  );
};

export default VirtualizedList;
