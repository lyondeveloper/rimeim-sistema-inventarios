import React, { Component } from 'react'

import { NEW_QUOTATION } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import SellColumnsDetails from "../../common/SellColumnsDetails"
import TextInputField from "../../common/TextInputField"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import "../../../public/css/cotizaciones.css"

class NewQuotation extends Component {
    state = {
        cliente: "",
        rtn: ""
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { cliente, rtn } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={NEW_QUOTATION} />

                <main>
                    <div className="row mb-0">
                        <TextInputField input_size="s6"
                            icon="account_circle"
                            id="cliente"
                            label="Cliente"
                            value={cliente}
                            onchange={this.onChangeTextInput} />

                        <TextInputField input_size="s6"
                            id="rtn"
                            label="RTN"
                            value={rtn}
                            onchange={this.onChangeTextInput} />
                    </div>
                    <div className="row cotizacion-productos">
                        <div className="col s12 no-padding">
                            <table className="table-bordered header-fixed striped highlight">
                                <thead>
                                    <tr>
                                        <th className="center">Codigo</th>
                                        <th className="center">Descripcion</th>
                                        <th className="center">Cantidad</th>
                                        <th className="center">Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row col-bordered venta-total">
                        <SellColumnsDetails title="Sub total" vaue={0} />
                        <SellColumnsDetails title="Impuesto" vaue={0} />
                        <SellColumnsDetails title="Total" vaue={0} />
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default NewQuotation