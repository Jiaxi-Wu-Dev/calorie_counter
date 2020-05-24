// https://www.youtube.com/watch?v=bv3U-Y3fmsA - resourced used

import React from "react";
import axios from "axios";
import "../components/Search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
    };
    this.cancel = "";
  }
  fetchSearchResults = (query) => {
    const searchUrl = `https://api.edamam.com/api/food-database/parser?ingr=${query}&app_id=4f903669&app_key=d13ce675ba01b3c47f4d949d2a628c33`;

    if (this.cancel) {
      this.cancel.cancel();
    }

    this.cancel = axios.CancelToken.source();

    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const resultNotFound = !res.data.hints.length
          ? "There are no more search results"
          : "";
        this.setState({
          results: res.data.hints,
          message: resultNotFound,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch the data",
          });
        }
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query: query, loading: true, message: "" }, () => {
      this.fetchSearchResults(query);
    });
  };

  renderSearchResults = () => {
    const { results } = this.state;

    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          {results.map((result) => {
            return (
              <a
                key={result.food.foodId}
                href={result.food.image}
                className="result-item"
              >
                <h6 className="image-username">{result.username}</h6>
                <div className="image-wrapper">
                  <img
                    className="image"
                    src={result.food.image}
                    alt={result.username}
                  ></img>
                </div>
              </a>
            );
          })}
        </div>
      );
    }
  };

  render() {
    const { query } = this.state;
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
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default Search;
