import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavbarAdmin from "../../../layout/NewNavbarAdmin";
import uuid from "uuid";

import {
  configMaterialComponents,
  removeMaterialComponents,
  getModalInstanceById
} from "../../../../utils/MaterialFunctions";

import { addMultiple } from "../../../../actions/productActions";

import getJsonFromExcel from "../../../../utils/getJsonFromExcel";

import Spinner from "../../../common/Spinner";
import TextInputField from "../../../common/TextInputField";
// import CheckInputField from '../../../common/CheckInputField';
import ProductFromExcelCard from "../../../common/ProductsImportCard";
import InputFile from "../../../common/InputFile";
import isEmpty from "../../../../actions/isEmpty";
import ConfirmationModal from "../../../layout/modals/ConfirmationModal";

class NewProductsFromExcel extends Component {
  state = {
    loading_json: false,
    cantidad_minima: "0",
    cantidad_minima_local: "0",
    message: "",
    error: false,
    show_confirmation_modal: false,
    sending_data: false,
    productos: []
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.product.loading && this.state.sending_data) {
      if (nextProps.errors && !isEmpty(nextProps.errors)) {
        this.setState({
          message:
            "Algo no ha salido bien en el proceso, verifique el archivo e intente en un momento",
          error: true,
          show_confirmation_modal: true,
          sending_data: false
        });
      } else {
        this.setState({
          message: "Los productos fueron guardados con exito",
          error: false,
          show_confirmation_modal: true,
          sending_data: false
        });
      }
    }
  }

  componentDidUpdate() {
    if (this.state.show_confirmation_modal) {
      this.setState({
        show_confirmation_modal: false
      });
      getModalInstanceById("modal_confirmar_evento").open();
    }
  }

  onChangeExcelFile = e => {
    this.setState({
      loading_json: true
    });
    getJsonFromExcel(e.target.files[0], json => {
      const productos = this.getParsedProducts(json);
      document.getElementById("excel_file").value = null;
      this.setState({
        productos,
        loading_json: false
      });
    });
  };

  getParsedProducts = crudProductos => {
    const newProducts = [];
    for (let x = 0; x < crudProductos.length; x++) {
      const prod = crudProductos[x];
      if (
        prod.codigo &&
        prod.descripcion &&
        prod.cantidad &&
        prod.precio &&
        prod.local &&
        prod.ubicacion
      ) {
        let cantidad = Number.isInteger(prod.cantidad)
          ? prod.cantidad
          : parseInt(prod.cantidad);
        if (cantidad === null || !(cantidad >= 0)) {
          continue;
        }

        let codigo = prod.codigo.trim();
        if (isEmpty(codigo)) {
          continue;
        }

        let descripcion = prod.descripcion.trim();
        if (isEmpty(descripcion)) {
          continue;
        }

        let local = prod.local.replace('"', "").trim();
        let ubicacion = prod.ubicacion.trim();
        let cantidad_minima = prod.cantidad_minima ? prod.cantidad_minima : 0;
        let cantidad_minima_local = prod.cantidad_minima_local
          ? prod.cantidad_minima_local
          : 0;
        let distribucion_local_obj;

        if (!isEmpty(local) && !isEmpty(ubicacion)) {
          distribucion_local_obj = {
            local,
            ubicacion,
            cantidad,
            cantidad_minima_local
          };
        }

        let precio = Number.isInteger(prod.precio)
          ? prod.precio
          : parseInt(prod.precio);
        if (precio === null || !(precio >= 0)) {
          precio = 0;
        }

        const findedIndex = newProducts.findIndex(
          nprod => nprod.codigo === codigo
        );
        if (findedIndex >= 0) {
          const currentProd = newProducts[findedIndex];
          currentProd.cantidad += cantidad;

          if (distribucion_local_obj) {
            const findedLocalIndex = currentProd.distribucion.findIndex(
              dist => dist.local === distribucion_local_obj.local
            );

            if (findedLocalIndex >= 0) {
              currentProd.distribucion[findedLocalIndex].cantidad += cantidad;
            } else {
              currentProd.distribucion.push(distribucion_local_obj);
            }
          }

          newProducts[findedIndex] = currentProd;
        } else {
          const newProd = {
            codigo,
            descripcion,
            cantidad,
            cantidad_minima,
            precio,
            distribucion: []
          };
          if (distribucion_local_obj) {
            newProd.distribucion.push(distribucion_local_obj);
          }
          newProducts.push(newProd);
        }
      }
    }
    return newProducts;
  };

  onChangeTextInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeCheckField = e => {
    const current_value = this.state[e.target.name];
    this.setState({ [e.target.name]: !current_value });
  };

  onClickApplyChanges = () => {
    const { productos, cantidad_minima, cantidad_minima_local } = this.state;
    this.setState({
      loading_json: true
    });
    productos.forEach(producto => {
      if (producto.cantidad_minima === 0) {
        producto.cantidad_minima = parseInt(cantidad_minima);
      }
      producto.distribucion.forEach(dist => {
        if (dist.cantidad_minima_local === 0) {
          dist.cantidad_minima_local = parseInt(cantidad_minima_local);
        }
      });
    });
    this.setState({
      loading_json: false
    });
  };

  onSaveProducts = () => {
    this.props.addMultiple({ productos: this.state.productos });
    this.setState({ sending_data: true });
  };

  onAcceptClick = () => {
    if (!this.state.error) {
      this.setState({
        productos: []
      });
    }
  };

  render() {
    const {
      productos,
      loading_json,
      cantidad_minima,
      cantidad_minima_local
    } = this.state;
    let productsCards;

    if (productos.length >= 0) {
      productsCards = productos.map(prod => (
        <ProductFromExcelCard key={uuid()} producto={prod} />
      ));
    }
    return (
      <React.Fragment>
        <NavbarAdmin>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Importar productos
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <a href="#!" onClick={this.onSaveProducts}>
                  <i className="material-icons">save</i>
                </a>
              </li>
            </ul>
          </div>
        </NavbarAdmin>

        <main>
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <h5>Productos totales: {productos.length}</h5>
                  <div className="row">
                    <InputFile
                      input_size="s12 m7 l7"
                      id="excel_file"
                      label="Seleccione un archivo"
                      onchange={this.onChangeExcelFile}
                    />
                  </div>

                  <div className="row">
                    <TextInputField
                      id="cantidad_minima"
                      label="Cantidad minima"
                      input_size={"s12 m4 l4"}
                      onchange={this.onChangeTextInput}
                      value={cantidad_minima}
                      type="number"
                    />
                    <TextInputField
                      id="cantidad_minima_local"
                      label="Cantidad minima para bodegas"
                      input_size={"s12 m4 l4"}
                      onchange={this.onChangeTextInput}
                      value={cantidad_minima_local}
                      type="number"
                    />
                    <div className="col s12 m4 l4">
                      <button
                        className="btn"
                        onClick={this.onClickApplyChanges}
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>

                  {(loading_json || this.props.product.loading) && (
                    <Spinner fullWidth />
                  )}
                  {productsCards}
                </div>
              </div>
            </div>
          </div>
        </main>

        <ConfirmationModal
          title="Aviso"
          message={this.state.message}
          onAccept={this.onAcceptClick}
        />
      </React.Fragment>
    );
  }
}

NewProductsFromExcel.propTypes = {
  errors: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  addMultiple: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addMultiple }
)(NewProductsFromExcel);
