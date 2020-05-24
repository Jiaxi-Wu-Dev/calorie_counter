import React from "react";
import "./App.css";
import CalorieCounter from './components/calorie/CalorieCounter'

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
