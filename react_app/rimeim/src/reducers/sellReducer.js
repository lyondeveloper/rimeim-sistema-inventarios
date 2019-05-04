import {
  SELL_LOADING,
  SELL_END_LOADING,
  GET_SELL,
  GET_SELLS,
  SELL_SUCCESS,
  SELL_FAILED
} from "../actions/types";

const initialState = {
  loading: false,
  sell_success: false,
  sell: {},
  sells: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELL_LOADING:
      return {
        ...state,
        loading: true
      };

    case SELL_END_LOADING:
      return {
        ...state,
        loading: false
      };

    case GET_SELL:
      return {
        ...state,
        loading: false,
        sell: action.payload
      };

    case GET_SELLS:
      return {
        ...state,
        loading: false,
        sells: action.payload
      };

    case SELL_SUCCESS:
      return {
        ...state,
        loading: false,
        sell_success: true
      };

    case SELL_FAILED:
      return {
        ...state,
        loading: false,
        sell_success: false
      };

    default:
      return state;
  }
}
