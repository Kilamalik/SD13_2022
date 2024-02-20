import { GET_ADMIN, GET_ADMINS, ADMIN_ERROR } from "../actions/types";

const initialState = {
  admin: null,
  loading: true,
  admins: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ADMIN:
      return {
        ...state,
        admin: payload,
        loading: false,
      };
    case GET_ADMINS:
      return {
        ...state,
        admin: null,
        loading: false,
        admins: payload,
      };
    case ADMIN_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
