import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

import history from "../history";
import store from "../store";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Landing from "./layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Test from "./test";
import Dashboard from "./dashboard/Dashboard";
import "../style/app.css";
import setAuthToken from "../utils/SetAuthToken";
import requireAuth from "./auth/requireAuth";
import { AUTH_USER, LOGOUT_USER } from "../actions/types";

if (localStorage.token) {
  let token = localStorage.getItem("token");
  setAuthToken(token);
  let decoded = jwt_decode(token);
  store.dispatch({
    type: AUTH_USER,
    payload: decoded
  });
  let currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch({
      type: LOGOUT_USER
    });
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
            <Route exact path="/createProfile" component={requireAuth(Test)} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
