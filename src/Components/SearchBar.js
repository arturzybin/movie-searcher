import React, { useState } from 'react';

function SearchBar() {
   const [text, setText] = useState('');

   return (
      <div className="searchbar ">
         <input
            className="searchbar__input"
            type="text"
            placeholder="Search movies"
            autoFocus={true}
            onChange={(e) => setText(e.target.value)}
         />
         <button className="searchbar__filter searchbar__button"></button>
         <input
            className="searchbar__search-button searchbar__button"
            type="submit"
            value=""
         />
      </div>
   )
}

export default SearchBar;