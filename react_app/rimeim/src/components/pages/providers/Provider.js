import React, { Component } from 'react'

import { PROVIDER } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

class Provider extends Component {

    state = {
        nombre: "",
        correo: "",
        rtn: "",
        contacto: "",
        img: "",
        es_empresa: false,
        productos: []
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        const { nombre, correo, rtn, contacto, img, es_empresa, productos } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={PROVIDER} />

                <main>
                    <div class="row">
                        <div class="col s12">
                            <div class="card">
                                <div class="card-content provider-info">

                                    <div class="row">
                                        <div class="col s12 m12 l5 center">
                                            <img src={img} class="responsive-img bordered" alt="" />

                                        </div>

                                        <div class="col s12 m12 l7">
                                            <span class="d-block">
                                                Nombre: <span>{nombre}</span>
                                            </span>
                                            <span class="d-block">
                                                RTN: <span>{rtn}</span>
                                            </span>
                                        </div>

                                    </div>


                                    <div class="row">
                                        <div class="col">
                                            <span class="d-block">
                                                Correo: <span>{correo}</span>
                                            </span>
                                            <span class="d-block">
                                                Contacto: <span>{contacto}</span>
                                            </span>
                                            <div class="d-block">
                                                <label>
                                                    <input type="checkbox" class="filled-in" checked={es_empresa ? ('on') : ('off')} disabled
                                                        id="es_empresa" />
                                                    <span>Es empresa</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col s12">
                                            <h5>Productos</h5>
                                            <table class="striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Codigo</th>
                                                        <th>Descripcion</th>
                                                        <th>Precio</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productos.map((producto, i) => {
                                                        return (
                                                            <tr key={producto.id}>
                                                                <td>{producto.codigo}</td>
                                                                <td>{producto.descripcion}</td>
                                                                <td>{producto.precio}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
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

export default Provider