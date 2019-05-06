import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const ProductsImportCard = props => {
  const { producto } = props;
  let productoDistribucion;

  if (producto.distribucion.length > 0) {
    productoDistribucion = (
      <table>
        <thead>
          <tr>
            <th>Local</th>
            <th>Ubicacion</th>
            <th>Cantidad</th>
            <th>Cantidad minima</th>
          </tr>
        </thead>
        <tbody>
          {producto.distribucion.map(dist => (
            <tr key={uuid()}>
              <td>{dist.local}</td>
              <td>{dist.ubicacion}</td>
              <td>{dist.cantidad}</td>
              <td>{dist.cantidad_minima_local}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className="card bordered p-1">
      <div className="card-content">
        <div className="border-bottom">
          <h6>{producto.descripcion}</h6>
        </div>
        <span className="d-block">Codigo: {producto.codigo}</span>
        <span className="d-block">Cantidad: {producto.cantidad}</span>
        <span className="d-block">
          Cantidad minima: {producto.cantidad_minima}
        </span>

        {productoDistribucion}
      </div>
    </div>
  );
};

ProductsImportCard.propTypes = {
  producto: PropTypes.object.isRequired
};

export default ProductsImportCard;
