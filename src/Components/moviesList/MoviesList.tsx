import React, { useState, useEffect } from 'react';

import { ISearchData } from '../../interfaces';
import Movie from './Movie';


interface IMovieInfo {
   Title: string,
   Year: string,
   imdbID: string,
   Type: string,
   Poster: string
}


interface IMoviesListProps {
   searchData: ISearchData,
   shouldStartNewSearch: boolean,
   handleSearchStart: () => void
}


export const MoviesList: React.FC<IMoviesListProps> = (props) => {
   const [loadedMoviesCount, setLoadedMoviesCount] = useState<number>(0);
   const [totalMoviesCount, setTotalMoviesCount] = useState<number>(0);
   const [loadedPagesCount, setLoadedPagesCount] = useState<number>(0);
   const [loadedMovies, setLoadedMovies] = useState<IMovieInfo[]>([]);

   const [isError, setIsError] = useState<boolean>(false);
   const [errorMessage, setErrorMessage] = useState<string>('');

   useEffect(() => {
      if (props.shouldStartNewSearch) {
         startNewSearch();
      }
      // eslint-disable-next-line
   }, [props.shouldStartNewSearch])


   function startNewSearch(): void {
      props.handleSearchStart();
      resetState();
      loadNextPage(true);
   }


   function resetState(): void {
      setLoadedMoviesCount(0);
      setTotalMoviesCount(0);
      setLoadedMovies([]);
      setLoadedPagesCount(0);
   }


   // state updates asynchronous, so when it is reset
   // this function might use outdated state
   // so it receives parameter that tells whether it needs to use reset state
   async function loadNextPage(resetLoaded: boolean) {
      const nextPageNumber: number = resetLoaded ? 1 : loadedPagesCount + 1;
      const url: string = createURL(nextPageNumber);
      let data;

      try {
         const response = await fetch(url);
         data = await response.json();
      } catch (e) {
         handleError('Check your connection');
         return;
      }

      if (data.Response === 'False') {
         handleError(data.Error);
         return;
      }

      if (isError) setIsError(false);

      setLoadedMoviesCount(resetLoaded ? data.Search.length : loadedMoviesCount + data.Search.length);
      setTotalMoviesCount(+data.totalResults);
      setLoadedPagesCount(nextPageNumber);
      setLoadedMovies(resetLoaded ? [...data.Search] : [...loadedMovies, ...data.Search]);
   }


   function createURL(nextPageNumber: number) {
      const { API_KEY, title, type, year } = props.searchData;
      const url: URL = new URL('https://www.omdbapi.com');

      url.searchParams.set('apikey', API_KEY);
      url.searchParams.set('s', title);
      if (type) url.searchParams.set('type', type);
      if (year) url.searchParams.set('y', year);
      url.searchParams.set('page', nextPageNumber.toString());

      return url.toString();
   }


   function handleError(status: string) {
      setIsError(true);
      if (status === 'Movie not found!' || status === 'Check your connection') {
         setErrorMessage(status)
      } else if (status === 'Too many results.') {
         setErrorMessage('Too many results, specify your request')
      } else {
         setErrorMessage('Something went wrong...');
      }
   }


   function renderMoviesList() {
      return loadedMovies.map((movieData, index) => (
         <Movie
            data={{ ...movieData, plotLength: props.searchData.plotLength, API_KEY: props.searchData.API_KEY }}
            key={index}
         />
      ))
   }


   // returns either 'Show more', or 'That's all', or Loading
   function renderStatus() {
      if (totalMoviesCount === 0) {
         return <div className="movies-list__loading" >  <div></div><div></div><div></div><div></div>  </div>
      }
      if (totalMoviesCount === loadedMoviesCount) {
         return <button className="movies-list__movies-end">That's all</button>
      }

      return (
         <button
            className="movies-list__show-more-button"
            onClick={() => loadNextPage(false)}
         >Show more</button>
      )
   }


   return (
      isError ?
         <div className="error-message">{errorMessage}</div>
         :
         <div className="movies-list">
            <div className="movies-list__movies-container">
               {renderMoviesList()}
            </div>
            {renderStatus()}
         </div>
   )
}