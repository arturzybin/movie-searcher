import React from 'react';
import Filter from './Filter';
import PropTypes from 'prop-types';


class SearchBar extends React.Component {
   state= {
      isFilterClosed: true,
      isCentered: true,
      title: null,
      type: null,
      genre: null,
      year: null
   }


   triggerEnterKeySearch = (e) => {
      if (e.keyCode !== 13) return;
      this.handleSearch();
   }

   
   handleSearch = () => {
      const {isCentered, title, type, genre, year} = this.state;

      if (!title) return;

      if (isCentered) {
         this.setState({ isCentered: false });
      }

      this.props.handleSearch({
         title, type, genre, year
      })
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