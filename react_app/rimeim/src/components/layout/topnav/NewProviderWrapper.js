import React from 'react'

export default function NewProviderWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Nuevo proveedor
                        </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-small-only">
                <li>
                    <a href="#!" className="tooltipped" data-position="left" data-tooltip="Nuevo pedido">
                        <i className="material-icons">border_color</i>
                    </a>
                </li>
                <li>
                    <a href="#!" className="tooltipped" data-position="left" data-tooltip="Guardar">
                        <i className="material-icons">save</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
