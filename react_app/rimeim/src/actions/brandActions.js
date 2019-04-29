/* brandActions 
    Este archivo contiene todas las acciones HTTP para 
    realizar consultas al servidor referente a MARCAS

*/
import axios from 'axios';

import { configUserFromResponse } from './UserActions';
import { handleError, clearErrors } from './errorActions';

import {
  GET_BRAND,
  GET_BRANDS,
  BRAND_LOADING,
  BRAND_END_LOADING
} from './types';

export const getBrands = () => dispatch => {
  dispatch(brandLoadingObject());
  axios
    .get('/brands/get')
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_BRANDS,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch, BRAND_END_LOADING));
};

export const getBrand = id => dispatch => {
  dispatch(brandLoadingObject());
  axios
    .get(`/brands/get_one/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_BRAND,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, BRAND_END_LOADING));
};

export const searchBrand = data => dispatch => {
  dispatch(brandLoadingObject());
  axios
    .post('/brands/search', data)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_BRANDS,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, BRAND_END_LOADING));
};

export const addBrand = (brandData, history) => dispatch => {
  dispatch(brandLoadingObject());
  axios
    .post('/brands/add', brandData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_BRAND,
        payload: response.data
      });
      dispatch(clearErrors());
      history.push(`/marcas/${response.data.id}`);
    })
    .catch(err => handleError(err, dispatch, BRAND_END_LOADING));
};

export const updateBrand = (id, newBrandData) => dispatch => {
  dispatch(brandLoadingObject());
  axios
    .post(`/brands/update/${id}`, newBrandData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_BRAND,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, BRAND_END_LOADING));
};

export const deleteBrand = (id, history, new_url) => dispatch => {
  dispatch(brandLoadingObject());
  axios
    .delete(`/brands/delete/${id}`)
    .then(res => {
      configUserFromResponse(res.data, dispatch);
      dispatch({
        type: BRAND_END_LOADING
      });
      dispatch(clearErrors());
      history.push(new_url);
    })
    .catch(err => handleError(err, dispatch, BRAND_END_LOADING));
};

export const brandLoadingObject = () => {
  return {
    type: BRAND_LOADING
  };
};

export const brandEndLoadingObject = () => {
  return {
    type: BRAND_END_LOADING
  };
};

// Helpers
export const brandsToSelectOptions = brands => {
  const brandOptions = [];
  brands.forEach(brand =>
    brandOptions.push({ value: brand.id, label: brand.nombre })
  );
  return brandOptions;
};
