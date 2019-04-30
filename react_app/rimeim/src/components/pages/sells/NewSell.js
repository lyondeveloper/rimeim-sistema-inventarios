import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from "uuid";

import NewNavbar from "../../layout/NewNavbar";

// Custom components
import SellColumnsDetails from "../../common/SellColumnsDetails";

// Functions
// Functions
import {
  configMaterialComponents,
  removeMaterialComponents
} from "../../../utils/MaterialFunctions";

// Custom css
import "../../../public/css/ventas.css";

import SearchProductModal from "../../layout/modals/SearchProductAndShowInfo";

class NewSell extends Component {
  state = {
    input_codigo_barra: "inputcbr",
    input_cantidad: "inputcant",
    input_precio: "inputprec",
    errors: {},
    products: [
      {
        codigo_barra: "",
        cantidad: "1",
        nombre: "Llanta",
        precio: "100"
      }
    ],
    products_count_to_add: 10,
    subtotal: 0,
    impuesto: 0,
    total: 0
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  onInputKeyPress = (value, row_type, index, e) => {
    if (e.keyCode === 13 || e.which === 13) {
      console.log(value);
    }
  };

  getTrCodeForProduct = (index, row_id, product) => {
    const { input_codigo_barra, input_cantidad, input_precio } = this.state;
    return (
      <tr
        className={index == 0 && "active-tr-sell"}
        id={`trow${row_id}`}
        key={uuid()}
      >
        <td className="td-with-input">
          <input
            type="text"
            id={`${input_codigo_barra}${row_id}`}
            className="special-input browser-default"
            onKeyPress={this.onInputKeyPress.bind(
              this,
              row_id,
              input_codigo_barra,
              index
            )}
            value={product.codigo_barra}
            readOnly
          />
        </td>
        <td className="td-with-input">{product.nombre}</td>
        <td className="td-with-input">
          <input
            id={`${input_cantidad}${row_id}`}
            type="text"
            className="special-input browser-default"
            onKeyPress={this.onInputKeyPress.bind(
              this,
              row_id,
              input_cantidad,
              index
            )}
            value={product.cantidad}
            readOnly
          />
        </td>

        <td className="td-with-input">
          <input
            id={`${input_precio}${row_id}`}
            type="text"
            className="special-input browser-default"
            onKeyPress={this.onInputKeyPress.bind(
              this,
              row_id,
              input_precio,
              index
            )}
            value={product.precio}
            readOnly
          />
        </td>
      </tr>
    );
  };

  render() {
    const { products, subtotal, impuesto, total } = this.state;

    let rowsProduct = products.map((product, index) => {
      const row_id = uuid();
      return this.getTrCodeForProduct(index, row_id, product);
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
              <table className="table-bordered header-fixed striped highlight">
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
            <SellColumnsDetails title="Sub total" value={subtotal} />
            <SellColumnsDetails title="Impuesto" value={impuesto} />
            <SellColumnsDetails title="Total" value={total} />
          </div>
        </main>

        <SearchProductModal />
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
