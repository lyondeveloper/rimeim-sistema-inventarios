import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"

import NewNavBar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configMaterialBoxedImages
} from '../../../utils/MaterialFunctions';

import { getVehicle, deleteVehicle } from '../../../actions/vehicleActions';

import Spinner from '../../common/Spinner';
import ConfirmationModal from '../../layout/modals/ConfirmationModal';

class ShowVehicleType extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getVehicle(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (this.props.vehicle.vehicle &&
      this.props.vehicle.vehicle.imagen) {
      configMaterialBoxedImages()
    }
  }

  onDeleteVehicleType = () => {
    this.props.deleteVehicle(
      this.props.match.params.id,
      this.props.history,
      '/vehiculos'
    );
  };

  render() {
    const {
      loading,
      vehicle: { id, imagen, nombre, descripcion }
    } = this.props.vehicle;
    let vehicleContent;

    if (loading) {
      vehicleContent = <Spinner fullWidth />;
    } else {
      vehicleContent = (
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <div className="row">
                  {imagen && (
                    <div className="horizontal-scroll-container">
                      <div className="img-item">
                        <img
                          src={imagen.url}
                          className="materialboxed adjust"
                          alt=""
                        />
                      </div>
                    </div>
                  )}
                </div>

                <table>
                  <tbody>
                    <tr>
                      <td>ID</td>
                      <td>{id}</td>
                    </tr>
                    <tr>
                      <td>Nombre</td>
                      <td>{nombre}</td>
                    </tr>
                    <tr>
                      <td>Descripcion</td>
                      <td>{descripcion}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <button
              className="btn red darken-3 modal-trigger"
              data-target="modal_confirmar_evento"
            >
              Eliminar
            </button>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <NewNavBar active_nav="PRODUCTOS">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Tipo de vehiculo
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right">
              <li>
                <Link to={`/editar_vehiculo/${this.props.match.params.id}`}>
                  <i className="material-icons">edit</i>
                </Link>
              </li>
            </ul>
          </div>
        </NewNavBar>

        <main>{vehicleContent}</main>

        <ConfirmationModal
          onAccept={this.onDeleteVehicleType}
          title="Borrar tipo de vehiculo"
          message="Seguro que quiere eliminar este registro? No se podra deshacer la operacion"
        />
      </React.Fragment>
    );
  }
}

ShowVehicleType.propTypes = {
  getVehicle: PropTypes.func.isRequired,
  deleteVehicle: PropTypes.func.isRequired,
  vehicle: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vehicle: state.vehicle
});

export default connect(
  mapStateToProps,
  {
    getVehicle,
    deleteVehicle
  }
)(ShowVehicleType);
