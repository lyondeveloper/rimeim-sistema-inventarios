import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NewNavBar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import { getVehicle, updateVehicle } from '../../../actions/vehicleActions';

import TextInputField from '../../common/TextInputField';
import TextAreaInputField from '../../common/TextAreaInputField';
import SelectFiles from '../../common/SelectFiles';
import Spinner from '../../common/Spinner';

class EditVehicleType extends Component {
  state = {
    imagen: null,
    nombre: '',
    descripcion: '',
    is_in_request: false,
    errors: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getVehicle(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (
      nextProps.vehicle &&
      !nextProps.vehicle.loading &&
      !this.state.is_in_request
    ) {
      const { imagen, nombre, descripcion } = nextProps.vehicle.vehicle;
      this.setState({
        imagen,
        nombre,
        descripcion,
        is_in_request: false
      });
    }
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onChangeFiles = e => {
    const { files } = e.target;
    let nueva_imagen = null;

    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      var reader = new FileReader();
      reader.onload = result => {
        nueva_imagen = {
          name: file.name,
          url: result.target.result,
          file
        };

        if (i === files.length) {
          this.setState({ imagen: nueva_imagen });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  onDeleteFile = () => {
    this.setState({ imagen: null });
    document.getElementById('imagen').value = null;
  };

  onSaveVehicleType = () => {
    const { imagen, nombre, descripcion } = this.state;
    const updatedVehicle = {
      nombre,
      descripcion,
      imagen: this.props.vehicle.vehicle.imagen
    };

    if (imagen !== null && imagen !== this.props.vehicle.vehicle.imagen) {
      const newVehicleData = new FormData();
      newVehicleData.append('file_uploads[]', imagen.file, imagen.name);
      newVehicleData.append('json_data', JSON.stringify(updatedVehicle));
      this.props.updateVehicle(this.props.match.params.id, newVehicleData);
    } else {
      this.props.updateVehicle(this.props.match.params.id, updatedVehicle);
    }

    this.setState({
      is_in_request: true
    });
  };

  render() {
    const {
      imagen,
      nombre,
      descripcion,
      errors: { nombre_error, descripcion_error }
    } = this.state;
    const { loading } = this.props.vehicle;
    let vehicleContent;

    if (loading) {
      vehicleContent = <Spinner fullWidth />;
    } else {
      vehicleContent = (
        <div className="card">
          <div className="card-content">
            <div className="row">
              <SelectFiles
                id="imagen"
                label="Seleccionar imagen"
                files={[imagen]}
                onchange={this.onChangeFiles}
                onDeleteFileClick={this.onDeleteFile}
              />
            </div>

            <div className="row">
              <TextInputField
                id="nombre"
                label="Nombre"
                onchange={this.onChangeTextInput}
                value={nombre}
                required={true}
                active_label={true}
                error={nombre_error}
              />
            </div>

            <div className="row">
              <TextAreaInputField
                id="descripcion"
                label="Descripcion"
                onchange={this.onChangeTextInput}
                value={descripcion}
                required={true}
                active_label={true}
                error={descripcion_error}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <NewNavBar active_nav="PRODUCTOS">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Editar tipo de vehiculo
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right">
              <li>
                <a href="#!" onClick={this.onSaveVehicleType}>
                  <i className="material-icons">save</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavBar>

        <main>
          <div className="row">
            <div className="col s12">{vehicleContent}</div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

EditVehicleType.propTypes = {
  getVehicle: PropTypes.func.isRequired,
  updateVehicle: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  vehicle: state.vehicle
});

export default connect(
  mapStateToProps,
  {
    getVehicle,
    updateVehicle
  }
)(EditVehicleType);
