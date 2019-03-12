import React from 'react'

export default function OrdersMobile() {
    return (
        <ul id="dropdown_more" className="dropdown-content">
            <li>
                <a href="nuevo_pedido.html">
                    <i className="material-icons">add</i>
                    Nuevo
                    </a>
            </li>
            <li>
                <a href="buscar_pedido.html">
                    <i className="material-icons">search</i>
                    Buscar
                    </a>
            </li>
        </ul>
    )
}
