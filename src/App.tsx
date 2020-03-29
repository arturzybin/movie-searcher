import React from 'react';

import SearchBar from './components/searchbar/SearchBar';
import ThemeToggler from './components/ThemeToggler';
import MoviesList from './components/moviesList/MoviesList';

import { IAppState, ISearchData } from './interfaces';

import 'normalize.css';
import './styles/style.scss';


class App extends React.Component {
  state: IAppState = {
    shouldStartNewSearch: false,
    searchData: {},
    shouldRenderMoviesList: false,
    theme: 'light'
  }


  toggleTheme = (event: React.FormEvent<HTMLInputElement>): void => {
    const themeCheckbox = event.target as HTMLInputElement
    const theme = themeCheckbox.checked ? 'light' : 'dark'
    this.setState({ theme } as IAppState)
  }


  startSearching = (searchData: ISearchData): void => {
    this.setState({
      shouldRenderMoviesList: true,
      shouldStartNewSearch: true,
      searchData
    } as IAppState);
  }


  resetStartNewSearch = (): void => {
    this.setState({ shouldStartNewSearch: false } as IAppState)
  }


  render() {
    const { shouldRenderMoviesList, searchData, shouldStartNewSearch }: IAppState = this.state;

    return (
      <main id="app-root" className={`theme-${this.state.theme}`} >
        <ThemeToggler handleToggle={this.toggleTheme} />
        <SearchBar handleSearch={this.startSearching} />

        {shouldRenderMoviesList &&
          <MoviesList
            searchData={searchData}
            shouldStartNewSearch={shouldStartNewSearch}
            handleSearchStart={this.resetStartNewSearch}
          />
        }
      </main>
    )
  }
}

export default App;