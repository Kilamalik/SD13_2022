import axios from "axios";
import { setAlert } from "./alert";
import { GET_EMAILS, EMAILS_ERROR } from "./types";

export const sendEmail = (formData) => (dispatch) => {
  try {
    console.log("dsvvsvds");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(FormData);
    /* console.log(formData); */
    axios.post("api/email/", formData, config).then(() => {
      dispatch(setAlert("Email sent", "success"));
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const getEmailByEmail = (email) => async (dispatch) => {
  try {
    const res = await axios.get(`api/email/${email}`);
    console.log(res);
    dispatch({
      type: GET_EMAILS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMAILS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const clearEmails = (email) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/email/remove/${email}`);
    dispatch({
      type: GET_EMAILS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_EMAILS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
