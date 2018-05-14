import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Navbar extends Component {
  onLogoutClick() {
    this.props.logoutUser();
  }

  renderHomeLink() {
    if (!this.props.isAuthenticated) {
      return (
        <Link className="navbar-brand" to="/">
          DevConnector
        </Link>
      );
    } else {
      <p className="navbar-brand">DevConnector</p>;
    }
  }
  renderLinks() {
    if (!this.props.isAuthenticated) {
      return [
        <li className="nav-item" key="signUp">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>,
        <li className="nav-item" key="logIn">
          <Link className="nav-link" to="/login">
            Log In
          </Link>
        </li>
      ];
    } else {
      return [
        <li className="nav-item" key="dashboard">
          <img
            src={this.props.user.avatar}
            alt={this.props.user.name}
            style={{ width: "40px", marginRight: "2px", borderRadius: "50%" }}
            title="You must have a Gravatar connected to your email to display an image"
          />
        </li>,
        <li className="nav-item" key="logOut">
          <Link
            className="nav-link"
            onClick={this.onLogoutClick.bind(this)}
            to="/"
          >
            Log Out
          </Link>
        </li>
      ];
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            {this.renderHomeLink()}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/developers">
                    Developers
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">{this.renderLinks()}</ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  };
};

export default connect(mapStateToProps, actions)(Navbar);
