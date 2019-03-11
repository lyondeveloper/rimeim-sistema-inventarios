import React from 'react'

export default function NewSellWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Nueva venta
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-small-only">
                <li>
                    <a href="#!" className="tooltipped" data-position="bottom" data-tooltip="Guardar">
                        <i className="material-icons">save</i>
                    </a>
                </li>
                <li>
                    <a href="#modal_buscar_producto" className="modal-trigger tooltipped" data-position="bottom"
                        data-tooltip="Buscar producto">
                        <i className="material-icons">search</i>
                    </a>
                </li>
                <li>
                    <a href="#!" className="tooltipped" data-position="bottom" data-tooltip="Facturar">
                        <i className="material-icons">check</i>
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
