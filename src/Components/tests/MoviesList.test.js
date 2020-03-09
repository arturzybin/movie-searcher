import React from 'react';
import { mount } from 'enzyme';

import MoviesList from '../MoviesList'

// Silence until enzyme fixed to use ReactTestUtils.act()
// If not silenced we get the following warning:
// console.error../../ node_modules / react - dom / cjs / react - dom.development.js: 506
// Warning: An update to _default inside a test was not wrapped in act(...).

// When testing, code that causes React state updates should be wrapped into act(...):

// act(() => {
//   /* fire events that update state */
// });
// /* assert on the output */

// This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act

const originalError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});


describe('MoviesList should start searching', () => {
   it("doesn't start searching if shouldStartNewSearch is false", () => {
      const handleSearchStart = jest.fn(() => { });
      const fakeData = { title: 'some title', type: '', plot: '', year: '', API_KEY: '' };
      const wrapper = mount( <MoviesList data={fakeData} shouldStartNewSearch={false} handleSearchStart={handleSearchStart} /> );
      wrapper.update();

      expect(handleSearchStart.mock.calls.length).toBe(0);
   })

   it("starts searching if shouldStartNewSearch is true", () => {
      const handleSearchStart = jest.fn(() => { });
      const fakeData = { title: 'some title', type: '', plot: '', year: '', API_KEY: '' };
      const wrapper = mount( <MoviesList data={fakeData} shouldStartNewSearch={true} handleSearchStart={handleSearchStart} /> );
      wrapper.update();

      expect(handleSearchStart.mock.calls.length).toBe(1);
   })
})


// describe('MoviesList should load pages', () => {
//    let fakeData;

//    beforeEach(() => {
//       fakeData = { title: 'some title', type: '', plot: '', year: '', API_KEY: '' };
      
//       const mockSuccessResponse = {
//          "Search": [{
//             "Title": "Batman: Under the Red Hood",
//             "Year": "2010",
//             "imdbID": "tt1569923",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
//          }],
//          "totalResults": "372",
//          "Response": "True"
//       };
//       const mockJsonPromise = Promise.resolve(mockSuccessResponse);
//       const mockFetchPromise = Promise.resolve({
//          json: () => mockJsonPromise,
//       });
//       jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

//       jest.spyOn(React, "useEffect").mockImplementation(f => f());
//    })

//    afterEach(() => {
//       jest.clearAllMocks();
//    })


//    it('loads first page automatically', () => {
//       mount(<MoviesList data={fakeData} shouldStartNewSearch={true} handleSearchStart={() => { }} />);
//       expect(global.fetch).toHaveBeenCalledTimes(1);
//    })

//    it('loads second page on calling loadNextPage()', async () => {
//       const wrapper = mount(<MoviesList data={fakeData} shouldStartNewSearch={true} handleSearchStart={() => { }} />);
//       wrapper.find('.movies-list__show-more-button').instance().simulate('click');
//       wrapper.update()
//       expect(global.fetch).toHaveBeenCalledTimes(2);
//    })
// })