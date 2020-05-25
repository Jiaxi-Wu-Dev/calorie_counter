import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'

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
        AuthenticationService.registerSuccessfulLogin(
          this.state.username,
          this.state.password
        );
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
          <h1>Login</h1>
          <div className="container"></div>
          {this.state.hasLoginFailed && (
            <div className="alert alert-warning">Invalid Credentials</div>
          )}
          {this.state.showSuccessMessage && <div>Login Successful</div>}
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
          <button className="btn btn-success" onClick={this.loginClicked}>
            Login
          </button>
        </div>
      );
    }
  }

  export default LoginComponent