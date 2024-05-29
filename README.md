# react-virtualized-list

`react-virtualized-list` is a high-performance React component library designed for displaying large datasets in virtualized lists. It supports lazy loading and infinite scrolling functionalities.

![npm version](https://img.shields.io/npm/v/react-virtualized-list)

[简体中文](https://github.com/SailingCoder/react-virtualized-list/blob/main/doc/README_EN.md)

## Features & Use Cases

1. **Virtualized List** (Large Data Lists):
   
   Suitable for scenarios requiring the presentation of a large amount of data, such as chat logs, news feeds, or product lists. It only renders the currently visible portion, reducing unnecessary DOM operations and memory consumption, thereby improving page performance and user experience. See [VirtualizedList](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/VirtualizedListCustom.js).

2. **Infinite Scrolling List**:
   
   Implement infinite scrolling to load more content, such as social media timelines, infinite galleries, or document browsers. Supports infinite scrolling loading through the `onLoadMore` and `hasMore` properties, commonly used for scrolling to load the next page of data. See [InfiniteScrollList](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/InfiniteScrollList.js).

3. **Data Lazy Loading**:
   
   Suitable for scenarios requiring lazy loading, allowing for the deferred loading of large amounts of DOM, images, or videos, only loading when they are about to enter the viewport, reducing page load times and bandwidth consumption. Lazy loading of images can be implemented using `renderItem` and `fetchItemData` for thumbnail and high-resolution image loading. See [LazyImage](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/LazyImage.js).

4. **Dynamic Data Updates** (Asynchronous Data Retrieval/On-Demand Loading):
   
   Load data for each list item on demand, reducing initial load times and improving browser loading performance and server performance. For example, in a product showcase list, dynamically load detailed information or images for specific products as the user scrolls using `fetchItemData`. See [DynamicInfiniteList](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/DynamicInfiniteList.js).

5. **Automatically Refresh Content Within the Viewport**:
   
   Automatically refresh content within the viewport as the user scrolls, such as dynamically loading the latest article content in a news application. By configuring `refreshOnVisible`, ensure users always receive the latest news content. See 详见[RefreshOnVisible](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/RefreshOnVisable.js).

6. **Customized List Rendering**:
   
   Supports custom lists and list items. By using the `renderItem` item rendering function, you can customize the appearance and behavior of each item according to your needs.

## Installation

Install via npm or yarn:

```bash
npm install react-virtualized-list
```

Or

```bash
yarn add react-virtualized-list
```

## Usage Example

Here's an example demonstrating how to use the `react-virtualized-list` component:

```javascript
import React, { useState, useEffect } from 'react';
import VirtualizedList from 'react-virtualized-list';

const App = () => {
  const [listData, setListData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    handleLoadMore();
  }, []);

  // Simulate fetching list data
  const handleLoadMore = () => {
    if (listData.length >= 100) {
      setHasMore(false);
      return;
    }
    const newItems = Array.from({ length: 10 }, (_, i) => `Item ${listData.length + i + 1}`);
    setListData(prevItems => [...prevItems, ...newItems]);
    if (newItems.length < 10) { // Adjust to match the number of items loaded
      setHasMore(false);
    }
  };

  // Simulate asynchronous fetching of item data
  const getFetchData = (item) => {
    return new Promise((resolve) => {
      // Simulate returning data after 1 second
      setTimeout(() => {
        resolve(`${item} (fetched data) ${new Date().toLocaleTimeString()}`);
      }, 3000);
    });
  };

  const itemStyle = {
    minHeight: '50px',
    border: '1px solid blue',
    margin: '10px 0',
    padding: '10px',
    backgroundColor: '#f0f0f0'
  };

  return (
    <div style={{ width: '400px', height: '600px', margin: '0 auto' }}>
      <VirtualizedList
        listData={listData}
        containerHeight="600px"
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        loader={<div>Loading more data...</div>}
        endMessage={<div>No more data to load!</div>}
        fetchItemData={getFetchData}
        refreshOnVisible={true}
        itemStyle={itemStyle}
        itemLoader={<div>Not visible, Loading</div>}
        renderItem={(itemData, fetchData) => {
          return (
            <div>
              {fetchData ? fetchData : 'Loading data...'}
            </div>
          )
        }}
      />
    </div>
  );
};

export default App;
```


## API

### `VirtualizedList` Props (Continued)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `listData` | `Array` | ✅ | `[]` | 要展示的项目列表数据 |
| `renderItem` | `Function(itemData, fetchData)` | ❌ | `(itemData) => (<>{itemData ? itemData : '加载数据中...'}</>)` | 渲染每个项目的函数 |
| `refreshOnVisible` | `Boolean` | ❌ | `false` | 是否在**每次**滚动到列表项时重新加载数据 |
| `fetchItemData` | `Function` | ❌ |  | 获取项目数据的异步函数 |
| `containerHeight` | `String` | ❌ | `'400px'` | 列表容器的高度 |
| `itemStyle` | `Object` | ❌ | `{}` | 每个项目的样式 |
| `observerOptions` | `Object` | ❌ | `{ root: null, rootMargin: '0px', threshold: 0.1 }` | IntersectionObserver 的配置选项 |
| `onLoadMore` | `Function` | ❌ |  | 当滚动到底部，加载更多数据的函数 |
| `hasMore` | `Boolean` | ❌ | `false` | 是否还有更多数据可加载 |
| `loader` | `String` | ❌ | `''` | 加载更多数据时显示的内容 |
| `endMessage` | `String` | ❌ | `''` | 没有更多数据时显示的内容 |
| `itemLoader` | `String` | ❌ | `''` | 每个项目加载时显示的占位内容或背景图 |

### `observerOptions` Configuration Table (Continued)

| **Option**   | **Description**                                                      | **Type**  | **Required** | **Default** |
| ------------ | -------------------------------------------------------------------- | --------- | ------------ | ----------- |
| `root`       | 观察的视口元素。默认 null 表示使用浏览器的视口作为根容器。                                     | `Element` | ❌            | `null`      |
| `rootMargin` | 根容器的外边距。可以使用类似 CSS 的值（如 `10px`, `20%`），默认值为 `0px`。用于扩展或收缩根容器的范围。     | `String`  | ❌            | `'0px'`     |
| `threshold`  | 一个或多个数值数组，表示目标元素可见比例达到这些值时，回调函数会被触发。`0.1` 意味着目标元素可见部分达到 `10%` 时触发回调。 | `Array`   | ❌            | `0.1`       |

## License

**react-virtualized-list** is released under the MIT License. See the [LICENSE](https://github.com/SailingCoder/react-virtualized-list/blob/main/LICENSE) file for details.
