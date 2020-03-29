export interface ISearchData {
   title: string,
   type: string,
   plotLength: 'short' | 'full',
   year: string,
   API_KEY: string
}


export interface IMovieInfo {
   Title: string,
   Year: string,
   imdbID: string,
   Type: string,
   Poster: string
}

interface IRating {
   Source: string,
   Value: string
}

export interface IFullMovieInfo {
   Title: string,
   Year: string,
   Rated: string,
   Released: string,
   Runtime: string,
   Genre: string,
   Director: string,
   Writer: string,
   Actors: string,
   Plot: string,
   Language: string,
   Country: string,
   Awards: string,
   Poster: string,
   Ratings: IRating[],
   Metascore: string,
   imdbRating: string,
   imdbVotes: string,
   imdbID: string,
   Type: string,
   DVD: string,
   BoxOffice: string,
   Production: string,
   Website: string,
   Response: string
}