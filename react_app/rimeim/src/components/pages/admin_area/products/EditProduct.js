import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavbarAdmin from '../../../layout/NewNavbarAdmin';
import uuid from 'uuid';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields,
  getModalInstanceById
} from '../../../../utils/MaterialFunctions';

import Spinner from '../../../common/Spinner';
import TextInputField from '../../../common/TextInputField';
import TextAreaInputField from '../../../common/TextAreaInputField';
import CheckInputField from '../../../common/CheckInputField';
import SelectInputField from '../../../common/SelectInputField';
import SelectFiles from '../../../common/SelectFiles';

import {
  updateProductById,
  getProductById
} from '../../../../actions/productActions';
import { getLocals } from '../../../../actions/LocalActions';
import { getBrands } from '../../../../actions/brandActions';
import { getVehicles } from '../../../../actions/vehicleActions';

import isEmpty from '../../../../actions/isEmpty';
import getFilesFromInput from '../../../../utils/getFilesFromInput';

class EditProduct extends Component {
  state = {
    codigo_barra: '',
    nombre: '',
    marca: '0',
    tipo_vehiculo: '0',
    descripcion: '',
    precio: '0',
    existencia: '0',
    cantidad_minima: '0',
    es_raro: false,
    imagenes: [],
    local_seleccionado: '0',
    local_cantidad: '0',
    local_cantidad_minima: '0',
    local_ubicacion: '',
    locals_product: [],
    locals: [],
    needs_config_selects: false,
    is_modal_editing: false,
    is_product_setted: false,
    errors: {},
    custom_errors: {}
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
        precio,
        existencia,
        cantidad_minima,
        marca,
        tipo_vehiculo,
        imagenes,
        distribucion
      } = nextProps.product.product;

      const { locals } = this.state;
      distribucion.forEach(dist => {
        locals.forEach(local => {
          if (dist.local.id === local.id) {
            local.disabled = true;
          }
        });
      });

