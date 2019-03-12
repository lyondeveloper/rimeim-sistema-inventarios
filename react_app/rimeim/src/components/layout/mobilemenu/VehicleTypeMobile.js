import React from 'react'

export default function VehicleTypeMobile() {
    return (
        <ul id="dropdown_more" className="dropdown-content">
            <li>
                <a href="#modal_nuevo_tipo_vehiculo">
                    <i className="material-icons">add</i>
                    Nuevo
                </a>
            </li>
            <li>
                <a href="#modal_buscar_tipo_vehiculo">
                    <i className="material-icons">search</i>
                    Buscar
                </a>
            </li>
        </ul>
    )
}
