import React from 'react'

export default function SearchOrderWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Buscar pedido
                        </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>
            <ul className="right">
                <li>
                    <a href="#modal_buscar_pedido" className="modal-trigger tooltipped" data-position="left"
                        data-tooltip="Buscar">
                        <i className="material-icons">search</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
