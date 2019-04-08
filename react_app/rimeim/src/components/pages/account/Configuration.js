import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CheckFieldInput from '../../common/CheckInputField';
import TextInputField from '../../common/TextInputField';
import Spinner from '../../common/Spinner';

import { getModalInstanceById } from '../../../utils/MaterialFunctions';
import isEmpty from '../../../actions/isEmpty';

import {
  getUserById,
  updateUserById,
  updateUserPasswordById
} from '../../../actions/UserActions';

class Configuration extends Component {
  state = {
    nombre: '',
    nombre_usuario: '',
    correo: '',
    habilitado: true,
    admin: false,
    is_in_request: false,
    nueva_clave: '',
    nueva_clave_confirmacion: '',
    errors: {}
  };

  componentDidMount() {
    this.setState({
      is_in_request: true
    });
    this.props.getUserById(this.props.user.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });

      if (this.state.is_in_request && isEmpty(nextProps.errors)) {
        getModalInstanceById('modal_actualizar_usuario_clave').close();
        this.setState({
          is_in_request: false,
          nueva_clave: '',
          nueva_clave_confirmacion: ''
        });
      }
    }

    if (nextProps.user.users.length > 0) {
      const usuario = nextProps.user.users[0];
      this.setState({
        nombre: usuario.nombre,
        nombre_usuario: usuario.nombre_usuario,
        correo: usuario.correo,
        habilitado: usuario.habilitado,
        admin: usuario.admin
      });
    }
  }

  onChangeTextInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeCheckField = e => {
    const current_value = this.state[e.target.name];
    this.setState({ [e.target.name]: !current_value });
  };

  onSaveNewData = () => {
    const { nombre, nombre_usuario, correo, habilitado, admin } = this.state;
    const userData = {
      nombre,
      nombre_usuario,
      correo,
      habilitado,
      admin
    };
    this.setState({
      is_in_request: true
    });
    this.props.updateUserById(this.props.user.user.id, userData);
  };

  onUpdatePassword = () => {
    const { nueva_clave, nueva_clave_confirmacion } = this.state;
    if (nueva_clave !== nueva_clave_confirmacion) {
      return this.setState({
        errors: { nueva_clave_confirmacion_error: 'Las claves no coinciden' }
      });
    }
    this.props.updateUserPasswordById(this.props.user.user.id, {
      password: nueva_clave
    });
    this.setState({
      is_in_request: true
    });
  };

  render() {
    const {
      nombre,
      nombre_usuario,
      correo,
      habilitado,
      admin,
      nueva_clave_confirmacion,
      nueva_clave,
      is_in_request,
      errors: {
        nombre_error,
        nombre_usuario_error,
        correo_error,
        nueva_clave_confirmacion_error
      }
    } = this.state;

    const { is_editing } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col s12">
            {is_in_request && <Spinner fullWidth />}
            <div className="card">
              <div className="card-content">
                <div className="row">
                  <TextInputField
                    id="nombre"
                    label="Nombre"
                    value={nombre}
                    error={nombre_error}
                    onchange={this.onChangeTextInput}
                    disabled={!is_editing}
                    active_label={true}
                  />
                </div>

                <div className="row">
                  <TextInputField
                    id="nombre_usuario"
                    label="Nombre de usuario"
                    value={nombre_usuario}
                    error={nombre_usuario_error}
                    onchange={this.onChangeTextInput}
                    disabled={!is_editing}
                    active_label={true}
                  />
                </div>

                <div className="row">
                  <TextInputField
                    id="correo"
                    type="email"
                    label="Correo electronico"
                    value={correo}
                    error={correo_error}
                    onchange={this.onChangeTextInput}
                    disabled={!is_editing}
                    active_label={true}
                  />
                </div>

                <div className="row">
                  <CheckFieldInput
                    id="habilitado"
                    label="Habilitado"
                    checked={habilitado}
                    onchange={this.onChangeCheckField}
                    disabled={true}
                  />
                </div>

                <div className="row">
                  <CheckFieldInput
                    id="admin"
                    label="Admin"
                    checked={admin}
                    onchange={this.onChangeCheckField}
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            <button className="btn green darken-3" onClick={this.onSaveNewData}>
              Guardar
            </button>

            <button
              className="btn ml-1 modal-trigger"
              data-target="modal_actualizar_usuario_clave"
            >
              Actualizar clave
            </button>
          </div>
        </div>

        <div className="modal" id="modal_actualizar_usuario_clave">
          <div className="modal-content">
            <div className="row">
              <TextInputField
                id="nueva_clave"
                label="Nueva clave"
                type="password"
                value={nueva_clave}
                onchange={this.onChangeTextInput}
              />
            </div>

            <div className="row">
              <TextInputField
                id="nueva_clave_confirmacion"
                label="Confirmacion"
                type="password"
                value={nueva_clave_confirmacion}
                error={nueva_clave_confirmacion_error}
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
              onClick={this.onUpdatePassword}
            >
              Actualizar
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Configuration.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  is_editing: PropTypes.bool.isRequired,
  getUserById: PropTypes.func.isRequired,
  updateUserById: PropTypes.func.isRequired,
  updateUserPasswordById: PropTypes.func.isRequired
};

Configuration.defaultProps = {
  is_editing: false
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getUserById,
    updateUserById,
    updateUserPasswordById
  }
)(Configuration);
