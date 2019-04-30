import {
  GET_ORDER,
  GET_ORDERS,
  ORDER_LOADING,
  ORDER_LOADING_END
} from '../actions/types';

const initialState = {
  order: {},
  orders: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
        loading: false
      };

    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };

    case ORDER_LOADING:
      return {
        ...state,
        loading: true
      };

    case ORDER_LOADING_END:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
