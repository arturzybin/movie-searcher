import React from 'react';
import Filter from './Filter';
import PropTypes from 'prop-types';


class SearchBar extends React.Component {
   state= {
      isFilterClosed: true,
      isCentered: true,
      text: this.props.text,
      type: null,
      genre: null,
      year: null
   }


   triggerEnterKeySearch = (e) => {
      if (e.keyCode !== 13) return;
      document.querySelector('.searchbar__search-button').click();
   }
   setupEnterKeySearch = (e) => {
      document.addEventListener('keypress', this.triggerEnterKeySearch);
   }
   cleanUpEnterKeySearch = (target) => {
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
      console.log(text)
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
               onFocus={this.setupEnterKeySearch}
               onBlur={this.cleanUpEnterKeySearch}
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

SearchBar.propTypes = {
   handleSearch: PropTypes.func.isRequired
}

export default SearchBar;