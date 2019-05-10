import {
  DEVOLUTION_LOADING,
  DEVOLUTION_END_LOADING,
  GET_DEVOLUTION,
  GET_DEVOLUTIONS
} from '../actions/types';

const initialState = {
  loading: false,
  devolutions: [],
  devolution: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DEVOLUTION_LOADING:
      return {
        ...state,
        loading: true
      };
    case DEVOLUTION_END_LOADING:
      return {
        ...state,
        loading: false
      };

    case GET_DEVOLUTION:
      return {
        ...state,
        loading: false,
        devolution: action.payload
      };

    case GET_DEVOLUTIONS:
      return {
        ...state,
        loading: false,
        devolutions: action.payload
      };

    default:
      return state;
  }
}
