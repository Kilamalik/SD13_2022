import axios from "axios";
import { setAlert } from "./alert";
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
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import Swal from 'sweetalert2';
// Load Admin
export const loadAdmin = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: ADMIN_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login Admin
export const loginAdmin = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch((Swal.fire({
        icon: 'error',
        title:'Invalid login ',
        text: `${error.msg}`}))))
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// //Instrctors
// //-------------------------------------------------------------------------

// Load Instructor
export const loadInstructor = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth/instructor");

    dispatch({
      type: INSTRUCTOR_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: INSTRUCTOR_AUTH_ERROR,
    });
  }
};

// Login Instructor
export const loginInstructor = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth/instructor", body, config);

    dispatch({
      type: INSTRUCTOR_LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadInstructor());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch((Swal.fire({
        icon: 'error',
        title:'Invalid Login ',
        text: `${error.msg}`}))))
    }

    dispatch({
      type: INSTRUCTOR_LOGIN_FAIL,
    });
  }
};

// Instrctor Logout
export const Instrctorlogout = () => (dispatch) => {
  dispatch({ type: INSTRUCTOR_LOGOUT });
};
