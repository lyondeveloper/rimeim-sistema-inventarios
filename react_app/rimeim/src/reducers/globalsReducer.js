import {
  GET_GLOBAL_VARIABLES,
  GLOBAL_VARIABLES_END_LOADING,
  GLOBAL_VARIABLES_LOADING
} from '../actions/types';

const initialState = {
  loading: false,
  values: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GLOBAL_VARIABLES:
      return {
        ...state,
        values: action.payload,
        loading: false
      };

    case GLOBAL_VARIABLES_LOADING:
      return {
        ...state,
        loading: true
      };

    case GLOBAL_VARIABLES_END_LOADING:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
