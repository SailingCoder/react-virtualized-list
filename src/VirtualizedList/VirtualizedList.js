import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from 'react-visible-observer';
import VirtualizedListItem from './VirtualizedListItem'

const VirtualizedList = ({
  listData = [],
  renderItem = (itemData) => (<>{itemData ? itemData : 'Loading data...'}</>),
  refreshOnVisible = false,
  fetchItemData,
  containerHeight = '400px',
  itemStyle,
  listClassName = null,
  itemClassName = null,
  observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 },
  onLoadMore,
  hasMore = false,
  loader = '',
  endMessage = '',
  itemLoader = ''
}) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const containerRef = useRef([]);
  const sentinelRef = useRef(null);

  const handleIntersection = (isVisible, entry) => {
    const index = parseInt(entry.target['id'], 10);
    if (isVisible) {
      setVisibleItems(prev => new Set(prev).add(index));
    } else {
      setVisibleItems(prev => {
        const newVisibleItems = new Set(prev);
        newVisibleItems.delete(index);
        return newVisibleItems;
      });
    }
  };

  useIntersectionObserver(containerRef, handleIntersection, null, observerOptions);

  const handleSentinelIntersection = (isVisible, entry) => {
    if (isVisible && hasMore && onLoadMore) {
      onLoadMore();
    }
  };

  useIntersectionObserver(sentinelRef, handleSentinelIntersection, null, { root: null, rootMargin: '0px', threshold: 1.0 });

  return (
    <div className={listClassName} style={{ height: containerHeight, overflowY: 'auto' }}>
      {listData.length ? listData.map((item, index) => (
        <div 
          className={itemClassName}
          style={itemStyle}
          ref={el => containerRef.current[index] = el} 
          key={index}
          id={index}>
          <VirtualizedListItem
            item={item}
            isVisible={visibleItems.has(index)}
            refreshOnVisible={refreshOnVisible}
            fetchItemData={fetchItemData}
            itemStyle={itemStyle}
            itemLoader={itemLoader}
          >
            {renderItem}
          </VirtualizedListItem>
        </div>
      )): null}
      {hasMore ? (
        <div ref={sentinelRef} style={{ height: '1px' }}>{loader}</div>
      ) : (
        <div>{endMessage}</div>
      )}
    </div>
  );
};

export default VirtualizedList;
