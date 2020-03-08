import React from 'react';
import PropTypes from 'prop-types';


class Movie extends React.PureComponent {
   state = {
      isFullDataLoaded: false,
      fullData: null,
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
      const id = this.props.data.imdbID;
      const url = new URL('https://www.omdbapi.com');

      url.searchParams.set('apikey', API_KEY);
      url.searchParams.set('i', id);

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
   }

   closeFullInfo = () => {
      if (this.state.isFullInfoOpened) {
         this.setState({ isFullInfoOpened: false });
      }
   }


   renderFullInfo = () => {
      if (this.state.isError) {
         return this.renderErrorMessage();
      }

      const { fullData: data } = this.state;

      let ratings = data.Ratings.map((rating) => (
         <span key={rating.Source}>
            {rating.Source}:{' '}
            <span className='movie__rating'>{rating.Value}</span>{', '}
         </span>
      )
      )
      if (!ratings.length) {
         ratings = 'N/A'
      };

      return (
         <>
            <button
               className="movie__close-full-info-button"
               onClick={this.closeFullInfo}
            >&#10008;</button>

            <div className="movie__runtime movie__label">{data.Runtime}</div>
            <div className="movie__common-info">{data.Plot}</div>
            <div className="movie__common-info">
               <span className="movie__common-info-title">Genre: </span>
               {data.Genre}
            </div>
            <div className="movie__common-info">
               <span className="movie__common-info-title">Released: </span>
               {data.Released}
            </div>
            <div className="movie__common-info">
               <span className="movie__common-info-title">Actors: </span>
               {data.Actors}
            </div>
            <div className="movie__common-info">
               <span className="movie__common-info-title">Director: </span>
               {data.Director}
            </div>
            <div className="movie__common-info">
               <span className="movie__common-info-title">Box office: </span>
               {data.BoxOffice}
            </div>
            <div className="movie__common-info">
               <span className="movie__common-info-title">Awards: </span>
               {data.Awards}
            </div>
            <div className="movie__common-info">
               <span className="movie__common-info-title">Ratings: </span>
               {ratings}
            </div>
         </>
      )
   }


   renderErrorMessage() {
      return (
         <>
            <button
               className="movie__close-full-info-button"
               onClick={this.closeFullInfo}
            >&#10008;</button>
            <div className="error-message error-message_size_small">Check your connection</div>
         </>
      )
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
                        this.renderFullInfo()
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
      imdbID: PropTypes.string.isRequired
   }).isRequired
}

export default Movie;