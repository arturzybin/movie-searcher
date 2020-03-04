import React, { useState, useEffect, useRef } from 'react';
import Filter from './Filter';


function SearchBar(props) {
   const [isFilterClosed, setFilterClosed] = useState(true);
   const [isCentered, setIsCentered] = useState(true);

   const [text, setText] = useState();
   const [type, setType] = useState();
   const [genre, setGenre] = useState();
   const [year, setYear] = useState();


   const textInput = useRef();
   const searchButton = useRef();
   useEffect(() => {
      const triggerSearch = (e) => {
         if (e.keyCode !== 13) return;
         if (document.activeElement !== textInput.current
            && document.activeElement !== searchButton.current) {
            return
         }

         handleSearch();
      }

      document.addEventListener('keypress', triggerSearch);

      return (() => {
         document.removeEventListener('keypress', triggerSearch);
      })
   }, [])

   
   const handleSearch = () => {
      if (isCentered && textInput.current.value) {
         setIsCentered(false);
      }
      props.handleSearch({
         text, type, genre, year
      })
   }

   return (
      <div className={isCentered ? "searchbar searchbar_centered" : "searchbar"}>
         <input
            className="searchbar__input"
            type="text"
            placeholder="Search movies"
            autoFocus={true}
            onChange={(e) => setText(e.target.value)}
            ref={textInput}
         />
         <button
            className="searchbar__filter-button searchbar__button"
            onClick={() => setFilterClosed(!isFilterClosed)}
         />
         <button
            className="searchbar__search-button searchbar__button"
            onClick={handleSearch}
            ref={searchButton}
         />
         <Filter
            isClosed={isFilterClosed}
            handleTypeChange={setType}
            handleGenreChange={setGenre}
            handleYearChange={setYear}
         />
      </div>
   )
}

export default SearchBar;