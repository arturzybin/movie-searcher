import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import SearchBar from '../SearchBar';


let container = null;
beforeEach(() => {
   container = document.createElement('div');
   document.body.append(container);
})
afterEach(() => {
   unmountComponentAtNode(container);
   container.remove();
   container = null;
})


test('Filter is closed by default', () => {
   act(() => {
      render(<SearchBar handleSearch={() => {}} />, container);
   })

   const isFilterClosed = document.querySelector('.filter').classList.contains('filter_closed');
   expect(isFilterClosed).toBe(true);
})


test('Filter opens on filter button click', () => {
   act(() => {
      render(<SearchBar handleSearch={() => {}} />, container);
      document.querySelector('.searchbar__filter-button').click();
   })

   const isFilterClosed = document.querySelector('.filter').classList.contains('filter_closed');
   expect(isFilterClosed).toBe(false);
})