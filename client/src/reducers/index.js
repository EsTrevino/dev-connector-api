import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import authReducer from "./auth_reducer";
import errorReducer from "./error_reducer";

export default combineReducers({
  form: form,
  auth: authReducer,
  errors: errorReducer
});
