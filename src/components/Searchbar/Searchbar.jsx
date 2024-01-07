import React from 'react';
import css from './style.module.css';
function Searchbar({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e.currentTarget.elements.name.value);
    // e.currentTarget.elements.name.value = '';
  };
  return (
    <header>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className="button-label">Search</span>
        </button>

        <input
          name="name"
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;
