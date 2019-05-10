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

import { API_URL } from '../utils/stringUtils';

export const getProducts = () => dispatch => {
  dispatch(productLoadingObject());
  axios
    .get(`${API_URL}/products/get`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, PRODUCT_END_LOADING));
};

export const searchProduct = field => dispatch => {
  dispatch(productLoadingObject());
  axios
    .post(`${API_URL}/products/search`, field)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data
      });
      dispatch(productEndLoadingObject());
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, PRODUCT_END_LOADING));
};

export const getProductById = id => dispatch => {
  dispatch(productLoadingObject());
  axios
    .get(`${API_URL}/products/get_one/${id}`)
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

export const getProductByCBForSell = productData => dispatch => {
  dispatch(productLoadingObject());
  axios
    .post(`${API_URL}/products/get_one_fsell`, productData)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_PRODUCT,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PRODUCT,
        payload: {}
      });
      handleError(err, dispatch);
    });
};

export const addNewProduct = (newProductData, history, new_url) => dispatch => {
  dispatch(productLoadingObject());
  axios
    .post(`${API_URL}/products/add`, newProductData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    .then(res => {
      dispatch(clearErrors());
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_PRODUCT,
        payload: response.data
      });
      history.push(`${new_url}/${response.data.id}`);
    })
    .catch(err => handleError(err, dispatch, PRODUCT_END_LOADING));
};

export const addMultiple = productsData => dispatch => {
  dispatch(productLoadingObject());
  axios
    .post(`${API_URL}/products/add_multiple`, productsData)
    .then(res => {
      dispatch(clearErrors());
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: PRODUCT_END_LOADING
      });
    })
    .catch(err => handleError(err, dispatch, PRODUCT_END_LOADING));
};

export const updateProductById = (id, newData) => dispatch => {
  dispatch(productLoadingObject());
  axios
    .post(`${API_URL}/products/update/${id}`, newData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
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
    .delete(`${API_URL}/products/delete/${id}`)
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

export const productEndLoadingObject = () => {
  return {
    type: PRODUCT_END_LOADING
  };
};

export const cleanProducts = () => dispatch => {
  dispatch({
    type: GET_PRODUCTS,
    payload: []
  });
};

export const cleanProduct = () => dispatch => {
  dispatch({
    type: GET_PRODUCT,
    payload: {}
  });
};
