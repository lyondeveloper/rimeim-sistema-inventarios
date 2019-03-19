import { combineReducers } from 'redux'
import userReducer from "./userReducer"
import localReducer from "./localReducer"
import errorReducer from "./errorReducer"

export default combineReducers({
    user: userReducer,
    errors: errorReducer,
    local: localReducer
})