import React from 'react'

export default function LocalWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Local
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>

            <ul className="right">
                <li>
                    <a href="admin_add_local.html" className="modal-trigger">
                        <i className="material-icons">edit</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
