import {
  GET_ORDER,
  GET_ORDERS,
  ORDER_LOADING,
  ORDER_LOADING_END
} from './types';
import axios from 'axios';

import { clearErrors, handleError } from './errorActions';
import { configUserFromResponse } from './UserActions';

export const createOrder = (data, history) => dispatch => {
  dispatch(orderLoading());
  axios
    .post('/orders/add', data)
    .then(res => {
      const response = res.data;

      configUserFromResponse(response, dispatch);

      dispatch(clearErrors());
      history.push(`pedidos/${response.data.id}`);
    })
    .catch(err => handleError(err, dispatch, orderEndLoading()));
};

export const editOrder = (id, data, history) => dispatch => {
  dispatch(orderLoading());
  axios
    .post(`/orders/update/${id}`, data)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_ORDER,
        payload: response.data
      });

      history.push(`pedidos/${response.data.id}`);
    })
    .catch(err => handleError(err, dispatch));
};

export const getOrder = id => dispatch => {
  dispatch(orderLoading());
  axios
    .get(`/orders/get_one/${id}`)
    .then(res => {
      const response = res.data;

      configUserFromResponse(response, dispatch);

      dispatch({
        type: GET_ORDER,
        payload: response.data
      });

      dispatch(orderEndLoading());
    })
    .catch(err => handleError(err, dispatch));
};

export const getOrders = () => dispatch => {
  dispatch(orderLoading());
  axios
    .get('orders/get')
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

export const searchOrder = data => dispatch => {};

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
