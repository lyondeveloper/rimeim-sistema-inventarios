import React, { Component } from 'react'

import { ADMIN_EMPLOYE } from "../../../layout/NavTypes"
import Navbar from "../../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../../utils/MaterialFunctions"

import EmployeLocal from "../../../common/EmployeLocal"

class Employe extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        return (
            <React.Fragment>
                <Navbar navtype={ADMIN_EMPLOYE} />

                <main>
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    <h5>Informacion del usuario</h5>
                                    <table className="table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>ID</td>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <td>Nombre</td>
                                                <td>Nombre del usuario</td>
                                            </tr>
                                            <tr>
                                                <td>Admin</td>
                                                <td>No</td>
                                            </tr>
                                            <tr>
                                                <td>Habilitado</td>
                                                <td>Si</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-content">
                                    <h5>Locales en los que esta registrado</h5>
                                    <EmployeLocal />
                                </div>
                            </div>

                            <button class="btn red darken-2">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </main>

                <div id="modal_editar_empleado" className="modal">
                    <div className="modal-content">
                        <h5>Editar empleado en el local: Local</h5>
                        <div className="row">
                            <div className="col s12">
                                <label>
                                    <input type="checkbox" className="filled-in" checked="checked" />
                                    <span>Habilitado</span>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <label>
                                    <input type="checkbox" className="filled-in" checked="checked" />
                                    <span>Admin</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close btn-flat left">Cerrar</a>
                        <button type="button" className="btn">
                            Aceptar
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Employe