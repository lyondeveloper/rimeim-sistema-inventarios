import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from "uuid";

import NewNavbar from "../../layout/NewNavbar";

// Custom components
import SellColumnsDetails from "../../common/SellColumnsDetails";

// Functions
import {
  configMaterialComponents,
  removeMaterialComponents,
  getModalInstanceById,
  notificationError,
  configSelectInputFields
} from "../../../utils/MaterialFunctions";
import isEmpty from "../../../actions/isEmpty";

import { getProductByCBForSell } from "../../../actions/productActions";
import { addNewSell } from "../../../actions/sellActions";

// Custom css
import "../../../public/css/ventas.css";

import SearchProductModal from "../../layout/modals/SearchProductAndShowInfo";
import SearchClientModal from "../../layout/modals/SearchAndSelectClient";
import SellConfigurationModal from "../../layout/modals/SellConfiguration";
import SellCheckoutModal from "../../layout/modals/SellCheckout";

import ConfirmatioModal from "../../layout/modals/ConfirmationModal";

let current_row_changed = true;
let current_row_index = 0;
let sell_is_in_product_request = false;
let is_sending_data = false;
let is_checkout = false;

class NewSell extends Component {
  state = {
    input_codigo_barra: "inputcbr",
    input_cantidad: "inputcant",
    input_precio: "inputprec",
    component_message: "",
    guardar_como_cotizacion: false,
    errors: {},
    products: [],
    currentClient: {},
    count_of_products_to_add: 20,
    count_of_rows_to_add: 10,
    count_of_minimum_rows: 2
  };

  componentWillUnmount() {
    document.onkeydown = null;
  }

  componentWillMount() {
    removeMaterialComponents();
    current_row_index = 0;
    current_row_changed = true;
  }

  componentDidMount() {
    configMaterialComponents();

    document.onkeydown = this.onKeyDownInAllPage;
    this.addFreeRowsToState(this.state.count_of_products_to_add);
  }

  addFreeRowsToState = number_of_rows => {
    const { products } = this.state;
    for (let x = 0; x < number_of_rows; x++) {
      products.push({
        local_id: uuid(),
        id_producto: "",
        codigo_barra: "",
        cantidad: "",
        nombre: "",
        precio: ""
      });
    }
    this.setState({ products });
  };

  onKeyDownInAllPage = evt => {
    evt = evt || window.event;
    if (evt.keyCode === 113) {
      getModalInstanceById("search_product_and_show_info").open();
    }
  };

  componentDidUpdate() {
    if (this.getCountOfTotalRowsFree() === this.state.count_of_minimum_rows) {
      return this.addFreeRowsToState(this.state.count_of_rows_to_add);
    }
    if (is_checkout && current_row_changed) {
      is_checkout = false;
      configSelectInputFields();
    }
    if (current_row_changed && !sell_is_in_product_request) {
      this.setAutomaticInputRowFocus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.product.product &&
      !nextProps.product.loading &&
      sell_is_in_product_request
    ) {
      const { product } = nextProps.product;
      if (!this.addProductToState(product)) {
        setTimeout(() => {
          this.setInputRowFocus(current_row_index);
          this.setBgErrorColorRowCurrentRow();
        }, 1000);
      }
      sell_is_in_product_request = false;
    }

    if (
      nextProps.sell &&
      is_sending_data &&
      !nextProps.sell.loading &&
      (!nextProps.errors || isEmpty(nextProps.errors))
    ) {
      let new_modal_message = "";
      if (nextProps.sell.sell_success) {
        new_modal_message = "La venta se ha guardado exitosamente";
      } else {
        new_modal_message =
          "Ocurrio un error en el proceso, por favor notificar al desarrollador";
      }
      is_sending_data = false;
      this.setState({
        component_message: new_modal_message
      });
      getModalInstanceById("modal_sell_checkout").close();
      getModalInstanceById("modal_confirmar_evento").open();
    }
  }

  onAcceptConfirm = () => {
    if (
      this.state.component_message === "La venta se ha guardado exitosamente"
    ) {
      window.location.reload();
    }
  };

  onHideModal = () => {
    if (is_checkout) {
      this.setState({
        guardar_como_cotizacion: false
      });
      current_row_changed = true;
    } else {
      setTimeout(() => this.setAutomaticInputRowFocus(), 1000);
    }
  };

