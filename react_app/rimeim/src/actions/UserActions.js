import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

import {
    GET_ERRORS,
    SET_CURRENT_USER
} from './types'

export const loginUser = data => dispatch => {
    setTimeout(() => {
        axios.post('/users/login', data)
            .then(res => {
                const response = res.data
                const { token } = response
                localStorage.setItem('rimeim_token', token)
                setAuthToken(token)
                const decoded = jwt_decode(token)
                dispatch(setCurrentUser(decoded))
            })
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data.data
                }))
    }, 2000)
}

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}


export const logoutUser = () => dispatch => {
    localStorage.removeItem('rimeim_token')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}