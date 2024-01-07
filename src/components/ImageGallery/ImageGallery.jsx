import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './style.module.css';

function ImageGallery({ photos }) {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem images={photos}></ImageGalleryItem>
    </ul>
  );
}

export default ImageGallery;
