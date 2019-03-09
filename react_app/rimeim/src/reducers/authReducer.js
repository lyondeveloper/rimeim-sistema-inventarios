import isEmpty from "../actions/isEmpty"
import { SET_CURRENT_USER } from '../actions/types'

const initialState = {
    isLoggedIn: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isLoggedIn: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state
    }
}