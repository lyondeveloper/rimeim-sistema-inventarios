import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import setCurrentLocalHeader from "../utils/setCurrentLocalHeader";

import {
  SET_CURRENT_USER,
  SET_LOCALS,
  SET_CURRENT_LOCAL,
  GET_USERS,
  USER_LOADING,
  USER_END_LOADING
} from "./types";

import { handleError, clearErrors } from "./errorActions";

import isEmpty from "./isEmpty";
const proxy = "https://rimeim.com/api";

export const addUser = (newUserData, history) => dispatch => {
  axios
    .post(`${proxy}/users/add`, newUserData)
    .then(res => {
      dispatch(clearErrors());
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: USER_END_LOADING
      });
      history.push("/admin/usuarios");
    })
    .catch(err => handleError(err, dispatch));
};

export const getUsers = () => dispatch => {
  dispatch(userLoadingObject());
  axios
    .get(`${proxy}/users/get`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(setUsers(response.data));
    })
    .catch(err => handleError(err, dispatch));
};

export const loginUser = data => dispatch => {
  axios
    .post(`${proxy}/users/login`, data, {
      headers: { "Access-Control-Allow-Origin": "*" }
    })
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
    })
    .catch(err => {
      handleError(err, dispatch);
    });
};

export const getLocalsForCurrentUser = () => dispatch => {
  axios
    .get(`${proxy}/users/get_locals`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(setLocals(response.data));
    })
    .catch(err => handleError(err, dispatch));
};

export const setCurrentLocal = local => dispatch => {
  var currentLocal = !isEmpty(local) ? local : {};
  setCurrentLocalHeader(currentLocal);
  if (isEmpty(currentLocal)) {
    localStorage.removeItem("rimeim_current_local");
  } else {
    localStorage.setItem("rimeim_current_local", JSON.stringify(currentLocal));
  }
  dispatch(setCurrentLocalToState(currentLocal));
};

export const getUsersByField = field => dispatch => {
  dispatch(userLoadingObject());
  axios
    .get(`${proxy}/users/search/${field}`)
    .then(res => {
      dispatch(clearUsers());
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(setUsers(response.data));
    })
    .catch(err => handleError(err, dispatch));
};

export const getUserById = id => dispatch => {
  dispatch(userLoadingObject());
  dispatch(clearUsers());
  axios
    .get(`${proxy}/users/get_one/${id}`)
    .then(res => {
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(setUsers([response.data]));
    })
    .catch(err => handleError(err, dispatch));
};

export const updateUserById = (id, newUserData) => dispatch => {
  axios
    .put(`${proxy}/users/update/${id}`, newUserData)
    .then(res => {
      dispatch(clearErrors());
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch(setUsers([response.data]));
    })
    .catch(err => handleError(err, dispatch));
};

export const updateUserPasswordById = (id, data) => dispatch => {
  axios
    .put(`${proxy}/users/update_password/${id}`, data)
    .then(res => {
      dispatch(clearErrors());
      const response = res.data;
      configUserFromResponse(response, dispatch);
      dispatch({
        type: USER_END_LOADING
      });
    })
    .catch(err => handleError(err, dispatch));
};

export const deleteUserById = (id, history) => dispatch => {
  axios
    .delete(`${proxy}/users/delete/${id}`)
    .then(res => {
      dispatch(clearErrors());
      const response = res.data;
      configUserFromResponse(response, dispatch);
      history.push("/admin/usuarios");
    })
    .catch(err => handleError(err, dispatch));
};

export const getAuthTokenFromResponse = response => {
  const { token } = response;
  localStorage.setItem("rimeim_token", token);
  setAuthToken(token);
  const decoded = jwt_decode(token);
  return decoded;
};

export const configUserFromResponse = (response, dispatch) => {
  let decoded = getAuthTokenFromResponse(response);
  if (response.data.primera_sesion && response.data.primera_sesion === true) {
    decoded.primera_sesion = true;
  }
  dispatch(setCurrentUser(decoded));
};

// Dispatch Objects
export const setUserLoading = () => dispatch => {
  dispatch(userLoadingObject);
};

export const clearUsers = () => dispatch => {
  dispatch({
    type: GET_USERS,
    payload: []
  });
};

// Simple return actions type
export const userLoadingObject = () => {
  return {
    type: USER_LOADING
  };
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const setLocals = locals => {
  return {
    type: SET_LOCALS,
    payload: locals
  };
};

export const setCurrentLocalToState = currentLocal => {
  return {
    type: SET_CURRENT_LOCAL,
    payload: currentLocal
  };
};

export const setUsers = users => {
  return {
    type: GET_USERS,
    payload: users
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("rimeim_token");
  localStorage.removeItem("rimeim_current_local");
  setAuthToken(false);
  setCurrentLocal(null);
  dispatch(setCurrentUser({}));
};

export const logOutUserWithDispatch = dispatch => {
  localStorage.removeItem("rimeim_token");
  localStorage.removeItem("rimeim_current_local");
  setAuthToken(false);
  setCurrentLocal(null);
  dispatch(setCurrentUser({}));
};
