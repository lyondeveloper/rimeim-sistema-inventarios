// Acciones a ejecutar para locales o tiendas
import axios from 'axios';

import { GET_LOCALS, GET_LOCAL, LOCAL_LOADING } from './types';

import { clearErrors, handleError } from './errorActions';

import { configUserFromResponse } from './UserActions';
import { API_URL } from '../utils/stringUtils';

export const getLocals = () => dispatch => {
  dispatch(localLoading());
  dispatch(clearErrors());
  axios
    .get(`${API_URL}/locals`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_LOCALS,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch));
};

export const getLocal = id => dispatch => {
  dispatch(clearErrors());
  dispatch(localLoading());
  axios
    .get(`${API_URL}/locals/get_one/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_LOCAL,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch));
};

export const saveNewLocal = (newLocalData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${API_URL}/locals/add`, newLocalData)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      history.push(`/admin/locales/${response.data.id}`);
    })
    .catch(err => handleError(err, dispatch));
};

export const updateLocal = (id, newLocal, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(localLoading());
  axios
    .put(`${API_URL}/locals/update/${id}`, newLocal)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_LOCAL,
        payload: response.data
      });
      history.push(`/admin/locales/${id}`);
    })
    .catch(err => handleError(err, dispatch));
};

export const deleteLocal = (id, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`${API_URL}/locals/delete/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      history.push('/admin/locales');
    })
    .catch(err => handleError(err, dispatch));
};

export const localsToSelectOptions = locals => {
  const newOptions = [];
  locals.forEach(local =>
    newOptions.push({ value: local.id, label: local.nombre })
  );
  return newOptions;
};

export const localLoading = () => {
  return {
    type: LOCAL_LOADING
  };
};
