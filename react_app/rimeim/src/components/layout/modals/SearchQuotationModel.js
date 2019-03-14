import React from 'react'
import TextInputField from "../../common/TextInputField"

import PropTypes from 'prop-types'

const SearchQuotationModel = (props) => {
    const { onchange,
        onsearch,
        values: { cliente, rtn, productos, producto } } = props
    return (
        <div id="modal_buscar_cotizacion" className="modal">
            <div className="modal-content">
                <h5>Buscar cotizacion</h5>
                <div>
                    <div className="row">
                        <TextInputField id="cliente"
                            label="Cliente"
                            value={cliente}
                            onchange={onchange} />
                    </div>
                    <div className="row">
                        <TextInputField id="rtn"
                            label="RTN"
                            value={rtn}
                            onchange={onchange} />
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <div className="input-field">
                                <label htmlFor="producto">Producto</label>
                                <input type="text" id="producto" name="producto" onChange={onchange} value={producto} />
                            </div>
                            <table className="striped table-bordered">
                                <tbody>
                                    {productos.map((producto, i) => {
                                        return (
                                            <tr key={`pro${producto.id}`}>
                                                <td>producto.codigo</td>
                                                <td>producto.nombre</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat left">Cerrar</a>
                <a href="#!" className="modal-close waves-effect waves-green btn" onClick={onsearch}>Buscar</a>
            </div>
        </div>
    )
}

SearchQuotationModel.propTypes = {
    onsearch: PropTypes.func,
    onchange: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
}

export default SearchQuotationModel
