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
import isEmpty from "../../../actions/isEmpty";

import SalesGrid from "../../common/SalesGrid";
import SearchClientModal from "../../layout/modals/SearchAndSelectClient";
import SellConfigurationModal from "../../layout/modals/SellConfiguration";
import SellCheckoutModal from "../../layout/modals/SellCheckout";
import ConfirmationModal from "../../layout/modals/ConfirmationModal";
import PrintQuotationModal from "../../layout/modals/PrintQuotation";

import "../../../public/css/ventas.css";

let is_sending_data = false;
class NewQuotation extends Component {
  state = {
    currentClient: {},
    needsReturnProducts: false,
    needsFocusToRow: false,
    needsClearAll: false,
    to_print: false,
    component_message: "",
    products_data: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    document.onkeydown = this.onKeyDownInAllPage;
  }

  componentWillUnmount() {
    document.onkeydown = null;
  }

  onKeyDownInAllPage = evt => {
    evt = evt || window.event;
    if (evt.keyCode === 113) {
      getModalInstanceById("search_product_and_show_info").open();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.sell &&
      is_sending_data &&
      !nextProps.sell.loading &&
      (!nextProps.errors || isEmpty(nextProps.errors))
    ) {
      let new_message = "";
      if (nextProps.sell.sell_success) {
        new_message = "La cotizacion se ha guardado exitosamente";
      } else {
        new_message =
          "Ocurrio un error al guardar la cotizacion, por favor notifique al desarrollador";
      }
      is_sending_data = false;
      this.setState({
        component_message: new_message,
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
    if (
      this.state.component_message ===
      "La cotizacion se ha guardado exitosamente"
    ) {
      window.location.reload();
    }
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

  onPrintCotizacion = () => {
    this.setState({
      needsReturnProducts: true,
      to_print: true
    });
  };

  onCancelPrint = () => {
    this.setState({
      needsReturnProducts: false,
      to_print: false
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
    } else if (this.state.to_print) {
      getModalInstanceById("modal_imprimir_cotizacion").open();
    } else {
      getModalInstanceById("modal_sell_checkout").open();
    }
  };

  onSendQuoteToServer = finalJsonData => {
    finalJsonData.productos = this.state.products_data.productos;
    finalJsonData.es_cotizacion = true;
    is_sending_data = true;
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
              <a href="#!" onClick={this.onPrintCotizacion}>
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
                  onClick={this.onPrintCotizacion}
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

        <PrintQuotationModal
          cotizacion={{
            productos: products_data,
            cliente: currentClient,
            values: sumValues,
            local: this.props.user.currentLocal
          }}
          onCancel={this.onCancelPrint}
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
  user: PropTypes.object.isRequired,
  addNewSell: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sell: state.sell,
  errors: state.errors,
  user: state.user
});

export default connect(
  mapStateToProps,
  { addNewSell }
)(NewQuotation);
