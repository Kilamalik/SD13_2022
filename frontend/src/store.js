import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// thunk is middleware
// a reducer takes an action then decides how to handle the state and how to pass it down to the components in the UI
// The reason for creating this file is to store values in app level state to use in any components within the app whenever. With Redux, the state of your application is kept in a store, and each component can access any state that it needs from this store.

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
