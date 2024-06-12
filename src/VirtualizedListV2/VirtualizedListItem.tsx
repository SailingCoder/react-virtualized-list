import React, { useState, useEffect, useRef, ReactNode, ReactElement } from 'react';

interface VirtualizedListItemProps<T> {
  item: T;
  isVisible: boolean;
  refreshOnVisible: boolean;
  fetchItemData: ((item: T) => Promise<any>) | null;
  children: (item: T, data: any) => ReactNode;
  itemLoader: ReactNode;
}

const VirtualizedListItem = <T,>({ 
  item, 
  isVisible, 
  refreshOnVisible, 
  fetchItemData, 
  children, 
  itemLoader 
}: VirtualizedListItemProps<T>): ReactElement => {
  const [data, setData] = useState<any>(null);
  const hasRequested = useRef(false);

  useEffect(() => {
    if (fetchItemData && isVisible && (refreshOnVisible || !hasRequested.current)) {
      fetchItemData(item).then(data => {
        setData(data);
        hasRequested.current = true;
      });
    }
  }, [isVisible, refreshOnVisible, fetchItemData, item]);

  return (
    <>
      {isVisible ? children(item, data) : itemLoader}
    </>
  );
};

export default VirtualizedListItem;
