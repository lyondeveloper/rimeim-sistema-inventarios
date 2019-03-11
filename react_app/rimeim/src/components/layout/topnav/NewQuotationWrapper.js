import React from 'react'

export default function NewQuotationWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Nueva cotizacion
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-small-only">
                <li>
                    <a href="#!" className="tooltipped" data-position="bottom" data-tooltip="Imprimir">
                        <i className="material-icons">print</i>
                    </a>
                </li>
                <li>
                    <a href="#!" className="tooltipped" data-position="bottom" data-tooltip="Guardar">
                        <i className="material-icons">save</i>
                    </a>
                </li>
            </ul>

            <ul className="mobile-only right">
                <li>
                    <a className="dropdown-trigger" href="#!" data-target="dropdown_more">
                        <i className="material-icons right">more_vert</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
