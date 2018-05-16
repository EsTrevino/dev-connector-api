import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import classnames from "classnames";
import * as actions from "../../actions";

class AddExperience extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <input
          className={classnames("form-control form-control-lg", {
            "is-invalid": field.meta.touched && !field.meta.valid
          })}
          type={field.type}
          placeholder={field.placeholder}
          {...field.input}
        />
        <small className="text-muted">{field.description}</small>
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
    if (this.props.errors.message) {
      return (
        <div className="alert alert-danger error-message mt-4 text-center">
          <h3>
            <i className="fas fa-info-circle" />
          </h3>
          <h6 className="invalid">{this.props.errors.message}</h6>
        </div>
      );
    }
  }

  onSubmit(values) {
    // this.props.createNewUserProfile(values);
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light p-2 mt-2">
              <i className="mr-1 fas fa-long-arrow-alt-left" /> Go Back
            </Link>
            <h5 className="display-4 pt-2 text-center font-weight-light">
              Add Experience
            </h5>
            <p className="text-black-50 m-auto text-center pt-2">
              Any job position that you have had in the past or current
            </p>
            <p className="text-black-50 pt-3 font-weight-light">
              * = required field
            </p>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              {this.renderAlert()}
              <Field
                name="company"
                type="text"
                placeholder="* Company"
                component={this.renderField}
              />
              <Field
                name="title"
                type="text"
                placeholder="* Title"
                component={this.renderField}
              />
              <Field
                name="location"
                type="text"
                placeholder="Location"
                component={this.renderField}
              />
              <div className="form-control-group">
                <small>From Date:</small>
                <Field
                  name="from"
                  type="date"
                  placeholder="mm/dd/yyyy"
                  component={this.renderField}
                />
              </div>
              <div className="form-control-group">
                <small>To Date:</small>
                <Field
                  name="to"
                  type="date"
                  placeholder="mm/dd/yyyy"
                  component={this.renderField}
                />
              </div>
              <div className="form-control-group mb-4">
                <Field name="current" component="input" type="checkbox" />
                <small>Current Job</small>
              </div>
              <div className="form-control-group">
                <Field
                  className="form-control form-control-lg"
                  name="description"
                  placeholder="Job Description"
                  component="textarea"
                />
                <small className="text-muted">Tell us about the position</small>
              </div>

              <button action="submit" className="btn btn-info btn-block mt-5">
                Add Experience <i className=" ml-1 fas fa-briefcase" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    field: state.form
  };
};

export default reduxForm({
  form: "AddExperience"
})(connect(mapStateToProps, actions)(AddExperience));
