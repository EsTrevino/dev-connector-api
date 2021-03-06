import {
  GET_PROFILE,
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  LOGOUT_USER
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return { ...state, loading: true };
    case GET_PROFILE:
      return { ...state, profile: action.payload, loading: false };
    case LOGOUT_USER:
      return { ...state, profile: null };
    default:
      return state;
  }
  return state;
}
