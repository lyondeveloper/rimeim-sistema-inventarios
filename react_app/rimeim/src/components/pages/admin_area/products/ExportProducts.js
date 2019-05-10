import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavbarAdmin from "../../../layout/NewNavbarAdmin";

import {
  configMaterialComponents,
  removeMaterialComponents
} from "../../../../utils/MaterialFunctions";

import { getProductsToExport } from "../../../../actions/productActions";
import { jsonToExcel } from "../../../../utils/jsonExcel";

import Spinner from "../../../common/Spinner";

class ExportProductExcel extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  onExportToExcel = () => {
    let headers = {
      codigo: "codigo",
      descripcion: "descripcion",
      cantidad: "cantidad",
      cantidad_minima: "cantidad_minima",
      precio: "precio",
      local: "local",
      cantidad_minima_local: "cantidad_minima_local",
      ubicacion: "ubicacion"
    };
    const productosExport = [];
    const { products } = this.props.product;

    products.forEach(prod => {
      if (prod.distribucion && prod.distribucion.length > 0) {
        prod.distribucion.forEach(dist => {
          productosExport.push({
            codigo: prod.codigo,
            descripcion: prod.descripcion,
            cantidad: dist.cantidad,
            cantidad_minima: prod.cantidad_minima,
            cantidad_minima_local: dist.cantidad_minima_local,
            precio: prod.precio,
            local: dist.local,
            ubicacion: dist.ubicacion
          });
        });
      } else {
        productosExport.push({
          codigo: prod.codigo,
          descripcion: prod.descripcion,
          cantidad: prod.cantidad,
          cantidad_minima: prod.cantidad_minima,
          cantidad_minima_local: "",
          precio: prod.precio,
          local: "",
          ubicacion: ""
        });
      }
    });

    jsonToExcel(productosExport, headers, "rimeim_productos");
  };

  render() {
    const { loading, products } = this.props.product;
    return (
      <React.Fragment>
        <NavbarAdmin>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Exportar productos
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </NavbarAdmin>

        <main>
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <h6>Productos totales: {products.length}</h6>
                  <button
                    onClick={() => {
                      this.props.getProductsToExport();
                    }}
                  >
                    Obtener productos
                  </button>
                  <button onClick={this.onExportToExcel}>
                    Exportar como Excel
                  </button>

                  {loading && <Spinner fullWidth />}
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

ExportProductExcel.propTypes = {
  product: PropTypes.object.isRequired,
  getProductsToExport: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProductsToExport }
)(ExportProductExcel);
