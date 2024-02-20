import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";
import Swal from 'sweetalert2';
export const updateProfile = (id, formData, userType) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (userType === "Admin") {
      const res = await axios.put(`/api/admin/${id}`, formData, config);
      dispatch(setAlert("Profile Updated", "success"));
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Th profile has been updated',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } else if (userType === "Instructor") {
      const res = await axios.put(`/api/instructor/${id}`, formData, config);
      dispatch(setAlert("Profile Updated", "success"));
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'The profile has been updated',
        showConfirmButton: false,
        timer: 1500
      })

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch((Swal.fire({
        icon: 'error',
        title:'Please Check Form ',
        text: `${error.msg}`}))))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
