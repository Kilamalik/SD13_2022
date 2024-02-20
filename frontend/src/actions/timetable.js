import axios from 'axios';
import { setAlert } from './alert';
import { GET_SLOTS, SLOT_ERROR } from './types';
import Swal from 'sweetalert2';
// add using excel sheet
export const addTimetableSheet = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    /* console.log(formData); */
    const res = await axios.post('/api/timetable/slots', formData, config);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const addTimetable = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    /* console.log(formData); */
    const res = await axios.post('/api/timetable/createTimeTable', formData, config);
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

// @Desc  Retrieve all slots
export const getSlots = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/timetable');

    dispatch({
      type: GET_SLOTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SLOT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// @Desc  Delete slot by ID
export const deleteSlot = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/timetable/${id}`);

    //dispatch(setAlert('Slot Deleted', 'success'));

    const res = await axios.get('/api/timetable');

    dispatch({
      type: GET_SLOTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SLOT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};




// @Desc  Delete all slots
export const deleteSlots = () => async (dispatch) => {
  try {
    await axios.delete('/api/timetable/');

    dispatch(setAlert('Slots Deleted', 'success'));
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'All slots have been deleted',
      showConfirmButton: false,
      timer: 1500
    })
    const res = await axios.get('/api/timetable');

    dispatch({
      type: GET_SLOTS,
      payload: res.data,
    });

    
  } catch (err) {
    dispatch({
      type: SLOT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
