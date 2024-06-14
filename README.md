# react-virtualized-list

`react-virtualized-list` 是一个专为处理大型数据集而设计的高性能 React 虚拟组件库，提供虚拟化列表、无限滚动、懒加载和动态数据更新等功能。通过使用 `IntersectionObserver` 精确管理可见性，优化性能并支持灵活的渲染和加载行为配置。仓库提供了详细的安装说明、使用示例和全面的 API 文档，适合快速集成和定制。

![npm version](https://img.shields.io/npm/v/react-virtualized-list)

[English](https://github.com/SailingCoder/react-virtualized-list/blob/main/doc/README_EN.md)


## 特性 

-   **虚拟化渲染**: 仅渲染视口内可见的项目，大幅减少 DOM 操作，提升页面性能。
-   **无限滚动**: 支持滚动加载更多数据，适用于需要动态加载内容的场景。
-   **自定义渲染和样式**: 可根据需求自定义每个项目的渲染方式和外观样式。
-   **加载和结束消息**: 提供加载器和结束消息的配置，优化用户体验。
-   **支持 TypeScript 和 JavaScript**: 适用于 TypeScript 和 JavaScript 项目。

## 安装

使用 npm 或 yarn 安装：

```bash
npm install react-virtualized-list
# 或者
yarn add react-virtualized-list
```

## 使用

### 基本用法

以下是一个使用示例，展示如何使用 `react-virtualized-list` 组件：

```javascript
import React from 'react';
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
```

### 高级用法场景

探索更多示例和高级用法场景，查看 [示例](https://sailingcoder.github.io/react-virtualized-list/build/)。

1.  **虚拟化列表**（大型数据列表）：通过仅渲染可见部分项目，提升大型数据列表的性能，详见[BigDataListExample](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/BigDataListExample.tsx)、


2.  **无限滚动**：实现无限滚动加载更多内容，适用于新闻、微博、朋友圈等场景，详见 [InfiniteScrollList](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/InfiniteScrollList.tsx)。

2.  **懒加载数据**: 延迟加载大量图片或视频，减少页面加载时间，详见 [LazyImage](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/LazyImage.tsx)。

2.  **动态数据更新**: 按需加载每个列表项的数据，提升性能，详见 [DynamicInfiniteList](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/DynamicInfiniteList.tsx)。

2.  **视口内自动刷新内容**: 自动刷新可见区域内的内容，确保用户获取最新数据，详见 [RefreshOnVisible](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/RefreshOnVisible.tsx)。

2.  **自定义渲染**: 根据需求定制每个项目的外观和行为，适应各种项目需求。

2.  **与第三方 UI 库配合使用**: 可与主流 UI 库等（如[Ant Design](https://ant-design.antgroup.com/index-cn)）灵活配合使用，提供优秀的用户体验。

## 参数

### `VirtualizedList` 组件接受以下参数：

| Prop  | Type | Required | Default  | Description |
| --------| ---- | -------- | ----------- | -----  |
| `listData`         | `Array`         | ✅        | `[]` | 列表数据数组 |
| `renderItem`       | `(itemData: T, fetchData: any) => React.ReactNode` | ❌        | `itemData => <>{itemData ? itemData : 'Loading ...'}</>` | 渲染每个项目的函数    |
| `refreshOnVisible` | `Boolean` | ❌   | `false`  | 当项目可见时是否刷新数据 |
| `fetchItemData`    | `((item: T) => Promise<any>) ` | ❌ |  `null` | 获取每个项目数据的异步函数 |
| `containerHeight`  | `String` | ❌    | `'400px'` | 列表容器的高度 |
| `listClassName`    | `String` | ❌    | `null` | 列表容器的CSS类名     |
| `itemClassName`    | `String` | ❌    | `null` | 每个项目的CSS类名（推荐使用）   |
| `itemStyle`        | `Object`  | ❌    | `{}` | 项目样式    |
| `observerOptions`  | `Object`  | ❌    | `{ root: null, rootMargin: '0px', threshold: 0.1 }`       | 视口设置（见下方observerOptions配置表格） |
| `onLoadMore`       | `() => Promise<void>` | ❌   |   `null`   | 加载更多数据的函数 |
| `hasMore`          | `Boolean`  | ❌   | `false`  | 是否有更多数据 |
| `loader`           | `React.ReactNode`  | ❌ | `''` | 加载更多数据时显示的内容 |
| `endMessage`       | `React.ReactNode` | ❌  | `''` | 所有数据加载完毕时的内容 |
| `itemLoader`       | `React.ReactNode` | ❌ | `''` | 每个项目加载时显示的占位内容或背景图 |
| `emptyListMessage` | `React.ReactNode` | ❌    | `''` | 列表为空时的占位内容或背景图 |

### `observerOptions` 配置表格

| **Option**   | **Description**                                                      | **Type**  | **Required** | **Default** |
| ------------ | -------------------------------------------------------------------- | --------- | ------------ | ----------- |
| `root`       | 观察的视口元素。默认 null 表示使用浏览器的视口作为根容器。                                     | `Element` | ❌            | `null`      |
| `rootMargin` | 根容器的外边距。可以使用类似 CSS 的值（如 `10px`, `20%`），默认值为 `0px`。用于扩展或收缩根容器的范围。     | `String`  | ❌            | `'0px'`     |
| `threshold`  | 一个或多个数值数组，表示目标元素可见比例达到这些值时，回调函数会被触发。`0.1` 意味着目标元素可见部分达到 `10%` 时触发回调。 | `Array`   | ❌            | `0.1`       |

## 许可证

**react-virtualized-list** is released under the MIT License. See the [LICENSE](https://github.com/SailingCoder/react-virtualized-list/blob/main/LICENSE) file for details.

## 结论

如果你发现任何问题或有改进建议，请在 [GitHub Issues](https://github.com/SailingCoder/react-virtualized-list/issues) 中提出。

