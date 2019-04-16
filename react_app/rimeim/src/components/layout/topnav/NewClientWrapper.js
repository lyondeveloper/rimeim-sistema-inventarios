import React from 'react';

export default function NewClientWrapper(props) {
    return (
        <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
                Nuevo Cliente
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
                        data-tooltip='Ver Todos'
                    >
                        <i className='material-icons'>group</i>
                    </a>
                </li>

                <li>
                    <a
                        href='#!'
                        className='tooltipped'
                        data-position='left'
                        data-tooltip='Buscar'
                    >
                        <i className='material-icons'>search</i>
                    </a>
                </li>
            </ul>
        </div>
    );
}
