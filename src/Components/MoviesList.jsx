import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Movie from './Movie';


function MoviesList(props) {
   const [loadedMoviesCount, setLoadedMoviesCount] = useState(0);
   const [totalMoviesCount, setTotalMoviesCount] = useState(0);
   const [loadedMovies, setLoadedMovies] = useState([]);
   const [loadedPagesCount, setLoadedPagesCount] = useState(0);

   const [isError, setIsError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

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


   // state updates asynchronous, so when it is reset
   // this function might use not current state
   // so it receives parameter that tells whether it needs to use reset state
   async function loadNextPage(resetLoaded) {
      const nextPageNumber = resetLoaded ? 1 : loadedPagesCount + 1;

      const url = createURL(nextPageNumber);
      let data;
      try{
         const response = await fetch(url);
         data = await response.json();
      } catch(e) {
         handleError('Check your connection');
         return;
      }
      if (data.Response === 'False') {
         handleError(data.Error);
         return;
      }
      
      if (isError) setIsError(false);
      setLoadedMoviesCount(resetLoaded ? data.Search.length : loadedMoviesCount + data.Search.length);
      if (data.totalResults) setTotalMoviesCount(+data.totalResults);
      setLoadedMovies(resetLoaded ? [...data.Search] : [...loadedMovies, ...data.Search]);
      setLoadedPagesCount(nextPageNumber);
   }


   function createURL(nextPageNumber) {
      const {API_KEY, title, type, year} = props.data;
      const url = new URL('http://www.omdbapi.com');

      url.searchParams.set('apikey', API_KEY);
      url.searchParams.set('s', title);
      if (type) url.searchParams.set('type', type);
      if (year) url.searchParams.set('y', year);
      url.searchParams.set('page', nextPageNumber);

      return url;
   }


   function handleError(errorMessage) {
      setIsError(true);
      if (errorMessage === 'Movie not found!' || errorMessage === 'Check your connection') {
         setErrorMessage(errorMessage)
      } else {
         setErrorMessage('Something went wrong...');
      }
   }


   function renderMoviesList() {
      return loadedMovies.map((movieData) => <Movie data={{...movieData, API_KEY: props.data.API_KEY}} key={movieData.imdbID} />)
   }


   return (
      isError ? 
      <div className="error-message">{errorMessage}</div> 
      :
      <div className="movies-list">
         <div className="movies-list__movies-container">
            {renderMoviesList()}
         </div>
         {
            totalMoviesCount === loadedMoviesCount ? 
            <button className="movies-list__movies-over">That's all</button> 
            :
            <button
               className="movies-list__show-more-button"
               onClick={() => loadNextPage(false)}
            >Show more</button>
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