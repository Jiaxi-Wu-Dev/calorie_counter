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
    

    this.handleChange = this.handleChange.bind(this)
    this.loginClicked = this.loginClicked.bind(this)
  }


  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  loginClicked(){
      console.log(this.state)
  }

  render() {
    return (
      <div className="LoginComponent">
          <div>Invalid Credentials</div>
          <div>Login Successful</div>
        User Name:{" "}
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        Password:{" "}
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button onClick={this.loginClicked}>Login</button>
      </div>
    );
  }
}

export default CalorieCounter;
