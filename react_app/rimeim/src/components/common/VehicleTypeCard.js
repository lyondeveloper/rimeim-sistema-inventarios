import React from 'react';
import { Link } from 'react-router-dom';

export default function VehicleTypeCard(props) {
  const {
    vehiculo: { id, imagen, nombre, descripcion }
  } = props;
  return (
    <div className="card hoverable">
      <Link to={`/vehiculos/${id}`}>
        <div className="card-image border-bottom card-product">
          <img src={imagen ? imagen.url : ''} alt="" />
        </div>
        <div className="card-content">
          <span className="d-block">{nombre}</span>
          <span className="d-block">{descripcion}</span>
        </div>
      </Link>
    </div>
  );
}
