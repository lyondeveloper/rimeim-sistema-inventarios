import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NewNavbar from "../../layout/NewNavbar";

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields
} from "../../../utils/MaterialFunctions";

import {
  getProductById,
  updateProductById
} from "../../../actions/productActions";

import { getBrands } from "../../../actions/brandActions";
import { getVehicles } from "../../../actions/vehicleActions";
import getFilesFromInput from "../../../utils/getFilesFromInput";

import EditProductCard from "../../common/EditProductCard";

class EditProduct extends Component {
  state = {
    codigo_barra: "",
    nombre: "",
    marca: "0",
    tipo_vehiculo: "0",
    descripcion: "",
    existencia: "0",
    cantidad_minima: "0",
    es_raro: false,
    imagenes: [],
    ubicacion: "",
    id_producto_local: null,
    id_ubicacion: null,
    needs_config_selects: false,
    is_product_setted: false,
    errors: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getBrands();
    this.props.getVehicles();
    this.props.getProductById(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (this.state.needs_config_selects) {
      configSelectInputFields();
      this.setState({
        needs_config_selects: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (
      !this.state.is_product_setted &&
      !nextProps.product.loading &&
      nextProps.product.product
    ) {
      const {
        codigo_barra,
        nombre,
        descripcion,
        raro,
        existencia,
        cantidad_minima,
        marca,
        tipo_vehiculo,
        imagenes,
        ubicacion,
        id_producto_local,
        id_ubicacion
      } = nextProps.product.product;

      this.setState({
        codigo_barra,
        nombre,
        marca: marca && marca.id ? marca.id : "0",
        tipo_vehiculo:
          tipo_vehiculo && tipo_vehiculo.id ? tipo_vehiculo.id : "0",
        descripcion,
        existencia,
        cantidad_minima,
        es_raro: raro,
        imagenes: imagenes,
        ubicacion: ubicacion ? ubicacion : "",
        id_producto_local: id_producto_local ? id_producto_local : null,
        id_ubicacion: id_ubicacion ? id_ubicacion : null,
        is_product_setted: true
      });
    }

    if (nextProps.brand.brands && !this.state.needs_config_selects) {
      this.setState({
        needs_config_selects: true
      });
    }

    if (nextProps.vehicle.vehicles && !this.state.needs_config_selects) {
      this.setState({
        needs_config_selects: true
      });
    }
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onChangeCheckField = e => {
    const current_value = this.state[e.target.name];
    this.setState({ [e.target.name]: !current_value });
  };

  onSelectFiles = e => {
    getFilesFromInput(e, new_images => {
      const { imagenes } = this.state;
      new_images.forEach(img => {
        if (imagenes.findIndex(i => i.name === img.name) === -1) {
          imagenes.push(img);
        }
      });
      this.setState({
        imagenes
      });
    });
  };

  onDeleteFile = file => {
    if (file.id) {
      const { imagenes } = this.state;
      const fileIndex = imagenes.findIndex(img => img === file);
      if (fileIndex >= 0) {
        imagenes[fileIndex].eliminado = true;
        this.setState({
          imagenes
        });
      }
    } else {
      this.setState({
        imagenes: this.state.imagenes.filter(img => img !== file)
      });
    }
    document.getElementById("imagenes").value = null;
  };

  getProductFromState = () => {
    const {
      codigo_barra,
      nombre,
      marca,
      tipo_vehiculo,
      descripcion,
      existencia,
      cantidad_minima,
      es_raro,
      ubicacion,
      imagenes,
      id_ubicacion,
      id_producto_local
    } = this.state;
    return {
      codigo_barra,
      nombre,
      marca,
      tipo_vehiculo,
      descripcion,
      existencia,
      cantidad_minima,
      es_raro,
      ubicacion,
      id_ubicacion,
      id_producto_local,
      imagenes
    };
  };

  onSaveProduct = () => {
    const product = this.getProductFromState();
    product.id_marca = this.state.marca;
    product.id_tipo_vehiculo = this.state.tipo_vehiculo;
    product.raro = product.es_raro;
    const newImages = product.imagenes.filter(img => !img.id);

    if (newImages.length > 0) {
      const updatedProductData = new FormData();
      newImages.forEach(img =>
        updatedProductData.append("file_uploads[]", img.file, img.name)
      );
      updatedProductData.append("json_data", JSON.stringify(product));
      this.props.updateProductById(
        this.props.match.params.id,
        updatedProductData
      );
    } else {
      this.props.updateProductById(this.props.match.params.id, product);
    }
  };

  render() {
    const { errors } = this.state;
    const {
      brand: { brands },
      vehicle: { vehicles }
    } = this.props;
    const product = this.getProductFromState();

    return (
      <React.Fragment>
        <NewNavbar active_nav="PRODUCTOS">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Editar producto
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <a href="#!" onClick={this.onSaveProduct}>
                  <i className="material-icons">save</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <main>
          <div className="row">
            <div className="col s12">
              <EditProductCard
                product={product}
                is_admin={false}
                loading={this.props.product.loading}
                onSelectFiles={this.onSelectFiles}
                onDeleteClickFile={this.onDeleteFile}
                onChangeTextInput={this.onChangeTextInput}
                onChangeCheckField={this.onChangeCheckField}
                brands={brands}
                vehicles={vehicles}
                errors={errors}
              />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

EditProduct.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  brand: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
  getBrands: PropTypes.func.isRequired,
  getVehicles: PropTypes.func.isRequired,
  updateProductById: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  product: state.product,
  brand: state.brand,
  vehicle: state.vehicle,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    updateProductById,
    getProductById,
    getVehicles,
    getBrands
  }
)(EditProduct);
