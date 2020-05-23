import React from "react";
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: {},
      loading: false,
      message: "",
    };
  }
    fetchSearchResults = ( updatedPageNo, query) => {
        const searchUrl = `https://api.edamam.com/api/food-database/parser?ingr=${query}&app_id=4f903669&app_key=d13ce675ba01b3c47f4d949d2a628c33`
    }
    handleOnInputChange = ( event ) => {
        const query = event.target.value;
        this.setState ({query: query, loading: true, message: ''})
    };

  render() {
      const {query} = this.state;
    return (
      <div className="container">
        <h2> Calorie Counter </h2>
        <label className="search-label" htmlFor="search-inout">
          <input
            type="text"
            name="query"
            value={query}
            id="search input"
            placeholder="Search..."
            onChange={this.handleOnInputChange}
          ></input>
        </label>
      </div>
    );
  }
}

export default Search