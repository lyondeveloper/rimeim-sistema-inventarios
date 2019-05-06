import axios from 'axios';
import { EMPLOYE_LOADING, GET_EMPLOYE, GET_EMPLOYES } from './types';

import { configUserFromResponse } from './UserActions';

import { clearErrors, handleError } from './errorActions';
import { API_URL } from '../utils/stringUtils';

export const getEmployes = () => dispatch => {
  dispatch(clearErrors());
  employeLoading(dispatch);
  axios
    .get(`${API_URL}/employes/`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_EMPLOYES,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch));
};

export const getEmployeById = id => dispatch => {
  dispatch(clearErrors());
  employeLoading(dispatch);
  axios
    .get(`${API_URL}/employes/get_one/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatchGetEmploye(dispatch, response);
    })
    .catch(err => handleError(err, dispatch));
};

export const deleteRegisterById = (id, history) => dispatch => {
  dispatch(clearErrors());
  employeLoading(dispatch);

  axios
    .delete(`${API_URL}/employes/delete/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      history.push('/admin/empleados');
    })
    .catch(err => handleError(err, dispatch));
};

// Not common
export const updateEmployeRegisterById = (id, id_usuario, data) => dispatch => {
  dispatch(clearErrors());
  employeLoading(dispatch);
  axios
    .put(`${API_URL}/employes/update/${id}/${id_usuario}`, data)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatchGetEmploye(dispatch, response);
    })
    .catch(err => handleError(err, dispatch));
};

export const dispatchGetEmploye = (dispatch, response) => {
  dispatch({
    type: GET_EMPLOYE,
    payload: response.data
  });
};

export const employeLoading = dispatch => {
  dispatch({
    type: EMPLOYE_LOADING
  });
};
