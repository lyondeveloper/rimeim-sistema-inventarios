/*
    sellActions
    Este archivo contiene todas las funciones para realizar peticiones HTPP
    al servidor referentes a VENTAS
*/

import axios from "axios";
import {
  SELL_LOADING,
  SELL_END_LOADING,
  GET_SELL,
  GET_SELLS,
  SELL_FAILED,
  SELL_SUCCESS
} from "../actions/types";

import { configUserFromResponse } from "./UserActions";
import { handleError, clearErrors } from "./errorActions";
const proxy = "https://rimeim.com/api";

export const getSells = () => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .get(`${proxy}/sales/get`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_SELLS,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, SELL_END_LOADING));
};

export const getQuotes = () => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .get(`${proxy}/sales/getquotes`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_SELLS,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, SELL_END_LOADING));
};

export const searchSell = jsonField => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .post(`${proxy}/sales/search`, jsonField)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: GET_SELLS,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, SELL_END_LOADING));
};

export const getSellById = id => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .get(`${proxy}/sales/get_one/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(clearErrors());
      dispatch({
        type: GET_SELL,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch, SELL_END_LOADING));
};

export const getQuotationById = id => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .get(`${proxy}/sales/get_quote/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(clearErrors());
      dispatch({
        type: GET_SELL,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch, SELL_END_LOADING));
};

export const addNewSell = newSellData => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .post(`${proxy}/sales/add`, newSellData)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(clearErrors());
      dispatch({
        type: SELL_SUCCESS
      });
    })
    .catch(err => handleError(err, dispatch, SELL_FAILED));
};

export const deleteQuotation = (id, history, new_url) => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .delete(`${proxy}/sales/delete_quote/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(clearErrors());
      history.push(new_url);
    })
    .catch(err => handleError(err, dispatch, SELL_END_LOADING));
};

export const dispatchSellLoading = dispatch => {
  dispatch(sellLoadingObject());
};

export const dispatchSellEndLoading = dispatch => {
  dispatch({
    type: SELL_END_LOADING
  });
};

export const sellLoadingObject = () => {
  return {
    type: SELL_LOADING
  };
};
