import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid";
import PropTypes from "prop-types";

import NewNavbar from "../../layout/NewNavbar";

import {
  configMaterialComponents,
  removeMaterialComponents
} from "../../../utils/MaterialFunctions";
import {
  getDevolutionById,
  deleteDevolution
} from "../../../actions/devolutionActions";
import { getNumberFormatted } from "../../../utils/stringUtils";
import isEmpty from "../../../actions/isEmpty";

import ConfirmationModal from "../../layout/modals/ConfirmationModal";
import Spinner from "../../common/Spinner";
import EmptyIcon from "../../common/EmptyIcon";

class ShowDevolution extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getDevolutionById(this.props.match.params.id);
  }

  onDeleteClick = () => {
    this.props.deleteDevolution(
      this.props.match.params.id,
      this.props.history,
      "/devoluciones"
    );
  };

  getPageContent = () => {
    const { devolution, loading } = this.props.devolution;
    if (loading) {
      return <Spinner fullWidth />;
    } else if (!isEmpty(devolution)) {
      return this.getDevolutionContent(devolution);
    } else {
      return <EmptyIcon message="No hay informacion para mostrar" />;
    }
  };

  getDevolutionContent = devolution => {
    const {
      id,
      total_devuelto,
      fecha_creado,
      productos,
      usuario_creador,
      venta
    } = devolution;
    return (
      <React.Fragment>
        <div className="card">
          <div className="card-content">
            <table>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{id}</td>
                </tr>
                <tr>
                  <td>Total devuelto</td>
                  <td>Lps {getNumberFormatted(total_devuelto)}</td>
                </tr>
                <tr>
                  <td>Vendedor</td>
                  <td>
                    {usuario_creador.id} - {usuario_creador.nombre}
                  </td>
                </tr>
                <tr>
                  <td>Fecha</td>
                  <td>{fecha_creado}</td>
                </tr>
              </tbody>
            </table>
            <h5 className="mt-1">Productos devueltos</h5>
            <table>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(prod => (
                  <tr key={uuid()}>
                    <td>{prod.codigo_barra}</td>
                    <td>{prod.cantidad}</td>
                    <td>{prod.precio}</td>
                    <td>
                      {getNumberFormatted(
                        parseInt(prod.cantidad) * parseFloat(prod.precio)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {this.getSellContent(venta)}
        <button
          className="btn red darken-3 mt-1 modal-trigger"
          data-target="modal_confirmar_evento"
        >
          Eliminar
        </button>
      </React.Fragment>
    );
  };

  getSellContent = sell => {
    const {
      id,
      cliente,
      codigo,
      sub_total,
      impuesto,
      total,
      metodo_pago,
      fecha_creado,
      usuario_creador,
      productos
    } = sell;
    return (
      <div className="card">
        <div className="card-content">
          <h5>Detalles de venta</h5>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td>{id}</td>
              </tr>
              <tr>
                <td>Fecha</td>
                <td>{fecha_creado}</td>
              </tr>
              <tr>
                <td>Codigo</td>
                <td>{codigo}</td>
              </tr>
              {cliente && (
                <tr>
                  <td>Cliente</td>
                  <td>
                    {cliente.nombre} {cliente.rtn && `- ${cliente.rtn}`}
                  </td>
                </tr>
              )}
              <tr>
                <td>Vendedor</td>
                <td>
                  {usuario_creador.id} - {usuario_creador.nombre}
                </td>
              </tr>
              <tr>
                <td>Metodo de pago</td>
                <td>{metodo_pago}</td>
              </tr>
              <tr>
                <td>Sub total</td>
                <td>Lps {getNumberFormatted(sub_total)}</td>
              </tr>
              <tr>
                <td>Impuesto</td>
                <td>Lps {getNumberFormatted(impuesto)}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>Lpst {getNumberFormatted(total)}</td>
              </tr>
            </tbody>
          </table>

          <h5 className="mt-1">Productos</h5>
          <table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Descripcion</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(prod => (
                <tr key={uuid()}>
                  <td>{prod.codigo_barra}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.cantidad}</td>
                  <td>{getNumberFormatted(prod.precio)}</td>
                  <td>{getNumberFormatted(prod.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  render() {
    let pageContent = this.getPageContent();
    return (
      <React.Fragment>
        <NewNavbar active_nav="DEVOLUCIONES">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Devolucion
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <a href="#modal_confirmar_evento" className="modal-trigger">
                  <i className="material-icons">delete</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <main>
          <div className="row">
            <div className="col s12">{pageContent}</div>
          </div>
        </main>

        <ConfirmationModal
          title="Eliminar devolucion"
          message="Esta seguro de eliminar esta devolucion? Los datos de la venta no seran retornados a sus valores iniciales"
          onAccept={this.onDeleteClick}
        />
      </React.Fragment>
    );
  }
}

ShowDevolution.propTypes = {
  devolution: PropTypes.object.isRequired,
  getDevolutionById: PropTypes.func.isRequired,
  deleteDevolution: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  devolution: state.devolution
});

export default connect(
  mapStateToProps,
  { getDevolutionById, deleteDevolution }
)(ShowDevolution);
