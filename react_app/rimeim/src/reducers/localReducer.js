import { GET_LOCAL, GET_LOCALS, LOCAL_LOADING } from '../actions/types';

const initialState = {
  loading: false,
  local: {},
  locals: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOCAL_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_LOCAL:
      return {
        ...state,
        local: action.payload,
        loading: false
      };

    case GET_LOCALS:
      return {
        ...state,
        locals: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
