import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";

import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentUserProfile();
  }
  render() {
    const { user } = this.props.authentication;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>To Do: Display Profile</h4>;
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted mt-2">Welcome {user.name}</p>
            <p className="lead">
              You have not created a user profile yet, please create one
            </p>
            <Link to="/createProfile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">
                Dashboard
                <div>{dashboardContent}</div>
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  authentication: state.auth
});

export default connect(mapStateToProps, actions)(Dashboard);
