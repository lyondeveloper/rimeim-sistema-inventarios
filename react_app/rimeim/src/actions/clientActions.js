import axios from 'axios';

import {
  CLIENT_LOADING,
  GET_CLIENT,
  GET_CLIENTS,
  CLIENT_LOADING_END
} from '../actions/types';

import { clearErrors, handleError } from './errorActions';

import { configUserFromResponse } from './UserActions';
import { API_URL } from '../utils/stringUtils';

export const createClient = (data, history, newUrl) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${API_URL}/clients/add`, data)
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
    .get(`${API_URL}/clients/get`)
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
    .get(`${API_URL}/clients/get_one/${id}`)
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
    .post(`${API_URL}/clients/update/${id}`, data)
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
export const searchClient = searchJson => dispatch => {
  dispatch(clientLoading());
  axios
    .post(`${API_URL}/clients/search`, searchJson)
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
export const deleteClient = (id, history, newUrl) => dispatch => {
  dispatch(clearErrors());
  dispatch(clientLoading());
  axios
    .delete(`${API_URL}/clients/delete/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(getClients());
      history.push(newUrl);
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
