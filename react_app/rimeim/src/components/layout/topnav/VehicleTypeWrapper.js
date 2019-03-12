import React from 'react'

export default function VehicleTypeWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Tipo de vehiculo
                        </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-small-only">
                <li>
                    <a href="#modal_nuevo_tipo_vehiculo" className="modal-trigger tooltipped" data-position="left"
                        data-tooltip="Nuevo">
                        <i className="material-icons">add</i>
                    </a>
                </li>
                <li>
                    <a href="#modal_buscar_tipo_vehiculo" className="modal-trigger tooltipped" data-position="left"
                        data-tooltip="Buscar">
                        <i className="material-icons">search</i>
                    </a>
                </li>
            </ul>

            <ul className="right mobile-only">
                <li>
                    <a className="dropdown-trigger" href="#!" data-target="dropdown_more">
                        <i className="material-icons right">more_vert</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
