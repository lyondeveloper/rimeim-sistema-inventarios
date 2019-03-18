import jwt_decode from "jwt-decode"
import setAuthToken from "./setAuthToken"
import { setCurrentUser } from "../actions/UserActions"

const checkAppStatus = (store) => {
    let token = localStorage.getItem('rimeim_token')
    if (token) {
        const currentTime = Date.now / 1000;
        const decoded = jwt_decode(token)

        if (decoded.dt_expire < currentTime) {
            localStorage.removeItem('rimeim_token')
            window.location('/')
            return;
        }
        setAuthToken(token)
        store.dispatch(setCurrentUser(decoded))
    }
}

export default checkAppStatus