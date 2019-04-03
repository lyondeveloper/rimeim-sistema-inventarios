import axios from 'axios';
import { EMPLOYE_LOADING, GET_EMPLOYE, GET_EMPLOYES } from './types';

import { configUserFromResponse } from './UserActions';

import { clearErrors, handleError } from './errorActions';

export const getEmployes = () => dispatch => {
  dispatch(clearErrors());
  employeLoading(dispatch);
  axios
    .get('/employes/')
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
    .get(`/employes/get_one/${id}`)
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
    .delete(`/employes/delete/${id}`)
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
    .put(`/employes/update/${id}/${id_usuario}`, data)
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
