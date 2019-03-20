import isEmpty from "../actions/isEmpty"
import {
    SET_CURRENT_USER,
    SET_LOCALS,
    SET_CURRENT_LOCAL,
    GET_USERS,
    USER_LOADING
} from '../actions/types'

const initialState = {
    loading: false,
    isLoggedIn: false,
    users: [],
    user: {},
    locals: [],
    currentLocal: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }

        case SET_CURRENT_USER:
            const isLoggedIn = !isEmpty(action.payload)
            return {
                ...state,
                isLoggedIn: isLoggedIn,
                user: action.payload,
                locals: isLoggedIn ? state.locals : [],
                currentLocal: isLoggedIn ? state.currentLocal : {},
                loading: false
            }

        case SET_LOCALS:
            return {
                ...state,
                locals: action.payload,
                loading: false
            }

        case SET_CURRENT_LOCAL:
            return {
                ...state,
                currentLocal: action.payload,
                loading: false
            }
        default:
            return state
    }
}