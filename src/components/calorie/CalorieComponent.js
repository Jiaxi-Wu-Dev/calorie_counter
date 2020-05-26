import React, { Component } from "react";
import moment from "moment";
import { Formik, Field, Form, ErrorMessage } from "formik";
import CalorieDataService from "../api/CalorieDataService.js";
import AuthenticationService from "./AuthenticationService.js";

class CalorieComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      description: "Learn Forms",
      targetDate: moment(new Date()).format("YYYY-MM-DD"),
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    if (this.state.id === -1) {
      return;
    }
    let username = AuthenticationService.getLoggedInUserName();
    CalorieDataService.retrieveTodo(username, this.state.id).then((response) =>
      this.setState({
        description: response.data.description,
        targetDate: moment(response.data.targetDate).format("YYYY-MM-DD"),
      })
    );
  }
  //making it so the user must input something
  validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a description";
    } else if (values.description.length < 5) {
      errors.description = "Enter at least one character";
    }

    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "Enter a valid date";
    }
    return errors;
  }

  onSubmit(values) {
    let username = AuthenticationService.getLoggedInUserName();

    if (this.state.id === -1) {
      CalorieDataService.createTodo(username, {
        id: this.state.id,
        description: values.description,
        targetDate: values.targetDate,
      }).then(() => this.props.history.push("/todos"));
    } else {
      CalorieDataService.updateTodo(username, this.state.id, {
        id: this.state.id,
        description: values.description,
        targetDate: values.targetDate,
      });
    }
  }

  render() {
    let { description, targetDate } = this.state;
    return (
      <div>
        <h1>To Do</h1>
        <div className="container">
          <Formik
            initialValues={{
              description,
              targetDate,
            }}
            onSubmit={this.onSubmit}
            //disable refresh onChange and blur until save button is clicked
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label></label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default CalorieComponent;
