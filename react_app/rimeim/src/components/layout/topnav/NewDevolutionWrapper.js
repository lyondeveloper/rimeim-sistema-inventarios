import React from 'react';

export default function NewDevolutionWrapper() {
    return (
        <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
                Devolucion: Venta #codigo
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
                <i className='material-icons'>menu</i>
            </a>
            <ul className='right'>
                <li>
                    <a
                        href='#!'
                        className='tooltipped'
                        data-position='left'
                        data-tooltip='Finalizar'
                    >
                        <i className='material-icons'>check</i>
                    </a>
                </li>
            </ul>
        </div>
    );
}
