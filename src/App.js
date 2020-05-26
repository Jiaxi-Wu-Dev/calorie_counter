import React, { Component } from "react";
import "./App.css";
import CalorieCounter from "./components/calorie/CalorieCounter";
import "./bootstrap.css";
import Api from "./components/Api";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CalorieCounter />
        <Api />
      </div>
    );
  }
}

export default App;
