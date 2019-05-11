import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import uuid from 'uuid';
import isEmpty from '../../actions/isEmpty';
import EmptyIcon from './EmptyIcon';

class ShowNotifications extends Component {
  getProductCard = producto => {
    const {
      imagen,
      nombre,
      marca,
      tipo_vehiculo,
      existencia,
      cantidad_minima,
      codigo_barra
    } = producto;
    return (
      <div className="card" key={uuid()}>
        {imagen && imagen.url && (
          <div className="card-image border-bottom card-product">
            <img src={imagen.url} alt="" />
          </div>
        )}

        <div className="card-content">
          <h6 className="d-block bold">Nombre: {nombre}</h6>
          <span className="d-block">Codigo: {codigo_barra}</span>
          {marca && <span className="d-block">Marca: {marca.nombre}</span>}
          {tipo_vehiculo && (
            <span className="d-block">
              Tipo de vehiculo: {tipo_vehiculo.nombre}
            </span>
          )}
          <span className="d-block">En Inventario: {existencia}</span>
          <span className="d-block">Cantidad minima: {cantidad_minima}</span>
        </div>
      </div>
    );
  };

  getPageContent = () => {
    const { notificaciones } = this.props.user.user;
    if (!isEmpty(notificaciones)) {
      return (
        <div className="col s12">
          {this.getProductsNotifications(notificaciones.productos)}
        </div>
      );
    } else {
      return <EmptyIcon message="No hay notificaciones" />;
    }
  };

  getProductsNotifications = productos => {
    let productsContent = productos.map(prod => this.getProductCard(prod));
    return (
      <div className="card">
        <div className="card-content">
          <h5>Productos con poco inventario</h5>
          {productsContent}
        </div>
      </div>
    );
  };

  render() {
    const pageContent = this.getPageContent();
    return <div className="row">{pageContent}</div>;
  }
}

ShowNotifications.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(ShowNotifications);
