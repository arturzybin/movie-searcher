import React from 'react';
import { mount } from 'enzyme';

import { SearchBar } from '../SearchBar';
import { ISearchData } from '../../../interfaces';


describe('Searchbar should start searching only if there is text at the title input', () => {

   it("should NOT start searching without any text", () => {
      const searchCallback = jest.fn(() => {})
      const wrapper = mount(<SearchBar handleSearch={searchCallback} />);
      wrapper.find('.searchbar__search-button').simulate('click')
      
      expect(searchCallback.mock.calls.length).toBe(0);
   })

   it("should start searching if there is text", () => {
      const searchCallback = jest.fn(() => {});
      const wrapper = mount(<SearchBar handleSearch={searchCallback} />);
      wrapper.setState({ title: 'some title' });
      wrapper.find('.searchbar__search-button').simulate('click');
      
      expect(searchCallback.mock.calls.length).toBe(1);
   })
})



test('Searchbar should have relevant search info when calling search callback', () => {
   const searchCallback = jest.fn(() => {});
   const wrapper = mount(<SearchBar handleSearch={searchCallback} />);

   wrapper.find('.searchbar__input').instance().value = 'some title';
   wrapper.find('.searchbar__input').simulate('change');

   wrapper.find('.filter__select select[name="type"]').simulate('change', {target: {value: 'movie'}});
   wrapper.find('.filter__select select[name="plotLength"]').simulate('change', {target: {value: 'full'}});
   wrapper.find('.filter__select select[name="year"]').simulate('change', {target: {value: '2000'}});

   wrapper.find('.searchbar__search-button').simulate('click');


   expect(searchCallback.mock.calls[0][0].title).toBe('some title');
   expect(searchCallback.mock.calls[0][0].type).toBe('movie');
   expect(searchCallback.mock.calls[0][0].plotLength).toBe('full');
   expect(searchCallback.mock.calls[0][0].year).toBe('2000');
})



test('Searchbar should start searching after pressing the enter key on it', () => {
   const wrapper = mount(<SearchBar handleSearch={() => {}} />);
   wrapper.setState({ title: 'some title' });
   wrapper.find('.searchbar__input').simulate('keydown', {keyCode: 13});

   expect(wrapper.find('.searchbar').hasClass('searchbar_centered')).toBe(false);
})



describe('Searchbar should lose classname "searchbar_centered" after first search', () => {

   it('should have classname by default', () => {
      const wrapper = mount(<SearchBar handleSearch={() => {}} />);

      expect(wrapper.find('.searchbar').hasClass('searchbar_centered')).toBe(true);
   })


   it('should lose classname after search', () => {
      const wrapper = mount(<SearchBar handleSearch={() => {}} />);
      wrapper.setState({ title: 'some title' });
      wrapper.find('.searchbar__search-button').simulate('click');
      
      expect(wrapper.find('.searchbar').hasClass('searchbar_centered')).toBe(false);
   })
})