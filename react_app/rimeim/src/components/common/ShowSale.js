import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid";

import Spinner from "./Spinner";
import EmptyIcon from "./EmptyIcon";
import { getNumberFormatted } from "../../utils/stringUtils";
import isEmpty from "../../actions/isEmpty";

const ShowSale = props => {
  const { loading, sale } = props;
  let saleContent;

  if (loading) {
    saleContent = <Spinner fullWidth />;
  } else if (!isEmpty(sale)) {
    const {
      id,
      local,
      cliente,
      usuario_creador,
      codigo,
      con_factura,
      sub_total,
      impuesto,
      total,
      metodo_pago,
      fecha_creado,
      productos
    } = sale;
    saleContent = (
      <div className="card">
        <div className="card-content venta-factura">
          {local && (
            <span className="d-block bold">
              Local:
              {`${local.id} - ${local.nombre}`}
            </span>
          )}

          <span className="d-block">
            <span className="bold">ID: </span>
            <span className="ml-1">{id}</span>
          </span>

          {codigo && (
            <span className="d-block">
              <span className="bold">Codigo: </span>
              <span className="ml-1">{codigo}</span>
            </span>
          )}
          {cliente && (
            <span className="d-block">
              <span className="bold">Cliente: </span>
              <span className="ml-1">{cliente.nombre}</span>
            </span>
          )}

          {cliente && cliente.rtn && (
            <span className="d-block">
              <span className="bold">RTN: </span>
              <span className="ml-1">{cliente.rtn}</span>
            </span>
          )}

          <span className="d-block">
            <span className="bold">Vendedor: </span>
            <span className="ml-1">
              {usuario_creador.id} - {usuario_creador.nombre}
            </span>
          </span>
          <span className="d-block">
            <span className="bold">Fecha: </span>
            <span className="ml-1">{fecha_creado}</span>
          </span>
          <table className="table-bordered striped highlight">
            <thead>
              <tr>
                <th>Codigo de barra</th>
                <th>Descripcion</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(prod => (
                <tr key={uuid()}>
                  <td>{prod.codigo_barra}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.cantidad}</td>
                  <td>{getNumberFormatted(prod.precio)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <span className="d-block">
            <span className="bold">Sub Total: </span>
            <span className="ml-1">Lps {getNumberFormatted(sub_total)}</span>
          </span>
          <span className="d-block">
            <span className="bold">ISV: </span>
            <span className="ml-1">Lps {getNumberFormatted(impuesto)}</span>
          </span>
          <span className="d-block">
            <span className="bold">Total:</span>
            <span className="ml-1">Lps {getNumberFormatted(total)}</span>
          </span>
          <div className="d-block">
            <span className="bold">Metodo de pago: </span>
            <span className="ml-1">
              {metodo_pago} - {con_factura ? "C/F" : "S/F"}
            </span>
          </div>
        </div>

        <div className="card-footer p-1">
          <button className="btn red darken-3">Generar devolucion</button>
        </div>
      </div>
    );
  } else {
    saleContent = <EmptyIcon message="No hay informacion para mostrar" />;
  }
  return saleContent;
};

ShowSale.propTypes = {
  sale: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ShowSale;
