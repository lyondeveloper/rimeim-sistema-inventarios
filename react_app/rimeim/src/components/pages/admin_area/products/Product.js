import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Link } from 'react-router-dom';

import NavbarAdmin from '../../../layout/NewNavbarAdmin';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configMaterialBoxedImages,
  getModalInstanceById
} from '../../../../utils/MaterialFunctions';

import {
  getProductById,
  deleteProductById
} from '../../../../actions/productActions';

import Spinner from '../../../common/Spinner';
import ConfirmationModal from '../../../layout/modals/ConfirmationModal';

class AdminProduct extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getProductById(this.props.match.params.id);
  }

  componentDidUpdate() {
    configMaterialBoxedImages();
  }

  onDeleteProductClick = () => {
    getModalInstanceById('modal_confirmar_evento').open();
  };

  onConfirmDeleteProduct = () => {
    this.props.deleteProductById(
      this.props.match.params.id,
      this.props.history,
      '/admin/productos'
    );
  };

  render() {
    const {
      loading,
      product: {
        id,
        codigo_barra,
        nombre,
        marca,
        tipo_vehiculo,
        descripcion,
        raro,
        precio,
        existencia,
        cantidad_minima,
        fecha_creado,
        distribucion,
        imagenes
      }
    } = this.props.product;
    let productContent;
    let productName = 'Producto';

    if (loading) {
      productContent = <Spinner fullWidth />;
    } else {
      productName = nombre;
      productContent = (
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              {imagenes && imagenes.length > 0 && (
                <div className="w-100">
                  <div className="horizontal-scroll-container">
                    {imagenes.map(img => (
                      <div className="img-item" key={uuid()}>
                        <img
                          src={img.url}
                          className="materialboxed adjust"
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <table className="table-bordered">
                <tbody>
                  <tr>
                    <td>Id</td>
                    <td>{id}</td>
                  </tr>
                  <tr>
                    <td>Codigo de barra</td>
                    <td>{codigo_barra}</td>
                  </tr>
                  <tr>
                    <td>Nombre</td>
                    <td>{nombre}</td>
                  </tr>
                  {marca && (
                    <tr>
                      <td>Marca</td>
                      <td>{marca.nombre}</td>
                    </tr>
                  )}
                  {tipo_vehiculo && (
                    <tr>
                      <td>Tipo de vehiculo</td>
                      <td>{tipo_vehiculo.nombre}</td>
                    </tr>
                  )}

                  <tr>
                    <td>Descripcion</td>
                    <td>{descripcion}</td>
                  </tr>
                  <tr>
                    <td>Es raro</td>
                    <td>{raro ? 'Si' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Precio</td>
                    <td>{precio}</td>
                  </tr>
                  <tr>
                    <td>Existecia</td>
                    <td>{existencia}</td>
                  </tr>
                  <tr>
                    <td>Cantidad minima</td>
                    <td>{cantidad_minima}</td>
                  </tr>
                  <tr>
                    <td>Fecha creado</td>
                    <td>{fecha_creado}</td>
                  </tr>
                </tbody>
              </table>

              {/* <div className="mt-1">
                <button className="btn">Realizar pedido</button>

                <button className="btn ml-1">Enviar a un local</button>
              </div> */}
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h5>Distribucion</h5>
              <table className="table-bordered">
                <thead>
                  <tr>
                    <th>Local</th>
                    <th>Existencia</th>
                    <th>Cantidad minima</th>
                    <th>Ubicacion</th>
                  </tr>
                </thead>

                {distribucion && distribucion.length > 0 && (
                  <tbody>
                    {distribucion.map(dist => (
                      <tr key={uuid()}>
                        <td>{dist.local && dist.local.nombre}</td>
                        <td>{dist.existencia}</td>
                        <td>{dist.cantidad_minima}</td>
                        <td>{dist.ubicacion}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>

          <button
            className="btn red darken-3"
            onClick={this.onDeleteProductClick}
          >
            Borrar
          </button>
        </div>
      );
    }
    return (
      <React.Fragment>
        <NavbarAdmin>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              {productName}
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <Link
                  to={`/admin/editar_producto/${this.props.match.params.id}`}
                >
                  <i className="material-icons">edit</i>
                </Link>
              </li>
            </ul>
          </div>
        </NavbarAdmin>

        <main>
          <div className="row">{productContent}</div>
        </main>

        <ConfirmationModal
          title="Borrar producto"
          message="Esta seguro de eliminar este producto? No sera posible revertir la funcion"
          onAccept={this.onConfirmDeleteProduct}
        />
      </React.Fragment>
    );
  }
}

AdminProduct.propTypes = {
  product: PropTypes.object.isRequired,
  getProductById: PropTypes.func.isRequired,
  deleteProductById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProductById, deleteProductById }
)(AdminProduct);
