import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavbarAdmin from '../../../layout/NewNavbarAdmin';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../../utils/MaterialFunctions';

import { addUser } from '../../../../actions/UserActions';

import Spinner from '../../../common/Spinner';
import TextInputField from '../../../common/TextInputField';
import CheckInputField from '../../../common/CheckInputField';

class NewUser extends Component {
  state = {
    nombre: '',
    nombre_usuario: '',
    correo: '',
    password: '',
    habilitado: true,
    admin: false,
    errors: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onChangeCheckField = e => {
    const current_value = this.state[e.target.name];
    this.setState({ [e.target.name]: !current_value });
  };

  onSaveNewUser = () => {
    const {
      nombre,
      nombre_usuario,
      correo,
      password,
      habilitado,
      admin
    } = this.state;
    const newUserData = {
      nombre,
      nombre_usuario,
      correo,
      password,
      habilitado,
      admin
    };
    this.props.addUser(newUserData, this.props.history);
  };

  render() {
    const {
      nombre,
      nombre_usuario,
      correo,
      password,
      habilitado,
      admin,
      errors: {
        nombre_error,
        nombre_usuario_error,
        correo_error,
        password_error
      }
    } = this.state;
    return (
      <React.Fragment>
        <NavbarAdmin>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Nuevo usuario
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right'>
              <li>
                <a href='#!' onClick={this.onSaveNewUser}>
                  <i className='material-icons'>save</i>
                </a>
              </li>
            </ul>
          </div>
        </NavbarAdmin>

        <main>
          <div className='row'>
            <div className='col s12'>
              <div className='card'>
                <div className='card-content'>
                  <div className='row'>
                    <TextInputField
                      id='nombre'
                      label='Nombre'
                      value={nombre}
                      error={nombre_error}
                      onchange={this.onChangeTextInput}
                    />
                  </div>

                  <div className='row'>
                    <TextInputField
                      id='nombre_usuario'
                      label='Nombre de usuario'
                      value={nombre_usuario}
                      error={nombre_usuario_error}
                      onchange={this.onChangeTextInput}
                    />
                  </div>

                  <div className='row'>
                    <TextInputField
                      id='correo'
                      type='email'
                      label='Correo'
                      value={correo}
                      error={correo_error}
                      onchange={this.onChangeTextInput}
                    />
                  </div>

                  <div className='row'>
                    <TextInputField
                      id='password'
                      type='password'
                      label='Clave'
                      value={password}
                      error={password_error}
                      onchange={this.onChangeTextInput}
                    />
                  </div>

                  <div className='row'>
                    <CheckInputField
                      id='habilitado'
                      checked={habilitado}
                      label='Habilitado'
                      onchange={this.onChangeCheckField}
                    />
                  </div>

                  <div className='row'>
                    <CheckInputField
                      id='admin'
                      checked={admin}
                      label='Admin'
                      onchange={this.onChangeCheckField}
                    />
                  </div>
                </div>
              </div>

              {this.props.user.loading && <Spinner fullWidth />}
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

NewUser.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user
});

export default connect(
  mapStateToProps,
  {
    addUser
  }
)(NewUser);
