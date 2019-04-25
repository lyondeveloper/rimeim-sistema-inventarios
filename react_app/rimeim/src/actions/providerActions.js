import {
  PROVIDER_LOADING,
  PROVIDER_LOADING_END,
  GET_PROVIDER,
  GET_PROVIDERS
} from './types';

import axios from 'axios';

import { clearErrors, handleError } from './errorActions';

import { configUserFromResponse } from './UserActions';

export const addProvider = (data, history) => dispatch => {
  dispatch(clearErrors());

  axios
    .post('/providers/add', data)
    .then(res => {
      const response = res.data;

      configUserFromResponse(response, dispatch);

      history.push('/providers');
    })
    .catch(err => handleError(err, dispatch));
};
export const editProvider = (data, history, id) => dispatch => {};
export const getProvider = id => dispatch => {};
export const getProviders = () => dispatch => {
  dispatch(providerLoading());
  dispatch(clearErrors());
  axios
    .get()
    .then(res => {
      const response = res.data;

      configUserFromResponse(response, dispatch);

      dispatch({
        type: GET_PROVIDERS,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch));
};
export const searchProvider = data => dispatch => {};
export const providerLoading = () => dispatch => {
  return {
    type: PROVIDER_LOADING
  };
};
export const providerLoadingEnd = () => dispatch => {
  return {
    type: PROVIDER_LOADING_END
  };
};
