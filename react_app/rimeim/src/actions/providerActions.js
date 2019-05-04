import {
  PROVIDER_LOADING,
  PROVIDER_LOADING_END,
  GET_PROVIDER,
  GET_PROVIDERS
} from "./types";

import axios from "axios";

import { clearErrors, handleError } from "./errorActions";

import { configUserFromResponse } from "./UserActions";
import { clientLoadingEnd } from "./clientActions";
const proxy = "https://rimeim.com/api";

export const addProvider = (data, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(providerLoading());
  axios
    .post(`${proxy}/providers/add`, data)
    .then(res => {
      const response = res.data;

      configUserFromResponse(response, dispatch);

      dispatch(clientLoadingEnd);

      history.push("/proveedores");
    })
    .catch(err => handleError(err, dispatch));
};
export const editProvider = (data, history, id) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${proxy}/providers/update/${id}`, data)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_PROVIDER,
        payload: response.data
      });

      history.push("/proveedores");
    })
    .catch(err => handleError(err, dispatch));
};
export const getProvider = id => dispatch => {
  dispatch(providerLoading());
  axios
    .get(`${proxy}/providers/get_one/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);

      dispatch({
        type: GET_PROVIDER,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch));
};
export const getProviders = () => dispatch => {
  dispatch(providerLoading());
  dispatch(clearErrors());
  axios
    .get(`${proxy}/providers/get`)
    .then(res => {
      const response = res.data;

      configUserFromResponse(response, dispatch);

      dispatch({
        type: GET_PROVIDERS,
        payload: response.data
      });

      setTimeout(() => providerLoadingEnd(), 10);
    })
    .catch(err => handleError(err, dispatch));
};
export const searchProvider = data => dispatch => {
  dispatch(providerLoading());
  axios
    .get(`${proxy}/providers/search/${data}`)
    .then(res => {
      const response = res.data;

      configUserFromResponse(response, dispatch);

      dispatch({
        type: GET_PROVIDERS,
        payload: response.data
      });

      setTimeout(() => providerLoadingEnd(), 10);
    })
    .catch(err => handleError(err, dispatch));
};
export const deleteProvider = (id, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`${proxy}/providers/delete/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      history.push("/proveedores");
    })
    .catch(err => handleError(err, dispatch));
};
export const providerLoading = () => {
  return {
    type: PROVIDER_LOADING
  };
};
export const providerLoadingEnd = () => {
  return {
    type: PROVIDER_LOADING_END
  };
};
