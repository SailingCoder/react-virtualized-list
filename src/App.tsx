import React from 'react';
import { Radio, Tabs } from 'antd';
import './App.css';
import VirtualizedListCustom from './examples/VirtualizedListCustom';
import InfiniteScrollList from './examples/InfiniteScrollList';
import LazyImage from './examples/LazyImage';
import DynamicInfiniteList from './examples/DynamicInfiniteList';
import RefreshOnVisable from './examples/RefreshOnVisable';
import BigDataListExample from './examples/BigDataListExample';
import SimpleExample from './examples/SimpleExample';


const items = [
  { key: 'SimpleExample', label: '简单例子', content: <SimpleExample /> },
  { key: 'BigDataListExample', label: '大数据列表', content: <BigDataListExample /> },
  { key: 'InfiniteScrollList', label: '无限滚动', content: <InfiniteScrollList /> },
  { key: 'LazyImage', label: '懒加载项目', content: <LazyImage /> },
  { key: 'DynamicInfiniteList', label: '动态数据刷新', content: <DynamicInfiniteList /> },
  { key: 'RefreshOnVisable', label: '视口内自动刷新内容', content: <RefreshOnVisable /> },
  { key: 'VirtualizedListCustom', label: '虚拟化列表（涵盖所有API）', content: <VirtualizedListCustom /> },
]

const App: React.FC = () => {
  const { TabPane } = Tabs;
  return (
    <div className="App">
      <div className="title-class">适用场景</div>
      <Tabs defaultActiveKey={items[0].key} tabPosition="left">
        {
          items.map(item => {
            return (
              <TabPane tab={item.label} key={item.key}>
                {item.content}
              </TabPane>
            )
          })
        }
      </Tabs>
    </div>
  );
}

export default App;
