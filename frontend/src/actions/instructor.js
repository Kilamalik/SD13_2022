import axios from 'axios';
import { setAlert } from './alert';
import { GET_TIMETABLES, GET_TIMETABLE, TIMETABLE_ERROR } from './types';
import {
  INSTRUCTOR_ERROR,
  GET_INSTRUCTORS,
  GET_INSTRUCTOR,
  GET_ADMIN,
  GET_ADMINS,
  ADMIN_ERROR,
} from "./types";

import Swal from 'sweetalert2';

export const addInstructor = (formData) => (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    /* console.log(formData); */
    axios.post('api/instructor/', formData, config).then(() => {
      dispatch(setAlert('Instructor added', 'success'));
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch((Swal.fire({
        icon: 'error',
        title:'Please Check Form ',
        text: `${error.msg}`}))))
    }
  }
};

export const getInstructors = () => (dispatch) => {
  try {
    axios.get('/api/instructor/').then((res) => {
      dispatch({
        type: GET_INSTRUCTORS,
        payload: res.data,
      });
    });
  } catch (err) {
    dispatch({
      type: INSTRUCTOR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteInstructor = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/instructor/${id}`);

    dispatch(setAlert('Instructor Deleted', 'success'));

    const res = await axios.get('/api/instructor');

    dispatch({
      type: GET_INSTRUCTORS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: INSTRUCTOR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getInstructorByID = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/instructor/${id}`);
    dispatch({
      type: GET_INSTRUCTOR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: INSTRUCTOR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateInstructorByID =
  (id, formData, navigate) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.put(`/api/instructor/${id}`, formData, config);
      dispatch(setAlert('Instructor Updated', 'success'));

      dispatch({
        type: GET_INSTRUCTOR,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch((Swal.fire({
          icon: 'error',
          title:'Please Check Form ',
          text: `${error.msg}`}))))
      }

      dispatch({
        type: INSTRUCTOR_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

//Admins Content

export const addAdmin = (formData) => (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    /* console.log(formData); */

    axios.post('api/admin/', formData, config).then(() => {
      dispatch(setAlert('Admin added', 'success'));
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch((Swal.fire({
        icon: 'error',
        title:'Please Check Form ',
        text: `${error.msg}`}))))
    }
  }
};

export const getAdmins = () => (dispatch) => {
  try {
    axios.get('/api/admin/').then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_ADMINS,
        payload: res.data,
      });
    });
  } catch (err) {
    dispatch({
      type: ADMIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteAdmin = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/admin/${id}`);

    dispatch(setAlert('Admin Deleted', 'success'));

    const res = await axios.get('/api/admin');

    dispatch({
      type: GET_ADMINS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateAdminByID = (id, formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`/api/admin/${id}`, formData, config);
    dispatch(setAlert('Admin Updated', 'success'));

    dispatch({
      type: GET_ADMIN,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch((Swal.fire({
        icon: 'error',
        title:'Please Check Form ',
        text: `${error.msg}`}))))
    }

    dispatch({
      type: ADMIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getallocatedTimetable = number => async dispatch => {
  try {
      const res=await axios.get(`/api/instructor2/${number}`);

      dispatch({
          type: GET_TIMETABLES,
          payload: res.data
      });  

  } catch (err) {
      dispatch({
          type: TIMETABLE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status } 
      });
  }
};
