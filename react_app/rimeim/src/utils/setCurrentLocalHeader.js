import axios from 'axios';

const setCurrentLocalHeader = local => {
  console.log(`Asignando local: ${local}`);
  if (local && local.id) {
    axios.defaults.headers.common['idlocal'] = `${local.id}`;
  } else {
    delete axios.defaults.headers.common['idlocal'];
  }
};

export default setCurrentLocalHeader;
