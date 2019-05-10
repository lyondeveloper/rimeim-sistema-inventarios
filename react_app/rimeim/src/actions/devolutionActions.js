import axios from 'axios';
import {
  DEVOLUTION_END_LOADING,
  DEVOLUTION_LOADING,
  GET_DEVOLUTION,
  GET_DEVOLUTIONS
} from './types';

import { clearErrors, handleError } from './errorActions';

import { configUserFromResponse } from './UserActions';
import { API_URL } from '../utils/stringUtils';

export const getDevolutions = () => dispatch => {
  dispatchLoadingDevolution(dispatch);
  axios
    .get(`${API_URL}/devolutions/get`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(clearErrors());
      dispatch({
        type: GET_DEVOLUTIONS,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch, DEVOLUTION_END_LOADING));
};

export const getDevolutionById = id => dispatch => {
  dispatchLoadingDevolution(dispatch);
  axios
    .get(`${API_URL}/devolutions/get_one/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(clearErrors());
      dispatch({
        type: GET_DEVOLUTION,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch, DEVOLUTION_END_LOADING));
};

export const deleteDevolution = (id, history, new_url) => {
  dispatchLoadingDevolution(dispatch);
  axios
    .delete(`${API_URL}/devolutions/delete/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(clearErrors());
      history.push(`${new_url}`);
    })
    .catch(err => handleError(err, dispatch, DEVOLUTION_END_LOADING));
};

export const dispatchLoadingDevolution = dispatch => {
  dispatch({
    type: DEVOLUTION_LOADING
  });
};
