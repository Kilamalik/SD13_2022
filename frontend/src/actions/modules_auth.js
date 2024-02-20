import axios from 'axios';
import { setAlert } from './alert';
import { GET_MODULE, GET_MODULES, MODULE_ERROR } from './types';
import { GET_TIMETABLES, GET_TIMETABLE, TIMETABLE_ERROR } from './types';
import Swal from 'sweetalert2';

// Add Modules
export const Modules = (formData, navigate) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  //console.log(config);
  //const body = JSON.stringify({moduleName,ModuleID,specialization,year,semester});

  try {
    await axios.post('/api/module', formData, config);

    dispatch(setAlert('Module Added Success', 'success'));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'The Module has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/ListModules');
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

// Get all modules
export const getModules = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/module');
    dispatch({
      type: GET_MODULES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MODULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete Module
export const deleteModule = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/module/${id}`);

    //dispatch(setAlert('Module Removed', 'success'));

    const res = await axios.get('/api/module');

    dispatch({
      type: GET_MODULES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MODULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//update Module
export const updateModuleByID =
  (ID, formData, navigate) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.put(`/api/module/${ID}`, formData, config);
      dispatch(setAlert('Module Updated', 'success'));
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'The Module has been updated',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/ListModules');
      dispatch({
        type: GET_MODULES,
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

export const getModuleByID = (ModuleID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/module/${ModuleID}`);

    dispatch({
      type: GET_MODULE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MODULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// export const getModuleByName = (moduleName) => async (dispatch) => {
//   try {

//       const res = await axios.get(`/api/module/search/${moduleName}`);

//       dispatch({
//           type: GET_MODULE,
//           payload: res.data
//       });
//   } catch (err) {
//       dispatch({
//           type: MODULE_ERROR,
//           payload: { msg: err.response.statusText, status: err.response.status }
//       });
//   }
// }

//get allocated module by name
export const getallocatedmodule = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/timetable2/${name}`);

    dispatch({
      type: GET_TIMETABLES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TIMETABLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
