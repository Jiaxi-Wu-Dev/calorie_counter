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
    const searchUrl = `https://api.edamam.com/api/food-database/parser?ingr=${query}&app_id=aa116602&app_key=
    f4a908c7f196d176e54c7062a42fa6e8`;

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

  addItem = (data) => {
    // you want to grab the items you clicked on
    console.log(data);
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
                    alt="n/a"
                  ></img>
                  <p>Name: {result.food.label}</p>
                  <p>Calories: {result.food.nutrients.ENERC_KCAL}</p>
                  <button className="btn btn-warning" onClick={this.addItem}>
                    Add
                  </button>
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
            /*  onClick={((e) => this.addItemCalories(e, data))} */
          ></input>
        </label>
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default Search;
