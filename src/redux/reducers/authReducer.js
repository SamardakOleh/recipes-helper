import { SET_USER, LOG_OUT } from "../actions/types";
const initialState = {
  isAuthentificated: localStorage.getItem("access_token") ? true : false,
  user: JSON.parse(localStorage.getItem("profile"))
    ? JSON.parse(localStorage.getItem("profile"))
    : {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        isAuthentificated: true,
        user: action.payload
      };
    }
    case LOG_OUT: {
      localStorage.removeItem("access_token");
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("profile");
      return {
        ...state,
        isAuthentificated: false,
        user: {}
      };
    }
    default:
      return state;
  }
}
