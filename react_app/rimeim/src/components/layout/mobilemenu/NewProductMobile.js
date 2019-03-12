import React from 'react'

export default function NewProductMobile() {
    return (
        <ul id="dropdown_more" className="dropdown-content">
            <li>
                <a href="#!">
                    <i className="material-icons">add</i>
                    Agegar inventario
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
