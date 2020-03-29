import React from 'react';

interface IThemeTogglerProps {
   handleToggle: (event: React.FormEvent<HTMLInputElement>) => void
}

export const ThemeToggler: React.FC<IThemeTogglerProps> = ({ handleToggle }) => {
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