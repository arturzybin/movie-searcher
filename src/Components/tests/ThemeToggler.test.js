import React from 'react';
import { mount } from 'enzyme';

import { App } from '../../App';


describe('ThemeToggler should toggle app theme', () => {
   it('should switch to dark theme if not checked', () => {
      const wrapper = mount(<App />);
      wrapper.find('.theme-toggler').simulate('change', { target: { checked: false } });
      
      expect(wrapper.find('#app-root').hasClass('theme-light')).toBe(false);
      expect(wrapper.find('#app-root').hasClass('theme-dark')).toBe(true);
   })


   it('should switch to light theme if checked', () => {
      const wrapper = mount(<App />);
      wrapper.find('.theme-toggler').simulate('change', { target: { checked: true } });
      
      expect(wrapper.find('#app-root').hasClass('theme-light')).toBe(true);
      expect(wrapper.find('#app-root').hasClass('theme-dark')).toBe(false);
   })
})