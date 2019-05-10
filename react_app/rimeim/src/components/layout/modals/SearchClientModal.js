import React from 'react';
import TextInputField from '../../common/TextInputField';

import PropTypes from 'prop-types';

const SearchClientModal = props => {
  const {
    onchange,
    onsearch,
    values: { field }
  } = props;
  return (
    <div className='modal' id='modal_buscar_cliente'>
      <div className='modal-content'>
        <h5>Buscar cliente</h5>
        <div className='row'>
          <TextInputField
            id='field'
            label='Termino de busqueda'
            value={field}
            onchange={onchange}
          />
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          className='modal-close waves-effect waves-green btn-flat left'
        >
          Cerrar
        </a>
        <a
          href='#!'
          className='modal-close waves-effect waves-green btn'
          onClick={onsearch}
        >
          Buscar
        </a>
      </div>
    </div>
  );
};

SearchClientModal.propTypes = {
  onsearch: PropTypes.func,
  onchange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
};

export default SearchClientModal;
