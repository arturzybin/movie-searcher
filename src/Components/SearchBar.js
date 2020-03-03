import React from 'react';

function SearchBar(props) {
   return (
      <div className="searchbar searchbar_centered">
         <input
            className="searchbar__input"
            type="text"
            placeholder="Search movies"
            autoFocus={true}
         />
         <button className="searchbar__settings searchbar__button"></button>
         <input
            className="searchbar__search-button searchbar__button"
            type="submit"
            value=""
         />
      </div>
   )
}

export default SearchBar;