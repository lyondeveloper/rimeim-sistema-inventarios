import React from 'react'

export default function NewProductWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Producto: Nombre
                        </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-small-only">
                <li>
                    <a href="#!" className="tooltipped" data-position="left" data-tooltip="Agregar inventario">
                        <i className="material-icons">add</i>
                    </a>
                </li>
                <li>
                    <a href="#!" className="tooltipped" data-position="left" data-tooltip="Editar">
                        <i className="material-icons">edit</i>
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
