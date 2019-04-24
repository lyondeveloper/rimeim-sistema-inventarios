import React from 'react';
import TextInputField from '../../common/TextInputField';

import PropTypes from 'prop-types';

const SearchProductModel = props => {
    const {
        onchange,
        onsearch,
        values: { termino, marca, tipo_vehiculo, ubicacion }
    } = props;

    return (
        <div className='modal' id='modal_buscar_producto'>
            <div className='modal-content'>
                <h5>Buscar producto</h5>

                <div className='row'>
                    <TextInputField
                        id='termino'
                        label='Termino de busqueda'
                        onchange={onchange}
                        value={termino}
                    />
                </div>
                <div className='row'>
                    <TextInputField
                        id='marca'
                        label='Marca'
                        onchange={onchange}
                        value={marca}
                    />
                </div>
                <div className='row'>
                    <TextInputField
                        id='tipo_vehiculo'
                        label='Tipo de vehiculo'
                        onchange={onchange}
                        value={tipo_vehiculo}
                    />
                </div>
                <div className='row'>
                    <TextInputField
                        id='ubicacion'
                        label='Ubicacion'
                        onchange={onchange}
                        value={ubicacion}
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

SearchProductModel.propTypes = {
    onsearch: PropTypes.func,
    onchange: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
};

export default SearchProductModel;
