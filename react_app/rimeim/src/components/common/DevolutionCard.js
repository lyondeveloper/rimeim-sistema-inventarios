import React from 'react';
import { Link } from 'react-router-dom';
import { getNumberFormatted } from '../../utils/stringUtils';

export default function DevolutionCard(props) {
  const {
    devolucion: {
      id,
      total_devuelto,
      fecha_creado,
      usuario_creador,
      venta: { codigo, total, cliente }
    }
  } = props;
  return (
    <div className="card">
      <Link to={`/devoluciones/${id}`}>
        <div className="card-content">
          <div className="d-block">
            <span>
              Devolucion: <span>{id}</span>
            </span>
            <span className="right">{fecha_creado}</span>
          </div>
          {codigo && (
            <div className="d-block">
              <span>
                Venta: <span>{codigo}</span>
              </span>
            </div>
          )}

          <div className="d-block">
            Total facturado: Lps {getNumberFormatted(total)}
          </div>
          {cliente && (
            <div className="d-block">
              <span>
                Cliente: <span>{cliente.nombre}</span>
              </span>
            </div>
          )}

          <div className="d-block">
            <span>
              Vendedor:{' '}
              <span>{`${usuario_creador.id} - ${usuario_creador.nombre}`}</span>
            </span>
            <span className="right">
              Total devuelto: Lps {getNumberFormatted(total_devuelto)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
