import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandCard(props) {
  const {
    marca: { id, imagen, nombre }
  } = props;
  return (
    <div className="card hoverable">
      <Link to={`/marcas/${id}`}>
        <div className="card-image border-bottom card-product">
          <img src={imagen ? imagen.url : ''} alt="" />
        </div>
        <div className="card-content">
          <span className="d-block">{nombre}</span>
        </div>
      </Link>
    </div>
  );
}
