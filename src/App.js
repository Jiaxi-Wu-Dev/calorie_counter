import React from "react";
import "./App.css";
import Search from "./components/Search"
import Api from "./components/Api"

function App() {
  return <div className="App">
    <Api />
    <Search />
  </div>;
}

export default App;
