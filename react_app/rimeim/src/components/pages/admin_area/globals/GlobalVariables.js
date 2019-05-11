import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  removeMaterialComponents,
  configMaterialComponents
} from "../../../../utils/MaterialFunctions";
import {
  getGlobalVariables,
  updateGlobalVariables
} from "../../../../actions/globalActons";

import NavbarAdmin from "../../../layout/NewNavbarAdmin";
import TextInputField from "../../../common/TextInputField";
import Spinner from "../../../common/Spinner";
import isEmpty from "../../../../actions/isEmpty";

class GlobalVariables extends Component {
  state = {
    impuesto: "",
    rtn: "",
    correo: "",
    loading: true
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getGlobalVariables();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.global.values &&
      !nextProps.global.loading &&
      !isEmpty(nextProps.global.values) &&
      this.state.loading
    ) {
      const { impuesto, rtn, correo } = nextProps.global.values;
      this.setState({
        impuesto,
        rtn,
        correo,
        loading: false
      });
    }
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onSaveValues = () => {
    const { impuesto, rtn, correo } = this.state;
    this.props.updateGlobalVariables({ impuesto, rtn, correo });
    this.setState({ loading: true });
  };

  render() {
    const { rtn, impuesto, correo } = this.state;
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
                      active_label={true}
                    />
                  </div>

                  <div className="row">
                    <TextInputField
                      id="correo"
                      label="Correo de empresa"
                      onchange={this.onChangeTextInput}
                      value={correo}
                      active_label={true}
                    />
                  </div>

                  <div className="row">
                    <TextInputField
                      id="impuesto"
                      label="Impuesto para ventas"
                      onchange={this.onChangeTextInput}
                      value={impuesto}
                      type="number"
                      active_label={true}
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

GlobalVariables.propTypes = {
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
