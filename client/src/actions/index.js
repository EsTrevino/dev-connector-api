import axios from "axios";
import jwt_decode from "jwt-decode";
import history from "../history";
import setAuthToken from "../utils/SetAuthToken";
import {
  AUTH_USER,
  GET_ERRORS,
  CLEAR_ERRORS,
  LOGOUT_USER,
  GET_PROFILE,
  PROFILE_LOADING
} from "./types";

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

export const getCurrentUserProfile = () => dispatch => {
  //set profile loading status
  dispatch({
    type: PROFILE_LOADING
  });
  //make requests to get profile
  axios
    .get(`${ROOT_URL}/profile`)
    .then(response => {
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

export const createNewUserProfile = profileData => dispatch => {
  //make post request to server
  axios
    .post(`${ROOT_URL}/profile`, profileData)
    .then(response => {
      dispatch({
        type: CLEAR_ERRORS
      });
      history.push("/dashboard");
    })
    //if error, inform user
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
