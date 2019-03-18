import isEmpty from "../actions/isEmpty"
import {
    SET_CURRENT_USER,
    SET_LOCALS,
    SET_CURRENT_LOCAL
} from '../actions/types'

const initialState = {
    isLoggedIn: false,
    user: {},
    locals: [],
    currentLocal: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            const isLoggedIn = !isEmpty(action.payload)
            return {
                ...state,
                isLoggedIn: isLoggedIn,
                user: action.payload,
                locals: isLoggedIn ? state.locals : [],
                currentLocal: isLoggedIn ? state.currentLocal : {}
            }

        case SET_LOCALS:
            return {
                ...state,
                locals: action.payload
            }

        case SET_CURRENT_LOCAL:
            return {
                ...state,
                currentLocal: action.payload
            }
        default:
            return state
    }
}