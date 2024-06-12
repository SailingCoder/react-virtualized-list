// 动态数据更新（异步数据获取/按需加载）
// 按需加载每个列表项的数据，减少初始加载时间，提升浏览器加载性能和服务端性能。
// 例如在商品展示列表中，通过 `fetchItemData` 在用户滚动到特定商品时动态加载详细信息或图片。
import React, { useState, useEffect } from 'react';
import VirtualizedList from 'react-virtualized-list';
import './style/common.css';

interface Product {
  id: number;
  name: string;
}

interface ProductData {
  description: string;
  imageUrl: string;
}

const fetchProductData = async (product: Product): Promise<ProductData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ description: `Description for ${product.name}`, imageUrl: `https://via.placeholder.com/150?text=Product+${product.id}` });
    }, 500);
  });
};

const fetchProducts = async (page: number): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = Array.from({ length: 10 }, (_, i) => ({
        id: page * 10 + i,
        name: `Product ${page * 10 + i}`
      }));
      resolve(products);
    }, 500);
  });
};

const DynamicInfiniteList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadMoreProducts = async () => {
    const newProducts = await fetchProducts(page);
    setProducts(prevProducts => [...prevProducts, ...newProducts]);
    setPage(prevPage => prevPage + 1);
    if (newProducts.length < 10) setHasMore(false);
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);
   
  return (
    <div className='container'>
      <div className='title'>
        <h2>动态数据更新（异步数据获取/按需加载）</h2>
        <p>按需加载每个列表项的数据，减少初始加载时间，提升浏览器加载性能和服务端性能。</p>
        <p>例如在商品展示列表中，通过 `fetchItemData` 在用户滚动到特定商品时动态加载详细信息或图片。代码见<a href='https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/DynamicInfiniteList.js' target='_blank'>DynamicInfiniteList</a></p>
      </div>
      <div className='content'>
        <VirtualizedList
          listData={products}
          renderItem={(product, data) => (
            <div>
              <h2>{product.name}</h2>
              <p>{data ? data.description : 'Loading...'}</p>
              {data && data.imageUrl && <img src={data.imageUrl} alt={product.name} />}
            </div>
          )}
          itemClassName='item-class-dynamic'
          fetchItemData={fetchProductData}
          onLoadMore={loadMoreProducts}
          hasMore={hasMore}
          containerHeight='500px'
          loader='Loading more products...'
          endMessage='No more products'
        />
      </div>
    </div>
  );
};

export default DynamicInfiniteList;
