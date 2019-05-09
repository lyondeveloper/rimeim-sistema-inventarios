import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  configSelectInputFields,
  getModalInstanceById
} from '../../../utils/MaterialFunctions';

import {
  getBrands,
  brandsToSelectOptions
} from '../../../actions/brandActions';
import {
  getVehicles,
  vehiclesToSelectOptions
} from '../../../actions/vehicleActions';
import {
  getLocals,
  localsToSelectOptions
} from '../../../actions/LocalActions';

import { getProducts, searchProduct } from '../../../actions/productActions';

import TextInputField from '../../common/TextInputField';
import SelectInputField from '../../common/SelectInputField';

let need_config_selects = false;
class SearchProductModel extends Component {
  state = {
    field: '',
    id_marca: '0',
    id_vehiculo: '0',
    id_local: '0',
    inventario_min: '-1',
    inventario_max: '-1'
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {
    this.props.getBrands();
    this.props.getVehicles();
    if (this.props.is_admin) {
      this.props.getLocals();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.brand.brands || nextProps.vehicle.vehicles) {
      need_config_selects = true;
    }
  }

  componentDidUpdate() {
    if (need_config_selects) {
      configSelectInputFields();
      need_config_selects = false;
    }
  }

  closeModal = () => {
    getModalInstanceById('modal_search_producto').close();
  };

  onSearchProduct = () => {
    this.closeModal();
    let {
      field,
      id_marca,
      id_vehiculo,
      inventario_min,
      inventario_max,
      id_local
    } = this.state;
    if (id_marca === '0') {
      id_marca = null;
    }
    if (id_vehiculo === '0') {
      id_vehiculo = null;
    }
    if (inventario_min === '-1') {
      inventario_min = null;
    }
    if (inventario_max === '-1') {
      inventario_max = null;
    }
    if (!this.props.is_admin || id_local === '0') {
      id_local = null;
    }
    this.props.searchProduct({
      field,
      id_marca,
      id_tipo_vehiculo: id_vehiculo,
      inventario_min,
      inventario_max,
      id_local
    });
  };

  onGetAllClick = () => {
    this.closeModal();
    this.props.getProducts();
  };
  render() {
    const {
      field,
      id_marca,
      id_local,
      id_vehiculo,
      inventario_max,
      inventario_min
    } = this.state;
    const {
      brand: { brands },
      vehicle: { vehicles },
      local: { locals },
      is_admin
    } = this.props;
    const brandOptions = brandsToSelectOptions(brands);
    const vehicleOptions = vehiclesToSelectOptions(vehicles);
    const localOptions = localsToSelectOptions(locals);
    return (
      <div className="modal" id="modal_search_producto">
        <div className="modal-content">
          <h6>Buscar producto</h6>
          <div className="row">
            <TextInputField
              id="field"
              label="Nombre del producto o codigo de barra"
              value={field}
              onchange={this.onChangeTextInput}
            />
          </div>
          <div className="row">
            <TextInputField
              input_size="s12 m6"
              id="inventario_min"
              label="Inventario mayor a"
              value={inventario_min}
              type="number"
              onchange={this.onChangeTextInput}
            />

            <TextInputField
              input_size="s12 m6"
              id="inventario_max"
              label="Inventario menor a"
              value={inventario_max}
              type="number"
              onchange={this.onChangeTextInput}
            />
          </div>

          {is_admin && (
            <div className="row">
              <SelectInputField
                id="id_local"
                label="Local"
                value={id_local}
                onchange={this.onChangeTextInput}
                options={localOptions}
              />
            </div>
          )}

          <div className="row">
            <SelectInputField
              id="id_marca"
              label="Marca"
              value={id_marca}
              onchange={this.onChangeTextInput}
              options={brandOptions}
            />
          </div>

          <div className="row">
            <SelectInputField
              id="id_vehiculo"
              label="Tipo de vehiculo"
              value={id_vehiculo}
              onchange={this.onChangeTextInput}
              options={vehicleOptions}
            />
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="btn-flat modal-close left">
            Cerrar
          </a>
          <a href="#!" className="btn ml-1 left" onClick={this.onGetAllClick}>
            Obtener todo
          </a>
          <a href="#!" className="right btn" onClick={this.onSearchProduct}>
            Buscar
          </a>
        </div>
      </div>
    );
  }
}

SearchProductModel.propTypes = {
  brand: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
  local: PropTypes.object.isRequired,
  getBrands: PropTypes.func.isRequired,
  getVehicles: PropTypes.func.isRequired,
  getLocals: PropTypes.func.isRequired,
  is_admin: PropTypes.bool.isRequired
};

SearchProductModel.defaultProps = {
  is_admin: false
};

const mapStateToProps = state => ({
  brand: state.brand,
  vehicle: state.vehicle,
  local: state.local
});

export default connect(
  mapStateToProps,
  { getBrands, getVehicles, getProducts, searchProduct, getLocals }
)(SearchProductModel);
