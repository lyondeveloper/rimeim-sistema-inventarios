import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import { ADMIN_EMPLOYES } from "../../../layout/NavTypes"
import NavbarAdmin from "../../../layout/NavbarAdmin"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../../utils/MaterialFunctions"

import {
    getEmployes
} from "../../../../actions/employeActions"

import Spinner from "../../../common/Spinner"
import EmployeCard from "../../../common/EmployeCard"

class Employes extends Component {

    state = {
        empleados: []
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
        this.props.getEmployes()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.employe.employes) {
            const data = nextProps.employe.employes
            const usuarios = []

            data.forEach(empleado => {

                const findedIndex = usuarios.findIndex(us => us.id === empleado.usuario.id)
                if (findedIndex >= 0) {
                    const usuario = usuarios[0]
                    const newLocalInfo = empleado.local
                    newLocalInfo.info = {
                        id: empleado.id,
                        admin: empleado.admin,
                        habilitado: empleado.habilitado,
                        fecha_creado: empleado.fecha_creado
                    }
                    if (usuario.locales.length < 3) {
                        usuario.locales.push(newLocalInfo)
                    }
                } else {
                    const newUser = empleado.usuario
                    const newLocalInfo = empleado.local
                    newLocalInfo.info = {
                        id: empleado.id,
                        admin: empleado.admin,
                        habilitado: empleado.habilitado,
                        fecha_creado: empleado.fecha_creado
                    }
                    newUser.locales = []
                    newUser.locales.push(newLocalInfo)

                    usuarios.push(newUser)
                }
            })

            this.setState({
                empleados: usuarios
            })
        }
    }

    render() {
        const { loading } = this.props.employe
        const { empleados } = this.state
        return (
            <React.Fragment>
                <NavbarAdmin navtype={ADMIN_EMPLOYES} />

                <main>
                    <div className="row">
                        {loading ? (
                            <Spinner fullWidth />
                        ) : (
                                empleados.map(empleado =>
                                    <div className="col s12" key={empleado.id}>
                                        <EmployeCard employe={empleado} />
                                    </div>
                                )
                            )}
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

Employes.propTypes = {
    employe: PropTypes.object.isRequired,
    getEmployes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    employe: state.employe
})

export default connect(mapStateToProps, {
    getEmployes
})(Employes)