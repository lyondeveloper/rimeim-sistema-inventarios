import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import { ADMIN_LOCAL } from "../../../layout/NavTypes"
import NavbarAdmin from "../../../layout/NavbarAdmin"
import Spinner from "../../../common/Spinner"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../../utils/MaterialFunctions"

import {
    getLocal
} from "../../../../actions/LocalActions"

class Local extends Component {

    componentWillMount() {
        removeMaterialComponents()
        this.props.getLocal(this.props.match.params.id)
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        const { loading, local } = this.props.local
        let localContent;

        if (loading) {
            localContent = <Spinner fullWidth />
        } else {
            localContent = (
                <div className="col s12">
                    <div className="card">
                        <div className="card-content">

                            <table className="table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Codigo</td>
                                        <td>{local.codigo}</td>
                                    </tr>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>{local.nombre}</td>
                                    </tr>
                                    <tr>
                                        <td>Es bodega</td>
                                        <td>{local.es_bodega ? ("Si") : ("No")}</td>
                                    </tr>
                                    <tr>
                                        <td>Color</td>
                                        <td>
                                            <div className="circle-local" style={{backgroundColor: local.color_hex}}></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ubicacion</td>
                                        <td>{local.descripcion_ubicacion}</td>
                                    </tr>
                                    <tr>
                                        <td>Descripcion</td>
                                        <td>
                                            {local.descripcion}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                    </div>

                    <div className="card">
                        <div className="card-content">
                            <h5>Empleados</h5>

                            <table className="table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Admin</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {local.empleados && local.empleados.map((empleado, i) => {
                                        return (
                                            <tr key={empleado.id} className={`${!empleado.habilitado && ('grey lighten-2')}`}>
                                                <td>{empleado.id}</td>
                                                <td>{empleado.nombre}</td>
                                                <td>{empleado.admin ? ("Si") : ("No")}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }


        return (
            <React.Fragment>
                <NavbarAdmin navtype={ADMIN_LOCAL} obj={local} />

                <main>
                    <div className="row">
                        {localContent}
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

Local.propTypes = {
    local: PropTypes.object.isRequired,
    getLocal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    local: state.local
})

export default connect(mapStateToProps, {
    getLocal
})(Local)