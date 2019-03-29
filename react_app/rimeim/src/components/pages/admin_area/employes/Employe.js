import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import { ADMIN_EMPLOYE } from "../../../layout/NavTypes"
import Navbar from "../../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents,
    getModalInstanceById
} from "../../../../utils/MaterialFunctions"

import {
    getEmployeById
} from "../../../../actions/employeActions"

import Spinner from "../../../common/Spinner"
import EmployeLocal from "../../../common/EmployeLocal"
import EmployeUpdateRegisterModal from "../../../layout/modals/EmployeUpdateRegisterModal"

class Employe extends Component {

    state = {
        employe: {},
        errors: {},
        edited_register: {}
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
        this.props.getEmployeById(this.props.match.params.id)
    }

    handleShowModal = (show) => {
        const modal = getModalInstanceById('modal_editar_empleado_registro')
        console.log("Hola mundo")
        if (show) {
            modal.open()
        } else {
            modal.close()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
        if (nextProps.employe.employe) {
            const { employe } = nextProps.employe
            if (employe.registros) {
                employe.registros.forEach(emp => emp.is_showing = false)
            }

            this.setState({
                employe: employe
            })
        }
    }

    onEditEmployeRegister = (id) => {
        const index = this.state.employe.registros.findIndex(r => r.id === id)
        if (index >= 0) {
            this.setState({
                edited_register: this.state.employe.registros[index]
            })
            this.handleShowModal(true)
        }
    }

    onConfirmUpdateEmploye = (newRegister) => {
        this.handleShowModal(false)
        console.log(newRegister)
    }

    onDeleteEmployeRegister = (id) => {

    }

    onHandleShowEmployeRegister = (id) => {
        const { employe } = this.state
        const index_registro = employe.registros.findIndex(r => r.id === id)
        if (index_registro >= 0) {
            employe.registros[index_registro].is_showing = !employe.registros[index_registro].is_showing
            this.setState({
                employe
            })
        }
    }

    render() {
        const { loading } = this.props.employe
        const { employe, edited_register } = this.state
        let employeData

        if (loading) {
            employeData = (
                <div className="col s12">
                    <Spinner fullWidth />
                </div>
            )
        } else {
            employeData = (
                <div className="col s12">
                    <div className="card">
                        <div className="card-content">
                            <h5>Informacion del usuario</h5>
                            <table className="table-bordered">
                                <tbody>
                                    <tr>
                                        <td>ID</td>
                                        <td>{employe.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>{employe.nombre}</td>
                                    </tr>
                                    <tr>
                                        <td>Admin</td>
                                        <td>{employe.admin ? ("Si") : ("No")}</td>
                                    </tr>
                                    <tr>
                                        <td>Habilitado</td>
                                        <td>{employe.habilitado ? ("Si") : ("No")}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-content">
                            <h5>Locales en los que esta registrado</h5>
                            {employe.registros && employe.registros.map(registro =>
                                <EmployeLocal key={registro.id}
                                    registro={registro}
                                    onEdit={this.onEditEmployeRegister}
                                    onDelete={this.onDeleteEmployeRegister}
                                    handleShow={this.onHandleShowEmployeRegister} />)}
                        </div>
                    </div>

                    <button className="btn red darken-2">
                        Eliminar
                    </button>
                </div>
            )
        }

        return (
            <React.Fragment>
                <Navbar navtype={ADMIN_EMPLOYE} />

                <main>
                    <div className="row">
                        {employeData}
                    </div>
                </main>

                <EmployeUpdateRegisterModal
                    registro={edited_register}
                    onUpdateEmployeRegister={this.onConfirmUpdateEmploye}
                />
            </React.Fragment>
        )
    }
}

Employe.propTypes = {
    employe: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getEmployeById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    employe: state.employe,
    errors: state.errors
})

export default connect(mapStateToProps, {
    getEmployeById
})(Employe)