      this.setState({
        locals,
        codigo_barra,
        nombre,
        marca: marca && marca.id ? marca.id : '0',
        tipo_vehiculo:
          tipo_vehiculo && tipo_vehiculo.id ? tipo_vehiculo.id : '0',
        descripcion,
        precio,
        existencia,
        cantidad_minima,
        es_raro: raro,
        locals_product: distribucion,
        imagenes: imagenes,
        is_product_setted: true
      });
    }

    if (nextProps.local.locals && this.state.locals.length === 0) {
      const { locals } = nextProps.local;
      locals.forEach(local => (local.disabled = false));
      this.setState({
        needs_config_selects: true,
        locals: locals
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

  componentDidUpdate() {
    if (this.state.needs_config_selects) {
      configSelectInputFields();
      this.setState({
        needs_config_selects: false
      });
    }
  }

  onChangeTextInput = e => {
    if (e.target.name === 'local_seleccionado' && this.state.is_modal_editing)
      return;
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeCheckField = e => {
    const current_value = this.state[e.target.name];
    this.setState({ [e.target.name]: !current_value });
  };

  hadleModalState = hide => {
    if (hide) {
      getModalInstanceById('modal_local_producto').close();
    } else {
      getModalInstanceById('modal_local_producto').open();
    }
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

  onDeleteClickFile = file => {
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
  };

  getTotalSumProductLocals = () => {
    let total = 0;
    this.state.locals_product.forEach(l => {
      if (
        !(
          this.state.is_modal_editing &&
          this.state.local_seleccionado === l.id_local
        ) &&
        !(l.eliminado && l.eliminado === true)
      ) {
        total += parseInt(l.existencia);
      }
    });
    return total;
  };

  onClickAcceptProductLocalModal = () => {
    const errors = { ...this.state.custom_errors };
    const {
      existencia,
      local_cantidad,
      local_ubicacion,
      local_seleccionado,
      local_cantidad_minima,
      locals_product
    } = this.state;
    var existencia_asignada = this.getTotalSumProductLocals();

    var is_valid = true;
    const existencia_int = parseInt(existencia);
    const local_cantidad_int = parseInt(local_cantidad);
    const local_cantidad_minima_int = parseInt(local_cantidad_minima);

    if (
      existencia_int < local_cantidad_int ||
      local_cantidad_int + existencia_asignada > existencia
    ) {
      errors.local_cantidad_error =
        'La cantidad excede el inventario del producto';
      is_valid = false;
    } else if (local_cantidad_int < 0) {
      errors.local_cantidad_error = 'La cantidad es invalida';
      is_valid = false;
    } else {
      delete errors.local_cantidad_error;
    }

    if (local_cantidad_minima_int < 0) {
      errors.local_cantidad_minima_error = 'Cantidad invalida';
      is_valid = false;
    } else if (local_cantidad_minima_int > local_cantidad_int) {
      errors.local_cantidad_minima_error =
        'La cantidad minima excede el total del local';
      is_valid = false;
    } else {
      delete errors.local_cantidad_minima_error;
    }

    if (isEmpty(local_ubicacion)) {
      errors.local_ubicacion_error = 'Ubicacion invalida';
      is_valid = false;
    } else {
      delete errors.local_ubicacion_error;
    }

    if (this.state.is_modal_editing) {
      if (is_valid && local_seleccionado !== 0) {
        const productLocalIndex = locals_product.findIndex(
          l => l.id_local === local_seleccionado
        );
        if (productLocalIndex >= 0) {
          locals_product[productLocalIndex] = {
            ...locals_product[productLocalIndex],
            actualizado: true,
            existencia: local_cantidad,
            ubicacion: local_ubicacion,
            cantidad_minima: local_cantidad_minima
          };
        }

        this.setState({
          locals_product,
          local_cantidad: '0',
          local_ubicacion: '',
          local_cantidad_minima: '0',
          local_seleccionado: '0'
        });
        this.hadleModalState(true);
      }
    } else {
      if (local_seleccionado !== '0' && is_valid) {
        const new_product_local = {
          id_local: local_seleccionado,
          local: this.state.locals.find(l => l.id === local_seleccionado),
          existencia: local_cantidad,
          ubicacion: local_ubicacion,
          cantidad_minima: local_cantidad_minima
        };

        this.disableSelectedLocalOption(local_seleccionado);
        locals_product.push(new_product_local);

        this.setState({
          locals_product,
          local_cantidad: '0',
          local_ubicacion: '',
          local_cantidad_minima: '0',
          local_seleccionado: '0'
        });

        this.hadleModalState(true);
      }
    }
    this.setState({
      custom_errors: errors
    });
  };

  disableSelectedLocalOption = local_seleccionado => {
    const localIndex = this.state.locals.findIndex(
      l => l.id === local_seleccionado
    );
    if (localIndex >= 0) {
      const new_locals = this.state.locals.map(a => ({ ...a }));
      new_locals[localIndex].disabled = true;
      this.setState({
        needs_config_selects: true,
        locals: new_locals
      });
    }
  };

  onAddLocalProductClick = () => {
    this.setState({
      local_cantidad: '0',
      local_ubicacion: '',
      local_cantidad_minima: '0',
      local_seleccionado: '0',
      is_modal_editing: false,
      needs_config_selects: true
    });
    this.hadleModalState(false);
  };

  onLocalProductClick = productLocal => {
    const { id_local, cantidad_minima, existencia, ubicacion } = productLocal;
    this.setState({
      local_cantidad: existencia,
      local_ubicacion: ubicacion ? ubicacion : '',
      local_cantidad_minima: cantidad_minima,
      local_seleccionado: id_local,
      is_modal_editing: true,
      needs_config_selects: true
    });
    this.hadleModalState(false);
  };

  onDeleteProductLocalClick = () => {
    if (!this.state.is_modal_editing) {
      return this.hadleModalState(true);
    }
    const { local_seleccionado, locals_product, locals } = this.state;
    const localProducIndex = locals_product.findIndex(
      l => l.id_local === local_seleccionado
    );

    if (localProducIndex >= 0) {
      const localIndex = locals.findIndex(l => l.id === local_seleccionado);
      if (localIndex >= 0) {
        locals[localIndex].disabled = false;
      }
      delete locals_product[localProducIndex].actualizado;
      locals_product[localProducIndex].eliminado = true;
    }
    if (locals_product[localProducIndex].id) {
      this.setState({ locals_product });
    } else {
      this.setState({
        locals_product: locals_product.filter(
          lp => lp !== locals_product[localProducIndex]
        )
      });
    }
    this.setState({
      locals,
      local_cantidad: '0',
      local_ubicacion: '',
      local_cantidad_minima: '0',
      local_seleccionado: '0',
      is_modal_editing: false,
      needs_config_selects: true
    });
    this.hadleModalState(true);
  };

  onSaveProduct = () => {
    const {
      codigo_barra,
      nombre,
      marca,
      tipo_vehiculo,
      descripcion,
      precio,
      existencia,
      cantidad_minima,
      es_raro,
      locals_product,
      imagenes
    } = this.state;

    const updatedProduct = {
      codigo_barra,
      nombre,
      id_marca: marca,
      id_tipo_vehiculo: tipo_vehiculo,
      descripcion,
      raro: es_raro,
      precio: precio,
      existencia,
      cantidad_minima,
      distribucion: locals_product,
      imagenes: imagenes.filter(img => img.id)
    };

    const newImages = imagenes.filter(img => !img.id);
    if (newImages.length > 0) {
      const updatedProductData = new FormData();
      newImages.forEach(img =>
        updatedProductData.append('file_uploads[]', img.file, img.name)
      );
      updatedProductData.append('json_data', JSON.stringify(updatedProduct));
      this.props.updateProductById(
        this.props.match.params.id,
        updatedProductData
      );
    } else {
      this.props.updateProductById(this.props.match.params.id, updatedProduct);
    }
    this.setState({
      is_product_setted: false
    });
  };

  render() {
    const {
      codigo_barra,
      nombre,
      marca,
      tipo_vehiculo,
      descripcion,
      precio,
      existencia,
      cantidad_minima,
      es_raro,
      imagenes,
      locals_product,
      locals,
      local_seleccionado,
      local_cantidad_minima,
      local_cantidad,
      local_ubicacion,
      errors: {
        codigo_barra_error,
        nombre_error,
        descripcion_error,
        precio_error,
        existencia_error,
        cantidad_minima_error
      },
      custom_errors: {
        local_cantidad_error,
        local_cantidad_minima_error,
        local_ubicacion_error
      }
    } = this.state;

    const brandOptions = [];
    this.props.brand.brands.forEach(brand =>
      brandOptions.push({ value: brand.id, label: brand.nombre })
    );

    const vehicleOptions = [];
    this.props.vehicle.vehicles.forEach(v =>
      vehicleOptions.push({ value: v.id, label: v.nombre })
    );

    let productContent;

    if (this.props.product.loading) {
      productContent = (
        <div className="row">
          <div className="col s12">
            <Spinner fullWidth />
          </div>
        </div>
      );
    } else {
      productContent = (
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <div className="row">
                  <SelectFiles
                    id="imagenes"
                    label="Imagenes"
                    onchange={this.onSelectFiles}
                    onDeleteFileClick={this.onDeleteClickFile}
                    multiple={true}
                    files={imagenes}
                  />
                </div>
                <div className="row">
                  <TextInputField
                    id="codigo_barra"
                    label="Codigo de barra"
                    value={codigo_barra}
                    error={codigo_barra_error}
                    onchange={this.onChangeTextInput}
                    required={true}
                    active_label={true}
                  />
                </div>
                <div className="row">
                  <TextInputField
                    id="nombre"
                    label="Nombre"
                    value={nombre}
                    error={nombre_error}
                    onchange={this.onChangeTextInput}
                    required={true}
                    active_label={true}
                  />
                </div>
                <div className="row">
                  <SelectInputField
                    id="marca"
                    label="Marca"
                    value={marca}
                    onchange={this.onChangeTextInput}
                    options={brandOptions}
                  />
                </div>
                <div className="row">
                  <SelectInputField
                    id="tipo_vehiculo"
                    label="Tipo de vehiculo"
                    value={tipo_vehiculo}
                    onchange={this.onChangeTextInput}
                    options={vehicleOptions}
                  />
                </div>
                <div className="row">
                  <TextAreaInputField
                    id="descripcion"
                    label="Descripcion"
                    onchange={this.onChangeTextInput}
                    value={descripcion}
                    error={descripcion_error}
                    active_label={true}
                  />
                </div>

                <div className="row">
                  <TextInputField
                    id="precio"
                    label="Precio"
                    type="number"
                    onchange={this.onChangeTextInput}
                    value={precio}
                    error={precio_error}
                    required={true}
                    active_label={true}
                  />
                </div>
                <div className="row">
                  <TextInputField
                    id="existencia"
                    label="Existencia"
                    type="number"
                    onchange={this.onChangeTextInput}
                    value={existencia}
                    error={existencia_error}
                    required={true}
                    active_label={true}
                  />
                </div>
                <div className="row">
                  <TextInputField
                    id="cantidad_minima"
                    label="Cantidad minima"
                    type="number"
                    onchange={this.onChangeTextInput}
                    value={cantidad_minima}
                    error={cantidad_minima_error}
                    required={true}
                    active_label={true}
                  />
                </div>
                <div className="row">
                  <CheckInputField
                    id="es_raro"
                    label="Es raro"
                    checked={es_raro}
                    onchange={this.onChangeCheckField}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div>
                  <h5>Distribucion</h5>
                  <button
                    className="btn-floating right"
                    onClick={this.onAddLocalProductClick}
                  >
                    <i className="material-icons">add</i>
                  </button>
                </div>
                <table className="table-bordered">
                  <thead>
                    <tr>
                      <th>Local</th>
                      <th>Ubicacion</th>
                      <th>Cantidad</th>
                      <th>Cantidad minima</th>
                    </tr>
                  </thead>

                  <tbody>
                    {locals_product
                      .filter(lp => !lp.eliminado)
                      .map(lp => (
                        <tr
                          key={uuid()}
                          className="cursor-pointer"
                          onClick={this.onLocalProductClick.bind(this, lp)}
                        >
                          <td>{lp.local.nombre}</td>
                          <td>{lp.ubicacion}</td>
                          <td>{lp.existencia}</td>
                          <td>{lp.cantidad_minima}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button className="btn" onClick={this.onSaveProduct}>
              Actualizar
            </button>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <NavbarAdmin>
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
        </NavbarAdmin>

        <main>
          {productContent}

          <div className="modal" id="modal_local_producto">
            <div className="modal-content">
              <h5>Agregar o editar producto</h5>

              {this.props.local.loading && <Spinner fullWidth />}

              <div className="row">
                <div className="input-field col s12">
                  <select
                    name="local_seleccionado"
                    onChange={this.onChangeTextInput}
                    value={local_seleccionado}
                    disabled={this.state.is_modal_editing ? 'disabled' : ''}
                  >
                    <option value="0">Seleccionar</option>
                    {locals.map(local => (
                      <option
                        value={local.id}
                        key={`local${local.id}`}
                        disabled={local.disabled ? 'disabled' : ''}
                      >
                        {local.nombre}
                      </option>
                    ))}
                  </select>
                  <label>Local</label>
                </div>
              </div>

              <div className="row">
                <TextInputField
                  id="local_cantidad"
                  type="number"
                  label="Cantidad"
                  onchange={this.onChangeTextInput}
                  value={local_cantidad}
                  error={local_cantidad_error}
                  active_label={true}
                />
              </div>

              <div className="row">
                <TextInputField
                  id="local_cantidad_minima"
                  type="number"
                  label="Cantidad minima"
                  onchange={this.onChangeTextInput}
                  value={local_cantidad_minima}
                  error={local_cantidad_minima_error}
                  active_label={true}
                />
              </div>

              <div className="row">
                <TextInputField
                  id="local_ubicacion"
                  type="text"
                  label="Ubicacion"
                  onchange={this.onChangeTextInput}
                  value={local_ubicacion}
                  error={local_ubicacion_error}
                  active_label={true}
                />
              </div>
            </div>

            <div className="modal-footer">
              <a href="#!" className="btn-flat left modal-close">
                Cerrar
              </a>

              <a
                href="#!"
                className="btn red darken-3 ml-1 left"
                onClick={this.onDeleteProductLocalClick}
              >
                Borrar
              </a>

              <a
                href="#!"
                className="btn right"
                onClick={this.onClickAcceptProductLocalModal}
              >
                Aceptar
              </a>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

EditProduct.propTypes = {
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
