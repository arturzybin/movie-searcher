import React, { useState } from 'react';
import Filter from './Filter';


function SearchBar() {
   const [isFilterClosed, setFilterClosed] = useState(true);

   const [text, setText] = useState('');

   return (
      <div className="searchbar searchbar_centered">
         <input
            className="searchbar__input"
            type="text"
            placeholder="Search movies"
            autoFocus={true}
            onChange={(e) => setText(e.target.value)}
         />
         <button
            className="searchbar__filter-button searchbar__button"
            onClick={ () => setFilterClosed(!isFilterClosed) }
         ></button>
         <input
            className="searchbar__search-button searchbar__button"
            type="submit"
            value=""
         />
         <Filter isClosed={isFilterClosed} />
      </div>
   )
}

export default SearchBar;