# react-virtualized-list

`react-virtualized-list` 是一个高性能的 React 组件库，用于显示大数据集的虚拟化列表，支持懒加载和无限滚动功能。

![npm version](https://img.shields.io/npm/v/react-virtualized-list)


[Read English](https://github.com/SailingCoder/react-virtualized-list/blob/main/doc/README_EN.md)

## 特性 & 适用场景

1. **虚拟化列表**（大型数据列表）：
  
   适用于呈现大量数据的场景，如聊天记录、新闻列表或商品列表。它只渲染当前可见的部分，减少不必要的 DOM 操作和内存消耗，提高页面性能和用户体验。详见代码示例[VirtualizedList](https://github.com/SailingCoder/react-virtualized-list/blob/main/examples/VirtualizedListCustom.js)

2. **无限滚动列表**：
        
    实现无限滚动加载更多内容，适用于新闻、微博、朋友圈等场景，用户不断下滑屏幕，可以不断看到新的动态和信息。支持通过 `onLoadMore` 和 `hasMore` 属性实现无限滚动加载，常见于滚动加载下页数据。详见[InfiniteScrollList](https://github.com/SailingCoder/react-virtualized-list/blob/main/examples/InfiniteScrollList.js)代码示例

3. **数据懒加载**：
   
   适用于需要懒加载的场景，可以延迟加载大量DOM、图片或视频，只有在即将进入视口时才加载，减少页面加载时间和带宽占用。通过 `renderItem` 和 `fetchItemData` 实现图片缩略图和高分辨率图片的懒加载。详见[LazyImage](https://github.com/SailingCoder/react-virtualized-list/blob/main/examples/LazyImage.js)

4. **动态数据更新**（异步数据获取/按需加载）：
   
   按需加载每个列表项的数据，减少初始加载时间，提升浏览器加载性能和服务端性能。例如在商品展示列表中，通过 `fetchItemData` 在用户滚动到特定商品时动态加载详细信息或图片。详见[DynamicInfiniteList](https://github.com/SailingCoder/react-virtualized-list/blob/main/examples/DynamicInfiniteList.js)

5. **视口内自动刷新内容**：
  
   在用户滚动时自动刷新视口内的内容，例如在新闻应用中动态加载最新的文章内容，滚动回之前的新闻位置时，自动更新最新内容。通过配置 `refreshOnVisible`，确保用户始终获取到最新的新闻内容。详见[RefreshOnVisible](https://github.com/SailingCoder/react-virtualized-list/blob/main/examples/RefreshOnVisible.js)

6. **定制化列表渲染**：

   支持自定义列表和列表项，通过使用 `renderItem` 项目渲染函数，你可以根据需求定制每个项目的外观和行为。

## 安装

使用 npm 或 yarn 安装：

```bash
npm install react-virtualized-list
```

或者

```bash
yarn add react-virtualized-list
```

## 使用示例

以下是一个使用示例，展示如何使用 `react-virtualized-list` 组件：

```javascript
import React, { useState, useEffect } from 'react';
import VirtualizedList from 'react-virtualized-list';

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
      }, 3000);
      // 多个请求 1 秒后返回数据
      // Promise.all([ 
      //   Promise.resolve(`${item} (fetched data)`), 
      //   Promise.resolve(`Hello World`) 
      // ]).then(data => {
      //   resolve(data.join(' - '));
      // });
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
        loader={<div>加载更多数据...</div>}
        endMessage={<div>加载完毕！</div>}
        fetchItemData={getFetchData}
        refreshOnVisible={true}
        itemStyle={itemStyle}
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
  );
};

export default App;
```

## API

### `VirtualizedList` Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `listData` | `Array` | ✅ | `[]` | 要展示的项目列表数据 |
| `renderItem` | `Function(itemData, fetchData)` | ❌ | `(itemData) => (<>{itemData ? itemData : '加载数据中...'}</>)` | 渲染每个项目的函数 |
| `refreshOnVisible` | `Boolean` | ❌ | `false` | 是否在**每次**滚动到列表项时重新加载数据 |
| `fetchItemData` | `Function` | ❌ |  | 获取项目数据的异步函数 |
| `containerHeight` | `String` | ❌ | `'400px'` | 列表容器的高度 |
| `listClassName` | `String` | ❌ | `{}` | 列表ClassName |
| `itemClassName` | `String` | ❌ | `{}` | 每个项目ClassName |
| `itemStyle` | `Object` | ❌ | `{}` | 每个项目的样式 |
| `observerOptions` | `Object` | ❌ | `{ root: null, rootMargin: '0px', threshold: 0.1 }` | IntersectionObserver 的配置选项 |
| `onLoadMore` | `Function` | ❌ |  | 当滚动到底部，加载更多数据的函数 |
| `hasMore` | `Boolean` | ❌ | `false` | 是否还有更多数据可加载 |
| `loader` | `String` | ❌ | `''` | 加载更多数据时显示的内容 |
| `endMessage` | `String` | ❌ | `''` | 没有更多数据时显示的内容 |
| `itemLoader` | `String` | ❌ | `''` | 每个项目加载时显示的占位内容或背景图 |


### `observerOptions` 配置表格

| **Option**   | **Description**                                                      | **Type**  | **Required** | **Default** |
| ------------ | -------------------------------------------------------------------- | --------- | ------------ | ----------- |
| `root`       | 观察的视口元素。默认 null 表示使用浏览器的视口作为根容器。                                     | `Element` | ❌            | `null`      |
| `rootMargin` | 根容器的外边距。可以使用类似 CSS 的值（如 `10px`, `20%`），默认值为 `0px`。用于扩展或收缩根容器的范围。     | `String`  | ❌            | `'0px'`     |
| `threshold`  | 一个或多个数值数组，表示目标元素可见比例达到这些值时，回调函数会被触发。`0.1` 意味着目标元素可见部分达到 `10%` 时触发回调。 | `Array`   | ❌            | `0.1`       |


## 许可证

**react-virtualized-list** is released under the MIT License. See the [LICENSE](https://github.com/SailingCoder/react-virtualized-list/blob/main/LICENSE) file for details.

# react-virtualized-list