  onSelectClient = newClient => {
    this.setState({
      currentClient: newClient
    });
    this.onHideModal();
  };

  onSelectProduct = product => {
    if (product && Object.keys(product).length > 0) {
      this.addProductToState(product);
    } else {
      setTimeout(() => {
        this.setInputRowFocus(current_row_index);
        this.setBgErrorColorRowCurrentRow();
      }, 1000);
    }
  };

  addProductToState = product => {
    if (product && Object.keys(product).length > 0) {
      const { products } = this.state;
      let producto_nombre = `${product.nombre}`;
      if (product.marca_nombre) {
        producto_nombre = `${producto_nombre} - ${product.marca_nombre}`;
      }
      products[current_row_index] = {
        ...products[current_row_index],
        id_producto: product.id,
        codigo_barra: product.codigo_barra,
        nombre: producto_nombre,
        cantidad: 1,
        precio: product.precio
      };
      current_row_changed = true;
      this.setState({
        products
      });
      return true;
    }
    return false;
  };

  getCountOfTotalRowsFree = () => {
    return this.state.products.filter(prod => prod.id_producto === "").length;
  };

  getCounfOfTotalProducts = () => {
    return this.state.products.filter(prod => prod.id_producto !== "").length;
  };

  onInputKeyPress = (row_id, row_type, index, e) => {
    if (sell_is_in_product_request) {
      return;
    }

    if (e.keyCode === 13) {
      //Entar
      let newValue = document
        .getElementById(`${row_type}${row_id}`)
        .value.trim();

      const response = this.isValidNewInputValue(row_type, newValue);
      if (response.is_valid) {
        this.setValueToProductRow(row_type, index, `${response.value}`);
      } else {
        this.goBackToInputValue(row_type, row_id, index);
        this.setInputRowFocus(index);
      }
    } else if (e.keyCode === 8 && !e.ctrlKey) {
      // Simple DELETE
      return;
    } else if (e.keyCode === 27) {
      // Escape
      this.goBackToInputValue(row_type, row_id, index);
    } else if (e.keyCode === 46 || (e.ctrlKey && e.keyCode === 8)) {
      // Delete
      const { products } = this.state;
      const currentProduct = products.find(prod => prod.local_id === row_id);
      if (currentProduct.id_producto !== "") {
        if (currentProduct) {
          this.setState({
            products: products.filter(prod => prod !== currentProduct)
          });
          current_row_changed = true;
        }
      }
    } else if (e.keyCode === 17) {
      // Control
      return;
    } else if (row_type === this.state.input_codigo_barra) {
      let newValue = document
        .getElementById(`${row_type}${row_id}`)
        .value.trim();
      if (newValue.length >= 7) {
        this.setValueToProductRow(row_type, index, newValue);
      }
    }
  };

  goBackToInputValue = (row_type, row_id, index) => {
    document.getElementById(
      `${row_type}${row_id}`
    ).value = this.getBackInputValue(row_type, index);
  };

  getBackInputValue = (row_type, index) => {
    let backValue = "";
    switch (row_type) {
      case this.state.input_codigo_barra:
        backValue = this.state.products[index].codigo_barra;
        break;

      case this.state.input_cantidad:
        backValue = this.state.products[index].cantidad;
        break;

      case this.state.input_precio:
        backValue = this.state.products[index].precio;
        break;

      default:
        break;
    }
    return backValue;
  };

  isValidNewInputValue = (row_type, value) => {
    let new_value = "";
    let is_valid = false;
    switch (row_type) {
      case this.state.input_codigo_barra:
        if (value !== "") {
          new_value = value;
          is_valid = true;
        }
        break;

      case this.state.input_cantidad:
        new_value = parseInt(value);
        if (!isNaN(new_value) && new_value >= 0) {
          is_valid = true;
        }
        break;

      case this.state.input_precio:
        new_value = parseFloat(value);
        if (!isNaN(new_value) && new_value >= 0) {
          is_valid = true;
        }
        break;

      default:
        break;
    }
    return { is_valid, value: new_value };
  };

