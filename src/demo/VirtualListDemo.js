import React, { useState, useRef, useEffect, useCallback } from 'react';

const List = ({ items, renderItem }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const containerRef = useRef(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index, 10);
          setVisibleItems(prev => {
            if (!prev.includes(index)) {
              return [...prev, index];
            }
            return prev;
          });
        } else {
          const index = parseInt(entry.target.dataset.index, 10);
          setVisibleItems(prev => prev.filter(i => i !== index));
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    })
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    const container = containerRef.current;
    if (container) {
      const children = Array.from(container.children);
      children.forEach(child => currentObserver.observe(child));
    }
    return () => currentObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '400px', height: '400px', margin: '0 auto', overflowY: 'auto', border: '1px solid black' }}>
      {items.map((item, index) => (
        <div
          key={index}
          data-index={index}
          style={{ minHeight: '50px', borderBottom: '1px solid black' }}
        >
          {
            visibleItems.includes(index) ? renderItem(item, index) : 'Loading...'
          }
        </div>
      ))}
    </div>
  );
};

const Child = ({ data }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    // 模拟数据请求
    setTimeout(() => {
      setContent(data);
    }, 1000);
  }, [data]);

  return <div>{content ? content : 'Loading data...'}</div>;
};

// 使用示例
const App = () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

  return (
    <List
      items={items}
      renderItem={(item, index) => <Child key={index} data={item} />}
    />
  );
};

export default App;
