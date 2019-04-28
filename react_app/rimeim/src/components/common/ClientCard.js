import React from 'react';
import { Link } from 'react-router-dom';

export default function ClientCard(props) {
  const {
    client: { id, imagen, nombre }
  } = props;
  return (
    <div className='card hoverable'>
      <Link to={`/clientes/${id}`}>
        <div className='card-image border-bottom card-product'>
          <img src={imagen ? imagen.url : ''} alt='' />
        </div>
        <div className='card-content'>
          <span className='d-block'>{nombre}</span>
        </div>
      </Link>
    </div>
  );
}
