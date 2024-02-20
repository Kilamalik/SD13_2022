import axios from 'axios';
import { setAlert } from './alert';
import { GET_VENUE, GET_VENUES, VENUE_ERROR } from './types';
import Swal from 'sweetalert2';
// Add Modules
export const Venue = (formData, navigate) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post('/api/venues', formData, config);

    dispatch(setAlert('Venue Added Successfully', 'success'));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Venue Added Successfully',
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/ListVenues');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        dispatch(
          Swal.fire({
            icon: 'error',
            title: 'Please Check Form ',
            text: `${error.msg}`,
          })
        )
      );
    }
  }
};
// Get all Venues
export const getVenues = () => async (dispatch) => {
  try {
    console.log('Here');
    const res = await axios.get('/api/venues');
    console.log(res);
    dispatch({
      type: GET_VENUES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VENUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete Venue
export const deleteVenue = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/venues/${id}`);

    //dispatch(setAlert('Venue Removed', 'success'));

    const res = await axios.get('/api/venues');

    dispatch({
      type: GET_VENUES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VENUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateVenueByID = (ID, formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`/api/venues/${ID}`, formData, config);
    dispatch(setAlert('Venue Updated', 'success'));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'The venue has been updated',
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/ListVenues');
    dispatch({
      type: GET_VENUES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        dispatch(
          Swal.fire({
            icon: 'error',
            title: 'Please Check Form ',
            text: `${error.msg}`,
          })
        )
      );
    }
  }
};

export const getVenueID = (ID) => async (dispatch) => {
  try {
    console.log('I reached here');

    const res = await axios.get(`/api/venues/${ID}`);

    console.log(res);

    dispatch({
      type: GET_VENUE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VENUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
