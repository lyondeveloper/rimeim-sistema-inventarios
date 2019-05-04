import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NewNavbar from "../../layout/NewNavbar";

import "../../../public/css/ventas.css";
import {
  configMaterialComponents,
  removeMaterialComponents,
  getModalInstanceById,
  notificationError
} from "../../../utils/MaterialFunctions";

import { addNewSell } from "../../../actions/sellActions";

import SalesGrid from "../../common/SalesGrid";
import SearchProductModal from "../../layout/modals/SearchProductAndShowInfo";
import SearchClientModal from "../../layout/modals/SearchAndSelectClient";
import SellConfigurationModal from "../../layout/modals/SellConfiguration";
import SellCheckoutModal from "../../layout/modals/SellCheckout";
import ConfirmationModal from "../../layout/modals/ConfirmationModal";

class NewQuotation extends Component {
  state = {
    currentClient: {},
    needsReturnProducts: false,
    needsFocusToRow: false,
    needsClearAll: false,
    component_message: "",
    products_data: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sell && nextProps.sell.sell_success) {
      this.setState({
        component_message: "La cotizacion se ha guardado exitosamente",
        needsClearAll: true,
        needsReturnProducts: false
      });
    }
  }

  componentDidUpdate() {
    if (this.state.needsFocusToRow) {
      this.setState({
        needsFocusToRow: false
      });
    }
    if (this.state.needsClearAll) {
      this.setState({
        needsClearAll: false
      });
      getModalInstanceById("modal_sell_checkout").close();
      getModalInstanceById("modal_confirmar_evento").open();
    }
  }

  clearAllData = () => {
    window.location.reload();
  };

  onHideModal = () => {
    this.setState({
      needsFocusToRow: true
    });
  };

  onSaveCotizacion = () => {
    this.setState({
      needsReturnProducts: true
    });
  };

  onSelectClient = client => {
    this.setState({
      currentClient: client
    });
  };

  onGetSaleData = salesData => {
    this.setState({
      needsReturnProducts: false,
      products_data: salesData
    });
    if (salesData.productos.length === 0) {
      notificationError("No hay productos seleccioandos");
    } else {
      getModalInstanceById("modal_sell_checkout").open();
    }
  };

  onSendQuoteToServer = finalJsonData => {
    finalJsonData.productos = this.state.products_data.productos;
    finalJsonData.es_cotizacion = true;
    this.props.addNewSell(finalJsonData);
  };

  render() {
    const {
      currentClient,
      products_data,
      component_message,
      needsClearAll
    } = this.state;
    const sumValues = {
      subtotal: products_data.sub_total ? products_data.sub_total : 0,
      impuesto: products_data.impuesto ? products_data.impuesto : 0,
      total: products_data.total ? products_data.total : 0
    };
    return (
      <React.Fragment>
        <NewNavbar active_nav="COTIZACIONES">
          <ul id="dropdown_more" className="dropdown-content">
            <li>
              <a href="#modal_sell_configuracion" className="modal-trigger">
                <i className="material-icons">settings</i>
              </a>
            </li>
            <li>
              <a href="#search_product_and_show_info" className="modal-trigger">
                <i className="material-icons">search</i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="material-icons">print</i>
              </a>
            </li>
            <li>
              <a href="#!" onClick={this.onSaveCotizacion}>
                <i className="material-icons">save</i>
              </a>
            </li>
          </ul>

          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Nueva cotizacion
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-small-only">
              <li>
                <a href="#modal_sell_configuracion" className="modal-trigger">
                  <i className="material-icons">settings</i>
                </a>
              </li>
              <li>
                <a
                  href="#search_product_and_show_info"
                  className="modal-trigger"
                >
                  <i className="material-icons">search</i>
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="tooltipped"
                  data-position="bottom"
                  data-tooltip="Imprimir"
                >
                  <i className="material-icons">print</i>
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="tooltipped"
                  data-position="bottom"
                  data-tooltip="Guardar"
                  onClick={this.onSaveCotizacion}
                >
                  <i className="material-icons">save</i>
                </a>
              </li>
            </ul>

            <ul className="mobile-only right">
              <li>
                <a
                  className="dropdown-trigger"
                  href="#!"
                  data-target="dropdown_more"
                >
                  <i className="material-icons right">more_vert</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <SalesGrid
          currentClient={currentClient}
          returnProducts={this.state.needsReturnProducts}
          returnProductsFunction={this.onGetSaleData}
          needsFocusOnRow={this.state.needsFocusToRow}
          needsClearAll={needsClearAll}
        />

        <SearchProductModal onHide={this.onHideModal} />
        <SearchClientModal
          onHide={this.onHideModal}
          currentClient={currentClient}
          onSelectClient={this.onSelectClient}
        />
        <SellConfigurationModal
          id_search_client_modal="modal_seleccionar_cliente"
          currentClient={currentClient}
          onHide={this.onHideModal}
        />
        <SellCheckoutModal
          currentClient={currentClient}
          loading={this.props.sell.loading}
          errors={this.props.errors}
          sumValues={sumValues}
          onAccept={this.onSendQuoteToServer}
          es_cotizacion={true}
        />

        <ConfirmationModal
          title="Estado de cotizacion"
          message={component_message}
          onAccept={this.clearAllData}
        />
      </React.Fragment>
    );
  }
}

NewQuotation.propTypes = {
  sell: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addNewSell: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sell: state.sell,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addNewSell }
)(NewQuotation);
