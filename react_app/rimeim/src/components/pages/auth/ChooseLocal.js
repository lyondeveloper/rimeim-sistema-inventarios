import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Custom components
import logo_rimeim from '../../../public/img/logo_rimeim.png';
import ButtonField from '../../common/ButtonField';
import Spinner from '../../common/Spinner';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

// Functions
import {
  logoutUser,
  setCurrentLocal,
  getLocalsForCurrentUser
} from '../../../actions/UserActions';

import isEmpty from '../../../actions/isEmpty';
import redirect from '../../../utils/redirect';

class ChooseLocal extends Component {
  state = {
    isInRequest: true,
    currentLocalSetted: false
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    const {
      currentLocal,
      user: { admin }
    } = this.props.user;
    if (!isEmpty(currentLocal) && !admin) {
      this.updateViewByCurrentLocal(currentLocal);
    } else {
      this.props.getLocalsForCurrentUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isInRequest: false
    });
    const { locals, currentLocal } = nextProps.user;
    const {
      user: { admin }
    } = this.props.user;

    if (locals.length === 1 && !admin) {
      if (!this.state.currentLocalSetted) {
        this.props.setCurrentLocal(locals[0]);
        this.setState({
          currentLocalSetted: true
        });
      }
      return this.updateViewByCurrentLocal(locals[0]);
    }

    if (!isEmpty(currentLocal)) {
      this.updateViewByCurrentLocal(currentLocal);
    }
  }

  updateViewByCurrentLocal = currentLocal => {
    if (currentLocal.id === 0) {
      redirect(this.props, '/admin_area');
    } else {
      redirect(this.props, '/nueva_venta');
    }
  };

  onSelectLocal = local => {
    this.props.setCurrentLocal(local);
  };

  onSelectAdminArea = () => {
    this.props.setCurrentLocal({
      id: 0,
      name: 'Administracion'
    });
  };

  onLogOut = () => {
    this.props.logoutUser();
  };

  render() {
    if (this.state.isInRequest) {
      return (
        <div className="container">
          <div className="valign-wrapper minh-100">
            <div className="row">
              <div className="col s12 center">
                <img src={logo_rimeim} alt="" />
                <Spinner fullWidth />
              </div>
            </div>
          </div>
        </div>
      );
    }

    const {
      user: { admin },
      locals
    } = this.props.user;
    const NoLocals = locals.length <= 0 && admin === false;

    return (
      <div className="container">
        <div className="valign-wrapper minh-100">
          <div className="row">
            <div className="col s12 center">
              <img src={logo_rimeim} alt="" />

              <div className="card">
                <div className="card-content">
                  <h5 className="text-center">
                    {NoLocals
                      ? 'No hay locales disponibles en el sistema'
                      : 'Seleccione un lugar de trabajo'}
                  </h5>

                  {locals.map(local => (
                    <ButtonField
                      text={local.nombre}
                      className="btn btn-block mb-1 red darken-1 text-white"
                      key={local.id}
                      onClick={() => {
                        this.onSelectLocal(local);
                      }}
                    />
                  ))}

                  {admin === true && (
                    <ButtonField
                      text="Administracion"
                      className="btn btn-block red darken-1 text-white"
                      icon="trending_up"
                      onClick={this.onSelectAdminArea}
                    />
                  )}
                </div>

                <div className="card-footer">
                  <ButtonField
                    text="Cerrar sesion"
                    className="btn-flat waves-effect waveslight btn-block"
                    onClick={this.onLogOut}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChooseLocal.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  setCurrentLocal: PropTypes.func.isRequired,
  getLocalsForCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    setCurrentLocal,
    getLocalsForCurrentUser
  }
)(ChooseLocal);
