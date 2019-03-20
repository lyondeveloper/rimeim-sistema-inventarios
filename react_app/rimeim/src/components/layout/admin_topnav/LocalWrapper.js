import React from 'react'
import { Link } from 'react-router-dom'

export default function LocalWrapper(props) {
    const { obj } = props
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                {obj.nombre}
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>

            <ul className="right">
                <li>
                    <Link to={`/admin/locales/editar/${obj.id}`}>
                        <i className="material-icons">edit</i>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
