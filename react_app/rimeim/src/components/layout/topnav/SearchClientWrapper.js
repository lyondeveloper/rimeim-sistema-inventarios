import React from 'react'

export default function SearchClientWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Buscar cliente
                        </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>
            <ul className="right">
                <li>
                    <a href="#modal_buscar_cliente" className="modal-trigger">
                        <i className="material-icons">search</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
