import { AUTH_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, isAuthenticated: true, user: action.payload };
    case LOGOUT_USER:
      return { ...state, isAuthenticated: false, user: {} };
    default:
      return state;
  }
  return state;
}
