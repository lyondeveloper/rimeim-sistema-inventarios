import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    SET_LOCALS,
    SET_CURRENT_LOCAL,
    GET_USERS,
    USER_LOADING
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

export const setCurrentLocal = (local) => dispatch => {
    var currentLocal = !isEmpty(local) ? local : {}
    if (isEmpty(currentLocal)) {
        localStorage.removeItem('rimeim_current_local')
    } else {
        localStorage.setItem('rimeim_current_local', JSON.stringify(currentLocal))
    }
    dispatch(setCurrentLocalToState(currentLocal))
}

export const getUsersByField = (field) => dispatch => {
    dispatch(setUsers([]))
    axios.get(`/users/search/${field}`)
        .then(res => {
            const response = res.data
            const decoded = getAuthTokenFromResponse(response)
            dispatch(setCurrentUser(decoded))
            dispatch(setUsers(response.data))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.data
            }))
}

export const setUserLoading = () => dispatch => {
    dispatch(userLoadingObject)
}

export const clearUsers = () => dispatch => {
    dispatch({
        type: GET_USERS,
        payload: []
    })
}

// Simple return actions type
export const userLoadingObject = () => {
    return {
        type: USER_LOADING
    }
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

export const setCurrentLocalToState = (currentLocal) => {
    return {
        type: SET_CURRENT_LOCAL,
        payload: currentLocal
    }
}

export const setUsers = (users) => {
    return {
        type: GET_USERS,
        payload: users
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('rimeim_token')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}