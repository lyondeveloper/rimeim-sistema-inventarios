import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavbarAdmin from '../../../layout/NewNavbarAdmin';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../../utils/MaterialFunctions';

import Spinner from '../../../common/Spinner';
import TextInputField from '../../../common/TextInputField';
import TextAreaInputField from '../../../common/TextAreaInputField';
import CheckInputField from '../../../common/CheckInputField';
import SelectInputField from '../../../common/SelectInputField';
import SelectFiles from '../../../common/SelectFiles';

class NewProduct extends Component {
  state = {
    codigo_barra: '',
    nombre: '',
    marca: '0',
    tipo_vehiculo: '0',
    descripcion: '',
    precio: '',
    existencia: '',
    cantidad_minima: '',
    es_raro: false,
    imagenes: [],
    errors: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onChangeCheckField = e => {
    const current_value = this.state[e.target.name];
    this.setState({ [e.target.name]: !current_value });
  };

  onSelectFiles = e => {
    const { files } = e.target;
    const new_images = [];

    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      var reader = new FileReader();
      reader.onload = result => {
        new_images.push({
          name: file.name,
          src: result.target.result
        });

        if (i === files.length) {
          this.setState({ imagenes: new_images });
        }
      };
      reader.readAsDataURL(file);
    }
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
      errors: {
        codigo_barra_error,
        nombre_error,
        descripcion_error,
        precio_error,
        existencia_error,
        cantidad_minima_error
      }
    } = this.state;
    return (
      <React.Fragment>
        <NavbarAdmin>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Nuevo producto
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <a href="#!">
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
                  <div className="row">
                    <SelectFiles
                      id="imagenes"
                      label="Imagenes"
                      onchange={this.onSelectFiles}
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
                    />
                  </div>
                  <div className="row">
                    <SelectInputField
                      id="marca"
                      label="Marca"
                      value={marca}
                      onchange={this.onChangeTextInput}
                      options={[{ value: 1, label: 'Marca 1' }]}
                    />
                  </div>
                  <div className="row">
                    <SelectInputField
                      id="tipo_vehiculo"
                      label="Tipo de vehiculo"
                      value={tipo_vehiculo}
                      onchange={this.onChangeTextInput}
                      options={[{ value: 1, label: 'Mazada' }]}
                    />
                  </div>
                  <div className="row">
                    <TextAreaInputField
                      id="descripcion"
                      label="Descripcion"
                      onchange={this.onChangeTextInput}
                      value={descripcion}
                      error={descripcion_error}
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
                      required
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
                      required
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
                      required
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
                <div className="card-content card-distrubucion-productos">
                  <h5>Distribucion</h5>
                  <div className="row">
                    <div className="col s12">
                      San Pedro Sula:
                      <div className="input-field inline">
                        <input
                          id="email_inline"
                          type="text"
                          className="validate"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      Tegucigalpa:
                      <div className="input-field inline">
                        <input
                          id="email_inline"
                          type="text"
                          className="validate"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      Choloma:
                      <div className="input-field inline">
                        <input
                          id="email_inline"
                          type="text"
                          className="validate"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

NewProduct.propTypes = {
  product: PropTypes.object.isRequired
  //   getProductById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps)(NewProduct);
