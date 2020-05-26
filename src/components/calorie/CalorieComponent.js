import React, { Component } from "react";

class CalorieComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      description: "Learn Forms",
      targetDate: new Date()
    };
  }
  
  render() {
    return <div>Calorie Component for id - {this.props.match.params.id}</div>;
  }
}

export default CalorieComponent;
