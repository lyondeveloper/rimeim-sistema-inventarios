import React, { Component } from 'react'

import { NEW_CLIENT } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import TextInputField from "../../common/TextInputField"
import CheckInputField from "../../common/CheckInputField"

class NewClient extends Component {

    state = {
        nombre: "",
        rtn: "",
        correo: "",
        contacto: "",
        es_empresa: false
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    onChangeTextInput = e => {
        if (e.target.name === "es_empresa") {
            const value = this.state.es_empresa ? false : true
            return this.setState({ [e.target.name]: value });
        }
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { nombre, rtn, correo, contacto, es_empresa } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={NEW_CLIENT} />

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
                                                <TextInputField id="nombre" label="Nombre"
                                                    onchange={this.onChangeTextInput} value={nombre} />
                                            </div>
                                            <div className="row">
                                                <TextInputField id="rtn" label="RTN"
                                                    onchange={this.onChangeTextInput} value={rtn} />
                                            </div>
                                        </div>

                                    </div>


                                    <div className="row">
                                        <TextInputField id="correo" type="email" label="Correo"
                                            onchange={this.onChangeTextInput} value={correo} />
                                    </div>
                                    <div className="row">
                                        <TextInputField id="contacto" label="Contacto"
                                            onchange={this.onChangeTextInput} value={contacto} />
                                    </div>
                                    <div className="row">
                                        <CheckInputField id="es_empresa" checked={es_empresa}
                                            onchange={this.onChangeTextInput}
                                            label="Es empresa" />
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

export default NewClient