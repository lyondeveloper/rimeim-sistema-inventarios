import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import setCurrentLocalHeader from './setCurrentLocalHeader';
import { setCurrentUser, setCurrentLocalToState } from '../actions/UserActions';

const checkAppStatus = store => {
  let token = localStorage.getItem('rimeim_token');
  if (token) {
    const currentTime = Date.now() / 1000;
    const decoded = jwt_decode(token);
    const invalidSession = decoded.dt_expire < currentTime;

    if (invalidSession) {
      localStorage.removeItem('rimeim_token');
    }
    setAuthToken(token);
    store.dispatch(setCurrentUser(decoded));
    if (invalidSession) return;

    let current_local = localStorage.getItem('rimeim_current_local');
    setCurrentLocalHeader(current_local);
    if (current_local) {
      let obj_current_local = JSON.parse(current_local);
      if (obj_current_local) {
        store.dispatch(setCurrentLocalToState(obj_current_local));
      } else {
        localStorage.removeItem('rimeim_current_local');
      }
    }
  }
};

export default checkAppStatus;
