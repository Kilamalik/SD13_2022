// alert.js is a reducer function that takes in a piece of state and an action

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function foo(state = initialState, action) {
  const { type, payload } = action; // destructuring to make it easier to use actions properties

  switch (type) {
    case SET_ALERT:
      return [...state, payload]; // returns any current state along with the new state
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload); // keeps only the states that do not match the id of the state to be removed
    default:
      return state;
  }
}
