import React, { Component } from 'react'

import { NEW_PRODUCT } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

class NewProduct extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        return (
            <React.Fragment>
                <Navbar navtype={NEW_PRODUCT} />

                <main>
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">

                                    <div className="row">
                                        <div className="col s12 m3">
                                            <img src="img/auto_motor.jpg" className="responsive-img" alt="" />
                                        </div>
                                        <div className="col s12 m9">
                                            <div className="row">
                                                <div className="col m2 s12">
                                                    <p className="p-y1">
                                                        Nombre:
                                                    </p>
                                                </div>
                                                <div className="col m10 s12">
                                                    <div className="p-y1 bordered">
                                                        <p>Motor</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col m2 s12">
                                                    <p className="p-y1">
                                                        Descripcion:
                                            </p>
                                                </div>
                                                <div className="col m10 s12">
                                                    <div className="p-y1 bordered">
                                                        <p>Descripcion</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col s12">
                                            <h5>Detalles</h5>
                                            <table className="table-bordered striped">
                                                <tbody>
                                                    <tr>
                                                        <td>Proveedor</td>
                                                        <td>Nombre</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Codigo</td>
                                                        <td>#12144</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Precio</td>
                                                        <td>Lps 12,000</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Marca</td>
                                                        <td>Nombre</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ubicacion en bodega</td>
                                                        <td>MT-124</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Cantidad minima</td>
                                                        <td>12</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Cantidad total</td>
                                                        <td>120</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col s12 m12 mb-1">
                                            <table className="striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Local</th>
                                                        <th>Cantidad</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>SPS</td>
                                                        <td>100</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tegucigalpa</td>
                                                        <td>40</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Bodega</td>
                                                        <td>10</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12">
                                <div className="card">
                                    <div className="card-content">
                                        <h5>Distribucion</h5>
                                        <table className="striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Local</th>
                                                    <th>Cantidad</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>SPS</td>
                                                    <td>100</td>
                                                </tr>
                                                <tr>
                                                    <td>Tegucigalpa</td>
                                                    <td>40</td>
                                                </tr>
                                                <tr>
                                                    <td>Bodega</td>
                                                    <td>10</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default NewProduct