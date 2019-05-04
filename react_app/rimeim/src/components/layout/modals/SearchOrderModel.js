import React from 'react';
import TextInputField from '../../common/TextInputField';

import PropTypes from 'prop-types';

const SearchOrderModel = props => {
  const {
    onchange,
    onsearch,
    values: { codigo, proveedor, local, fecha_inicio, fecha_fin }
  } = props;
  return (
    <div className='modal' id='modal_buscar_pedido'>
      <div className='modal-content'>
        <h5>Buscar pedido</h5>
        <div className='row'>
          <TextInputField
            id='proveedor'
            label='Proveedor'
            onchange={onchange}
            value={proveedor}
          />
        </div>
        <div className='row'>
          <TextInputField
            id='codigo'
            label='Codigo'
            onchange={onchange}
            value={codigo}
          />
        </div>
        <div className='row'>
          <TextInputField
            id='local'
            label='Local'
            value={local}
            onchange={onchange}
          />
        </div>
        <div className='row'>
          <TextInputField
            input_size='s12 m6'
            id='fecha_inicio'
            type='date'
            label='Desde'
            active_label={true}
            onchange={onchange}
            value={fecha_inicio}
          />

          <TextInputField
            input_size='s12 m6'
            id='fecha_fin'
            type='date'
            label='Hasta'
            active_label={true}
            value={fecha_fin}
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

SearchOrderModel.propTypes = {
  onsearch: PropTypes.func,
  onchange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
};

export default SearchOrderModel;
