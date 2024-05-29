/**
 * 虚拟化列表 - 大型数据列表
 * 适用于呈现大量数据的场景，如聊天记录、新闻列表或商品列表。它只渲染当前可见的部分，减少不必要的 DOM 操作和内存消耗，提高页面性能和用户体验。
 * 这个代码示例，比较全面的用到了所有的 API
 */
import React, { useState, useEffect } from 'react';
import VirtualizedList from 'react-virtualized-list';
import './style/common.css';

const App = () => {
  const [listData, setListData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    handleLoadMore();
  }, []);

  // 模拟获取 list 数据
  const handleLoadMore = () => {
    if (listData.length >= 100) {
      setHasMore(false);
      return;
    }
    const newItems = Array.from({ length: 10 }, (_, i) => `Item ${listData.length + i + 1}`);
    setListData(prevItems => [...prevItems, ...newItems]);
    if (newItems.length < 10) { // 修正为与加载条数一致
      setHasMore(false);
    }
  };

  // 模拟异步获取 Item 数据
  const getFetchData = (item) => {
    return new Promise((resolve) => {
      // 模拟单个请求 1 秒后返回数据
      setTimeout(() => {
        resolve(`${item} (fetched data) ${new Date().toLocaleTimeString()}`);
      }, 500);
      // 多个请求 1 秒后返回数据
      // Promise.all([ 
      //   Promise.resolve(`${item} (fetched data)`), 
      //   Promise.resolve(`Hello World`) 
      // ]).then(data => {
      //   resolve(data.join(' - '));
      // });
    });
  };

  const itemStyle = {};

  return (
    <div className='container'>
      <div className='title'>
        <h2>代码示例：虚拟化列表 - 大型数据列表</h2>
        <p>适用于呈现大量数据的场景，如聊天记录、新闻列表或商品列表。它只渲染当前可见的部分，减少不必要的 DOM 操作和内存消耗，提高页面性能和用户体验。</p>
        <p>这个代码示例，比较全面的用到了所有的 API。</p>
      </div>
      <div className='content'>
        <VirtualizedList
          listData={listData}
          containerHeight="500px"
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          loader={<div>加载更多数据...</div>}
          endMessage={<div>加载完毕！</div>}
          fetchItemData={getFetchData}
          refreshOnVisible={true}
          itemStyle={itemStyle}
          itemClassName='item-class'
          itemLoader={<div>Not visible，Loading</div>}
          renderItem={(itemData, fetchData) => {
            return (
              <div>
                {fetchData ? fetchData : 'Loading data...'}
              </div>
            )
          }}
        />
      </div>
    </div>
  );
};

export default App;
