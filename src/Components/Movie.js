import React from 'react';
import PropTypes from 'prop-types';


class Movie extends React.PureComponent {
   render() {
      const movieData = this.props.data;

      return (
         <div>
            <div className='movie'>
               <img className="movie__poster" src={movieData.Poster} alt="poster" />
               <h2 className="movie__title">{movieData.Title}</h2>
               <div className="movie__year movie__info">{movieData.Year}</div>
               <div className="movie__type movie__info">{movieData.Type}</div>
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