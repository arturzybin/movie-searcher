import React from 'react';
import PropTypes from 'prop-types';

function ThemeToggler({ handleToggle }) {
   return (
      <input
         className="theme-toggler"
         type="checkbox"
         onChange={handleToggle}
         defaultChecked={true}
      >
      </input>
   )
}

ThemeToggler.propTypes = {
   handleToggle: PropTypes.func.isRequired,
}

export default ThemeToggler;