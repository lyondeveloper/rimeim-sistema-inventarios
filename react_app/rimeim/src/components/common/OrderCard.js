import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderCard(props) {
  const {
    order: { id, codigo, nombre, ubicacion }
  } = props;
  return (
    <div className='card hoverable'>
      <Link to={`/pedidos/${id}`}>
        <div className='card-content'>
          <span className='d-block'>Pedido #{codigo}</span>
          <span className='d-block'>Productos </span>
          <span className='d-block'>Creado por: #{codigo}</span>
          <span className='d-block'>Pedido desde {ubicacion}</span>
        </div>
      </Link>
    </div>
  );
}
