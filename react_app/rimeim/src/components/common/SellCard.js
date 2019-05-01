import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const SellCard = props => {
  const {
    sell: { id, codigo, fecha, con_factura, total, vendedor },
    is_admin
  } = props;
  return (
    <div className="card">
      <Link to={`${is_admin && "/admin"}/ventas/${id}`}>
        <div className="card-content">
          <div className="d-block">
            <span>Venta: {codigo}</span>
            <span className="right">{fecha}</span>
          </div>
          <div className="d-block">
            <span>
              Vendedor: {vendedor.id} - <span> {vendedor.nombre}</span>
            </span>
          </div>
          <div className="d-block">
            <span>{con_factura ? "C/F" : "S/F"}</span>
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
