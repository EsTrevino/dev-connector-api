import {AUTH_USER, ERROR_DISPATCH, CLEAR_ERROR} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case AUTH_USER:
    return {...state, isAuthenticated: true};
    case ERROR_DISPATCH:
    return {...state, errorMessage: action.payload};
    case CLEAR_ERROR:
    return {...state, errorMessage: null};
    default:
    return state;
  }
  return state;
}
