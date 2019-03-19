import React, { Component } from 'react'

import { ADMIN_LOCAL } from "../../../layout/NavTypes"
import NavbarAdmin from "../../../layout/NavbarAdmin"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../../utils/MaterialFunctions"

class Local extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        return (
            <React.Fragment>
                <NavbarAdmin navtype={ADMIN_LOCAL} />

                <main>
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">

                                    <table>
                                        <tbody>
                                            {/* <tr>
                                                <td>Imagen</td>
                                                <td>
                                                    <img src="img/logo_rimeim.png" alt="" className="responsive-img materialboxed" />
                                                </td>
                                            </tr> */}
                                            <tr>
                                                <td>Codigo</td>
                                                <td>$qdfg</td>
                                            </tr>
                                            <tr>
                                                <td>Nombre</td>
                                                <td>Nombre del local</td>
                                            </tr>
                                            <tr>
                                                <td>Es bodega</td>
                                                <td>No</td>
                                            </tr>
                                            <tr>
                                                <td>Color</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Ubicacion</td>
                                                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium beatae
                                            blanditiis nobis, a repellat ipsam.</td>
                                            </tr>
                                            <tr>
                                                <td>Latitud</td>
                                                <td>112.1</td>
                                            </tr>
                                            <tr>
                                                <td>Logitud</td>
                                                <td>121.2</td>
                                            </tr>
                                            <tr>
                                                <td>Descripcion</td>
                                                <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, aperiam
                                                    nesciunt! Non neque quo provident facere? Dolorum libero delectus officiis.
                                        </td>
                                            </tr>
                                        </tbody>
                                    </table>


                                </div>
                            </div>

                            <div className="card">
                                <div className="card-content">
                                    <h5>Empleados</h5>

                                    <table className="table-bordered striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Mango</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </React.Fragment>
        )
    }
}

export default Local