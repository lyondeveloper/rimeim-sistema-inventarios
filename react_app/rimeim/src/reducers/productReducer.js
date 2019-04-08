import {
  PRODUCT_LOADING,
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_END_LOADING
} from '../actions/types';

const initialState = {
  loading: false,
  product: {},
  products: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true
      };

    case PRODUCT_END_LOADING:
      return {
        ...state,
        loading: false
      };

    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
