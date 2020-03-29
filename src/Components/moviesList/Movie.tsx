import React from 'react';
import { IFullMovieInfo } from '../../interfaces';
import { FullMovieInfo } from './FullMovieInfo';


interface IMovieProps {
   data: {
      Poster: string,
      Title: string,
      Year: string,
      Type: string,
      imdbID: string,
      plotLength: 'short' | 'full',
      API_KEY: string
   }
}

interface IMovieState {
   isFullDataLoaded: boolean,
   fullData: IFullMovieInfo,
   isFullInfoOpened: boolean,
   isError: boolean
}


export class Movie extends React.PureComponent<IMovieProps, IMovieState> {
   state: IMovieState = {
      isFullDataLoaded: false,
      fullData: {} as IFullMovieInfo,
      isFullInfoOpened: false,
      isError: false
   }


   loadFullData = async () => {
      const url: string = this.createURL();
      let data;

      try {
         const response = await fetch(url);
         data = await response.json();
      } catch {
         this.setState({ isError: true } as IMovieState)
         return;
      }

      this.setState({
         isFullDataLoaded: true,
         fullData: data,
         isError: false
      } as IMovieState)
   }


   createURL = (): string => {
      const { API_KEY } = this.props.data;//
      const { imdbID, plotLength } = this.props.data;
      const url: URL = new URL('https://www.omdbapi.com');

      url.searchParams.set('apikey', API_KEY);
      url.searchParams.set('i', imdbID);
      url.searchParams.set('plot', plotLength);

      return url.toString()
   }


   openFullInfo = (e: React.MouseEvent): void => {
      // to not trigger outside click that will close full info
      e.stopPropagation();

      if (this.state.isFullInfoOpened) return;

      if (!this.state.isFullDataLoaded) {
         this.loadFullData();
      }
      this.setState({ isFullInfoOpened: true });

      window.history.pushState(null, '', "?page=movie")
      window.onpopstate = this.closeFullInfo;
   }


   closeFullInfo = (): void => {
      if (this.state.isFullInfoOpened) {
         this.setState({ isFullInfoOpened: false } as IMovieState);
      }
      window.onpopstate = null;
   }



   render() {
      const { Poster, Title, Year, Type } = this.props.data;
      const { isFullInfoOpened, isFullDataLoaded, isError } = this.state;

      return (
         <div>
            <div className={isFullInfoOpened ? 'movie-locker' : ''} onClick={this.closeFullInfo}>
               <div
                  className={isFullInfoOpened ? 'movie movie_opened' : 'movie'}
                  onClick={this.openFullInfo}
               >
                  {
                     Poster === "N/A" ?
                        <div className="movie__poster movie__poster-replacer" />
                        :
                        <img className="movie__poster" src={Poster} alt="poster" />
                  }
                  <h2 className="movie__title">{Title}</h2>
                  <div className="movie__year movie__label">{Year}</div>
                  <div className="movie__type movie__label">{Type}</div>

                  {
                     (isFullInfoOpened && isFullDataLoaded) || (isFullInfoOpened && isError) ?
                        <FullMovieInfo
                           isError={isError}
                           handleCloseButtonClick={this.closeFullInfo}
                           data={this.state.fullData}
                        />
                        :
                        null
                  }
               </div>
            </div>
         </div>
      )
   }
}