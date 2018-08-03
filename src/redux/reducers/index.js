import { combineReducers } from "redux";
import authReducer from "./authReducer";
import recipesReducer from "./recipesReducer";

export default combineReducers({
  auth: authReducer,
  recipes: recipesReducer
});
