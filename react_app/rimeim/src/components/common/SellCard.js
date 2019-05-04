import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getNumberFormatted } from "../../utils/stringUtils";

const SellCard = props => {
  const {
    sell: {
      id,
      codigo,
      fecha_creado,
      con_factura,
      total,
      usuario_creador,
      cliente
    },
    is_admin,
    es_cotizacion
  } = props;
  return (
    <div className="card hoverable">
      <Link
        to={`${is_admin ? "/admin" : ""}/${
          es_cotizacion ? "cotizaciones" : "ventas"
        }/${id}`}
      >
        <div className="card-content">
          <div className="d-block">
            <span>ID: {id}</span>
            <span className="right">{fecha_creado}</span>
          </div>
          {codigo && (
            <div className="d-block">
              <span>Codigo: {codigo}</span>
            </div>
          )}
          {cliente && (
            <div className="d-block">
              <span>
                Cliente: {cliente.nombre}{" "}
                {cliente.rtn ? ` - ${cliente.rtn}` : ""}
              </span>
            </div>
          )}
          <div className="d-block">
            <span>
              Vendedor: {usuario_creador.id} -{" "}
              <span> {usuario_creador.nombre}</span>
            </span>
          </div>
          <div className="d-block">
            {!es_cotizacion && <span>{con_factura ? "C/F" : "S/F"}</span>}

            <span className={`${es_cotizacion ? "" : "right"}`}>
              Total: Lps {getNumberFormatted(total)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

SellCard.propTypes = {
  sell: PropTypes.object.isRequired,
  is_admin: PropTypes.bool.isRequired,
  es_cotizacion: PropTypes.bool.isRequired
};

export default SellCard;
