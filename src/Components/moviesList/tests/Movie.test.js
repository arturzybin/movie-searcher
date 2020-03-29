import React from 'react';
import { mount } from 'enzyme';

import { Movie } from '../Movie'

describe("Movie should open full info on click", () => {
   let wrapper;

   beforeEach(() => {
      wrapper = mount(<Movie data={{
         Poster: 'some text',
         Title: 'some text',
         Year: 'some text',
         Type: 'some text',
         imdbID: 'some text',
         plotLength: 'some text',
      }} />)
   })


   it('opens full info on click', () => {
      wrapper.find('.movie').simulate('click');
      const isMovieOpened = wrapper.find('.movie').instance().classList.contains('movie_opened');
      expect(isMovieOpened).toBe(true);
   })

   it('closes full info on outside click', () => {
      wrapper.find('.movie').simulate('click');
      wrapper.find('.movie-locker').simulate('click');
      const isMovieOpened = wrapper.find('.movie').instance().classList.contains('movie_opened');
      expect(isMovieOpened).toBe(false);
   })
})


test('Movie should fetch data when opens', () => {
   const wrapper = mount(<Movie data={{
      Poster: 'some text',
      Title: 'some text',
      Year: 'some text',
      Type: 'some text',
      imdbID: 'some text',
      plotLength: 'some text',
   }} />)

   const mockSuccessResponse = { "Title": "Pirate Radio", "Year": "2009", "Rated": "R", "Released": "13 Nov 2009", "Runtime": "117 min", "Genre": "Comedy, Drama, Music", "Director": "Richard Curtis", "Writer": "Richard Curtis", "Actors": "Michael Hadley, Charlie Rowe, Lucy Fleming, Philip Seymour Hoffman", "Plot": "A band of rogue DJs that captivated Britain, playing the music that defined a generation and standing up to a government that wanted classical music, and nothing else, on the airwaves.", "Language": "English", "Country": "UK, France, Germany", "Awards": "2 wins & 9 nominations.", "Poster": "https://m.media-amazon.com/images/M/MV5BMTMzMjYzMTMyM15BMl5BanBnXkFtZTcwOTk5NDA5Mg@@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "7.4/10" }, { "Source": "Rotten Tomatoes", "Value": "61%" }, { "Source": "Metacritic", "Value": "58/100" }], "Metascore": "58", "imdbRating": "7.4", "imdbVotes": "104,415", "imdbID": "tt1131729", "Type": "movie", "DVD": "13 Apr 2010", "BoxOffice": "$8,000,000", "Production": "Focus Features", "Website": "N/A", "Response": "True" };
   const mockJsonPromise = Promise.resolve(mockSuccessResponse);
   const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
   });
   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);


   wrapper.find('.movie').simulate('click');
   expect(global.fetch).toHaveBeenCalledTimes(1);

   jest.clearAllMocks();
})