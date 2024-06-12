// import logo from './logo.svg';
import './App.css';
// import ListParentDemo from './demo/ListParent/index';
// import VirtualizedListDemo from './demo/VirtualListDemo';
// import VirtualizedList from './example/VirtualizedList';
import VirtualizedListCustom from './examples/VirtualizedListCustom';
import InfiniteScrollList from './examples/InfiniteScrollList';
import LazyImage from './examples/LazyImage';
import DynamicInfiniteList from './examples/DynamicInfiniteList';
import RefreshOnVisable from './examples/RefreshOnVisable';


const App: React.FC = () => {
  return (
    <div className="App">
      {/* <div className="col-12">
        <h2>技术方案设计 Demo</h2>
        <VirtualizedList />
      </div>
      <div className="col-12">
        <h2>方案落实到项目 Demo</h2>
        <ListParent/>
      </div> */}
      {/* <VirtualizedListDemo /> */}
      <VirtualizedListCustom />
      <InfiniteScrollList />
      <LazyImage />
      <DynamicInfiniteList />
      <RefreshOnVisable />
    </div>
  );
}

export default App;
