import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { mount } from 'enzyme';

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

describe('Searchbar becomes uncentered after first search', () => {
   test('should be centered by default', () => {
      act(() => {
         render(<SearchBar handleSearch={() => {}} />, container);
      })

      const isSearchBarCentered = document.querySelector('.searchbar').classList.contains('searchbar_centered');
      expect(isSearchBarCentered).toBe(true);
   })

   test('should stay centered if there is no text in searchbar', () => {
      act(() => {
         render(<SearchBar handleSearch={() => {}} />, container);
         document.querySelector('.searchbar__search-button').click();
      })

      const isSearchBarCentered = document.querySelector('.searchbar').classList.contains('searchbar_centered');
      expect(isSearchBarCentered).toBe(true);
   })

   test('should become uncentered after search', () => {
      act(() => {
         // render(<SearchBar text='abc' handleSearch={() => {}} />, container);
         // const input = document.querySelector('.searchbar__input');
         // input.value = 'some text';
         // ReactTestUtils.Simulate.change(input, {target: {value: 'some text'}});
         // document.querySelector('.searchbar__search-button').click();
         const wrapper = mount(<SearchBar handleSearch={() => {}} />);
         const input = wrapper.find('.searchbar__input');
         input.instance().value = "correctUsername";
         input.simulate('change');
         wrapper.find('.searchbar__search-button').simulate('click');
      })

      const isSearchBarCentered = document.querySelector('.searchbar').classList.contains('searchbar_centered');
      expect(isSearchBarCentered).toBe(false);
   })
})