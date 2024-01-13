import React from 'react';
import css from './style.module.css';
function Modal({ openedImage, close }) {
  const handleClick = e => {
    e.target === e.currentTarget && close();
  };
  return (
    <div className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={openedImage} alt="" />
      </div>
    </div>
  );
}

export default Modal;
