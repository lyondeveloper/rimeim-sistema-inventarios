import { combineReducers } from 'redux';
import userReducer from './userReducer';
import localReducer from './localReducer';
import employeReducer from './employeReducer';
import productReducer from './productReducer';

import errorReducer from './errorReducer';

export default combineReducers({
  user: userReducer,
  employe: employeReducer,
  local: localReducer,
  product: productReducer,
  errors: errorReducer
});
