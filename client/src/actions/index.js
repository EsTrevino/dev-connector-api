import axios from "axios";
import jwt_decode from "jwt-decode";
import history from "../history";
import setAuthToken from "../utils/SetAuthToken";
import { AUTH_USER, GET_ERRORS, CLEAR_ERRORS, LOGOUT_USER } from "./types";

const ROOT_URL = "http://localhost:5000/api";

export const signInUser = ({ email, password }) => dispatch => {
  //submit email password to server
  axios
    .post(`${ROOT_URL}/users/login`, { email, password })
    .then(response => {
      //if request is successful....
      //-save jwt token
      let token = response.data.token;
      localStorage.setItem("token", token);
      //-set token to auth header
      setAuthToken(token);
      //decode jwt token to get user information
      let decoded = jwt_decode(token);
      //clear errorMessage state in store
      dispatch({
        type: CLEAR_ERRORS
      });
      //-update state to indicate user is authenticated
      dispatch({
        type: AUTH_USER,
        payload: decoded
      });
      //-redirect to route
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signUpUser = ({ name, email, password }) => dispatch => {
  axios
    .post(`${ROOT_URL}/users/register`, { name, email, password })
    .then(response => {
      //clear errorMessage state in store
      dispatch({
        type: CLEAR_ERRORS
      });
      //-redirect to route
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  //remove token from localStorage
  localStorage.removeItem("token");
  //remove value in Authorization Header
  setAuthToken(false);
  //set current user to empty object
  dispatch({
    type: LOGOUT_USER
  });
};
