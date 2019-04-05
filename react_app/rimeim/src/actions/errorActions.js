import { CLEAR_ERRORS, GET_ERRORS } from './types';

import { getAuthTokenFromResponse, setCurrentUser } from './UserActions';

import { notificationError } from '../utils/MaterialFunctions';

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload: {}
  };
};

export const handleError = (err, dispatch) => {
  if (err.response.status === 409) {
    const response = err.response.data;
    const decoded = getAuthTokenFromResponse(response);
    dispatch(setCurrentUser(decoded));
  }

  if (
    err.response.data &&
    err.response.data.data &&
    err.response.data.data.error_process
  ) {
    notificationError(err.response.data.data.error_process);
  }

  var payload = {};
  if (err.response.data && typeof err.response.data.data !== 'undefined') {
    payload = err.response.data.data;
  }

  dispatch({
    type: GET_ERRORS,
    payload
  });
};
