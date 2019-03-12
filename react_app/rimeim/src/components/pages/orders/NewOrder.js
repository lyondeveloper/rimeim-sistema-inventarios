import React, { Component } from 'react'

import { NEW_ORDER } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import TextInputField from "../../common/TextInputField"

class NewOrder extends Component {

    state = {
        codigo: "",
        ubicacion: "",
        proveedor: ""
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { codigo, ubicacion, proveedor } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={NEW_ORDER} />

                <main>
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">

                                    <div className="row">
                                        <TextInputField input_size="12" id="codigo" label="Codigo de pedido"
                                            onchange={this.onChangeTextInput}
                                            value={codigo} />
                                    </div>

                                    <div className="row">
                                        <div className="col s12">

                                            <table className="table-bordered striped">
                                                <thead>
                                                    <tr>
                                                        <th>Codigo</th>
                                                        <th>Descripcion</th>
                                                        <th>Cantidad</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <TextInputField input_size="s12" id="ubicacion" label="Ubicacion"
                                            onchange={this.onChangeTextInput}
                                            value={ubicacion} />
                                    </div>

                                    <div className="row">
                                        <TextInputField input_size="s12" id="proveedor" label="Proveedor"
                                            onchange={this.onChangeTextInput}
                                            value={proveedor} />
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

export default NewOrder