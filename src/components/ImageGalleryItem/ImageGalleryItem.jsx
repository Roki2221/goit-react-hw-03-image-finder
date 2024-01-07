import React from 'react';

function ImageGalleryItem({ images }) {
  console.log('images', images);
  return images.hits.map(img => {
    return (
      <li className="gallery-item" key={img.id}>
        <img src={img.webformatURL} alt="" />
      </li>
    );
  });
}

export default ImageGalleryItem;
