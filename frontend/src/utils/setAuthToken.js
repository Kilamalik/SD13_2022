// function that takes in a token and adds to the header if token is available
// doing this would send the token in every request ensuring the actor is always loaded into the system when logged in

import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token; // making a global header
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
