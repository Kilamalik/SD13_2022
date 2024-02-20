import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// to dispatch more than 1 action type from an action function, we use dispatch. We're able to do this due to the thunk middleware

export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    // setTimeout is a JS function
  };
