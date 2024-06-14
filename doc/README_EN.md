# react-virtualized-list

`react-virtualized-list` is a high-performance React component library designed for handling large datasets efficiently. It offers features like virtualized rendering, infinite scrolling, lazy loading, and dynamic data updates. Using `IntersectionObserver` for precise visibility management helps optimize performance and supports flexible rendering and loading behaviors. The repository provides detailed installation instructions, usage examples, and comprehensive API documentation, making it suitable for quick integration and customization.

![npm version](https://img.shields.io/npm/v/react-virtualized-list)

[简体中文](https://github.com/SailingCoder/react-virtualized-list/blob/main/README.md)

## Features

- **Virtualized Rendering**: Renders only the items visible in the viewport, significantly reducing DOM operations and enhancing page performance.
- **Infinite Scrolling**: Supports loading more data as the user scrolls, suitable for scenarios requiring dynamic content loading.
- **Customizable Rendering and Styles**: Allows customization of each item's rendering and appearance styles as per requirements.
- **Loading and End Messages**: Provides configurations for loaders and end messages to optimize user experience.
- **Supports TypeScript and JavaScript**: Suitable for both TypeScript and JavaScript projects.

## Installation

Install via npm or yarn:

```bash
npm install react-virtualized-list
# or
yarn add react-virtualized-list
```

## Usage

### Basic Usage

Here's a basic usage example demonstrating how to use the `react-virtualized-list` component:

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
  // Example data
  const data = Array.from({ length: 1000 }, (_, index) => `Item ${index}`);

  // Function to load more items
  const handleLoadMore = async () => {
    // Logic to load more data
  };

  // Function to render each item
  const renderItem = (itemData) => <div>{itemData}</div>;

  return (
    <div style={containerStyle}>
      <VirtualizedList
        listData={data}
        renderItem={renderItem}
        containerHeight="600px"
        hasMore={true}
        itemStyle={itemStyle}
        itemLoader={<div>Loading ...</div>}
        onLoadMore={handleLoadMore}
        loader={<div>Loading...</div>}
        endMessage={<div>No more items.</div>}
      />
    </div>
  );
};

export default App;
```

### Advanced Use Cases

Explore more examples and advanced use cases:

1. **Virtualized Lists** (Large data lists): Enhance performance for large datasets by rendering only visible items. Check out [BigDataListExample](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/BigDataListExample.tsx).

2. **Infinite Scrolling**: Implement infinite scrolling for continuous content loading. See [InfiniteScrollList](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/InfiniteScrollList.tsx).

3. **Lazy Loading Data**: Lazy load images or videos to reduce initial page load time. Explore [LazyImage](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/LazyImage.tsx).

4. **Dynamic Data Updates**: Efficiently load data for each list item as needed. View [DynamicInfiniteList](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/DynamicInfiniteList.tsx).

5. **Auto Refresh on Visibility**: Automatically refresh content in the visible viewport to ensure users see the latest data. Refer to [RefreshOnVisible](https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/RefreshOnVisible.tsx).

6. **Custom Rendering**: Customize appearance and behavior of each item based on specific project needs.

7. **Integration with Third-Party UI Libraries**: Flexible integration with popular UI libraries like [Ant Design](https://ant-design.antgroup.com/index-cn) for enhanced user experience.

## Parameters

### `VirtualizedList` Component Props

| Prop              | Type                        | Required | Default | Description                             |
| ----------------- | --------------------------- | -------- | ------- | --------------------------------------- |
| `listData`        | `Array`                     | ✅       | `[]`    | Array of data for the list              |
| `renderItem`      | `(itemData: T) => React.ReactNode` | ❌  | `itemData => <>{itemData ? itemData : 'Loading ...'}</>` | Function to render each item             |
| `refreshOnVisible`| `Boolean`                   | ❌       | `false` | Whether to refresh data when item becomes visible |
| `fetchItemData`   | `(item: T) => Promise<any>` | ❌       | `null`  | Async function to fetch data for each item |
| `containerHeight` | `String`                    | ❌       | `'400px'` | Height of the list container            |
| `listClassName`   | `String`                    | ❌       | `null`  | CSS class for the list container        |
| `itemClassName`   | `String`                    | ❌       | `null`  | CSS class for each item (recommended)   |
| `itemStyle`       | `Object`                    | ❌       | `{}`    | Style object for each item              |
| `observerOptions` | `Object`                    | ❌       | `{ root: null, rootMargin: '0px', threshold: 0.1 }` | Options for the `IntersectionObserver`  |
| `onLoadMore`      | `() => Promise<void>`       | ❌       | `null`  | Function to load more data              |
| `hasMore`         | `Boolean`                   | ❌       | `false` | Whether there is more data to load      |
| `loader`          | `React.ReactNode`           | ❌       | `''`    | Content to display while loading more data |
| `endMessage`      | `React.ReactNode`           | ❌       | `''`    | Content to display when all data is loaded |
| `itemLoader`      | `React.ReactNode`           | ❌       | `''`    | Placeholder or background to display while each item is loading |
| `emptyListMessage`| `React.ReactNode`           | ❌       | `''`    | Content to display when the list is empty |

### `observerOptions` Configuration Table

| **Option**   | **Description**                                       | **Type**   | **Required** | **Default** |
| ------------ | ----------------------------------------------------- | ---------- | ------------ | ----------- |
| `root`       | The element that is used as the viewport for checking | `Element`  | ❌           | `null`      |
| `rootMargin` | Margin around the root. Can be specified like CSS values (e.g., `10px`, `20%`) | `String`   | ❌           | `'0px'`     |
| `threshold`  | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. | `Array`    | ❌           | `0.1`       |

## License

**react-virtualized-list** is released under the MIT License. See the [LICENSE](https://github.com/SailingCoder/react-virtualized-list/blob/main/LICENSE) file for details.

## Conclusion

If you encounter any issues or have suggestions for improvement, please raise them on [GitHub Issues](https://github.com/SailingCoder/react-virtualized-list/issues).