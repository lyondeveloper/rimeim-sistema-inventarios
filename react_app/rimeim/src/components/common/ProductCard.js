import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = props => {
  const {
    product: { id, nombre, precio, existencia, imagen, marca, tipo_vehiculo },
    admin
  } = props;
  return (
    <div className="card hoverable">
      <Link to={`${admin && '/admin'}/productos/${id}`}>
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
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired
};

ProductCard.defaultProps = {
  admin: false
};

export default ProductCard;
