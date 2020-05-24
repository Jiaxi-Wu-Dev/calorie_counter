import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

class CalorieCounter extends Component {
  render() {
    return (
      <div className="CalorieCounter">
        My Calorie Counter
        <Router>
          <>
            <Switch>
              <Route path="/" exact component={LoginComponent} />
              <Route path="/login" component={LoginComponent} />
              <Route path="/welcome/:name" component={WelcomeComponent} />
              <Route path="" component={ErrorComponent} />

            </Switch>
          </>
        </Router>
        {/* <LoginComponent />
        <WelcomeComponent /> */}
      </div>
    );
  }
}

class WelcomeComponent extends Component {
  render() {
    return <div>Welcome {this.props.match.params.name} </div>;
  }
}

function ErrorComponent() {
  return (
    <div>
      {" "}
      An Error Occured, wrong URL entered. Please go back and try again
    </div>
  );
}

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "username",
      password: "",
      hasLoginFailed: false,
      showSuccessMessage: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  loginClicked() {
    if (this.state.username === "jiaxi" && this.state.password === "password") {
      this.props.history.push(`/welcome/${this.state.username}`);
      console.log("Successful");
      /* this.setState({ showSuccessMessage: true });
      this.setState({ hasLoginFailed: false }); */
    } else {
      console.log("Incorrect login");
      this.setState({ showSuccessMessage: false });
      this.setState({ hasLoginFailed: true });
    }
  }

  render() {
    return (
      <div className="LoginComponent">
        <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />
        <ShowLoginSuccessMessage
          showSuccessMessage={this.state.showSuccessMessage}
        />
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

function ShowInvalidCredentials(props) {
  if (props.hasLoginFailed) {
    return <div> Invalid Credentials </div>;
  }
  return null;
}

function ShowLoginSuccessMessage(props) {
  if (props.showSuccessMessage) {
    return <div> Login Successful </div>;
  }
  return null;
}

export default CalorieCounter;
