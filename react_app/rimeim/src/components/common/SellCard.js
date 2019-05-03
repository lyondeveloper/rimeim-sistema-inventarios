import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const SellCard = props => {
  const {
    sell: { id, codigo, fecha_creado, con_factura, total, usuario_creador },
    is_admin
  } = props;
  return (
    <div className="card hoverable">
      <Link to={`${is_admin ? '/admin' : ''}/ventas/${id}`}>
        <div className="card-content">
          <div className="d-block">
            <span>Venta: {id}</span>
            <span className="right">{fecha_creado}</span>
          </div>
          {codigo && (
            <div className="d-block">
              <span>Codigo: {codigo}</span>
            </div>
          )}
          <div className="d-block">
            <span>
              Vendedor: {usuario_creador.id} -{' '}
              <span> {usuario_creador.nombre}</span>
            </span>
          </div>
          <div className="d-block">
            <span>{con_factura ? 'C/F' : 'S/F'}</span>
            <span className="right">Total: Lps {total}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

SellCard.propTypes = {
  sell: PropTypes.object.isRequired,
  is_admin: PropTypes.bool.isRequired
};

export default SellCard;
