import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NewNavbar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields
} from '../../../utils/MaterialFunctions';

import {
  getProductById,
  updateProductById
} from '../../../actions/productActions';

import { getLocals } from '../../../actions/LocalActions';
import { getBrands } from '../../../actions/brandActions';
import { getVehicles } from '../../../actions/vehicleActions';
import getFilesFromInput from '../../../utils/getFilesFromInput';

import EditProductCard from '../../common/EditProductCard';

class EditProduct extends Component {
  state = {
    codigo_barra: '',
    nombre: '',
    marca: '0',
    tipo_vehiculo: '0',
    descripcion: '',
    existencia: '0',
    cantidad_minima: '0',
    es_raro: false,
    imagenes: [],
    needs_config_selects: false,
    is_product_setted: false,
    errors: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getLocals();
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
        imagenes
      } = nextProps.product.product;

      this.setState({
        codigo_barra,
        nombre,
        marca: marca && marca.id ? marca.id : '0',
        tipo_vehiculo:
          tipo_vehiculo && tipo_vehiculo.id ? tipo_vehiculo.id : '0',
        descripcion,
        existencia,
        cantidad_minima,
        es_raro: raro,
        imagenes: imagenes,
        is_product_setted: true
      });
    }

    if (
      nextProps.brand.brands &&
      nextProps.brand.brands.length > 0 &&
      !this.state.needs_config_selects
    ) {
      this.setState({
        needs_config_selects: true
      });
    }

    if (
      nextProps.vehicle.vehicles &&
      nextProps.vehicle.vehicles.length > 0 &&
      !this.state.needs_config_selects
    ) {
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
    const new_images = getFilesFromInput(e);
    this.setState({
      imagenes: new_images
    });
  };

  onDeleteFile = file => {};

  onSaveProduct = () => {};

  getProductFromState = () => {
    const {
      codigo_barra,
      nombre,
      marca,
      tipo_vehiculomarca,
      descripcion,
      existenciamarca,
      cantidad_minimamarca,
      es_raro,
      imagenes
    } = this.state;
    return {
      codigo_barra,
      nombre,
      marca,
      tipo_vehiculomarca,
      descripcion,
      existenciamarca,
      cantidad_minimamarca,
      es_raro,
      imagenes
    };
  };

  render() {
    const { errors } = this.state;
    const {
      brand: { brands },
      vehicle: { vehicles },
      user: { user }
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
                is_admin={user.admin}
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
  local: PropTypes.object.isRequired,
  brand: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
  getLocals: PropTypes.func.isRequired,
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
  errors: state.errors,
  local: state.local
});

export default connect(
  mapStateToProps,
  {
    updateProductById,
    getProductById,
    getLocals,
    getVehicles,
    getBrands
  }
)(EditProduct);
