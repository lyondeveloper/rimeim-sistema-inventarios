// Acciones a ejecutar para locales o tiendas
import axios from "axios"

import {
    GET_LOCALS,
    GET_LOCAL,
    GET_ERRORS
} from "./types"

import {
    clearErrors
} from "./errorActions"

import {
    getAuthTokenFromResponse,
    setCurrentUser
} from "./UserActions"

export const getLocals = () => dispatch => {
    dispatch(clearErrors())
    axios.get('/locals')
        .then(res => {
            const response = res.data
            const decoded = getAuthTokenFromResponse(response)
            dispatch(setCurrentUser(decoded))
            dispatch({
                type: GET_LOCALS,
                payload: response.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.data
            }))
}

export const getLocal = (id) => dispatch => {
    axios.get(`/locals/get_one/${id}`)
        .then(res => {
            const response = res.data
            const decoded = getAuthTokenFromResponse(response)
            dispatch(setCurrentUser(decoded))
            dispatch({
                type: GET_LOCAL,
                payload: response.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.data
            }))
}