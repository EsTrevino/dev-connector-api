import { AUTH_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, isAuthenticated: true, user: action.payload };
    default:
      return state;
  }
  return state;
}
