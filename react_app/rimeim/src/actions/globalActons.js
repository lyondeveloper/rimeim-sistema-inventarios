import axios from 'axios';
import {
  GET_GLOBAL_VARIABLES,
  GLOBAL_VARIABLES_END_LOADING,
  GLOBAL_VARIABLES_LOADING
} from './types';

import { configUserFromResponse } from './UserActions';

import { clearErrors, handleError } from './errorActions';
import { API_URL } from '../utils/stringUtils';

export const getGlobalVariables = () => dispatch => {
  loadingGlobals(dispatch);
  axios
    .get(`${API_URL}/globals`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(clearErrors());
      dispatch({
        type: GET_GLOBAL_VARIABLES,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch, GLOBAL_VARIABLES_END_LOADING));
};

export const updateGlobalVariables = jsonData => dispatch => {
  loadingGlobals(dispatch);
  axios
    .put(`${API_URL}/globals/update`, jsonData)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(clearErrors());
      dispatch({
        type: GET_GLOBAL_VARIABLES,
        payload: response.data
      });
    })
    .catch(err => handleError(err, dispatch, GLOBAL_VARIABLES_END_LOADING));
};

export const loadingGlobals = dispatch => {
  dispatch({
    type: GLOBAL_VARIABLES_LOADING
  });
};
