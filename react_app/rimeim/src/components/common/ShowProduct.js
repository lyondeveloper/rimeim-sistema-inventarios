import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import uuid from "uuid";

import { getModalInstanceById } from "../../utils/MaterialFunctions";
import ConfirmationModal from "../layout/modals/ConfirmationModal";
import isEmpty from "../../actions/isEmpty";
import EmptyIcon from "../common/EmptyIcon";

class ShowProduct extends Component {
  onDeleteProductClick = () => {
    getModalInstanceById("modal_confirmar_evento").open();
  };

  render() {
    const { loading, onDeleteProduct, product } = this.props;
    let productContent;

    if (loading) {
      productContent = <Spinner fullWidth />;
    } else if (!isEmpty(product)) {
      const {
        id,
        codigo_barra,
        nombre,
        marca,
        tipo_vehiculo,
        descripcion,
        raro,
        precio,
        existencia,
        ubicacion,
        cantidad_minima,
        fecha_creado,
        distribucion,
        imagenes
      } = product;
      let distribucionContent;
      let imagesContent;

      if (distribucion) {
        distribucionContent = (
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

                {distribucion.length > 0 && (
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
        );
      }
      if (imagenes && imagenes.length > 0) {
        imagesContent = (
          <div className="w-100">
            <div className="horizontal-scroll-container">
              {imagenes.map(img => (
                <div className="img-item" key={uuid()}>
                  <img src={img.url} className="materialboxed adjust" alt="" />
                </div>
              ))}
            </div>
          </div>
        );
      }
      productContent = (
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              {imagesContent}
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
                  {ubicacion && (
                    <tr>
                      <td>Ubicacion</td>
                      <td>{ubicacion}</td>
                    </tr>
                  )}
                  <tr>
                    <td>Descripcion</td>
                    <td>
                      {descripcion && descripcion.trim() !== ""
                        ? descripcion
                        : "Sin descripcion"}
                    </td>
                  </tr>
                  <tr>
                    <td>Es raro</td>
                    <td>{raro ? "Si" : "No"}</td>
                  </tr>
                  {precio && (
                    <tr>
                      <td>Precio</td>
                      <td>{precio}</td>
                    </tr>
                  )}
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
          {distribucionContent}
          {onDeleteProduct && (
            <button
              className="btn red darken-3"
              onClick={this.onDeleteProductClick}
            >
              Borrar
            </button>
          )}
        </div>
      );
    } else {
      productContent = <EmptyIcon message="No hay informacion para mostrar" />;
    }
    return (
      <React.Fragment>
        {productContent}

        {onDeleteProduct && (
          <ConfirmationModal
            onAccept={onDeleteProduct}
            title="Borrar producto"
            message="Esta seguro de borrar este producto? No sera posible deshacer la accion."
          />
        )}
      </React.Fragment>
    );
  }
}
ShowProduct.propTypes = {
  product: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onDeleteProduct: PropTypes.func
};

ShowProduct.defaultProps = {
  onDeleteProduct: null
};

export default ShowProduct;
