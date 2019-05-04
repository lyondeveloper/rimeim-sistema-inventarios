// Acciones a ejecutar para locales o tiendas
import axios from "axios";

import { GET_LOCALS, GET_LOCAL, LOCAL_LOADING } from "./types";

import { clearErrors, handleError } from "./errorActions";

import { configUserFromResponse } from "./UserActions";

const proxy = "https://rimeim.com/api";

export const getLocals = () => dispatch => {
  dispatch(localLoading());
  dispatch(clearErrors());
  axios
    .get(`${proxy}/locals`)
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
    .get(`${proxy}/locals/get_one/${id}`)
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
    .post(`${proxy}/locals/add`, newLocalData)
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
    .put(`${proxy}/locals/update/${id}`, newLocal)
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
    .delete(`${proxy}/locals/delete/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      history.push("/admin/locales");
    })
    .catch(err => handleError(err, dispatch));
};

export const localLoading = () => {
  return {
    type: LOCAL_LOADING
  };
};
