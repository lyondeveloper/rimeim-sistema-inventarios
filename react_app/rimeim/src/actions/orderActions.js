import {
  GET_ORDER,
  GET_ORDERS,
  ORDER_LOADING,
  ORDER_LOADING_END
} from './types';
import axios from 'axios';

import { clearErrors, handleError } from './errorActions';

export const addOrder = (data, history, newUrl) => dispatch => {};
export const editOrder = (id, data, history, newUrl) => dispatch => {};
export const getOrder = id => dispatch => {};
export const getOrders = () => dispatch => {};
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
