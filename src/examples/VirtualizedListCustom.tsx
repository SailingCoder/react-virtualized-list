/**
 * 虚拟化列表 - 大型数据列表
 * 适用于呈现大量数据的场景，如聊天记录、新闻列表或商品列表。它只渲染当前可见的部分，减少不必要的 DOM 操作和内存消耗，提高页面性能和用户体验。
 * 这个代码示例，比较全面的用到了所有的 API
 */
import React, { useState, useEffect } from 'react';
import VirtualizedList from '../VirtualizedListV2/VirtualizedList';
import './style/common.css';

const App: React.FC = () => {
  const [listData, setListData] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [refreshOnVisible] = useState(true);

  useEffect(() => {
    handleLoadMore();
    // pollFetchData()
  }, []);

  // 轮询请求item数据
  // const pollFetchData = async () => {
  //   setRefreshOnVisible(false);
  //   await delay(9000);
  //   setRefreshOnVisible(true);
  //   await delay(1000);
  //   pollFetchData()
  // }     

  const handleLoadMore = async (): Promise<void> => {
    if (listData.length >= 100) {
      setHasMore(false);
      return;
    }
    // 模拟请求延迟
    await delay(1000);
    
    setListData(prevItems => {
      const newItems = Array.from({ length: 10 }, (_, i) => `Item ${prevItems.length + i}`);
      return [...prevItems, ...newItems];
    });
  };

  const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

  // 模拟异步获取 Item 数据
  const getFetchData = (item: string): Promise<string> => {
    return new Promise((resolve) => {
      // 模拟单个请求 1 秒后返回数据
      setTimeout(() => {
        resolve(`(fetched data) ${new Date().toLocaleTimeString()}`);
      }, 1000);
    });
  };

  const itemStyle: React.CSSProperties = {};

  return (
    <div className='container'>
      <div className='title'>
        <h2>代码示例：虚拟化列表 - 大型数据列表 - V2</h2>
        <p>适用于呈现大量数据的场景，如聊天记录、新闻列表或商品列表。它只渲染当前可见的部分，减少不必要的 DOM 操作和内存消耗，提高页面性能和用户体验。</p>
        <p>这个代码示例，比较全面的用到了所有的 API。代码见<a href='https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/VirtualizedListCustom.js' target='_blank'>VirtualizedListCustom</a></p>
      </div>
      <div className='content'>
        <VirtualizedList<string>
          observerOptions={{
            root: document.querySelector('.content'),
          }}
          listData={listData}
          containerHeight="500px"
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          loader={<div>加载更多数据...</div>}
          endMessage={<div>加载完毕！</div>}
          emptyListMessage={<div>暂无数据</div>}
          fetchItemData={getFetchData}
          refreshOnVisible={refreshOnVisible}
          itemStyle={itemStyle}
          itemClassName='item-class'
          itemLoader={<>Not visible，Loading</>}
          renderItem={(itemData, fetchData) => (
            <div>
              <div>{itemData}</div>
              <div>{fetchData ? fetchData : 'Loading data...'}</div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default App;
