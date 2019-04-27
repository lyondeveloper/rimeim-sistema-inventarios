import axios from 'axios';

import {
  CLIENT_LOADING,
  GET_CLIENT,
  GET_CLIENTS,
  CLIENT_LOADING_END
} from '../actions/types';

import { clearErrors, handleError } from './errorActions';

import { configUserFromResponse } from './UserActions';

export const createClient = (data, history, newUrl) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/clients/add', data)
    .then(res => {
      configUserFromResponse(res.data, dispatch);

      history.push(newUrl);
    })
    .catch(err => handleError(err, dispatch));
};

export const getClients = () => dispatch => {
  dispatch(clientLoading());
  dispatch(clearErrors());
  axios
    .get('/clients/get')
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_CLIENTS,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch));
};
export const getClient = id => dispatch => {
  dispatch(clearErrors());
  dispatch(clientLoading());
  axios
    .get(`/clients/get_one/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);

      dispatch({
        type: GET_CLIENT,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch));
};
export const editClient = (data, id, history, newUrl) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/clients/update/${id}`, data)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_CLIENT,
        payload: response.data
      });

      history.push(newUrl);
    })
    .catch(err => handleError(err, dispatch));
};
export const searchClient = data => dispatch => {
  dispatch(clientLoading());
  axios
    .get(`/clients/search/${data}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_CLIENTS,
        payload: response.data
      });
      setTimeout(() => clientLoadingEnd(), 10);
    })
    .catch(err => handleError(err, dispatch));
};
export const deleteClient = id => dispatch => {
  dispatch(clearErrors());
  dispatch(clientLoading());
  axios
    .delete(`/clients/delete/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(getClients());
      setTimeout(() => clientLoadingEnd(), 10);
    })
    .catch(err => handleError(err, dispatch));
};
export const clientLoading = () => {
  return {
    type: CLIENT_LOADING
  };
};

export const clientLoadingEnd = () => {
  return {
    type: CLIENT_LOADING_END
  };
};
