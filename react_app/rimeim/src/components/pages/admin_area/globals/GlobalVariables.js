import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  removeMaterialComponents,
  configMaterialComponents
} from '../../../../utils/MaterialFunctions';
import {
  getGlobalVariables,
  updateGlobalVariables
} from '../../../../actions/globalActons';

import NavbarAdmin from '../../../layout/NewNavbarAdmin';
import TextInputField from '../../../common/TextInputField';
import Spinner from '../../../common/Spinner';

class GlobalVariables extends Component {
  state = {
    impuesto: '',
    rtn: '',
    loading: true
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.global.values && this.state.loading) {
      const { impuesto, rtn } = nextProps.global.values;
      this.setState({
        impuesto,
        rtn,
        loading: false
      });
    }
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onSaveValues = () => {
    const { impuesto, rtn } = this.state;
    this.props.updateGlobalVariables({ impuesto, rtn });
    this.setState({ loading: true });
  };

  render() {
    const { rtn, impuesto } = this.state;
    return (
      <React.Fragment>
        <NavbarAdmin>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Valores Globales
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right">
              <li>
                <a href="#!" onClick={this.onSaveValues}>
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
                  {this.props.global.loading && <Spinner fullWidth />}
                  <div className="row">
                    <TextInputField
                      id="rtn"
                      label="RTN de empresa"
                      onchange={this.onChangeTextInput}
                      value={rtn}
                    />
                  </div>

                  <div className="row">
                    <TextInputField
                      id="impuesto"
                      label="Impuesto para ventas"
                      onchange={this.onChangeTextInput}
                      value={impuesto}
                      type="number"
                    />
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

mapStateToProps.propTypes = {
  global: PropTypes.object.isRequired,
  getGlobalVariables: PropTypes.func.isRequired,
  updateGlobalVariables: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  global: state.global
});

export default connect(
  mapStateToProps,
  { getGlobalVariables, updateGlobalVariables }
)(GlobalVariables);
