import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NewNavBar from '../../layout/NewNavbar';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import VehicleTypeCard from '../../common/VehicleTypeCard';

import { getVehicles, searchVehicle } from '../../../actions/vehicleActions';
import Spinner from '../../common/Spinner';

class VehicleType extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getVehicles();
  }

  render() {
    const { vehicles, loading } = this.props.vehicle;
    let vehiclesData;

    if (loading) {
      vehiclesData = <Spinner fullWidth />;
    } else {
      vehiclesData = vehicles.map(vehicle => (
        <div className="col s12 m6 l4" key={uuid()}>
          <VehicleTypeCard vehiculo={vehicle} key={uuid()} />
        </div>
      ));
    }
    return (
      <React.Fragment>
        <NewNavBar active_nav="PRODUCTOS">
          <ul id="dropdown_more" className="dropdown-content">
            <li>
              <Link to="/nuevo_vehiculo">
                <i className="material-icons">add</i>
                Nuevo
              </Link>
            </li>
            <li>
              <a href="#modal_buscar" className="modal-trigger">
                <i className="material-icons">search</i>
                Buscar
              </a>
            </li>
          </ul>

          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Tipos de vehiculo
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-small-only">
              <li>
                <Link to="/nuevo_vehiculo">
                  <i className="material-icons">add</i>
                </Link>
              </li>
              <li>
                <a
                  href="#modal_buscar"
                  className="modal-trigger tooltipped"
                  data-position="bottom"
                  data-tooltip="Buscar"
                >
                  <i className="material-icons">search</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavBar>

        <main>
          <div className="row">{vehiclesData}</div>
        </main>
      </React.Fragment>
    );
  }
}

VehicleType.propTypes = {
  vehicle: PropTypes.object.isRequired,
  getVehicles: PropTypes.func.isRequired,
  searchVehicle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vehicle: state.vehicle
});

export default connect(
  mapStateToProps,
  {
    getVehicles,
    searchVehicle
  }
)(VehicleType);
