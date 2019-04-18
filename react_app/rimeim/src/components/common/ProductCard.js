import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard(props) {
  const {
    product: { id, nombre, precio, existencia, imagen, marca, tipo_vehiculo }
  } = props;
  return (
    <div className="card hoverable">
      <Link to={`/productos/${id}`}>
        <div className="card-image border-bottom card-product">
          {imagen && imagen.url ? (
            <img src={imagen.url} alt="" />
          ) : (
            <img src="" alt="" />
          )}
        </div>
        <div className="card-content">
          <h5 className="d-block">{nombre}</h5>
          <span className="d-block">
            Precio: Lps <span>{precio}</span>
          </span>
          {marca && <span className="d-block">Marca: {marca.nombre}</span>}
          {tipo_vehiculo && (
            <span className="d-block">
              Tipo de vehiculo: {tipo_vehiculo.nombre}
            </span>
          )}
          <span className="d-block">En Inventario: {existencia}</span>
        </div>
      </Link>
    </div>
  );
}
