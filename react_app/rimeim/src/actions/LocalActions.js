// Acciones a ejecutar para locales o tiendas
import axios from "axios"

import {
    GET_LOCALS,
    GET_LOCAL,
    LOCAL_LOADING
} from "./types"

import {
    clearErrors,
    handleError
} from "./errorActions"

import {
    getAuthTokenFromResponse,
    setCurrentUser
} from "./UserActions"

export const getLocals = () => dispatch => {
    dispatch(localLoading())
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
        .catch(err => handleError(err, dispatch))
}

export const getLocal = (id) => dispatch => {
    dispatch(localLoading())
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
        .catch(err => handleError(err, dispatch))
}

export const updateLocal = (id, newLocal, history) => dispatch => {
    dispatch(clearErrors())
    dispatch(localLoading())
    axios.put(`/locals/update/${id}`, newLocal)
        .then(res => {
            const response = res.data
            const decoded = getAuthTokenFromResponse(response)
            dispatch(setCurrentUser(decoded))
            dispatch({
                type: GET_LOCAL,
                payload: response.data
            })
            history.push(`/admin/locales/${id}`)
        })
        .catch(err => handleError(err, dispatch))
}

export const localLoading = () => {
    return {
        type: LOCAL_LOADING
    }
}