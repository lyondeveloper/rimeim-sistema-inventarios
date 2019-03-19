import React from 'react'

export default function NewLocalWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Nuevo local
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>

            <ul className="right">
                <li>
                    <a href="#!" className="modal-trigger">
                        <i className="material-icons">save</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
