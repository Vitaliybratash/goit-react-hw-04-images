import { PropTypes } from 'prop-types';
import { useState } from 'react';
export const Searchbar =({submitHandler})=> {
const [search , setSearch] = useState('')
  const onSubmitHandler = e => {
    e.preventDefault();
    submitHandler(search);
  };
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={onSubmitHandler}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            onChange={ e => setSearch( e.target.value )}
            value={search}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
Searchbar.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
