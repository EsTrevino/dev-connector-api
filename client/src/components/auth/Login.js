import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import classnames from "classnames";
import * as actions from "../../actions";

class Login extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <input
          className={classnames("form-control form-control-lg", {
            "is-invalid": field.meta.touched && !field.meta.valid,
            "is-valid": field.meta.touched && field.meta.valid
          })}
          type={field.type}
          placeholder={field.placeholder}
          {...field.input}
        />
        <div className="invalid">
          {field.meta.touched && !field.meta.valid ? (
            <div className="text-center">
              <i className="far fa-edit" /> {field.meta.error}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger error-message mt-4 text-center">
          <i className="fas fa-info-circle" />
          <h4 className="invalid">{this.props.errorMessage.message}</h4>
        </div>
      );
    }
  }

  onSubmit({ email, password }) {
    this.props.signInUser({ email, password });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                  name="email"
                  type="text"
                  placeholder="Email"
                  component={this.renderField}
                />
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  component={this.renderField}
                />
                <button action="submit" className="btn btn-info btn-block mt-4">
                  Log <i className="fas fa-sign-in-alt" />
                </button>
                {this.renderAlert()}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  // console.log(JSON.stringify(values.password).count);
  //this function will be called for us
  //values is an object that has values user has entered into form
  const errors = {};
  //if errors has any properties, redux forms assumes
  //it is invalid
  if (!values.email) {
    errors.email = "Please enter an email to log in";
  }
  if (!values.password) {
    errors.password = "Please enter a password to log in";
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default reduxForm({
  validate,
  form: "LoginForm"
})(connect(mapStateToProps, actions)(Login));
