import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  configSelectInputFields,
  getModalInstanceById
} from "../../../utils/MaterialFunctions";

import {
  getBrands,
  brandsToSelectOptions
} from "../../../actions/brandActions";
import {
  getVehicles,
  vehiclesToSelectOptions
} from "../../../actions/vehicleActions";

import { getProducts, searchProduct } from "../../../actions/productActions";

import TextInputField from "../../common/TextInputField";
import SelectInputField from "../../common/SelectInputField";

class SearchProductModel extends Component {
  state = {
    field: "",
    id_marca: "0",
    id_vehiculo: "0"
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {
    this.props.getBrands();
    this.props.getVehicles();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.brand.brans || nextProps.vehicle.vehicles) {
      configSelectInputFields();
    }
  }

  closeModal = () => {
    getModalInstanceById("modal_search_producto").close();
  };

  onSearchProduct = () => {
    this.closeModal();
    this.props.searchProduct({ field: this.state.field });
  };

  onGetAllClick = () => {
    this.closeModal();
    this.props.getProducts();
  };
  render() {
    const { field, id_marca, id_vehiculo } = this.state;
    const {
      brand: { brands },
      vehicle: { vehicles }
    } = this.props;
    const brandOptions = brandsToSelectOptions(brands);
    const vehicleOptions = vehiclesToSelectOptions(vehicles);
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
  getBrands: PropTypes.func.isRequired,
  getVehicles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  brand: state.brand,
  vehicle: state.vehicle
});

export default connect(
  mapStateToProps,
  { getBrands, getVehicles, getProducts, searchProduct }
)(SearchProductModel);
