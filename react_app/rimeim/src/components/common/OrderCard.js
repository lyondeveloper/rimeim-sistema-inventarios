import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export default function OrderCard(props) {
  const {
    order: { id, codigo, nombre, fecha_creado, local }
  } = props;
  return (
    <div className='card hoverable'>
      <Link to={`/pedidos/${id}`}>
        <div className='card-content'>
          <span className='d-block'>Pedido #{codigo}</span>
          <span className='d-block'>
            Fecha de creacion:{' '}
            <Moment format='YYYY/MM/DD' date={fecha_creado} />{' '}
          </span>
          <span className='d-block'>Pedido para {local}</span>
        </div>
      </Link>
    </div>
  );
}
