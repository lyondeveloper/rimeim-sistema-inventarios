import React from 'react'
import TextInputField from "../../common/TextInputField"

import PropTypes from 'prop-types'

const SearchSellModel = (props) => {
    const { onchange,
        onsearch,
        values: { cliente, vendedor, fecha_inicio, fecha_fin } } = props

    return (
        <div className="modal" id="modal_buscar_venta">
            <div className="modal-content">
                <h5>Buscar venta</h5>

                <div className="row">
                    <TextInputField id="cliente"
                        label="Cliente"
                        onchange={onchange}
                        value={cliente} />

                </div>
                <div className="row">
                    <TextInputField id="vendedor"
                        label="Vendedor"
                        onchange={onchange}
                        value={vendedor} />

                </div>
                <div className="row">
                    <TextInputField input_size="m6 s12"
                        id="fecha_inicio"
                        type="date"
                        label="Desde"
                        onchange={onchange}
                        active_label={true}
                        value={fecha_inicio} />

                    <TextInputField input_size="m6 s12"
                        id="fecha_fin"
                        type="date"
                        label="Hasta"
                        active_label={true}
                        onchange={onchange}
                        value={fecha_fin} />
                </div>
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat left">Cerrar</a>
                <a href="#!" className="modal-close waves-effect waves-green btn" onClick={onsearch}>Buscar</a>
            </div>
        </div>
    )
}

SearchSellModel.propTypes = {
    onsearch: PropTypes.func,
    onchange: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
}

export default SearchSellModel