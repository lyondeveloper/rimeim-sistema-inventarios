import React from 'react'

export default function BrandsMovile() {
    return (
        <ul id="dropdown_more" className="dropdown-content">
            <li>
                <a href="#!">
                    <i className="material-icons">add</i>
                    Nueva
                    </a>
            </li>
            <li>
                <a href="#modal_buscar_marca" className="modal-trigger">
                    <i className="material-icons">search</i>
                    Buscar
                    </a>
            </li>
        </ul>
    )
}
