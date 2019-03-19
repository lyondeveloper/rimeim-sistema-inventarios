import React from 'react'

export default function DefaultWrapper() {
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                Area de administrador
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>
        </div>
    )
}
