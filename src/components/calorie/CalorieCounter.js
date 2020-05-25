import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService.js";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";

class CalorieCounter extends Component {
  render() {
    return (
      <div className="CalorieCounter">
        <Router>
          <>
            <HeaderComponent />
            <Switch>
              <Route path="/" exact component={LoginComponent} />
              <Route path="/login" component={LoginComponent} />
              <AuthenticatedRoute
                path="/welcome/:name"
                component={WelcomeComponent}
              />
              <AuthenticatedRoute
                path="/todos"
                component={ListTodosComponent}
              />
              <AuthenticatedRoute path="/logout" component={LogoutComponent} />
              <Route path="" component={ErrorComponent} />
            </Switch>
            <FooterComponent />
          </>
        </Router>
        {/* <LoginComponent />
        <WelcomeComponent /> */}
      </div>
    );
  }
}

class HeaderComponent extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    console.log(isUserLoggedIn);

    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <a className="navbar-brand">Calorie Counter</a>
          </div>
          <ul className="navbar-nav">
            {isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/welcome/jiaxi">
                  Home
                </Link>
              </li>
            )}
            {isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/todos">
                  Todos
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav navbar-collapse justify-content-end">
            {!isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {isUserLoggedIn && (
              <li>
                <Link
                  className="nav-link"
                  to="/logout"
                  onClick={AuthenticationService.logout}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

class LogoutComponent extends Component {
  render() {
    return (
      <div>
        <h1>You are logged out</h1>
        <div className="container">Thank you for visiting!</div>
      </div>
    );
  }
}

class FooterComponent extends Component {
  render() {
    return (
      <footer className="footer">
        <span className="text-muted"> All Rights Reserved 2020</span>
      </footer>
    );
  }
}
class ListTodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Created an Array to store different items
      // use for adding different food items to calorie
      todos: [
        { id: 1, description: " Apple ", done: false, targetDate: new Date() },
        { id: 2, description: " Cereal ", done: false, targetDate: new Date() },
        { id: 3, description: " Steak ", done: false, targetDate: new Date() },
      ],
    };
  }

  render() {
    return (
      <div>
        <h1>List Todos</h1>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr>
                  <td>{todo.id}</td>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class WelcomeComponent extends Component {
  render() {
    return (
      <>
        <h1>Welcome!</h1>
        <div className="container">
          Welcome {this.props.match.params.name}. Add Your Food Items{" "}
          <Link to="/todos">here</Link>
        </div>
      </>
    );
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

export default CalorieCounter;
