import React, { Component } from "react";
import { connect } from "react-redux";
import NewNavbar from "../../layout/NewNavbar";
import PropTypes from "prop-types";

import "../../../public/css/ventas.css";

// Functions
import {
  configMaterialComponents,
  removeMaterialComponents,
  getModalInstanceById
} from "../../../utils/MaterialFunctions";

import {
  getQuotationById,
  deleteQuotation
} from "../../../actions/sellActions";
import ShowSaleCard from "../../common/ShowSale";
import ConfirmationModal from "../../layout/modals/ConfirmationModal";
import PrintQuotationModal from "../../layout/modals/PrintQuotation";

class ShowQuotation extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getQuotationById(this.props.match.params.id);
  }

  onDelete = () => {
    getModalInstanceById("modal_confirmar_evento").open();
  };

  onConfirmDelete = () => {
    const { match, history } = this.props;
    this.props.deleteQuotation(match.params.id, history, "/cotizaciones");
  };

  getQuotationToPrint = sell => {
    let productos = {};
    let values = { subtotal: 0, impuesto: 0, total: 0 };
    let cliente = {};
    if (sell.productos) {
      productos.productos = sell.productos;
    }
    if (sell.sub_total && sell.impuesto && sell.total) {
      values.subtotal = sell.sub_total;
      values.impuesto = sell.impuesto;
      values.total = sell.total;
    }
    if (sell.cliente) {
      cliente.nombre = sell.cliente.nombre;
      cliente.rtn = sell.cliente.rtn;
    }
    return {
      productos: productos,
      values: values,
      cliente: cliente,
      local: this.props.user.currentLocal
    };
  };

  render() {
    const { loading, sell } = this.props.sell;
    return (
      <React.Fragment>
        <NewNavbar active_nav="VENTAS">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Cotizacion
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
          </div>

          <ul className="right">
            <li>
              <a href="#modal_imprimir_cotizacion" className="modal-trigger">
                <i className="material-icons">print</i>
              </a>
            </li>
          </ul>
        </NewNavbar>

        <main>
          <div className="row">
            <div className="col s12">
              <ShowSaleCard
                loading={loading}
                sale={sell}
                es_cotizacion={true}
                onDelete={this.onDelete}
              />
            </div>
          </div>
        </main>

        <ConfirmationModal
          title="Borrar devolucion"
          message="Esta seguro de borrar esta devolucion? No se podra deshacer la accion"
          onAccept={this.onConfirmDelete}
        />

        <PrintQuotationModal
          cotizacion={this.getQuotationToPrint(sell)}
          onCancel={() => {}}
        />
      </React.Fragment>
    );
  }
}

ShowQuotation.propTypes = {
  sell: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getQuotationById: PropTypes.func.isRequired,
  deleteQuotation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sell: state.sell,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getQuotationById, deleteQuotation }
)(ShowQuotation);
