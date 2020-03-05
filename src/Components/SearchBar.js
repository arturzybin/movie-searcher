import React from 'react';
import Filter from './Filter';


class SearchBar extends React.Component {
   state= {
      isFilterClosed: true,
      isCentered: true,
      text: null,
      type: null,
      genre: null,
      year: null
   }

   triggerEnterKeySearch = (e) => {
      if (e.keyCode !== 13) return;
      document.querySelector('.searchbar__search-button').click();
   }

   setupEnterSearch = (e) => {
      document.addEventListener('keypress', this.triggerEnterKeySearch);
   }

   cleanUpEnterSearch = (target) => {
      document.removeEventListener('keypress', this.triggerEnterKeySearch);
      target.onBlur = null;
   }

   
   handleSearch = () => {
      const {isCentered, text, type, genre, year} = this.state;

      if (isCentered && text) {
         this.setState({ isCentered: false });
      }

      this.props.handleSearch({
         text, type, genre, year
      })
      console.log({
         text, type, genre, year
      }, this.state.isFilterClosed)
   }

   render() {
      const {isCentered, isFilterClosed} = this.state;

      return (
         <div className={isCentered ? "searchbar searchbar_centered" : "searchbar"}>
            <input
               className="searchbar__input"
               type="text"
               placeholder="Search movies"
               autoFocus={true}
               onChange={(e) => this.setState({ text: e.target.value })}
               onFocus={this.setupEnterSearch}
               onBlur={this.cleanUpEnterSearch}
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
               handleGenreChange={(data) => this.setState({ genre: data })}
               handleYearChange={(data) => this.setState({ year: data })}
            />
         </div>
      )
   }
}

export default SearchBar;