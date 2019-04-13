import axios from 'axios';

import { CLIENT_LOADING, GET_CLIENT, GET_CLIENTS } from '../actions/types';

import { clearErrors, handleError } from './errorActions';

import { configUserFromResponse } from './UserActions';

export const createClient = (data, history, newUrl) => dispatch => {
    axios
        .post('/clients/add', data)
        .then(res => {
            dispatch(clearErrors());

            configUserFromResponse(res.data, dispatch);

            history.push(newUrl);
        })
        .catch(err => handleError(err, dispatch));
};
export const getClient = id => dispatch => {};
export const getClients = () => dispatch => {};
export const editClient = id => dispatch => {};
export const searchClient = () => dispatch => {};
export const deleteClient = id => dispatch => {};
export const clientLoading = () => dispatch => {
    dispatch({
        type: CLIENT_LOADING
    });
};
