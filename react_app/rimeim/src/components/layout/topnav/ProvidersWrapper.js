import React from 'react'

export default function ProvidersWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Proveedores
                        </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>
            <ul className="right">
                <li>
                    <a href="buscar_cliente.html" className="tooltipped" data-position="left" data-tooltip="Buscar">
                        <i className="material-icons">search</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
