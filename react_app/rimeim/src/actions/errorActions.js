import { CLEAR_ERRORS, GET_ERRORS } from "./types";
import {
  getAuthTokenFromResponse,
  setCurrentUser,
  logOutUserWithDispatch
} from "./UserActions";
import { notificationError } from "../utils/MaterialFunctions";

const ERROR_INVALID_USER = "NotValidUser";
const ERROR_INVALID_SESSION = "InvalidSession";

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload: {}
  };
};

export const endApplication = dispatch => {
  setTimeout(() => {
    logOutUserWithDispatch(dispatch);
  }, 5000);
};

export const handleError = (err, dispatch, another_dispatch = null) => {
  if (another_dispatch) {
    dispatch({
      type: another_dispatch
    });
  }
  if (
    err.response &&
    err.response.data &&
    err.response.data.data &&
    err.response.data.data.error
  ) {
    if (err.response.data.data.error === ERROR_INVALID_USER) {
      notificationError("Su usuario es invalido o ya no se encuentra activo");
      return endApplication(dispatch);
    }
    if (err.response.data.data.error === ERROR_INVALID_SESSION) {
      logOutUserWithDispatch(dispatch);
    }
  }
  if (err.response && err.response.status === 409) {
    const response = err.response.data;
    const decoded = getAuthTokenFromResponse(response);
    dispatch(setCurrentUser(decoded));
  }

  if (
    err.response &&
    err.response.data &&
    err.response.data.data &&
    err.response.data.data.error_process
  ) {
    notificationError(err.response.data.data.error_process);
  }

  var payload = {};
  if (
    err.response &&
    err.response.data &&
    typeof err.response.data.data !== "undefined"
  ) {
    payload = err.response.data.data;
  }

  dispatch({
    type: GET_ERRORS,
    payload
  });
};
