/**
 * 无限滚动列表
 * 使用 `onLoadMore` 和 `hasMore` 属性实现无限滚动，在用户滚动到列表底部时自动加载更多数据。这种功能常见于滚动加载下页数据。
 * 适用于微博、朋友圈等场景，用户不断下滑屏幕，可以不断看到新的动态和信息。
 */

import React, { useState, useEffect } from 'react';
import VirtualizedList from '../VirtualizedList';
import './style/common.css';

const InfiniteScrollList = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreItems = () => {
    // 模拟 API 调用
    setTimeout(() => {
      const newItems = Array.from({ length: 20 }, (_, index) => ({
        id: items.length + index,
        text: `Item ${items.length + index}`
      }));
      setItems(prevItems => [...prevItems, ...newItems]);
      setHasMore(newItems.length > 0);
    }, 1000);
  };

  useEffect(() => {
    loadMoreItems();
  }, []);

  const renderItem = (item) => <div>{item.text}</div>;

  return (
    <div className='container'>
      <div className='title'>
        <h2>无限滚动列表 - InfiniteScrollList</h2>
        <p>使用 `onLoadMore` 和 `hasMore` 属性实现无限滚动，在用户滚动到列表底部时自动加载更多数据。这种功能常见于滚动加载下页数据。</p>
        <p>适用于微博、朋友圈等场景，用户不断下滑屏幕，可以不断看到新的动态和信息。</p>
      </div>
      <div className='content'>
        <VirtualizedList
          listData={items}
          renderItem={renderItem}
          containerHeight='450px'
          itemClassName='item-class'
          onLoadMore={loadMoreItems}
          hasMore={hasMore}
          loader={<div>Loading...</div>}
          endMessage={<div>No more items</div>}
        />
      </div>
    </div>
  );
};

export default InfiniteScrollList;
