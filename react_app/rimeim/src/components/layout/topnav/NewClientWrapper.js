import React from 'react'

export default function NewClientWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Nuevo cliente
                        </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>
            <ul className="right">
                <li>
                    <a href="#!" className="tooltipped" data-position="left" data-tooltip="Gardar">
                        <i className="material-icons">save</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
