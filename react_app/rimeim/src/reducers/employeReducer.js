import {
    EMPLOYE_LOADING,
    GET_EMPLOYE,
    GET_EMPLOYES
} from '../actions/types'

const initialState = {
    loading: false,
    employe: {},
    employes: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case EMPLOYE_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_EMPLOYE:
            return {
                ...state,
                employe: action.payload,
                loading: false
            }

        case GET_EMPLOYES:
            return {
                ...state,
                employes: action.payload,
                loading: false
            }

        default:
            return state
    }
}