import { CLIENT_LOADING, GET_CLIENT, GET_CLIENTS } from '../actions/types';

const initialState = {
    loading: false,
    clients: [],
    client: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CLIENT_LOADING:
            return {
                ...state,
                loading: true
            };

        case GET_CLIENT:
            return {
                ...state,
                loading: false,
                client: action.payload
            };

        case GET_CLIENTS:
            return {
                ...state,
                loading: false,
                clients: action.payload
            };

        default:
            return state;
    }
}
