/**
 * 无限滚动列表
 * 使用 `onLoadMore` 和 `hasMore` 属性实现无限滚动，在用户滚动到列表底部时自动加载更多数据。这种功能常见于滚动加载下页数据。
 * 适用于微博、朋友圈等场景，用户不断下滑屏幕，可以不断看到新的动态和信息。
 */

// import VirtualizedList from 'react-virtualized-list'; // 确保这个模块有类型定义
import VirtualizedList from '../VirtualizedListV2/VirtualizedList';
import React, { useState, useEffect } from 'react';
import './style/common.css';

// 定义 Item 类型
interface Item {
  id: number;
  text: string;
}

const InfiniteScrollList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreItems = async (): Promise<void> => {
    // 模拟 API 调用
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newItems = Array.from({ length: 20 }, (_, index) => ({
          id: items.length + index,
          text: `Item ${items.length + index}`,
        }));
        setItems((prevItems) => [...prevItems, ...newItems]);
        setHasMore(newItems.length > 0);
        resolve();
      }, 1000);
    });
  };

  useEffect(() => {
    loadMoreItems();
  }, []);

  const renderItem = (item: Item) => <div>{item.text}</div>;

  return (
    <div className="container">
      <div className="title">
        <h2>无限滚动列表 - InfiniteScrollList</h2>
        <p>
          使用 `onLoadMore` 和 `hasMore` 属性实现无限滚动，在用户滚动到列表底部时自动加载更多数据。这种功能常见于滚动加载下页数据。
        </p>
        <p>
          适用于微博、朋友圈等场景，用户不断下滑屏幕，可以不断看到新的动态和信息。代码见
          <a href="https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/InfiniteScrollList.js" target="_blank">
            InfiniteScrollList
          </a>
        </p>
      </div>
      <div className="content">
        <VirtualizedList<Item>
          listData={items}
          renderItem={renderItem}
          containerHeight="450px"
          itemClassName="item-class"
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
