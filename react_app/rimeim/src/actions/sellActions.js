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
  GET_SELLS
} from "../actions/types";

import { configUserFromResponse } from "./UserActions";
import { handleError, clearErrors } from "./errorActions";

export const getSells = () => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .get("/sells/get")
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
    .post("/sells/search", jsonField)
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
    .get(`/sells/get_one/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response);
      dispatch({
        type: GET_SELL,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, SELL_END_LOADING));
};

export const addNewSell = (
  newSellData,
  history,
  redirect_url_base
) => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .post("/sells/add", newSellData)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response);
      dispatch(clearErrors());
      history.push(`${redirect_url_base}/${response.id}`);
    })
    .catch(err => handleError(err, dispatch, SELL_END_LOADING));
};

export const updateSellById = (id, newSellData) => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .put(`/sells/update/${id}`, newSellData)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response);
      dispatch({
        type: GET_SELL,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => handleError(err, dispatch, SELL_END_LOADING));
};

export const deleteSellById = (id, history, redirect_url) => dispatch => {
  dispatchSellLoading(dispatch);
  axios
    .delete(`/sells/delete/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response);
      dispatch({
        type: GET_SELL,
        payload: {}
      });
      history.push(redirect_url);
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
