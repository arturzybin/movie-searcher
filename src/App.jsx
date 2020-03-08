import React from 'react';

import SearchBar from './Components/SearchBar';
import ThemeToggler from './Components/ThemeToggler';
import MoviesList from './Components/MoviesList';

import 'normalize.css';
import './styles/style.scss';


class App extends React.Component{
  state = {
    shouldStartNewSearch: false,
    searchData: {},
    shouldRenderMoviesList: false,
    theme: 'light'
  }


  toggleTheme = (event) => {
    const theme = event.target.checked ? 'light' : 'dark';
    this.setState({ theme })
  }


  startSearching = (data) => {
    this.setState({
      shouldStartNewSearch: true,
      searchData: {
        ...data,
        API_KEY: '1ff05d65'
      }
    });
  }


  render() {
    const { shouldRenderMoviesList, searchData, shouldStartNewSearch } = this.state;

    return (
      <main id="app-root" className={`theme-${this.state.theme}`} >
        <ThemeToggler handleToggle={this.toggleTheme} />
        <SearchBar handleSearch={(data) => {
          this.startSearching(data);
          this.setState({ shouldRenderMoviesList: true })
        }}/>

        {shouldRenderMoviesList &&
        <MoviesList
          data={searchData}
          shouldStartNewSearch={shouldStartNewSearch}
          handleSearchStart={ () => this.setState({ shouldStartNewSearch: false }) }
        />
        }
      </main>
    )
  }
}

export default App;