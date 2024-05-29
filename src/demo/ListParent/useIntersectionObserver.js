import { useEffect, useRef } from 'react';

const useIntersectionObserver = (ref, callback, options = {}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    // 如果observer已存在，则先断开，以避免重复观察
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        callback(entry);
      });
    }, options);

    // 支持单个目标元素或元素列表的引用
    const currentRef = ref.current;
    if (currentRef) {
      if (Array.isArray(currentRef)) {
        // 如果传入的是元素数组，我们观察每一个元素
        currentRef.forEach(element => {
          observerRef.current.observe(element);
        });
      } else {
        // 否则，我们观察单个元素
        observerRef.current.observe(currentRef);
      }
    }

    // 清理函数
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, callback, options]);

  return observerRef;
};

export default useIntersectionObserver