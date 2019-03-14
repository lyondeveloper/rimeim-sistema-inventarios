import React, { Component } from 'react'

import { NEW_PROVIDER } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import TextInputField from "../../common/TextInputField"

class NewProvider extends Component {

    state = {
        nombre: "",
        rtn: "",
        correo: "",
        contacto: "",
        productos: []
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { nombre, rtn, correo, contacto, productos } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={NEW_PROVIDER} />

                <main>
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">

                                    <div className="row">
                                        <div className="col s12 m12 l5 center">
                                            <img src="img/logo_rimeim.png" className="responsive-img bordered" alt="" />
                                            <div className="d-block">
                                                <button className="btn">
                                                    Cambiar
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col s12 m12 l7">
                                            <div className="row">
                                                <TextInputField id="nombre"
                                                    label="Nombre"
                                                    onchange={this.onChangeTextInput}
                                                    value={nombre} />
                                            </div>
                                            <div className="row">
                                                <TextInputField id="rtn"
                                                    label="RTN"
                                                    onchange={this.onChangeTextInput}
                                                    value={rtn} />
                                            </div>
                                        </div>

                                    </div>


                                    <div className="row">
                                        <TextInputField id="correo"
                                            type="email"
                                            label="Correo"
                                            onchange={this.onChangeTextInput}
                                            value={correo} />
                                    </div>
                                    <div className="row">
                                        <TextInputField id="contacto"
                                            label="Contacto"
                                            onchange={this.onChangeTextInput}
                                            value={contacto} />
                                    </div>

                                    <div className="row">
                                        <div className="col s12">
                                            <h5>Productos</h5>
                                            <table className="striped table-bordered">
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

export default NewProvider