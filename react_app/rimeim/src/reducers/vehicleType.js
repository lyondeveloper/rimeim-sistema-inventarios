import {
  VEHICLE_LOADING,
  VEHICLE_END_LOADING,
  GET_VEHICLE,
  GET_VEHICLES
} from '../actions/types';

const initialState = {
  loading: false,
  vehicle: {},
  vehicles: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VEHICLE_LOADING:
      return {
        ...state,
        loading: true
      };

    case VEHICLE_END_LOADING:
      return {
        ...state,
        loading: false
      };

    case GET_VEHICLE:
      return {
        ...state,
        loading: false,
        vehicle: action.payload
      };

    case GET_VEHICLES:
      return {
        ...state,
        loading: false,
        vehicles: action.payload
      };

    default:
      return state;
  }
}
