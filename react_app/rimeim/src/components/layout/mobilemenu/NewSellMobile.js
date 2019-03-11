import React from 'react'

export default function NewSellMobile() {
    return (
        <ul id="dropdown_more" className="dropdown-content">
            <li>
                <a href="#!">
                    <i className="material-icons ">save</i>
                    Guardar
                    </a>
            </li>
            <li>
                <a href="#modal_buscar_producto">
                    <i className="material-icons">search</i>
                    Buscar
                    </a>
            </li>
            <li>
                <a href="#!">
                    <i className="material-icons">check</i>
                    Facturar
                    </a>
            </li>
        </ul>
    )
}
