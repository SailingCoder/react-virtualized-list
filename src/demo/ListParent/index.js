import React, { useRef, useState, useEffect } from 'react';
import useIntersectionObserver from './useIntersectionObserver';
import RenderChart from './RenderChart';

const ListChart = () => {
  const listRef = useRef([]);
  const [listData, setListData] = useState(Array.from(
    { length: 1000 }, 
    (_, i) => ({ id: i + 1, name: `chart${i + 1}` })
  ));

  
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);
  const [countdown, setCountdown] = useState(9);

  // 回调函数，当元素可见性变化时触发
  const handleIntersection = (entry) => {
    const isVisible = entry.isIntersecting;
    const id = parseInt(entry.target.id, 10);

    setListData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, loaded: isVisible ? true : item.loaded };
        }
        return item;
      })
    );

    setVisibleItems((prevVisibleItems) => {
      if (isVisible) {
        return [...new Set([...prevVisibleItems, id])];
      } else {
        return prevVisibleItems.filter((visibleId) => visibleId !== id);
      }
    });
  };

  // 自定义钩子使用
  useIntersectionObserver(listRef, handleIntersection, {
    root: document.querySelector('#root-container'),
  });

  useEffect(() => {
    if (isAutoRefresh) {
      const intervalId = setInterval(() => {
        setVisibleItems((currentVisibleItems) => {
            setListData((prevData) =>
                prevData.map((item) => {
                    if (currentVisibleItems.includes(item.id)) {
                        return { ...item, loaded: false }; 
                    }
                    return item;
                })
            );
            return currentVisibleItems;
        });
        setCountdown(9);
      }, 9000);

      // Countdown logic
      const countdownId = setInterval(() => {
        setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 9));
      }, 1000);

      return () => {
        clearInterval(intervalId);
        clearInterval(countdownId);
      };
    }
  }, [isAutoRefresh]);

  return (
    <div>
        <p>
            <input type="checkbox" checked={isAutoRefresh} onChange={(e) => setIsAutoRefresh(e.target.checked)} />
            自动刷新
            {isAutoRefresh && <span>下一次刷新倒计时: {countdown}s</span>}
        </p>
        <div id='root-container' style={{ width: '500px', height: '400px', border: '1px solid red', overflow: 'auto', margin: '30px auto' }}>
            {listData.map((item, index) => (
                <div ref={(el) => (listRef.current[index] = el)} key={item.id} id={item.id.toString()} style={{ height: '260px', border: '1px solid #ccc' }}>
                    {item.loaded ? <RenderChart data={item} /> : 'Loading...'}
                </div>
            ))}
        </div>
    </div>
  );
};

export default ListChart;
