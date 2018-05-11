import axios from "axios";
import history from "../history";
import { AUTH_USER, ERROR_DISPATCH, CLEAR_ERROR } from "./types";
const ROOT_URL = "http://localhost:5000/api";

export function signInUser({ email, password }) {
  return function(dispatch) {
    //submit email password to server
    axios
      .post(`${ROOT_URL}/users/login`, { email, password })
      .then(response => {
        //if request is successful....
        //-update state to indicate user is authenticated
        console.log(response);
        dispatch({
          type: AUTH_USER
        });
        //-save jwt token
        localStorage.setItem("token", response.data.token);
        //-redirect to route
        history.push("/developer");
        //clear error state in store
        dispatch({
          type: CLEAR_ERROR
        });
      })
      .catch(err => {
        //if request is not successful..
        //show error to user
        dispatch({
          type: ERROR_DISPATCH,
          payload: err.response.data
        });
      });
  };
}
