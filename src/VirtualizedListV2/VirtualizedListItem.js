import React, { useState, useEffect, useRef } from 'react';

const VirtualizedListItem = ({ item, isVisible, refreshOnVisible, fetchItemData, children, itemLoader }) => {
  const [data, setData] = useState(null);
  const hasRequested = useRef(false);

  useEffect(() => {
    if (fetchItemData && isVisible && (refreshOnVisible || !hasRequested.current)) {
      fetchItemData(item).then(data => {
        setData(data);
        hasRequested.current = true;
      });
    }
  }, [isVisible, refreshOnVisible, item]);

  return (
    <>
      {isVisible ? children(item, data) : itemLoader}
    </>
  );
};

export default VirtualizedListItem;
