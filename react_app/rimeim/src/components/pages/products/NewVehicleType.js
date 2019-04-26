import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NewNavBar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import { addVehicle } from '../../../actions/vehicleActions';

import TextInputField from '../../common/TextInputField';
import TextAreaInputField from '../../common/TextAreaInputField';
import SelectFiles from '../../common/SelectFiles';
import Spinner from '../../common/Spinner';

class NewVehicleType extends Component {
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    this.setState({
      is_in_request: false
    })
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
    const newVehicle = {
      nombre,
      descripcion
    };

    if (imagen !== null) {
      const newVehicleData = new FormData();
      newVehicleData.append('file_uploads[]', imagen.file, imagen.name);
      newVehicleData.append('json_data', JSON.stringify(newVehicle));
      this.props.addVehicle(newVehicleData, this.props.history);
    } else {
      this.props.addVehicle(newVehicle, this.props.history);
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

    return (
      <React.Fragment>
        <NewNavBar active_nav="PRODUCTOS">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Nuevo tipo de vehiculo
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
            <div className="col s12">
              <div className="card">
                {this.state.is_in_request && <Spinner fullWidth />}
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
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

NewVehicleType.propTypes = {
  addVehicle: PropTypes.func.isRequired,
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
    addVehicle
  }
)(NewVehicleType);
