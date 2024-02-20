import {
  GET_INSTRUCTOR,
  GET_INSTRUCTORS,
  INSTRUCTOR_ERROR,
} from "../actions/types";

const initialState = {
  instructor: null,
  loading: true,
  instructors: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_INSTRUCTOR:
      return {
        ...state,
        instructor: payload,
        loading: false,
      };
    case GET_INSTRUCTORS:
      return {
        ...state,
        instructor: null,
        loading: false,
        instructors: payload,
      };
    case INSTRUCTOR_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
