import React from 'react'

export default function ProviderWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Proveedor
                        </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>
            <ul className="right">
                <li>
                    <a href="#!" className="tooltipped" data-position="left" data-tooltip="Nuevo pedido">
                        <i className="material-icons">add</i>
                    </a>
                </li>
                <li>
                    <a href="#!" className="tooltipped" data-position="left" data-tooltip="Editar">
                        <i className="material-icons">edit</i>
                    </a>
                </li>
            </ul>

            <ul class="right mobile-only">
                <li>
                    <li>
                        <a className="dropdown-trigger" href="#!" data-target="dropdown_more">
                            <i className="material-icons">more_vert</i>

                        </a>
                    </li>
                </li>
            </ul>
        </div>
    )
}
