import React from 'react';

function Searchbar({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e.currentTarget.elements.name.value);
    e.currentTarget.elements.name.value = '';
  };
  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
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
