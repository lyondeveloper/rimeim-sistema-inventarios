import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    SET_LOCALS,
    SET_CURRENT_LOCAL
} from './types'

import isEmpty from './isEmpty';

export const loginUser = data => dispatch => {
    axios.post('/users/login', data)
        .then(res => {
            const response = res.data
            const decoded = getAuthTokenFromResponse(response)
            dispatch(setCurrentUser(decoded))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.data
            }))
}

export const getLocalsForCurrentUser = () => dispatch => {
    axios.get('/users/get_locals')
        .then(res => {
            const response = res.data
            const decoded = getAuthTokenFromResponse(response)
            dispatch(setCurrentUser(decoded))
            dispatch(setLocals(response.data))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.data
            })
        })
}

export const getAuthTokenFromResponse = (response) => {
    const { token } = response
    localStorage.setItem('rimeim_token', token)
    setAuthToken(token)
    const decoded = jwt_decode(token)
    return decoded
}

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

export const setLocals = (locals) => {
    return {
        type: SET_LOCALS,
        payload: locals
    }
}

export const setCurrentLocal = (local) => dispatch => {
    var currentLocal = !isEmpty(local) ? local : {}
    dispatch({
        type: SET_CURRENT_LOCAL,
        payload: currentLocal
    })
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('rimeim_token')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}