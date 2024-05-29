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
| `listData` | `Array` | ✅ | `[]` | The list of items to display |
| `renderItem` | `Function(itemData, fetchData)` | ❌ | `(itemData) => (<>{itemData ? itemData : 'Loading data...'}</>)` | Function to render each item |
| `refreshOnVisible` | `Boolean` | ❌ | `false` | Whether to reload data **every time** an item becomes visible |
| `fetchItemData` | `Function` | ❌ |  | Asynchronous function to fetch item data |
| `containerHeight` | `String` | ❌ | `'400px'` | Height of the list container |
| `itemStyle` | `Object` | ❌ | `{}` | Style for each item |
| `observerOptions` | `Object` | ❌ | `{ root: null, rootMargin: '0px', threshold: 0.1 }` | Configuration options for the IntersectionObserver |
| `onLoadMore` | `Function` | ❌ |  | Function to load more data when scrolled to the bottom |
| `hasMore` | `Boolean` | ❌ | `false` | Whether there is more data to load |
| `loader` | `String` | ❌ | `''` | Content to display when loading more data |
| `endMessage` | `String` | ❌ | `''` | Content to display when there is no more data to load |
| `itemLoader` | `String` | ❌ | `''` | Placeholder content or background image to display while each item is loading |

### `observerOptions` Configuration Table (Continued)

| **Option**   | **Description**                                                      | **Type**  | **Required** | **Default** |
| ------------ | -------------------------------------------------------------------- | --------- | ------------ | ----------- |
| `root`       | The viewport element to observe. The default is null, which means the browser's viewport is used as the root container. | `Element` | ❌            | `null`      |
| `rootMargin` | The margin around the root container. Can use CSS-like values (e.g., `10px`, `20%`). The default value is `0px`. Used to expand or shrink the root container's area. | `String`  | ❌            | `'0px'`     |
| `threshold`  | A single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. `0.1` means the callback will be triggered when 10% of the target is visible. | `Array`   | ❌            | `0.1`       |

## License

**react-virtualized-list** is released under the MIT License. See the [LICENSE](https://github.com/SailingCoder/react-virtualized-list/blob/main/LICENSE) file for details.
