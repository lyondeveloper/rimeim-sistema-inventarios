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
  SELL_SUCCESS,
  GET_SELL_REPORT
} from "../actions/types";

import { configUserFromResponse } from "./UserActions";
import { handleError, clearErrors } from "./errorActions";

import { API_URL } from "../utils/stringUtils";

export const getSells = () => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .get(`${API_URL}/sales/get`)
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
    .get(`${API_URL}/sales/getquotes`)
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
    .post(`${API_URL}/sales/search`, jsonField)
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
    .get(`${API_URL}/sales/get_one/${id}`)
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
    .get(`${API_URL}/sales/get_quote/${id}`)
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
    .post(`${API_URL}/sales/add`, newSellData)
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
    .delete(`${API_URL}/sales/delete_quote/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(clearErrors());
      history.push(new_url);
    })
    .catch(err => handleError(err, dispatch, SELL_END_LOADING));
};

export const addDevolution = (id_sell, devolutionData, history) => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .post(`${API_URL}/devolutions/add/${id_sell}`, devolutionData)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(clearErrors());
      history.push(`/devoluciones/${response.data.id}`);
    })
    .catch(err => handleError(err, dispatch, SELL_END_LOADING));
};

export const getSellReport = jsonData => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .post(`${API_URL}/sales/get_report`, jsonData)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(clearErrors());
      dispatch({
        type: GET_SELL_REPORT,
        payload: response.data
      });
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
