import React from 'react'

export default function OrderWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Pedido: #codigo
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>
            <ul className="right">
                <li>
                    <a href="nuevo_pedido.html" className="tooltipped" data-position="left" data-tooltip="Editar">
                        <i className="material-icons">edit</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
