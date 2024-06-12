interface UseIntersectionObserverOptions extends IntersectionObserverInit {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | number[];
}
declare const useIntersectionObserver: (nodes: (Element | null)[], onVisibilityChange?: ((isVisible: boolean, entry: IntersectionObserverEntry) => void) | null | undefined, onEntryUpdate?: ((entry: IntersectionObserverEntry) => void) | null | undefined, options?: UseIntersectionObserverOptions) => {
    observe: (node: Element | null) => void;
    unobserve: (node: Element | null) => void;
};
export default useIntersectionObserver;
