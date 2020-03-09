import React from 'react';
import { mount } from 'enzyme';

import App from '../../App';


describe('App should render MoviesList ONLY after first search', () => {
   it('NOT renders MoviesList by default', () => {
      const wrapper = mount(<App />);

      expect(wrapper.state('shouldRenderMoviesList')).toBe(false);
      expect(wrapper.find('.movies-list')).toHaveLength(0);
   })

   it('renders MoviesList after search', () => {
      const wrapper = mount(<App />);
      const fakeData = { title:'some title',type:'', plotLength:'', year:'', API_KEY:'' };
      wrapper.instance().startSearching(fakeData);
      
      wrapper.update();
      expect(wrapper.state('shouldRenderMoviesList')).toBe(true);
      expect(wrapper.find('.movies-list')).toHaveLength(1);
   })
})