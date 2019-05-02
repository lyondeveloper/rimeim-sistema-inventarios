import React from 'react';
import { Link } from 'react-router-dom';

export default function OrdersWrapper() {
  return (
    <div className='nav-wrapper'>
      <a href='#!' className='brand-logo'>
        Pedidos
      </a>
      <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
        <i className='material-icons'>menu</i>
      </a>

      <ul className='right hide-on-small-only'>
        <li>
          <Link
            to='/nuevo_pedido'
            className='tooltipped'
            data-position='left'
            data-tooltip='Nuevo'
          >
            <i className='material-icons'>add</i>
          </Link>
        </li>
        <li>
          <a
            href='buscar_pedido.html'
            className='tooltipped'
            data-position='left'
            data-tooltip='Buscar'
          >
            <i className='material-icons'>search</i>
          </a>
        </li>
      </ul>

      <ul className='right mobile-only'>
        <li>
          <a className='dropdown-trigger' href='#!' data-target='dropdown_more'>
            <i className='material-icons right'>more_vert</i>
          </a>
        </li>
      </ul>
    </div>
  );
}
