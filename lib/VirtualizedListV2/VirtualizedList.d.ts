import React, { CSSProperties } from 'react';
interface VirtualizedListProps<T> {
    listData: T[];
    renderItem: (itemData: T, fetchData: any) => React.ReactNode;
    refreshOnVisible?: boolean;
    fetchItemData?: ((item: T) => Promise<any>) | null;
    containerHeight?: string;
    itemStyle?: CSSProperties;
    listClassName?: string | null;
    itemClassName?: string | null;
    observerOptions?: IntersectionObserverInit;
    onLoadMore?: () => Promise<void>;
    hasMore?: boolean;
    loader?: React.ReactNode;
    endMessage?: React.ReactNode;
    itemLoader?: React.ReactNode;
    emptyListMessage?: React.ReactNode;
}
declare const VirtualizedList: <T>({ listData, renderItem, refreshOnVisible, fetchItemData, containerHeight, itemStyle, listClassName, itemClassName, observerOptions, onLoadMore, hasMore, loader, endMessage, itemLoader, emptyListMessage, }: VirtualizedListProps<T>) => import("react/jsx-runtime").JSX.Element;
export default VirtualizedList;
