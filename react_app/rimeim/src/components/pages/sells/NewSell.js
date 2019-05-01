import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid';

import NewNavbar from '../../layout/NewNavbar';

// Custom components
import SellColumnsDetails from '../../common/SellColumnsDetails';

// Functions
import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

// Custom css
import '../../../public/css/ventas.css';

import SearchProductModal from '../../layout/modals/SearchProductAndShowInfo';
import SearchClientModal from '../../layout/modals/SearchAndSelectClient';
import SellConfigurationModal from '../../layout/modals/SellConfiguration';

let current_row_changed = true;
let current_row_index = 0;

class NewSell extends Component {
  state = {
    input_codigo_barra: 'inputcbr',
    input_cantidad: 'inputcant',
    input_precio: 'inputprec',
    errors: {},
    products: [],
    currentClient: {},
    initial_product_rows: 20
  };

  componentWillMount() {
    removeMaterialComponents();
    current_row_index = 0;
    current_row_changed = true;
  }

  componentDidMount() {
    configMaterialComponents();
    const { products, initial_product_rows } = this.state;
    for (let x = 0; x < initial_product_rows; x++) {
      products.push({
        local_id: uuid(),
        id_producto: '',
        codigo_barra: '',
        cantidad: '',
        nombre: '',
        precio: ''
      });
    }
    this.setState({ products });
  }

  componentDidUpdate() {
    if (current_row_changed) {
      this.setAutomaticInputRowFocus();
    }
  }

  onHideModal = () => {
    setTimeout(() => this.setAutomaticInputRowFocus(), 1000);
  };

  onSelectClient = newClient => {
    this.setState({
      currentClient: newClient
    });
    this.onHideModal();
  };

  onInputKeyPress = (row_id, row_type, index, e) => {
    if (e.keyCode === 13) {
      let newValue = document
        .getElementById(`${row_type}${row_id}`)
        .value.trim();
      const response = this.isValidNewInputValue(row_type, newValue);
      if (response.is_valid) {
        this.setValueToProductRow(row_type, index, `${response.value}`);
        current_row_changed = true;
      } else {
        this.goBackToInputValue(row_type, row_id, index);
        this.setInputRowFocus(index);
      }
    } else if (e.keyCode === 27) {
      this.goBackToInputValue(row_type, row_id, index);
    }
  };

  goBackToInputValue = (row_type, row_id, index) => {
    document.getElementById(
      `${row_type}${row_id}`
    ).value = this.getBackInputValue(row_type, index);
  };

  getBackInputValue = (row_type, index) => {
    let backValue = '';
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
    let new_value = '';
    let is_valid = false;
    switch (row_type) {
      case this.state.input_codigo_barra:
        if (value !== '') {
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
    const { products } = this.state;
    switch (row_type) {
      case this.state.input_codigo_barra:
        products[index].codigo_barra = new_value;
        products[index].cantidad = '1';
        products[index].precio = '1000';
        break;

      case this.state.input_cantidad:
        products[index].cantidad = new_value;
        break;

      case this.state.input_precio:
        products[index].precio = new_value;
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
      if (this.state.products[x].codigo_barra.trim() === '') {
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
    const row_id = this.state.products[current_row_index].local_id;
    document.getElementById(`trow${row_id}`).classList.remove('active-tr-sell');
  };

  setBgColorForCurrentRow = () => {
    const row_id = this.state.products[current_row_index].local_id;
    document.getElementById(`trow${row_id}`).classList.add('active-tr-sell');
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
            onKeyDown={this.onInputKeyPress.bind(
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

  getSumValues = () => {
    let subtotal = 0;
    let impuesto = 15;
    for (let x = 0; x < this.state.products.length; x++) {
      const product = this.state.products[x];
      const cantidad = parseInt(product.cantidad);
      const precio = parseFloat(product.precio);

      if (!isNaN(cantidad) && cantidad >= 0 && !isNaN(precio) && precio >= 0) {
        subtotal += cantidad * precio;
      }
    }
    impuesto = subtotal * 0.15;
    const total = subtotal + impuesto;
    return { subtotal, impuesto, total };
  };

  render() {
    const { products, currentClient } = this.state;
    const sumVales = this.getSumValues();

    let rowsProduct = products.map((product, index) => {
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
              <a href="#!">
                <i className="material-icons">save</i>
              </a>
            </li>
            <li>
              <a href="#!">
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
                  data-tooltip="Guardar"
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

        <SearchProductModal onHide={this.onHideModal} />
        <SearchClientModal
          onHide={this.onHideModal}
          currentClient={currentClient}
          onSelectClient={this.onSelectClient}
        />
        <SellConfigurationModal
          id_search_client_modal="modal_seleccionar_cliente"
          currentClient={currentClient}
        />
      </React.Fragment>
    );
  }
}

NewSell.propTypes = {
  errors: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  product: state.product,
  client: state.client
});

export default connect(
  mapStateToProps,
  {}
)(NewSell);
