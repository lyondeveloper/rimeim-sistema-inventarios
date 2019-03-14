import React from 'react'

export default function ProviderMobile() {
    return (
        <ul id="dropdown_more" className="dropdown-content">
            <li>
                <a href="#!" className="tooltipped" data-position="left" data-tooltip="Nuevo pedido">
                    <i className="material-icons">add</i>
                    Nuevo pedido
                </a>
            </li>
            <li>
                <a href="#!" className="tooltipped" data-position="left" data-tooltip="Editar">
                    <i className="material-icons">edit</i>
                    Editar
                </a>
            </li>
        </ul>
    )
}
