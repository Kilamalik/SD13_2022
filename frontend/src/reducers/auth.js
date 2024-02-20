import {
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  INSTRUCTOR_LOADED,
  INSTRUCTOR_AUTH_ERROR,
  INSTRUCTOR_LOGIN_SUCCESS,
  INSTRUCTOR_LOGIN_FAIL,
  INSTRUCTOR_LOGOUT,
} from "../actions/types";

//admin -----------------------------------------------------------------------
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  admin: "",
  isAdmin: false,
  isInstructor: false,
  instructor: "", // keep it like empy rather than giving null because it will stop the rendering errors
  //(specially the once where u are giving the object from the database)
};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: payload,
        isInstructor: false,
        isAdmin: true,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        isInstructor: false,
        isAdmin: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        isInstructor: false,
        isAdmin: false,
      };
    case INSTRUCTOR_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        instructor: payload,
        isInstructor: true,
        isAdmin: false,
      };
    case INSTRUCTOR_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        isInstructor: true,
        isAdmin: false,
      };
    case INSTRUCTOR_AUTH_ERROR:
    case INSTRUCTOR_LOGIN_FAIL:
    case INSTRUCTOR_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        isInstructor: false,
        isAdmin: false,
      };
    default:
      return state;
  }
}
