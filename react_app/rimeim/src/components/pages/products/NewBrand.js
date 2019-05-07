import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import NewNavBar from '../../layout/NewNavbar';
import Spinner from '../../common/Spinner';

import { addBrand } from '../../../actions/brandActions';

import TextInputField from '../../common/TextInputField';
import TextAreaInputField from '../../common/TextAreaInputField';
import SelectFiles from '../../common/SelectFiles';

class NewBrand extends Component {
  state = {
    imagen: null,
    nombre: '',
    descripcion: '',
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

  onDeleteFileClick = () => {
    this.setState({ imagen: null });
    document.getElementById('imagen').value = null;
  };

  onSaveNewBrand = () => {
    const { imagen, nombre, descripcion } = this.state;
    const newBrand = {
      nombre,
      descripcion
    };

    if (imagen !== null) {
      const newBrandData = new FormData();
      newBrandData.append('file_uploads[]', imagen.file, imagen.name);
      newBrandData.append('json_data', JSON.stringify(newBrand));
      this.props.addBrand(newBrandData, this.props.history);
    } else {
      this.props.addBrand(newBrand, this.props.history);
    }
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
              Nueva marca
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right">
              <li>
                <a href="#!" onClick={this.onSaveNewBrand}>
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
                <div className="card-content">
                  {this.props.brand.loading && <Spinner fullWidth />}
                  <div className="row">
                    <SelectFiles
                      id="imagen"
                      files={[imagen]}
                      label="Seleccionar imagen"
                      onchange={this.onChangeFiles}
                      onDeleteFileClick={this.onDeleteFileClick}
                    />
                  </div>
                  <div className="row">
                    <TextInputField
                      id="nombre"
                      label="Nombre"
                      onchange={this.onChangeTextInput}
                      value={nombre}
                      error={nombre_error}
                      required={true}
                    />
                  </div>

                  <div className="row">
                    <TextAreaInputField
                      id="descripcion"
                      label="Descripcion"
                      onchange={this.onChangeTextInput}
                      value={descripcion}
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

NewBrand.propTypes = {
  addBrand: PropTypes.func.isRequired,
  brand: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  brand: state.brand,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addBrand }
)(NewBrand);
