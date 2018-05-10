import axios from 'axios';
import history from '../history';
import {AUTH_USER} from './types';
const ROOT_URL = 'http://localhost:5000/api';


export function signInUser({email, password}){
  return function(dispatch){
    //submit email password to server
    axios.post(`${ROOT_URL}/users/login`, {email, password})
      .then(response => {
        //if request is successful....
          //-update state to indicate user is authenticated
            dispatch({type: AUTH_USER});
          //-save jwt token
            localStorage.setItem('token', response.data.token);
          //-redirect to route
            // history.push('/developer');
      })
      .catch(() => {
        //if request is not successful..
          //show error to user
          // dispatch(authError('Incorrect Email or Password. Please try again'));
      });
  }
}
