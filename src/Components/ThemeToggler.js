import React from 'react';

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

export default ThemeToggler;