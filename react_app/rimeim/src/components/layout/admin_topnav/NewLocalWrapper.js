import React from 'react'

export default function NewLocalWrapper(props) {
    let onSave

    if (props.obj.onSave) {
        onSave = props.obj.onSave
    }
    return (
        <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
                {onSave !== null ? ('Actualizar local') : ('Nuevo local')}
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                <i className="material-icons">menu</i>
            </a>

            <ul className="right">
                <li>
                    <a href="#!" onClick={onSave}>
                        <i className="material-icons">save</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}