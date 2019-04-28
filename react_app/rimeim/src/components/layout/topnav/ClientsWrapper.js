import React from 'react';
import { Link } from 'react-router-dom';

export default function ClientsWrapper() {
  return (
    <div className='nav-wrapper'>
      <a href='#!' className='brand-logo'>
        Clientes
      </a>
      <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
        <i className='material-icons'>menu</i>
      </a>
      <ul className='right'>
        <li>
          <Link
            to='/buscar_cliente'
            className='tooltipped'
            data-position='left'
            data-tooltip='Buscar'
          >
            <i className='material-icons'>search</i>
          </Link>
        </li>
      </ul>
    </div>
  );
}
