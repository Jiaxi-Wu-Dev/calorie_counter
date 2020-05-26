import React, { Component } from "react";
import "./App.css";
import CalorieCounter from "./components/calorie/CalorieCounter";
import "./bootstrap.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CalorieCounter />
  
      </div>
    );
  }
}

export default App;
