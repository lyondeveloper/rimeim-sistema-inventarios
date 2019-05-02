import { combineReducers } from 'redux';
import userReducer from './userReducer';
import localReducer from './localReducer';
import employeReducer from './employeReducer';
import productReducer from './productReducer';
import brandReducer from './brandReducer';
import vehicleTypeReducer from './vehicleType';
import clientReducer from './clientReducer';
import providerReducer from './providerReducer';
import sellReducer from './sellReducer';
import orderReducer from './orderReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  user: userReducer,
  employe: employeReducer,
  local: localReducer,
  product: productReducer,
  brand: brandReducer,
  vehicle: vehicleTypeReducer,
  client: clientReducer,
  provider: providerReducer,
  sell: sellReducer,
  order: orderReducer,
  errors: errorReducer
});
