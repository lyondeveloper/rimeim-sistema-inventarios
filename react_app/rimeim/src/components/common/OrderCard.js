import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export default function OrderCard(props) {
  const {
    order: {
      id,
      codigo,
      fecha_creado,
      local_solicitado,
      proveedor,
      id_proveedor
    }
  } = props;
  return (
    <div className='card hoverable'>
      <Link to={`/pedidos/${id}`}>
        <div className='card-content'>
          <span className='d-block'>Pedido #{codigo}</span>
          <span className='d-block'>
            Fecha de creacion:{' '}
            <Moment format='YYYY/MM/DD' date={fecha_creado} />{' '}
          </span>
          {id_proveedor !== null ? (
            <React.Fragment>
              <span className='d-block'>Proveedor: {proveedor.nombre}</span>
              <span className='d-block'>Pedido para proveedor: Si</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className='d-block'>Local: {local_solicitado.nombre}</span>
              <span className='d-block'>Pedido para proveedor: No</span>
            </React.Fragment>
          )}
        </div>
      </Link>
    </div>
  );
}
