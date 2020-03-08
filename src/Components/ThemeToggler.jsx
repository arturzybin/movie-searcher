import React from 'react';
import PropTypes from 'prop-types';

function ThemeToggler(props) {
   return (
      <input
         className="theme-toggler"
         type="checkbox"
         onChange={props.handleToggle}
         defaultChecked={true}
      >
      </input>
   )
}

ThemeToggler.propTypes = {
   handleToggle: PropTypes.func.isRequired,
}

export default ThemeToggler;