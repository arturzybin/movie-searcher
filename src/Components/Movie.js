import React from 'react';
import PropTypes from 'prop-types';


class Movie extends React.PureComponent {
   state = {
      isFullDataLoaded: false,
      isFullInfoOpened: false
   }


   loadFullData = async () => {
      // const id = this.props.data.imdbID;
      const response = await fetch(
         `${process.env.PUBLIC_URL}movie_response.json`);
      const data = await response.json();
      this.setState({
         isFullDataLoaded: true,
         fullData: data
      })
   }


   openFullInfo = (e) => {
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
      const { fullData: data } = this.state;
      const ratings = data.Ratings.map((rating) => {
         return (
            <span key={rating.Source}>
               {rating.Source}:{' '}
               <span className='movie__rating'>{rating.Value}</span>{', '}
            </span>
         )
      })

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


   render() {
      const { Poster, Title, Year, Type } = this.props.data;
      const { isFullInfoOpened, isFullDataLoaded } = this.state;

      return (
         <div>
            <div className={isFullInfoOpened ? 'movie-locker' : ''} onClick={this.closeFullInfo}>
               <div
                  className={isFullInfoOpened ? 'movie movie_opened' : 'movie'}
                  onClick={this.openFullInfo}
               >
                  <img className="movie__poster" src={Poster} alt="poster" />
                  <h2 className="movie__title">{Title}</h2>
                  <div className="movie__year movie__label">{Year}</div>
                  <div className="movie__type movie__label">{Type}</div>

                  {
                     isFullInfoOpened && isFullDataLoaded ?
                        this.renderFullInfo() :
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