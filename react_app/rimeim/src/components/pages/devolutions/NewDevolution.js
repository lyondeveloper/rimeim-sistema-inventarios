import React, { Component } from 'react'

import { NEW_DEVOLUTION } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import "../../../public/css/devoluciones.css"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import SellColumnsDetails from "../../common/SellColumnsDetails"

class NewDevolution extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        return (
            <React.Fragment>
                <Navbar navtype={NEW_DEVOLUTION} />

                <main>
                    <div className="row mb-0 mt-1">
                        <div className="col s12 m5 l4">
                            <div className="input-field">
                                <select>
                                    <option value="" disabled selected>Seleccionar</option>
                                    <option value="1">Remover</option>
                                    <option value="2">Deshacer cambios</option>
                                </select>
                                <label>Acciones en lote</label>
                            </div>
                        </div>
                    </div>
                    <div className="row devolucion">
                        <div className="col s12">
                            <table className="table-bordered striped highlight header-fixed">
                                <thead>
                                    <tr>
                                        <th className="header-th"></th>
                                        <th>Codigo</th>
                                        <th>Descripcion</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="checkbox-td">
                                            <label>
                                                <input type="checkbox" className="filled-in" />
                                                <span></span>
                                            </label>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row col-bordered devolucion-total">
                        <SellColumnsDetails
                            colsize="s6"
                            title="Total inicial"
                            value="0" />
                        <SellColumnsDetails
                            colsize="s6"
                            title="Total devuelto"
                            value="0" />
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default NewDevolution