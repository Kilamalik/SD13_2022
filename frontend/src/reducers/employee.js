import { GET_EMPLOYEE, GET_EMPLOYEES, EMPLOYEE_ERROR } from '../actions/types';

const initialState = {
  employee: null,
  loading: true,
  employees: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        employee: payload,
        loading: false,
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        employee: null,
        loading: false,
        employees: payload,
      };
    case EMPLOYEE_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
