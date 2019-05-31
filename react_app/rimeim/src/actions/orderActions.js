import {
  GET_ORDER,
  GET_ORDERS,
  ORDER_LOADING,
  ORDER_LOADING_END
} from './types';
import axios from 'axios';

import { clearErrors, handleError } from './errorActions';
import { configUserFromResponse } from './UserActions';
import { API_URL } from '../utils/stringUtils';

export const createOrder = (data, history) => dispatch => {
  dispatch(orderLoading());
  axios
    .post(`${API_URL}/orders/add`, data)
    .then(res => {
      dispatch(clearErrors());
      const response = res.data;

      configUserFromResponse(response, dispatch);

      history.push(`/pedidos/${response.data.id}`);
    })
    .catch(err => handleError(err, dispatch, orderEndLoading()));
};

export const editOrder = (id, data, history) => dispatch => {
  dispatch(orderLoading());
  axios
    .put(`${API_URL}/orders/update/${id}`, data)
    .then(res => {
      dispatch(clearErrors());
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_ORDER,
        payload: response.data
      });

      history.push(`/pedidos/${response.data.id}`);
    })
    .catch(err => handleError(err, dispatch));
};

export const getOrder = id => dispatch => {
  dispatch(clearErrors());
  dispatch(orderLoading());
  axios
    .get(`${API_URL}/orders/get_one/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_ORDER,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch));
};

export const markReceived = (id, history, newUrl) => dispatch => {
  dispatch(orderLoading());
  axios
    .put(`${API_URL}/orders/mark_received/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(getOrder(id));
      history.push(`/pedidos/${response.data.id}`);
      dispatch(orderEndLoading());
    })
    .catch(err => handleError(err, dispatch));
};

export const getOrders = () => dispatch => {
  dispatch(orderLoading());
  axios
    .get(`${API_URL}/orders/get`)
    .then(res => {
      const response = res.data;

      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_ORDERS,
        payload: response.data
      });
      dispatch(clearErrors());
      dispatch(orderEndLoading());
    })
    .catch(err => handleError(err, dispatch));
};

export const searchOrder = data => dispatch => {
  dispatch(clearErrors());
  dispatch(orderLoading());
  axios
    .post(`${API_URL}/orders/search`, data)
    .then(res => {
      const response = res.data;

      configUserFromResponse(response, dispatch);

      dispatch({
        type: GET_ORDERS,
        payload: response.data
      });

      dispatch(orderEndLoading());
    })
    .catch(err => handleError(err, dispatch));
};

export const deleteOrder = (id, history, newUrl) => dispatch => {
  dispatch(clearErrors());
  dispatch(orderLoading());
  axios
    .delete(`${API_URL}/orders/delete/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(getOrders());
      history.push(newUrl);
      dispatch(orderEndLoading());
    })
    .catch(err => handleError(err, dispatch));
};

export const orderLoading = () => {
  return {
    type: ORDER_LOADING
  };
};

export const orderEndLoading = () => {
  return {
    type: ORDER_LOADING_END
  };
};
