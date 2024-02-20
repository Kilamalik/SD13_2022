import axios from 'axios';
import { setAlert } from './alert';
import { EMPLOYEE_ERROR, GET_EMPLOYEE, GET_EMPLOYEES } from './types';
import Swal from 'sweetalert2';

export const addEmployee = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/employee', formData, config);

    dispatch(setAlert('Employee Added Successfully', 'success'));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Employee Added Successfully',
      showConfirmButton: false,
      timer: 1000,
    });

    navigate('/listEmployees');
    /* history.push('/listEmployees'); */
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

// add using excel sheet
export const addEmployees = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    /* console.log(formData); */

    const res = await axios.post('/api/employee/employees', formData, config);

    /* dispatch(setAlert('Employee added', 'success')); */
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// @Desc  Retrieve all employees
export const getEmployees = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/employee');
    //Await function is used to wait for the promise. It could be used within the async block only. It makes the code wait until the promise returns a result. It only makes the async block wait.

    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// @Desc  Delete employee by ID
export const deleteEmployee = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/employee/${id}`);

    /* dispatch(setAlert('Employee Deleted', 'success')); */

    const res = await axios.get('/api/employee');

    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// @Desc get employee by ID
export const getEmployeeByID = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/employee/${id}`);
    dispatch({
      type: GET_EMPLOYEE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// @Desc update employee by ID
export const updateEmployeeByID =
  (id, formData, navigate) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.put(`/api/employee/${id}`, formData, config);
      dispatch(setAlert('Employee Updated', 'success'));

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Employee Added Successfully',
        showConfirmButton: false,
        timer: 1000,
      });

      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data,
      });

      navigate('/listEmployees');
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

      dispatch({
        type: EMPLOYEE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
