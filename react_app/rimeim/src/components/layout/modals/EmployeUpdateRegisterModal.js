import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CheckInputField from "../../common/CheckInputField"

class EmployeUpdateRegisterModal extends Component {

    state = {
        registro: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.registro) {
            this.setState({
                registro: nextProps.registro
            })
        }
    }

    onAcceptUpdate = () => {
        const { registro } = this.state
        this.props.onUpdateEmployeRegister(registro)
    }

    onChangeTextInput = e => {
        const { registro } = this.state
        switch (e.target.name) {
            case "empleado_habilitado":
                registro.habilitado = !registro.habilitado
                break

            case "empleado_admin":
                registro.admin = !registro.admin
                break

            default: break
        }
        this.setState({ registro })
    }
    render() {
        const { registro } = this.state


        const {
            habilitado,
            admin
        } = registro

        var nombre = ""
        if (registro.local) {
            nombre = registro.local.nombre
        }
        return (
            <div id="modal_editar_empleado_registro" className="modal">
                <div className="modal-content">
                    <h5>Editar empleado en el local: {nombre}</h5>
                    <div className="row">
                        <CheckInputField
                            label="Habilidado"
                            id="empleado_habilitado"
                            checked={habilitado}
                            onchange={this.onChangeTextInput} />
                    </div>
                    <div className="row">
                        <CheckInputField
                            label="Admin"
                            id="empleado_admin"
                            checked={admin}
                            onchange={this.onChangeTextInput} />
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close btn-flat left">Cerrar</a>
                    <button type="button" className="btn" onClick={this.onAcceptUpdate}>
                        Aceptar
                </button>
                </div>
            </div>
        )
    }
}

EmployeUpdateRegisterModal.propTypes = {
    onUpdateEmployeRegister: PropTypes.func.isRequired,
    registro: PropTypes.object.isRequired
}

export default EmployeUpdateRegisterModal