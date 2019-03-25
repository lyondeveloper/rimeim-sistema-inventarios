import { combineReducers } from 'redux'
import userReducer from "./userReducer"
import localReducer from "./localReducer"
import employeReducer from "./employeReducer"

import errorReducer from "./errorReducer"


export default combineReducers({
    user: userReducer,
    employe: employeReducer,
    local: localReducer,
    errors: errorReducer
})