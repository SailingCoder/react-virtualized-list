import { ReactNode, ReactElement } from 'react';
interface VirtualizedListItemProps<T> {
    item: T;
    isVisible: boolean;
    refreshOnVisible: boolean;
    fetchItemData: ((item: T) => Promise<any>) | null;
    children: (item: T, data: any) => ReactNode;
    itemLoader: ReactNode;
}
declare const VirtualizedListItem: <T>({ item, isVisible, refreshOnVisible, fetchItemData, children, itemLoader }: VirtualizedListItemProps<T>) => ReactElement;
export default VirtualizedListItem;
