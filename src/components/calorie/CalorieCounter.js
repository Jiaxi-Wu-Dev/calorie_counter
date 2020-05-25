import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import LoginComponent from "./LoginComponent.jsx";
import HeaderComponent from "./HeaderComponent.jsx";
import CalorieCounterService from '../../components/api/CalorieCounterService.js'


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
                <th>Description</th>
                <th>Target Date</th>
                <th>Is Completed?</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
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
  constructor(props) {
    super(props);
    this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
  }
  render() {
    return (
      <>
        <h1>Welcome!</h1>
        <div className="container">
          Welcome {this.props.match.params.name}. Add Your Food Items{" "}
          <Link to="/todos">here</Link>
        </div>
        <div className="container">
          Click here to get a customized welcome message.
          <button
            onClick={this.retrieveWelcomeMessage}
            className="btn btn-success"
          >
            Get Welcome Message
          </button>
        </div>
      </>
    );
  }

  retrieveWelcomeMessage() {
    CalorieCounterService.executeCalorieCounterService()
    .then(response => console.log(response) );
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

export default CalorieCounter;
