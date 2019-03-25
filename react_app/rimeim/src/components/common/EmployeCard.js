import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

export const EmployeCard = (props) => {
    const { employe: { id, nombre, habilitado, admin, locales } } = props

    return (
        <div className="card hoverable">
            <div className="card-content">
                <div className="row">
                    <div className="col m6 s12">
                        <p>Nombre: {nombre}</p>
                        <p>Habilitado: {habilitado ? ("Si") : ("No")}</p>
                        <p>Administrador: {admin ? ("Si") : ("No")}</p>
                    </div>

                    <div className="col m6 s12">
                        <p>Locales: {locales.length}</p>
                        {locales.map(local => <p className="d-block p-1 bordered" key={local.id}>{local.nombre}</p>)}
                    </div>
                </div>
            </div>

            <div className="card-action">
                <Link to={`/admin/empleados/${id}`}>
                    Detalles
                </Link>
            </div>
        </div>
    )
}

EmployeCard.propTypes = {
    employe: PropTypes.object.isRequired
}

export default EmployeCard