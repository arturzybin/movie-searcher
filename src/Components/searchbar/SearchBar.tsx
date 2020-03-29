import React from 'react';
import { ISearchData } from '../../interfaces';
import { Filter } from './Filter';


interface ISearchBarState {
   isFilterClosed: boolean,
   isCentered: boolean,
   title: string,
   type: string,
   plotLength: 'short' | 'full',
   year: string
}

interface ISearchBarProps {
   handleSearch: (searchData: ISearchData) => void
}


export class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
   state: ISearchBarState = {
      isFilterClosed: true,
      isCentered: true,
      title: '',
      type: '',
      plotLength: 'short',
      year: ''
   }


   triggerEnterKeySearch = (e: React.KeyboardEvent): void => {
      if (e.keyCode !== 13) return;
      this.handleSearch();
   }


   handleSearch = (): void => {
      const { isCentered, title, type, plotLength, year } = this.state;

      if (!title) return;

      if (isCentered) {
         this.setState({ isCentered: false });
      }

      this.props.handleSearch({
         title, type, plotLength, year, API_KEY: '1ff05d65'
      })
   }


   render() {
      const { isCentered, isFilterClosed } = this.state;

      return (
         <div className={isCentered ? "searchbar searchbar_centered" : "searchbar"}>
            <input
               className="searchbar__input"
               type="text"
               placeholder="Search movies"
               autoFocus={true}
               onChange={(e) => this.setState({ title: e.target.value })}
               onKeyDown={this.triggerEnterKeySearch}
            />
            <button
               className="searchbar__filter-button searchbar__button"
               onClick={() => this.setState({ isFilterClosed: !isFilterClosed })}
            />
            <button
               className="searchbar__search-button searchbar__button"
               onClick={this.handleSearch}
            />
            <Filter
               isClosed={isFilterClosed}
               handleTypeChange={(data) => this.setState({ type: data })}
               handlePlotChange={(data: 'short' | 'full') => this.setState({ plotLength: data })}
               handleYearChange={(data) => this.setState({ year: data })}
            />
         </div>
      )
   }
}