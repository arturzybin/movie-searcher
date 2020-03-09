import React from 'react';
import PropTypes from 'prop-types';

import FullMovieInfo from './FullMovieInfo';


class Movie extends React.PureComponent {
   state = {
      isFullDataLoaded: false,
      fullData: {},
      isFullInfoOpened: false,
      isError: false
   }


   loadFullData = async () => {
      const url = this.createURL();
      let data;
      try {
         const response = await fetch(url);
         data = await response.json();
      } catch {
         this.setState({ isError: true })
         return;
      }

      if (this.state.isError) this.setState({ isError: false });
      this.setState({
         isFullDataLoaded: true,
         fullData: data
      })
   }


   createURL = () => {
      const { API_KEY } = this.props.data;//
      const {imdbID, plot} = this.props.data;
      const url = new URL('https://www.omdbapi.com');

      url.searchParams.set('apikey', API_KEY);
      url.searchParams.set('i', imdbID);
      url.searchParams.set('plot', plot);

      return url;
   }


   openFullInfo = (e) => {
      // to not trigger outside click that will close full info
      e.stopPropagation();

      if (this.state.isFullInfoOpened) return;

      if (!this.state.isFullDataLoaded) {
         this.loadFullData();
      }
      this.setState({ isFullInfoOpened: true });

      window.history.pushState(null, null, "?page=movie")
      window.onpopstate = this.closeFullInfo;
   }


   closeFullInfo = () => {
      if (this.state.isFullInfoOpened) {
         this.setState({ isFullInfoOpened: false });
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

Movie.propTypes = {
   data: PropTypes.shape({
      Poster: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      Type: PropTypes.string.isRequired,
      imdbID: PropTypes.string.isRequired,
      plot: PropTypes.string.isRequired,
   }).isRequired
}

export default Movie;