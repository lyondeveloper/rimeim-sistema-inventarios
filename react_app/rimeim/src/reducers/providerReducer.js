import {
    PROVIDER_LOADING,
    PROVIDER_LOADING_END,
    GET_PROVIDER,
    GET_PROVIDERS
} from '../actions/types';

const initialState = {
    providers: [],
    provider: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PROVIDER:
            return {
                ...state,
                provider: action.payload,
                loading: false
            };

        case GET_PROVIDERS:
            return {
                ...state,
                providers: action.payload,
                loading: false
            };

        case PROVIDER_LOADING:
            return {
                ...state,
                loading: true
            };

        case PROVIDER_LOADING_END:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}
