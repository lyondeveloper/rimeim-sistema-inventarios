import React from 'react'

export default function BrandsWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Marcas
                        </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-small-only">
                <li>
                    <a href="#!" className="tooltipped" data-position="bottom" data-tooltip="Nueva">
                        <i className="material-icons">add</i>

                    </a>
                </li>
                <li>
                    <a href="#modal_buscar_marca" className="modal-trigger tooltipped" data-position="bottom"
                        data-tooltip="Buscar">
                        <i className="material-icons">search</i>
                    </a>
                </li>
            </ul>

            <ul className="mobile-only right">
                <li>
                    <a className="dropdown-trigger" href="#!" data-target="dropdown_more">
                        <i className="material-icons">more_vert</i>

                    </a>
                </li>
            </ul>
        </div>
    )
}
