import React from "react";

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

    handleOnInputChange = ( event ) => {
        const query = event.target.value;
        this.setState ({query: query})
    };

  render() {
    return (
      <div className="container">
        <h2> Calorie Counter </h2>
        <label className="search-label" htmlFor="search-inout">
          <input
            type="text"
            value=""
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