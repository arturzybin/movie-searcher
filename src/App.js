import React from 'react';
import SearchBar from './Components/SearchBar';
import ThemeToggler from './Components/ThemeToggler';

import 'normalize.css';
import './styles/style.scss';


class App extends React.Component{
  state = {
    theme: 'light',
  }


  toggleTheme = (event) => {
    const theme = event.target.checked ? 'light' : 'dark';
    this.setState({ theme })
  }


  search = (params) => {

  }


  render() {
    return (
      <main id="app-root" className={`theme-${this.state.theme}`} >
        <ThemeToggler handleToggle={this.toggleTheme} />
        <SearchBar handleSearch={this.search} />
      </main>
    )
  }
}

export default App;