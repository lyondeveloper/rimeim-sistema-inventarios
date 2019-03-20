import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { ADMIN_EDIT_LOCAL } from "../../../layout/NavTypes"
import NavbarAdmin from "../../../layout/NavbarAdmin"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../../utils/MaterialFunctions"

import {
    getLocal,
    updateLocal
} from "../../../../actions/LocalActions"

import isEmpty from "../../../../actions/isEmpty"

// Custom components
// import Spinner from "../../../common/Spinner"
import TextInputField from "../../../common/TextInputField"
import TextAreaInputField from "../../../common/TextAreaInputField"
import CheckInputField from "../../../common/CheckInputField"
import ColorFieldInput from "../../../common/ColorFieldInput"

// Modals
import SearchUserModal from "../../../layout/modals/SearchUser"

class EditLocal extends Component {

    state = {
        codigo: "   ",
        nombre: "   ",
        color_hex: "    ",
        descripcion_ubicacion: "    ",
        es_bodega: false,
        descripcion: "  ",
        empleados: []
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
        this.props.getLocal(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.local.local &&
            !isEmpty(nextProps.local.local)) {

            const { local } = nextProps.local
            this.setState({
                codigo: local.codigo,
                nombre: local.nombre,
                color_hex: local.color_hex,
                descripcion_ubicacion: local.descripcion_ubicacion,
                es_bodega: local.es_bodega,
                descripcion: local.descripcion,
                empleados: local.empleados
            })
        }
    }

    onChangeTextInput = e => {
        if (e.target.name === "es_bodega") {
            const value = this.state.es_bodega ? false : true
            return this.setState({ [e.target.name]: value });
        }
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const {
            codigo, nombre, color_hex, descripcion_ubicacion, es_bodega, descripcion, empleados } = this.state
        return (
            <React.Fragment>
                <NavbarAdmin navtype={ADMIN_EDIT_LOCAL} />

                <main>
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    <h5>Datos del local</h5>
                                    <form action="">
                                        <div className="row">
                                            <TextInputField input_size="s12 m6"
                                                id="codigo"
                                                value={codigo}
                                                label="Codigo"
                                                onchange={this.onChangeTextInput}
                                                active_label={true} />

                                            <TextInputField input_size="s12 m6"
                                                id="nombre"
                                                value={nombre}
                                                label="Nombre del local"
                                                onchange={this.onChangeTextInput}
                                                active_label={true} />
                                        </div>

                                        <div className="row">
                                            <ColorFieldInput
                                                id="color_hex"
                                                value={color_hex}
                                                label="Color"
                                                onchange={this.onChangeTextInput} />
                                        </div>

                                        <div className="row">
                                            <TextAreaInputField
                                                id="descripcion_ubicacion"
                                                label="Ubicacion"
                                                value={descripcion_ubicacion}
                                                onchange={this.onChangeTextInput}
                                                active_label={true} />
                                        </div>

                                        <div className="row">
                                            <CheckInputField size="s12 m6"
                                                id="es_bodega"
                                                checked={es_bodega}
                                                label="Es bodega"
                                                onchange={this.onChangeTextInput} />
                                        </div>

                                        <div className="row">
                                            <TextAreaInputField
                                                id="descripcion"
                                                value={descripcion}
                                                label="Descripcion"
                                                onchange={this.onChangeTextInput}
                                                active_label={true} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    <h5>Empleados</h5>

                                    <div>
                                        <a href="#modal_buscar_usuario" className="modal-trigger btn mb-1 text-white">
                                            Agregar empleado
                                        </a>
                                    </div>

                                    <div className="row">
                                        <div className="input-field col s12">
                                            <select>
                                                <option value="0" defaultValue>Seleccionar una opcion</option>
                                                <option value="1">Deshabilitar</option>
                                                <option value="2">Habilitar</option>
                                                <option value="3">Eliminar</option>
                                            </select>
                                            <label>Acciones en lote</label>
                                        </div>
                                    </div>

                                    <table className="table-bordered striped">
                                        <thead>
                                            <tr>
                                                <th className="header-th"></th>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {empleados.map((empleado, id) => {
                                                return (
                                                    <tr key={empleado.id}>
                                                        <td className="checkbox-td">
                                                            <label>
                                                                <input type="checkbox" className="filled-in" />
                                                                <span></span>
                                                            </label>
                                                        </td>
                                                        <td>{empleado.id}</td>
                                                        <td>{empleado.nombre}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SearchUserModal />
                </main>
            </React.Fragment>
        )
    }
}

EditLocal.propTypes = {
    local: PropTypes.object.isRequired,
    getLocal: PropTypes.func.isRequired,
    updateLocal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    local: state.local
})

export default connect(mapStateToProps, {
    getLocal,
    updateLocal
})(EditLocal)