// 视口内自动刷新内容
// 在用户滚动时自动刷新视口内的内容。例如，在新闻应用中，动态加载新的文章，并这种功能确保用户始终能够获取到最新的新闻资讯。
// 新闻列表 example
import React, { useState, useEffect } from 'react';
import VirtualizedList from 'react-virtualized-list';
import './style/common.css';

const fetchArticleData = async (article) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ title: `${article.title}`, content: `更新时间${new Date().toLocaleTimeString()}` });
    }, 500);
  });
};

const RefreshOnVisable = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const nowdate = new Date().toLocaleTimeString()
    const initialArticles = Array.from({ length: 100 }, (_, i) => ({ id: i, title: `item ${i}`, content: `当前时间${nowdate}` }));
    setArticles(initialArticles);
  }, []);

  return (
    <div className='container'>
      <div className='title'>
        <h2>视口内自动刷新内容</h2>
        <p>在用户滚动时自动刷新视口内的内容，例如在新闻应用中动态加载最新的文章内容，滚动回之前的新闻位置时，自动更新最新内容。</p>
        <p>通过配置 `refreshOnVisible`，确保用户始终获取到最新的新闻内容。代码见<a href='https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/RefreshOnVisable.js' target='_blank'>RefreshOnVisable</a></p>
      </div>
      <div className='content'>
        <VirtualizedList
          listData={articles}
          renderItem={(article, data) => (
            <div>
              <h2>{data ? data.title : 'Loading...'}</h2>
              <p>{data ? data.content : 'Loading...'}</p>
            </div>
          )}
          fetchItemData={fetchArticleData}
          refreshOnVisible={true}
          itemClassName='item-class-refresh'
          containerHeight='500px'
          itemLoader={<>Loading article...</>}
        />
      </div>
    </div>
  );
};

export default RefreshOnVisable;