  setValueToProductRow = (row_type, index, new_value) => {
    const { products, currentClient } = this.state;
    switch (row_type) {
      case this.state.input_codigo_barra:
        if (index <= current_row_index && products[index].id_producto === "") {
          sell_is_in_product_request = true;
          products[index].codigo_barra = new_value;
          this.props.getProductByCBForSell({
            codigo_barra: new_value,
            id_ciente: currentClient.id
          });
        } else {
          current_row_changed = true;
        }
        break;

      case this.state.input_cantidad:
        products[index].cantidad = new_value;
        current_row_changed = true;
        break;

      case this.state.input_precio:
        products[index].precio = new_value;
        current_row_changed = true;
        break;

      default:
        break;
    }

    this.setState({
      products
    });
  };

  setAutomaticInputRowFocus = () => {
    let currentIndex = 0;
    for (let x = 0; x < this.state.products.length; x++) {
      if (this.state.products[x].id_producto === "") {
        currentIndex = x;
        break;
      }
    }
    this.removeBgColorForCurrentRow();
    current_row_changed = false;
    current_row_index = currentIndex;

    this.setInputRowFocus(currentIndex);
    this.setBgColorForCurrentRow();
  };

  setInputRowFocus = index => {
    const element_id = `${this.state.input_codigo_barra}${
      this.state.products[index].local_id
    }`;
    const input_codigo_barra = document.getElementById(element_id);
    if (input_codigo_barra) {
      input_codigo_barra.focus();
    }
  };

  removeBgColorForCurrentRow = () => {
    const currentProduct = this.state.products[current_row_index];
    if (currentProduct) {
      const row_id = currentProduct.local_id;
      document
        .getElementById(`trow${row_id}`)
        .classList.remove("active-tr-sell");
    }
  };

  setBgColorForCurrentRow = () => {
    const currentProduct = this.state.products[current_row_index];
    if (currentProduct) {
      const row_id = currentProduct.local_id;
      const tr_element = document.getElementById(`trow${row_id}`);
      tr_element.classList.remove("active-tr-sell-error");
      tr_element.classList.add("active-tr-sell");
    }
  };

  setBgErrorColorRowCurrentRow = () => {
    const currentProduct = this.state.products[current_row_index];
    if (currentProduct) {
      const row_id = currentProduct.local_id;
      const tr_element = document.getElementById(`trow${row_id}`);
      tr_element.classList.remove("active-tr-sell");
      tr_element.classList.add("active-tr-sell-error");
      setTimeout(() => this.setBgColorForCurrentRow(), 2000);
    }
  };

  getTrCodeForProduct = (index, row_id, product) => {
    const { input_codigo_barra, input_cantidad, input_precio } = this.state;
    const { codigo_barra, nombre, cantidad, precio } = product;
    return (
      <tr id={`trow${row_id}`} key={uuid()}>
        <td className="td-with-input">
          <input
            type="text"
            id={`${input_codigo_barra}${row_id}`}
            className="special-input browser-default"
            onKeyUp={this.onInputKeyPress.bind(
              this,
              row_id,
              input_codigo_barra,
              index
            )}
            defaultValue={codigo_barra}
          />
        </td>
        <td className="td-with-input">{nombre}</td>
        <td className="td-with-input">
          <input
            id={`${input_cantidad}${row_id}`}
            type="text"
            className="special-input browser-default"
            onKeyDown={this.onInputKeyPress.bind(
              this,
              row_id,
              input_cantidad,
              index
            )}
            defaultValue={cantidad}
          />
        </td>

        <td className="td-with-input">
          <input
            id={`${input_precio}${row_id}`}
            type="text"
            className="special-input browser-default"
            onKeyDown={this.onInputKeyPress.bind(
              this,
              row_id,
              input_precio,
              index
            )}
            defaultValue={precio}
          />
        </td>
      </tr>
    );
  };

  getValuesForProduct = product => {
    let subtotal = 0;
    let impuesto = 15;

    const cantidad = parseInt(product.cantidad);
    const precio = parseFloat(product.precio);

    if (!isNaN(cantidad) && cantidad >= 0 && !isNaN(precio) && precio >= 0) {
      subtotal += cantidad * precio;
    }

    impuesto = subtotal * 0.15;
    const total = subtotal + impuesto;
    return { subtotal, impuesto, total };
  };

