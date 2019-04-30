import {
  SELL_LOADING,
  SELL_END_LOADING,
  GET_SELL,
  GET_SELLS
} from "../actions/types";

const initialState = {
  loading: true,
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

    default:
      return state;
  }
}
