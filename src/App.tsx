import React from 'react';

import { ISearchData } from './interfaces';

import { SearchBar } from './components/searchbar/SearchBar';
import { ThemeToggler } from './components/ThemeToggler';
import { MoviesList } from './components/moviesList/MoviesList';


import 'normalize.css';
import './styles/style.scss';


interface IAppState {
  shouldStartNewSearch: boolean,
  searchData: ISearchData,
  shouldRenderMoviesList: boolean,
  theme: 'light' | 'dark'
}


export class App extends React.Component<{}, IAppState> {
  state: IAppState = {
    shouldStartNewSearch: false,
    searchData: { title: '', type: '', plotLength: 'short', year: '', API_KEY: '' },
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
    });
  }


  resetStartNewSearch = (): void => {
    this.setState({ shouldStartNewSearch: false })
  }


  render() {
    const { shouldRenderMoviesList, searchData, shouldStartNewSearch } = this.state;

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