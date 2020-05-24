import React, { Component } from "react";

class CalorieCounter extends Component {
  render() {
    return (
      <div className="CalorieCounter">
        My Calorie Counter
        <LoginComponent />
      </div>
    );
  }
}

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "username",
      password: "",
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(event) {
    console.log(event.target.value);
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event) {
    console.log(event.target.value);
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    return (
      <div className="LoginComponent">
        User Name:{" "}
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        Password:{" "}
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <button>Login</button>
      </div>
    );
  }
}

export default CalorieCounter;
