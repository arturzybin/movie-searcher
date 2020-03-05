import React from 'react';
import { mount } from 'enzyme';

import SearchBar from '../SearchBar';


test('Filter is closed by default', () => {
   const wrapper = mount(<SearchBar handleSearch={() => {}} />);

   expect(wrapper.find('.filter').hasClass('filter_closed')).toBe(true);
})


test('Filter opens on filter button click', () => {
   const wrapper = mount(<SearchBar handleSearch={() => {}} />);
   wrapper.find('.searchbar__filter-button').simulate('click');
   
   expect(wrapper.find('.filter').hasClass('filter_closed')).toBe(false);
})