import axios from "axios";
import { setAlert } from "./alert";
import { GET_NOTICE, GET_NOTICES, NOTICE_ERROR } from './types';
import Swal from 'sweetalert2';

//add notice
export const Notices = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    
    await axios.post("/api/notices", formData, config);

    dispatch(setAlert("Notice Added Success", "success"));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'The Notice has been saved',
      showConfirmButton: false,
      timer: 1500
    })
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

// @Desc  Retrieve all notices
export const getNotices = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/notices');

    dispatch({
      type: GET_NOTICES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// @Desc  Delete notice by ID
export const deleteNotice = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/notices/${id}`);

    //dispatch(setAlert('Notice Deleted', 'success'));

    const res = await axios.get('/api/notices');

    dispatch({
      type: GET_NOTICES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};



