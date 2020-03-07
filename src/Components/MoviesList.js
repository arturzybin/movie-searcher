import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Movie from './Movie';


function MoviesList(props) {
   const [loadedMoviesCount, setLoadedMoviesCount] = useState(0);
   const [totalMoviesCount, setTotalMoviesCount] = useState(0);
   const [loadedMovies, setLoadedMovies] = useState([]);
   const [loadedPagesCount, setLoadedPagesCount] = useState(0);

   useEffect(() => {
      if (props.shouldStartNewSearch) {
         startNewSearch();
      }
      // eslint-disable-next-line
   }, [props.shouldStartNewSearch])


   function startNewSearch() {
      props.handleSearchStart();
      resetState();
      loadNextPage(true);
   }


   function resetState() {
      setLoadedMoviesCount(0);
      setTotalMoviesCount(0);
      setLoadedMovies([]);
      setLoadedPagesCount(0);
   }


   async function loadNextPage(resetLoaded) {
      const nextPageNumber = resetLoaded ? 1 : loadedPagesCount + 1;
      const response = await fetch(
         `${process.env.PUBLIC_URL}search_response_${nextPageNumber}page.json`);
      const data = await response.json();

      setLoadedMoviesCount(resetLoaded ? data.Search.length : loadedMoviesCount + data.Search.length);
      setTotalMoviesCount(data.totalResults);
      setLoadedMovies(resetLoaded ? [...data.Search] : [...loadedMovies, ...data.Search]);
      setLoadedPagesCount(nextPageNumber);
   }


   function renderMoviesList() {
      return loadedMovies.map((movieData) => <Movie data={movieData} key={movieData.imdbID} />)
   }

   return (
      <div className="movies-list">
         <div className="movies-list__movies-container">
            {renderMoviesList()}
         </div>
         {
            totalMoviesCount === loadedMoviesCount ? 
            <button className="movies-list__movies-over">That's all</button> :
            <button className="movies-list__show-more-button" onClick={() => loadNextPage(false)}>Show more</button>
         }
      </div>
   )
}

MoviesList.propTypes = {
   data: PropTypes.object.isRequired,
   shouldStartNewSearch: PropTypes.bool.isRequired,
   handleSearchStart: PropTypes.func.isRequired
}

export default MoviesList;