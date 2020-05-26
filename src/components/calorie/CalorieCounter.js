//resource used Go Java Full Stack with Spring Boot and React by in28MinutesOfficial

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import LoginComponent from "./LoginComponent.jsx";
import HeaderComponent from "./HeaderComponent.jsx";
import CalorieCounterService from "../../components/api/CalorieCounterService.js";
import CalorieDataService from "../../components/api/CalorieDataService";
import AuthenticationService from "./AuthenticationService.js";
import CalorieComponent from "./CalorieComponent";

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
                path="/todos/:id"
                component={CalorieComponent}
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

//Create class to list the items added
class ListTodosComponent extends Component {
  constructor(props) {
    console.log("constructor");
    super(props);
    this.state = {
      //Created an Array to store different items
      // use for adding different food items to calorie
      todos: [],
      message: null,
    };
    this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    this.updateTodoClicked = this.updateTodoClicked.bind(this);
    this.addTodoClicked = this.addTodoClicked.bind(this);
    this.refreshTodos = this.refreshTodos.bind(this);
  }

  //
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("ShouldcompnentUpdate");
    console.log(nextProps);
    console.log(nextState);
    return true;
  }

  componentDidMount() {
    console.log("componentDidMount");

    this.refreshTodos();
    console.log(this.state);
  }

  //refresh page after delete
  refreshTodos() {
    let username = AuthenticationService.getLoggedInUserName();
    CalorieDataService.retrieveAllTodos(username).then((response) => {
      this.setState({ todos: response.data });
    });
  }
  //delete the item that is clicked on
  deleteTodoClicked(id) {
    let username = AuthenticationService.getLoggedInUserName();
    CalorieDataService.deleteTodo(username, id).then((response) => {
      this.setState({ message: `Delete of todo ${id} successful` });
      this.refreshTodos();
    });
  }

  addTodoClicked(id) {
    console.log("create " + id);
    this.props.history.push(`/todos/-1`);
  }

  updateTodoClicked(id) {
    console.log("update " + id);
    this.props.history.push(`/todos/${id}`);
    /* let username = AuthenticationService.getLoggedInUserName();
    CalorieDataService.deleteTodo(username, id).then((response) => {
      this.setState({ message: `Delete of todo ${id} successful` });
      this.refreshTodos();
    }); */
  }

  render() {
    console.log("render");
    return (
      <div>
        <h1>List Todos</h1>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Target Date</th>
                <th>Is Completed?</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toString()}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.updateTodoClicked(todo.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.deleteTodoClicked(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <button className="btn btn-success" onClick={this.addTodoClicked}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeMessage: "",
    };
    this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
    this.handleError = this.handleError.bind(this);
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
        <div className="container">{this.state.welcomeMessage}</div>
      </>
    );
  }

  retrieveWelcomeMessage() {
    CalorieCounterService.executeCalorieCounterPathVariableService(
      this.props.match.params.name
    )
      .then((response) => this.handleSuccessfulResponse(response))
      .catch((error) => this.handleError(error));
  }

  handleSuccessfulResponse(response) {
    this.setState({ welcomeMessage: response.data.message });
  }

  handleError(error) {
    console.log(error.response);
    this.setState({ welcomeMessage: error.response.data.message });
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
