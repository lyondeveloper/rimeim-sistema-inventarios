import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    //axios.defaults.headers.common['Authorization'] = `yufncm918 ${token}`;
    axios.defaults.headers.common['Auth'] = `yufncm918 ${token}`;
  } else {
    //delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['Auth'];
  }
};

export default setAuthToken;
