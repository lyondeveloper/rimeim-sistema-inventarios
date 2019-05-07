import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Custom Components
import Spinner from '../../common/Spinner';
import TextInputField from '../../common/TextInputField';
import isEmpty from '../../../actions/isEmpty';

// Functions
import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';
import img_logo from '../../../public/img/logo_rimeim.png';

class FirstSession extends Component {
  state = {
    isInRequest: false,
    password: '',
    password_confirmation: '',
    errors: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onUpdatePassword = () => {
    const { password, password_confirmation, errors } = this.state;
    if (password.trim() === '') {
      errors.password_error = 'Campo invalido';
    } else {
      delete errors.password_error;
    }
    if (password_confirmation.trim() === '') {
      errors.password_confirmation_error = 'Campo invalido';
    } else {
      delete errors.password_confirmation_error;
    }

    if (password_confirmation !== password) {
      errors.password_confirmation_error = 'Las claves no coinciden';
    }
    this.setState({
      errors
    });
    if (!isEmpty(errors)) {
      return;
    }
  };
  render() {
    const {
      password,
      password_confirmation,
      errors: { password_error, password_confirmation_error }
    } = this.state;

    return (
      <div className="container">
        <div className="valign-wrapper minh-100">
          <div className="row">
            <div className="col ">
              <div className="row">
                <div className="col s12">
                  <img src={img_logo} alt="Rimeim logo" />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-content">
                      <h6> Actualize su clave para continuar </h6>
                      {this.props.user.loadin && <Spinner fullWidth />}
                      <div className="row">
                        <TextInputField
                          id="password"
                          label="Nueva clave"
                          value={password}
                          error={password_error}
                          onchage={this.onChangeTextInput}
                          type="password"
                          required={true}
                        />
                      </div>
                      <div className="row">
                        <TextInputField
                          id="password_confirmation"
                          label="Confirmacion"
                          value={password_confirmation}
                          error={password_confirmation_error}
                          onchage={this.onChangeTextInput}
                          type="password"
                          required={true}
                        />
                      </div>
                    </div>

                    <div className="card-footer p-1">
                      <button className="btn" onClick={this.onUpdatePassword}>
                        Aceptar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FirstSession.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps)(FirstSession);
