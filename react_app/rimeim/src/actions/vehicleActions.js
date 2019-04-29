/* 
    vehicleActions 
    Este archivo contiene todas las acciones HTTP para 
    realizar consultas al servidor referente a TIPOS DE VEHICULOS

*/
import axios from 'axios';

import { configUserFromResponse } from './UserActions';
import { handleError, clearErrors } from './errorActions';

import {
  GET_VEHICLE,
  GET_VEHICLES,
  VEHICLE_LOADING,
  VEHICLE_END_LOADING
} from './types';

export const getVehicles = () => dispatch => {
  dispatch(vehicleLoadingObject());

  axios
    .get('/vehicles/get')
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_VEHICLES,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, VEHICLE_END_LOADING));
};

export const getVehicle = id => dispatch => {
  dispatch(vehicleLoadingObject());
  axios
    .get(`/vehicles/get_one/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_VEHICLE,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, VEHICLE_END_LOADING));
};

export const searchVehicle = vehicleData => dispatch => {
  dispatch(vehicleLoadingObject());

  axios
    .post('/vehicles/search', vehicleData)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_VEHICLES,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, VEHICLE_END_LOADING));
};

export const addVehicle = (newVehicleData, history) => dispatch => {
  dispatch(vehicleLoadingObject());
  axios
    .post('/vehicles/add', newVehicleData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_VEHICLE,
        payload: response.data
      });
      history.push(`/vehiculos/${response.data.id}`);
      dispatch(clearErrors());
    });
};

export const updateVehicle = (id, newBrandData) => dispatch => {
  dispatch(vehicleLoadingObject());
  axios
    .post(`/vehicles/update/${id}`, newBrandData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_VEHICLE,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, VEHICLE_END_LOADING));
};

export const deleteVehicle = (id, history, new_url) => dispatch => {
  dispatch(vehicleLoadingObject());

  axios
    .delete(`/vehicles/delete/${id}`)
    .then(res => {
      configUserFromResponse(res.data, dispatch);
      dispatch({
        type: VEHICLE_END_LOADING
      });
      dispatch(clearErrors());
      history.push(new_url);
    })
    .catch(err => handleError(err, dispatch, VEHICLE_END_LOADING));
};

export const vehicleLoadingObject = () => {
  return {
    type: VEHICLE_LOADING
  };
};

export const vehicleEndLoadingObject = () => {
  return {
    type: VEHICLE_END_LOADING
  };
};

// Helpers
export const vehiclesToSelectOptions = vehicles => {
  const vehicleOptions = [];
  vehicles.forEach(v => vehicleOptions.push({ value: v.id, label: v.nombre }));
  return vehicleOptions;
};
