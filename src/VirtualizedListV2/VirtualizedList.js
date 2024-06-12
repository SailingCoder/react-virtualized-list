import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import useIntersectionObserver from './useIntersectionObserver';
import VirtualizedListItem from './VirtualizedListItem';

const BUFFER_SIZE = 2;

const VirtualizedList = ({
  listData = [],
  renderItem = (itemData) => (<>{itemData ? itemData : 'Loading data...'}</>),
  refreshOnVisible = false,
  fetchItemData = null,
  containerHeight = '400px',
  itemStyle = {}, 
  listClassName = null,
  itemClassName = null,
  observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 },
  onLoadMore = () => {},
  hasMore = false,
  loader = '',
  endMessage = '',
  itemLoader = '',
  emptyListMessage = null,
}) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const containerRef = useRef([]);
  const sentinelRef = useRef(null);

  const handleVisibilityChange = useCallback((isVisible, entry) => {
    const index = parseInt(entry.target.getAttribute('data-index'), 10);
    if (isVisible) {
      setVisibleItems(prev => new Set(prev).add(index));
    } else {
      setVisibleItems(prev => {
        const newVisibleItems = new Set(prev);
        newVisibleItems.delete(index);
        return newVisibleItems;
      });
    }
  }, []);

  const { observe, unobserve } = useIntersectionObserver(containerRef.current, handleVisibilityChange, null, observerOptions);

  const handleSentinelIntersection = useCallback((isVisible) => {
    if (isVisible && hasMore && onLoadMore && !loading) {
      setLoading(true);
      onLoadMore().finally(() => {
        setLoading(false);
      });
    }
  }, [hasMore, onLoadMore, loading]);

  useIntersectionObserver([sentinelRef.current], handleSentinelIntersection, null, { root: null, rootMargin: '0px', threshold: 1.0 });

  const visibleRange = useMemo(() => {
    const sortedVisibleItems = [...visibleItems].sort((a, b) => a - b);
    if (sortedVisibleItems.length === 0) return [0, BUFFER_SIZE];
    const firstVisible = sortedVisibleItems[0];
    const lastVisible = sortedVisibleItems[sortedVisibleItems.length - 1];
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

  const handleRef = useCallback((node, index) => {
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

  return (
    <div className={listClassName} style={{ height: containerHeight, overflowY: 'auto' }}>
      {listData.length ? listData.map((item, index) => (
        (index >= visibleRange[0] && index <= visibleRange[1]) ? (
          <div
            className={itemClassName}
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
        ) : null
      )) : (
        emptyListMessage ? emptyListMessage : null
      )}
      { listData.length ? hasMore ? (
        <div ref={sentinelRef} style={{ height: '1px' }}>{loader}</div>
      ) : (
        <div>{endMessage}</div>
      ) : null }
    </div>
  );
};

export default VirtualizedList;
