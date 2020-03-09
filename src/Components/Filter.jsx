import React from 'react';
import PropTypes from 'prop-types';


function Filter(props) {
   return (
      // just hardcode all values, don't wanna bother so much about this
      
      <div className={props.isClosed ? 'filter filter_closed' : 'filter'}>
         <div className="filter__select">
            <select name="type" onChange={(e) => props.handleTypeChange(e.target.value)}>
               <option value="">Select what to search</option>
               <option>Movie</option>
               <option>Series</option>
               <option>Episode</option>
            </select>
         </div>

         <div className="filter__select">
            <select name="plotLength" onChange={(e) => props.handlePlotChange(e.target.value)}>
               <option value="short">Load short plot</option>
               <option value="full">Load full plot</option>
            </select>
         </div>

         {/* maybe in future, paid version of api needed */}
         {/* <div className="filter__select">
            <select name="genre" onChange={(e) => props.handleGenreChange(e.target.value)}>
               <option value="">Select genre</option>
               <option>Action</option>
               <option>Adventure</option>
               <option>Animation</option>
               <option>Biography</option>
               <option>Comedy</option>
               <option>Crime</option>
               <option>Documentary</option>
               <option>Drama</option>
               <option>Fantasy</option>
               <option>Horror</option>
               <option>Music</option>
               <option>Sci-Fi</option>
               <option>War</option>
               <option>Western</option>
            </select>
         </div> */}

         <div className="filter__select">
            <select name="year" onChange={(e) => props.handleYearChange(e.target.value)}>
               <option value="">Select year</option>
               <option>2020</option>
               <option>2019</option>
               <option>2018</option>
               <option>2017</option>
               <option>2016</option>
               <option>2015</option>
               <option>2014</option>
               <option>2013</option>
               <option>2012</option>
               <option>2011</option>
               <option>2010</option>
               <option>2009</option>
               <option>2008</option>
               <option>2007</option>
               <option>2006</option>
               <option>2005</option>
               <option>2004</option>
               <option>2003</option>
               <option>2002</option>
               <option>2001</option>
               <option>2000</option>
               <option>1999</option>
               <option>1998</option>
               <option>1997</option>
               <option>1996</option>
               <option>1995</option>
               <option>1994</option>
               <option>1993</option>
               <option>1992</option>
               <option>1991</option>
               <option>1990</option>
               <option>1989</option>
               <option>1988</option>
               <option>1987</option>
               <option>1986</option>
               <option>1985</option>
               <option>1984</option>
               <option>1983</option>
               <option>1982</option>
               <option>1981</option>
               <option>1980</option>
               <option>1979</option>
               <option>1978</option>
               <option>1977</option>
               <option>1976</option>
               <option>1975</option>
               <option>1974</option>
               <option>1973</option>
               <option>1972</option>
               <option>1971</option>
               <option>1970</option>
               <option>1969</option>
               <option>1968</option>
               <option>1967</option>
               <option>1966</option>
               <option>1965</option>
               <option>1964</option>
               <option>1963</option>
               <option>1962</option>
               <option>1961</option>
               <option>1960</option>
               <option>1959</option>
               <option>1958</option>
               <option>1957</option>
               <option>1956</option>
               <option>1955</option>
               <option>1954</option>
               <option>1953</option>
               <option>1952</option>
               <option>1951</option>
               <option>1950</option>
               <option>1949</option>
               <option>1948</option>
               <option>1947</option>
               <option>1946</option>
               <option>1945</option>
               <option>1944</option>
               <option>1943</option>
               <option>1942</option>
               <option>1941</option>
               <option>1940</option>
               <option>1939</option>
               <option>1938</option>
               <option>1937</option>
               <option>1936</option>
               <option>1935</option>
               <option>1934</option>
               <option>1933</option>
               <option>1932</option>
               <option>1931</option>
               <option>1930</option>
            </select>
         </div>
      </div>
   )
}

Filter.propTypes = {
   isClosed: PropTypes.bool.isRequired,
   handleTypeChange: PropTypes.func.isRequired,
   handlePlotChange: PropTypes.func.isRequired,
   handleYearChange: PropTypes.func.isRequired
}

export default Filter;