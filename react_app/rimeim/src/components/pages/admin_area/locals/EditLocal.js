import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavbarAdmin from '../../../layout/NewNavbarAdmin';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../../utils/MaterialFunctions';

import { getLocal, updateLocal } from '../../../../actions/LocalActions';

import isEmpty from '../../../../actions/isEmpty';

// Custom components
// import Spinner from "../../../common/Spinner"
import TextInputField from '../../../common/TextInputField';
import TextAreaInputField from '../../../common/TextAreaInputField';
import CheckInputField from '../../../common/CheckInputField';
import ColorFieldInput from '../../../common/ColorFieldInput';

// Modals
import SearchUserModal from '../../../layout/modals/SearchUser';

class EditLocal extends Component {
  state = {
    loaded: false,
    codigo: '   ',
    nombre: '   ',
    color_hex: '    ',
    descripcion_ubicacion: '    ',
    es_bodega: false,
    descripcion: '  ',
    current_action: '0',
    empleados: [],
    errors: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getLocal(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (
      !this.state.loaded &&
      nextProps.local.local &&
      !isEmpty(nextProps.local.local)
    ) {
      const { local } = nextProps.local;
      this.setState({
        loaded: true,
        codigo: local.codigo,
        nombre: local.nombre,
        color_hex: local.color_hex,
        descripcion_ubicacion: local.descripcion_ubicacion,
        es_bodega: local.es_bodega,
        descripcion: local.descripcion,
        empleados: local.empleados
      });
    }
  }

  onSave = () => {
    const {
      codigo,
      nombre,
      color_hex,
      descripcion_ubicacion,
      descripcion,
      empleados,
      es_bodega
    } = this.state;
    const updatedLocal = {
      codigo,
      nombre,
      descripcion,
      descripcion_ubicacion,
      color_hex,
      es_bodega,
      empleados
    };
    this.props.updateLocal(
      this.props.match.params.id,
      updatedLocal,
      this.props.history
    );
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
          eliminado: false,
          admin: false
        });
        this.setState({ empleados });
      } else {
        empleado_existente.eliminado = false;
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
        selecteds.forEach(empleado => (empleado.eliminado = true));
        break;

      default:
        return;
    }
    selecteds.forEach(empleado => {
      const index = empleados.indexOf(empleado);
      if (index !== null && index >= 0) {
        if (empleado.eliminado === true && empleado.new === true) {
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
      descripcion_ubicacion,
      es_bodega,
      descripcion,
      current_action,
      empleados
    } = this.state;
    return (
      <React.Fragment>
        <NavbarAdmin>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Actualizar local
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right">
              <li>
                <a href="#!" onClick={this.onSave}>
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
                  <h5>Datos del local</h5>
                  <form action="">
                    <div className="row">
                      <TextInputField
                        input_size="s12 m6"
                        id="codigo"
                        value={codigo}
                        label="Codigo"
                        onchange={this.onChangeTextInput}
                        active_label={true}
                      />

                      <TextInputField
                        input_size="s12 m6"
                        id="nombre"
                        value={nombre}
                        label="Nombre del local"
                        onchange={this.onChangeTextInput}
                        active_label={true}
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
                        id="descripcion_ubicacion"
                        label="Ubicacion"
                        value={descripcion_ubicacion}
                        onchange={this.onChangeTextInput}
                        active_label={true}
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
                        active_label={true}
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
                        <option value="3">Eliminar</option>
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

                  <table className="table-bordered">
                    <thead>
                      <tr>
                        <th className="header-th" />
                        <th>ID</th>
                        <th>Nombre</th>
                      </tr>
                    </thead>

                    <tbody>
                      {empleados
                        .filter(
                          emp =>
                            typeof emp.eliminado === 'undefined' ||
                            emp.eliminado === false
                        )
                        .map(empleado => (
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
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <SearchUserModal onSelectNewUser={this.onSelectNewUser} />
        </main>
      </React.Fragment>
    );
  }
}

EditLocal.propTypes = {
  local: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getLocal: PropTypes.func.isRequired,
  updateLocal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  local: state.local,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getLocal,
    updateLocal
  }
)(EditLocal);
