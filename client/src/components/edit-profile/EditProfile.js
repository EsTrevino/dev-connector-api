import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import classnames from "classnames";
import * as actions from "../../actions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSocialMedia: true
    };
  }

  componentDidMount() {
    this.props.getCurrentUserProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.profile) {
      console.log(this.props.profile);
    }
  }
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

  renderSelectField(field) {
    return (
      <div className="form-group">
        <select
          className={classnames("form-control form-control-lg", {
            "is-invalid": field.meta.touched && !field.meta.valid
          })}
          {...field.input}
        >
          <option value="" disabled>
            * Select a Professional Status
          </option>
          <option value="Developer">Developer</option>
          <option value="Junior Developer">Junior Developer</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Manager">Manager</option>
          <option value="Student or Learning">Student or Learning</option>
          <option value="Instructor or Teacher">Instructor or Teacher</option>
          <option value="Intern">Intern</option>
          <option value="Other">Other</option>
        </select>
        <small className="text-muted">
          Give us an idea of where you are at in your career
        </small>
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

  renderSocialMediaField(field) {
    return (
      <div className="form-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={field.icon} />
          </span>
          <input
            type={field.type}
            className="form-control"
            placeholder={field.placeholder}
            icon={field.icon}
            {...field.input}
          />
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createNewUserProfile(values);
  }

  toggleHiddenSocialInputs(e) {
    e.preventDefault();
    this.setState({
      showSocialMedia: !this.state.showSocialMedia
    });
  }
  render() {
    console.log(this.props.profile);
    const { handleSubmit } = this.props;
    const { profile } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light p-2 mt-2">
              <i className="mr-1 fas fa-long-arrow-alt-left" /> Go Back
            </Link>
            <h5 className="display-4 pt-2 text-center font-weight-light">
              Update Your Profile
            </h5>
            <p className="text-black-50 pt-3 font-weight-light">
              * = required field
            </p>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              {this.renderAlert()}
              <Field
                name="handle"
                type="text"
                placeholder="* Profile handle"
                component={this.renderField}
                description="A unique handle for your profile URL - (Can't be changed later)"
              />
              <Field name="status" component={this.renderSelectField} />
              <Field
                name="company"
                type="text"
                placeholder="Company"
                component={this.renderField}
                description="Can be your own or the one you work for"
                intialValues={profile.company}
              />
              <Field
                name="website"
                type="text"
                placeholder="Website"
                component={this.renderField}
                description="Could be your own or company website"
              />
              <Field
                name="location"
                type="text"
                placeholder="Location"
                component={this.renderField}
                description="Suggested format is: City, State"
              />
              <Field
                name="skills"
                type="text"
                placeholder=" Skills"
                component={this.renderField}
                description="Please use comma separated values (eg: HTML, CSS, Javascript, etc)"
              />
              <Field
                name="githubusername"
                type="text"
                placeholder="Github Username"
                component={this.renderField}
                description="If you want your latest repos and a Github link, include your username"
              />
              <div className="form-control-group">
                <Field
                  className="form-control form-control-lg"
                  name="bio"
                  placeholder="A short bio about yourself"
                  component="textarea"
                />
                <small className="text-muted">
                  Tell us a little about yourself
                </small>
              </div>
              <div className="row mt-2 pt-2">
                <button
                  className="btn btn-outline-secondary m-auto"
                  onClick={this.toggleHiddenSocialInputs.bind(this)}
                >
                  Add Social Network Links <i className=" ml-1 fas fa-users" />
                </button>
              </div>

              {!this.state.showSocialMedia && (
                <div className="mt-3">
                  <Field
                    name="facebook"
                    placeholder="Facebook profile URL"
                    icon="fab fa-facebook-square"
                    component={this.renderSocialMediaField}
                  />
                  <Field
                    name="twitter"
                    placeholder="Twitter profile URL"
                    icon="fab fa-twitter-square"
                    component={this.renderSocialMediaField}
                  />
                  <Field
                    name="linkedin"
                    placeholder="Linkedin profile URL"
                    icon="fab fa-linkedin"
                    component={this.renderSocialMediaField}
                  />
                  <Field
                    name="youtube"
                    placeholder="Youtube profile URL"
                    icon="fab fa-youtube-square"
                    component={this.renderSocialMediaField}
                  />
                  <Field
                    name="instagram"
                    placeholder="Instagram profile URL"
                    icon="fab fa-instagram"
                    component={this.renderSocialMediaField}
                  />
                </div>
              )}

              <button action="submit" className="btn btn-info btn-block mt-5">
                Create Profile <i className=" ml-1 fas fa-user-alt" />
              </button>
              {this.renderAlert()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.handle) {
    errors.handle = "Please enter a handle for your profile";
  }
  if (!values.status) {
    errors.status = "Please select a status for your profile";
  }
  return errors;
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    profile: state.profile
  };
};

export default reduxForm({
  validate,
  form: "CreateProfile"
})(connect(mapStateToProps, actions)(CreateProfile));
