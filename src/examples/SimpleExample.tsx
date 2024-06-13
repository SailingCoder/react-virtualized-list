import React, { useState, useEffect } from 'react';
import VirtualizedList from 'react-virtualized-list';

const itemStyle = {
  height: '50px',
  lineHeight: '40px',
  border: '1px solid blue',
  marginBottom: '10px',
};

const containerStyle = {
  width: '400px', 
  height: '600px', 
  margin: '0 auto', 
  border: '1px solid red', 
  padding: '16px',
  textAlign: 'center',
}

const App = () => {
  // 示例数据
  const data = Array.from({ length: 1000 }, (_, index) => `条目 ${index}`);

  // 加载更多条目的处理函数
  const handleLoadMore = async () => {
    // 加载更多数据的逻辑
  };

  // 渲染每个条目的函数
  const renderItem = (itemData) => <div>{itemData}</div>;

  return (
    <div style={containerStyle}>
      <VirtualizedList
        listData={data}
        renderItem={renderItem}
        containerHeight="600px"
        hasMore={true}
        itemStyle={itemStyle}
        itemLoader={<div>loading ...</div>}
        onLoadMore={handleLoadMore}
        loader={<div>加载中...</div>}
        endMessage={<div>没有更多条目了。</div>}
      />
    </div>
  );
};

export default App;