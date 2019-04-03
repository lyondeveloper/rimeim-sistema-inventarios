import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ADMIN_EDIT_LOCAL } from '../../../layout/NavTypes';
import NavbarAdmin from '../../../layout/NavbarAdmin';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../../utils/MaterialFunctions';

import { saveNewLocal } from '../../../../actions/LocalActions';

// Custom components
import SearchUserModal from '../../../layout/modals/SearchUser';
import TextInputField from '../../../common/TextInputField';
import TextAreaInputField from '../../../common/TextAreaInputField';
import CheckInputField from '../../../common/CheckInputField';
import ColorFieldInput from '../../../common/ColorFieldInput';

class NewLocal extends Component {
  state = {
    codigo: '',
    nombre: '',
    color_hex: '',
    ubicacion: '',
    es_bodega: false,
    descripcion: '',
    current_action: '0',
    empleados: [],
    errors: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSaveNewLocal = () => {
    const {
      nombre,
      codigo,
      color_hex,
      ubicacion,
      es_bodega,
      descripcion,
      empleados
    } = this.state;
    const newLocalData = {
      nombre,
      codigo,
      color_hex,
      descripcion_ubicacion: ubicacion,
      es_bodega,
      descripcion,
      empleados
    };
    this.props.saveNewLocal(newLocalData, this.props.history);
  };

  onChangeTextInput = e => {
    if (e.target.name === 'es_bodega') {
      const value = this.state.es_bodega ? false : true;
      return this.setState({ [e.target.name]: value });
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeSelectedValue = e => {
    this.setState({ current_action: e.target.value });
  };

  onSelectNewUser = user => {
    if (user) {
      const { empleados } = this.state;
      const empleado_existente = empleados.find(
        empleado => empleado.id_usuario === user.id
      );
      if (!empleado_existente) {
        empleados.push({
          id: null,
          new: true,
          id_usuario: user.id,
          nombre: user.nombre,
          habilitado: true,
          admin: false
        });
        this.setState({ empleados });
      }
    }
  };

  onChangeCheckboxEmploye(emp, e) {
    e.preventDefault();
    const { empleados } = this.state;
    const index = empleados.indexOf(emp);
    if (index === null || index < 0) return;

    const empleado = empleados[index];

    if (empleado.seleccionado !== null) {
      empleado.seleccionado = !empleado.seleccionado;
    } else {
      empleado.seleccionado = true;
    }

    document.getElementById(`check${empleado.id_usuario}`).checked =
      empleado.seleccionado;
    this.setState({ empleados });
  }

  onApplyChangesToEmployes = () => {
    const { empleados, current_action } = this.state;
    if (current_action === '0') return;

    const selecteds = empleados.filter(
      empleado => empleado.seleccionado === true
    );

    switch (current_action) {
      case '1':
        selecteds.forEach(empleado => (empleado.habilitado = false));
        break;

      case '2':
        selecteds.forEach(empleado => (empleado.habilitado = true));
        break;

      case '3':
        selecteds.forEach(empleado => (empleado.admin = true));
        break;

      case '4':
        selecteds.forEach(empleado => (empleado.admin = false));
        break;

      case '5':
        selecteds.forEach(empleado => (empleado.eliminado = true));
        break;

      default:
        return;
    }
    selecteds.forEach(empleado => {
      const index = empleados.indexOf(empleado);
      if (index !== null && index >= 0) {
        if (empleado.eliminado === true) {
          empleados.splice(index, 1);
        } else {
          empleados[index] = empleado;
        }
      }
    });
    this.setState({ empleados });
  };

  render() {
    const {
      codigo,
      nombre,
      color_hex,
      ubicacion,
      es_bodega,
      descripcion,
      current_action,
      empleados,
      errors: { codigo_error, nombre_error }
    } = this.state;

    return (
      <React.Fragment>
        <NavbarAdmin
          navtype={ADMIN_EDIT_LOCAL}
          obj={{ onSave: this.onSaveNewLocal }}
        />

        <main>
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <h5>Datos del local</h5>
                  <form action="">
                    <div className="row">
                      <TextInputField
                        input_size="s12 m6"
                        id="codigo"
                        value={codigo}
                        label="Codigo"
                        onchange={this.onChangeTextInput}
                        error={codigo_error}
                      />

                      <TextInputField
                        input_size="s12 m6"
                        id="nombre"
                        value={nombre}
                        label="Nombre del local"
                        onchange={this.onChangeTextInput}
                        error={nombre_error}
                      />
                    </div>

                    <div className="row">
                      <ColorFieldInput
                        id="color_hex"
                        value={color_hex}
                        label="Color"
                        onchange={this.onChangeTextInput}
                      />
                    </div>

                    <div className="row">
                      <TextAreaInputField
                        id="ubicacion"
                        label="Ubicacion"
                        value={ubicacion}
                        onchange={this.onChangeTextInput}
                      />
                    </div>

                    <div className="row">
                      <CheckInputField
                        size="s12 m6"
                        id="es_bodega"
                        checked={es_bodega}
                        label="Es bodega"
                        onchange={this.onChangeTextInput}
                      />
                    </div>

                    <div className="row">
                      <TextAreaInputField
                        id="descripcion"
                        value={descripcion}
                        label="Descripcion"
                        onchange={this.onChangeTextInput}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <h5>Empleados</h5>

                  <div>
                    <a
                      href="#modal_buscar_usuario"
                      className="modal-trigger btn mb-1 text-white"
                    >
                      Agregar empleado
                    </a>
                  </div>

                  <div className="row">
                    <div className="input-field col s12 m6">
                      <select
                        name="current_action"
                        onChange={this.onChangeSelectedValue}
                        value={current_action}
                      >
                        <option value="0">Seleccionar una opcion</option>
                        <option value="1">Deshabilitar</option>
                        <option value="2">Habilitar</option>
                        <option value="3">Asignar admin</option>
                        <option value="4">Remover admin</option>
                        <option value="5">Eliminar</option>
                      </select>
                      <label>Acciones en lote</label>
                    </div>
                    <div className="col s12 m6">
                      <button
                        type="button"
                        className="btn"
                        onClick={this.onApplyChangesToEmployes}
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>

                  <table className="table-bordered striped">
                    <thead>
                      <tr>
                        <th className="header-th" />
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Admin</th>
                      </tr>
                    </thead>

                    <tbody>
                      {empleados.map(empleado => (
                        <tr
                          key={empleado.id_usuario}
                          className={`${!empleado.habilitado &&
                            'grey lighten-2'}`}
                        >
                          <td className="checkbox-td">
                            <label
                              onClick={this.onChangeCheckboxEmploye.bind(
                                this,
                                empleado
                              )}
                            >
                              <input
                                type="checkbox"
                                className="filled-in"
                                id={`check${empleado.id_usuario}`}
                              />
                              <span />
                            </label>
                          </td>
                          <td>{empleado.id_usuario}</td>
                          <td>{empleado.nombre}</td>
                          <td>{empleado.admin ? 'Si' : 'No'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        <SearchUserModal onSelectNewUser={this.onSelectNewUser} />
      </React.Fragment>
    );
  }
}

NewLocal.propTypes = {
  errors: PropTypes.object.isRequired,
  saveNewLocal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    saveNewLocal
  }
)(NewLocal);
