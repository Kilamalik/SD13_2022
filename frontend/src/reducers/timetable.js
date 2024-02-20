import { GET_SLOTS, SLOT_ERROR } from '../actions/types';

const initialState = {
  slot: null,
  loading: true,
  slots: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SLOTS:
      return {
        ...state,
        slot: null,
        loading: false,
        slots: payload,
      };
    case SLOT_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
