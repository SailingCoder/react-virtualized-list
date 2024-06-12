import React, { useState } from 'react';
// import VirtualizedList from 'react-virtualized-list';
import VirtualizedList from '../VirtualizedListV2/VirtualizedList';

interface Image {
  id: number;
  url: string;
}

interface HighResImage {
  highResUrl: string;
}

const LazyImage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([...Array(50).keys()].map(i => ({
    id: i,
    url: `https://via.placeholder.com/150?text=Image+${i}`,
  })));

  const fetchImageData = async (image: Image): Promise<HighResImage> => {
    // 模拟加载高分辨率图片
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ highResUrl: `https://via.placeholder.com/600?text=done+${image.id}` });
      }, 500);
    });
  };

  const renderItem = (image: Image, data?: HighResImage) => (
    <>
      <img src={data ? data.highResUrl : image.url} alt={`Image ${image.id}`} />
    </>
  );

  return (
    <div className='container'>
      <div className='title'>
        <h2>数据懒加载 - LazyImage</h2>
        <p>适用于需要懒加载的场景，可以延迟加载大量DOM、图片或视频，只有在即将进入视口时才加载，减少页面加载时间和带宽占用。</p>
        <p>通过 `renderItem` 和 `fetchItemData` 实现图片缩略图和高分辨率图片的懒加载。代码见<a href='https://github.com/SailingCoder/react-virtualized-list/blob/main/src/examples/LazyImage.js' target='_blank'>LazyImage</a></p>
      </div>
      <div className='content'>
        <VirtualizedList<Image>
          listData={images}
          renderItem={renderItem}
          containerHeight='450px'
          itemClassName='item-class-img'
          fetchItemData={fetchImageData}
          refreshOnVisible={true}
        />
      </div>
    </div>
  );
};

export default LazyImage;
