import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ photos }) {
  console.log('photos', photos);

  return (
    <ul className="gallery">
      <ImageGalleryItem images={photos}></ImageGalleryItem>
    </ul>
  );
}

export default ImageGallery;
