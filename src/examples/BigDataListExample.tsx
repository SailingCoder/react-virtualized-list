import React, { useState, useEffect, useCallback } from 'react';
import VirtualizedList from 'react-virtualized-list';
import './style/common.css';

interface ListItemData {
  id: number;
  name: string;
  // 其他项目属性
}

const fetchData = async (index: number): Promise<ListItemData> => {
  // 模拟异步数据获取
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: index, name: `项目 ${index}` });
    }, 1000);
  });
};

const BigDataListExample: React.FC = () => {
  const [listData, setListData] = useState<ListItemData[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const loadMoreData = useCallback(async () => {
    // 模拟加载20条数据
    const newData: ListItemData[] = await Promise.all(
      Array.from({ length: 20 }, (_, index) => fetchData(page * 20 + index + 1))
    );
    setListData(prevData => [...prevData, ...newData]);
    setPage(prevPage => prevPage + 1);
    // 模拟没有更多数据的情况
    if (page >= 4) {
      setHasMore(false);
    }
  }, [page]);

  useEffect(() => {
    loadMoreData();
  }, [loadMoreData]);

  const renderItem = (item: ListItemData): React.ReactNode => {
    return <div>{item.name}</div>;
  };

  return (
    <div className='container'>
      <div className='title'>
        <h2>代码示例：大型数据列表</h2>
        <p>当需要渲染一个包含大量数据的列表时，直接渲染所有项目会导致浏览器性能下降。VirtualizedList 通过仅渲染可见的项目，大大提高了性能和响应速度。</p>
        <p>代码详见<a href='https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/BigDataListExample.js' target='_blank'>BigDataListExample</a></p>
      </div>
      <div className='content'>
        <VirtualizedList
          listData={listData}
          renderItem={renderItem}
          fetchItemData={fetchData}
          onLoadMore={loadMoreData}
          hasMore={hasMore}
          containerHeight="500px"
          itemClassName="item-class"
          itemLoader={<div>loading ...</div>}
          loader={<div>加载中 ...</div>}
          endMessage={<div>已加载所有数据</div>}
          emptyListMessage={<div>没有数据</div>}
        />
      </div>
    </div>
  );
};

export default BigDataListExample;
