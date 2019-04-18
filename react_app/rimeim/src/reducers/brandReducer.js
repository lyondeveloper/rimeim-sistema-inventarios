import {
  BRAND_LOADING,
  BRAND_END_LOADING,
  GET_BRAND,
  GET_BRANDS
} from '../actions/types';

const initialState = {
  loading: false,
  brand: {},
  brands: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BRAND_LOADING:
      return {
        ...state,
        loading: true
      };

    case BRAND_END_LOADING:
      return {
        ...state,
        loading: false
      };

    case GET_BRAND:
      return {
        ...state,
        loading: false,
        brand: action.payload
      };

    case GET_BRANDS:
      return {
        ...state,
        loading: false,
        brands: action.payload
      };

    default:
      return state;
  }
}
