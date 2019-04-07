import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavbarAdmin from '../../../layout/NewNavbarAdmin';

import {
  configMaterialComponents,
  removeMaterialComponents,
  getModalInstanceById
} from '../../../../utils/MaterialFunctions';

import Spinner from '../../../common/Spinner';
import TextInputField from '../../../common/TextInputField';
import CheckInputField from '../../../common/CheckInputField';
import ConfirmationModal from '../../../layout/modals/ConfirmationModal';

import {
  getUserById,
  updateUserById,
  updateUserPasswordById,
  deleteUserById
} from '../../../../actions/UserActions';
import isEmpty from '../../../../actions/isEmpty';

class AdminUser extends Component {
  state = {
    nombre: '',
    nombre_usuario: '',
    nueva_clave: '',
    habilitado: true,
    admin: false,
    is_in_request: false,
    errors: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getUserById(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    var has_error = false;

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });

      has_error = !isEmpty(nextProps.errors);
    }

    if (this.state.is_in_request && !has_error) {
      getModalInstanceById('modal_editar_usuario').close();
      getModalInstanceById('modal_actualizar_usuario_clave').close();
    }

    this.setState({
      is_in_request: false
    });

    if (has_error) {
      return;
    }

    if (nextProps.user.users.length > 0) {
      const usuario = nextProps.user.users[0];
      this.setState({
        nombre: usuario.nombre,
        nombre_usuario: usuario.nombre_usuario,
        habilitado: usuario.habilitado,
        admin: usuario.admin
      });
    }
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onChangeCheckField = e => {
    const current_value = this.state[e.target.name];
    this.setState({ [e.target.name]: !current_value });
  };

  onUpdateUserClick = () => {
    this.setState({
      is_in_request: true
    });
    const { nombre, nombre_usuario, habilitado, admin } = this.state;
    const newUser = {
      nombre,
      nombre_usuario,
      habilitado,
      admin
    };
    this.props.updateUserById(this.props.match.params.id, newUser);
  };

  onUpdateUserPasswordClick = () => {
    this.setState({
      is_in_request: true
    });
    this.props.updateUserPasswordById(this.props.match.params.id, {
      password: this.state.nueva_clave
    });
  };

  onDeleteUser = () => {
    getModalInstanceById('modal_confirmar_evento').close();
    this.props.deleteUserById(this.props.match.params.id, this.props.history);
  };

  render() {
    const { users, loading } = this.props.user;
    const {
      nombre,
      nombre_usuario,
      habilitado,
      admin,
      nueva_clave,
      is_in_request,
      errors: {
        nombre_error,
        nombre_usuario_error,
        admin_error,
        habilitado_error
      }
    } = this.state;

    let user_data;
    if (loading || users.length <= 0) {
      user_data = (
        <div className="col s12">
          <Spinner fullWidth />
        </div>
      );
    } else {
      user_data = (
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <table className="table-bordered">
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{users[0].id}</td>
                  </tr>
                  <tr>
                    <td>Nombre</td>
                    <td>{users[0].nombre}</td>
                  </tr>
                  <tr>
                    <td>Correo</td>
                    <td>{users[0].correo}</td>
                  </tr>
                  <tr>
                    <td>Usuario</td>
                    <td>{users[0].nombre_usuario}</td>
                  </tr>
                  {users[0].usuario_creador && (
                    <tr>
                      <td>Agregado por</td>
                      <td>{users[0].usuario_creador.nombre}</td>
                    </tr>
                  )}
                  <tr>
                    <td>Habilitado</td>
                    <td>{users[0].habilitado ? 'Si' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Admin</td>
                    <td>{users[0].admin ? 'Si' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Fecha de creacion</td>
                    <td>{users[0].fecha_creado}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button
            className="btn modal-trigger"
            data-target="modal_actualizar_usuario_clave"
          >
            Actualizar clave
          </button>

          <button
            className="btn red darken-2 ml-1 modal-trigger"
            data-target="modal_confirmar_evento"
          >
            Eliminar
          </button>
        </div>
      );
    }

    return (
      <React.Fragment>
        <NavbarAdmin>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Detalles de usuario
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <a href="#modal_editar_usuario" className="modal-trigger">
                  <i className="material-icons">edit</i>
                </a>
              </li>
            </ul>
          </div>
        </NavbarAdmin>

        <main>
          <div className="row">{user_data}</div>
        </main>

        <div className="modal" id="modal_editar_usuario">
          <div className="modal-content">
            <div className="row">
              <TextInputField
                id="nombre"
                label="Nombre"
                value={nombre}
                onchange={this.onChangeTextInput}
                error={nombre_error}
              />
            </div>

            <div className="row">
              <TextInputField
                id="nombre_usuario"
                label="Usuario"
                value={nombre_usuario}
                onchange={this.onChangeTextInput}
                error={nombre_usuario_error}
              />
            </div>

            <div className="row">
              <CheckInputField
                id="habilitado"
                onchange={this.onChangeCheckField}
                checked={habilitado}
                label="Habilitado"
                error={habilitado_error}
              />
            </div>

            <div className="row">
              <CheckInputField
                id="admin"
                onchange={this.onChangeCheckField}
                checked={admin}
                label="Admin"
                error={admin_error}
              />
            </div>

            {is_in_request && <Spinner fullWidth />}
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close left btn-flat">
              Cerrar
            </a>
            <a
              href="#!"
              className="right btn-flat"
              onClick={this.onUpdateUserClick}
            >
              Guardar
            </a>
          </div>
        </div>

        <div className="modal" id="modal_actualizar_usuario_clave">
          <div className="modal-content">
            <div className="row">
              <TextInputField
                id="nueva_clave"
                value={nueva_clave}
                type="password"
                label="Nueva clave"
                onchange={this.onChangeTextInput}
              />
            </div>

            {is_in_request && <Spinner fullWidth />}
          </div>

          <div className="modal-footer">
            <a href="#!" className="modal-close left btn-flat">
              Cerrar
            </a>
            <a
              href="#!"
              className="right btn-flat"
              onClick={this.onUpdateUserPasswordClick}
            >
              Actualizar
            </a>
          </div>
        </div>

        <ConfirmationModal
          title="Confirmar eliminar usuario"
          message="Esta seguro de que quiere eliminar a este usuario? Esta accion no se podra revertir"
          onAccept={this.onDeleteUser}
        />
      </React.Fragment>
    );
  }
}

AdminUser.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getUserById: PropTypes.func.isRequired,
  updateUserById: PropTypes.func.isRequired,
  updateUserPasswordById: PropTypes.func.isRequired,
  deleteUserById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getUserById, updateUserById, updateUserPasswordById, deleteUserById }
)(AdminUser);
