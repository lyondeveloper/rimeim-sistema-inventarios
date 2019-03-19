import React from 'react'
import { Link } from "react-router-dom"

export default function LocalsMobile() {
    return (
        <ul id="dropdown_more" className="dropdown-content">
            <li>
                <Link to="/admin/locales/nuevo">
                    <i className="material-icons">add</i>
                </Link>
            </li>
            <li>
                <a href="#modal_buscar_local" className="modal-trigger">
                    <i className="material-icons">search</i>
                </a>
            </li>
        </ul>
    )
}