  openModalCheckOut = () => {
    if (this.getCounfOfTotalProducts() > 0) {
      getModalInstanceById("modal_sell_checkout").open();
    } else {
      notificationError("No hay productos para facturar");
    }
  };

  onSaveAsQuotation = () => {
    this.setState({
      guardar_como_cotizacion: true
    });
    is_checkout = true;
    getModalInstanceById("modal_sell_checkout").open();
  };

  onCheckOutSell = saleData => {
    saleData.productos = this.state.products.filter(
      prod => prod.id_producto !== ""
    );
    saleData.es_cotizacion = this.state.guardar_como_cotizacion;
    is_sending_data = true;
    this.props.addNewSell(saleData);
  };

  render() {
    const { products, currentClient } = this.state;
    const sumVales = {
      subtotal: 0,
      impuesto: 0,
      total: 0
    };

    let rowsProduct = products.map((product, index) => {
      const valuesToSum = this.getValuesForProduct(product);
      sumVales.subtotal += valuesToSum.subtotal;
      sumVales.impuesto += valuesToSum.impuesto;
      sumVales.total += valuesToSum.total;
      return this.getTrCodeForProduct(index, product.local_id, product);
    });

    return (
      <React.Fragment>
        <NewNavbar active_nav="VENTAS">
          <ul id="dropdown_more" className="dropdown-content">
            <li>
              <a href="#search_product_and_show_info" className="modal-trigger">
                <i className="material-icons">search</i>
              </a>
            </li>
            <li>
              <a href="#modal_sell_configuracion" className="modal-trigger">
                <i className="material-icons">settings</i>
              </a>
            </li>
            <li>
              <a href="#!" onClick={this.onSaveAsQuotation}>
                <i className="material-icons">save</i>
              </a>
            </li>
            <li>
              <a href="#!" onClick={this.openModalCheckOut}>
                <i className="material-icons">check</i>
              </a>
            </li>
          </ul>

          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Nueva venta
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-small-only">
              <li>
                <a
                  href="#search_product_and_show_info"
                  className="modal-trigger tooltipped"
                  data-position="bottom"
                  data-tooltip="Buscar producto"
                >
                  <i className="material-icons">search</i>
                </a>
              </li>
              <li>
                <a href="#modal_sell_configuracion" className="modal-trigger">
                  <i className="material-icons">settings</i>
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="tooltipped"
                  data-position="bottom"
                  data-tooltip="Guardar como cotizacion"
                  onClick={this.onSaveAsQuotation}
                >
                  <i className="material-icons">save</i>
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="tooltipped"
                  data-position="bottom"
                  data-tooltip="Facturar"
                  onClick={this.openModalCheckOut}
                >
                  <i className="material-icons">check</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <main>
          <div className="row venta-productos">
            <div className="col s12 no-padding">
              <table className="table-bordered header-fixed striped">
                <thead>
                  <tr>
                    <th className="center">Codigo</th>
                    <th className="center">Descripcion</th>
                    <th className="center">Cantidad</th>
                    <th className="center">Precio</th>
                  </tr>
                </thead>
                <tbody>{rowsProduct}</tbody>
              </table>
            </div>
          </div>

          <div className="row col-bordered venta-total">
            <SellColumnsDetails title="Sub total" value={sumVales.subtotal} />
            <SellColumnsDetails title="Impuesto" value={sumVales.impuesto} />
            <SellColumnsDetails title="Total" value={sumVales.total} />
          </div>
        </main>

        <SearchProductModal
          onHide={this.onHideModal}
          onSelectProduct={this.onSelectProduct}
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
          sumValues={sumVales}
          onHide={this.onHideModal}
          onAccept={this.onCheckOutSell}
          es_cotizacion={this.state.guardar_como_cotizacion}
        />

        <ConfirmatioModal
          title="Aviso"
          message={this.state.component_message}
          onAccept={this.onAcceptConfirm}
        />
      </React.Fragment>
    );
  }
}

NewSell.propTypes = {
  errors: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getProductByCBForSell: PropTypes.func.isRequired,
  addNewSell: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sell: state.sell,
  errors: state.errors,
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProductByCBForSell, addNewSell }
)(NewSell);
