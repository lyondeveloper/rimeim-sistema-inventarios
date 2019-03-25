import React from 'react'

export default function EmployesWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Empleados
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>

            <ul className="right">
                <li>
                    <a href="#modal_buscar_empleado" className="modal-trigger">
                        <i className="material-icons">search</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
