import { GET_EMAILS, EMAILS_ERROR } from "../actions/types";

const initialState = {
  loading: true,
  emails: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EMAILS:
      return {
        ...state,
        emails: payload,
        loading: false,
      };
    case EMAILS_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
