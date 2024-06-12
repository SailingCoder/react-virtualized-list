import React, { CSSProperties, ReactNode } from 'react';

interface VirtualizedListProps<T> {
  listData: T[];
  renderItem: (itemData: T, fetchData: any) => ReactNode;
  refreshOnVisible?: boolean;
  fetchItemData?: ((item: T) => Promise<any>) | null;
  containerHeight?: string;
  itemStyle?: CSSProperties;
  listClassName?: string | null;
  itemClassName?: string | null;
  observerOptions?: IntersectionObserverInit;
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  loader?: ReactNode;
  endMessage?: ReactNode;
  itemLoader?: ReactNode;
  emptyListMessage?: ReactNode;
}

declare function VirtualizedList<T>(props: VirtualizedListProps<T>): JSX.Element;

export default VirtualizedList;
