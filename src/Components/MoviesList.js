import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


function MoviesList(props) {
   const [loadedMoviesCount, setLoadedMoviesCount] = useState(0);
   const [totalMoviesCount, setTotalMoviesCount] = useState(0);
   const [loadedMovies, setLoadedMovies] = useState([]);
   const [loadedPagesCount, setLoadedPagesCount] = useState(0);

   useEffect(() => {
      if (props.shouldStartNewSearch) {
         startNewSearch();
      }
   }, [props.shouldStartNewSearch])


   async function startNewSearch() {
      props.handleSearchStart();
      resetState();
      const response = await fetch(process.env.PUBLIC_URL + 'search_response_1page.json');
      const data = await response.json();

      setLoadedMoviesCount(data.Search.length);
      setTotalMoviesCount(data.totalResults);
      setLoadedMovies(data.Search);
      setLoadedPagesCount(1);
   }

   function resetState() {
      setLoadedMoviesCount(0);
      setTotalMoviesCount(0);
      setLoadedMovies([]);
      setLoadedPagesCount(0);
   }


   function renderMoviesList() {
      const moviesTemplate = [];

      for (let movieData of loadedMovies) {
         const movie = (
            <div key={movieData.imdbID}>
               <div className='movies-list__movie'>
                  <img className="movies-list__poster" src={movieData.Poster} alt="poster" />
                  <h2 className="movies-list__title">{movieData.Title}</h2>
                  <div className="movies-list__year movies-list__info">{movieData.Year}</div>
                  <div className="movies-list__type movies-list__info">{movieData.Type}</div>
               </div>
            </div>
         )

         moviesTemplate.push(movie)
      }

      return moviesTemplate;
   }


   return (
      <>
         <div className="movies-list">
            {renderMoviesList()}
         </div>
         <button className="show-more-button">Show more</button>
      </>
   )
}

MoviesList.propTypes = {
   data: PropTypes.object.isRequired,
   shouldStartNewSearch: PropTypes.bool.isRequired,
   handleSearchStart: PropTypes.func.isRequired
}

export default MoviesList;