import React from 'react';
import css from './style.module.css';

function ImageGalleryItem({ images }) {
  return images.map(img => {
    return (
      <li className={css.ImageGalleryItem} key={img.id}>
        <img src={img.webformatURL} alt="" />
      </li>
    );
  });
}

export default ImageGalleryItem;
