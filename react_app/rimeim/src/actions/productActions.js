// Este archivo almacena todas las funciones necesarias
// para poder enviar consultas a PRODUCTS
import axios from 'axios';

import { clearErrors, handleError } from './errorActions';

import { configUserFromResponse } from './UserActions';

import {
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_LOADING,
  PRODUCT_END_LOADING
} from './types';

export const getProducts = id_local => dispatch => {
  dispatch(productLoadingObject());
  axios
    .get(`/products/get/${id_local}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch, PRODUCT_END_LOADING));
};

export const getProductById = (id, id_local) => dispatch => {
  dispatch(productLoadingObject());
  axios
    .get(`/products/get_one/${id}/${id_local}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_PRODUCT,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch, PRODUCT_END_LOADING));
};

export const addNewProduct = (newProductData, history, new_url) => dispatch => {
  dispatch(productLoadingObject());
  axios
    .post('/products/add', newProductData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    .then(res => {
      dispatch(clearErrors());
      const response = res.data;
      console.log(response);
      /*configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_PRODUCT,
        payload: response.data
      });
      history.push(`${new_url}/${response.data.id}`);*/
    })
    .catch(err => handleError(err, dispatch, PRODUCT_END_LOADING));
};

export const updateProductById = (id, newData) => dispatch => {
  dispatch(productLoadingObject());
  axios
    .put(`/products/update/${id}`, newData)
    .then(res => {
      dispatch(clearErrors());
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_PRODUCT,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch, PRODUCT_END_LOADING));
};

export const deleteProductById = (id, history, new_url) => dispatch => {
  dispatch(productLoadingObject());
  axios
    .delete(`/products/delete/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({ type: PRODUCT_END_LOADING });
      history.push(new_url);
    })
    .catch(err => handleError(err, dispatch, PRODUCT_END_LOADING));
};

// Helper objects
export const productLoadingObject = () => {
  return {
    type: PRODUCT_LOADING
  };
};
