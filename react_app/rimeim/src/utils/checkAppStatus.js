import jwt_decode from "jwt-decode"
import setAuthToken from "./setAuthToken"
import { setCurrentUser } from "../actions/UserActions"

const checkAppStatus = (store) => {
    let token = localStorage.getItem('rimeim_token')
    if (token) {
        setAuthToken(token)
        const decoded = jwt_decode(token)
        store.dispatch(setCurrentUser(decoded))
    }
}

export default checkAppStatus