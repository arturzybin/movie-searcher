import React from 'react';

import SearchBar from './Components/SearchBar';
import ThemeToggler from './Components/ThemeToggler';
import MoviesList from './Components/MoviesList';

import 'normalize.css';
import './styles/style.scss';


class App extends React.Component{
  state = {
    theme: 'light',
    startNewSearch: false,
    searchInfo: {},
    showMoviesList: false,
  }


  toggleTheme = (event) => {
    const theme = event.target.checked ? 'light' : 'dark';
    this.setState({ theme })
  }


  startSearching = async (data) => {
    this.setState({
      startNewSearch: true,
      searchData: data
    });
  }


  render() {
    const { showMoviesList, searchData, startNewSearch } = this.state;

    return (
      <main id="app-root" className={`theme-${this.state.theme}`} >
        <ThemeToggler handleToggle={this.toggleTheme} />
        <SearchBar handleSearch={() => {
          this.startSearching();
          this.setState({ showMoviesList: true })
        }}/>

        {showMoviesList &&
        <MoviesList
          data={searchData}
          startNewSearch={startNewSearch}
          handleSeachStart={ () => this.setState({ startNewSearch: false }) }
        />
        }
      </main>
    )
  }
}

export default App;