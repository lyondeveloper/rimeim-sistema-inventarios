import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import NewNavBar from '../../layout/NewNavbar';
import Spinner from '../../common/Spinner';
import TextInputField from '../../common/TextInputField';
import TextAreaInputField from '../../common/TextAreaInputField';
import SelectFiles from '../../common/SelectFiles';

import { getBrand, updateBrand } from '../../../actions/brandActions';

class EditBrand extends Component {
  state = {
    imagen: null,
    nombre: '',
    descripcion: '',
    is_in_request: true,
    errors: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getBrand(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (
      this.state.is_in_request &&
      nextProps.brand &&
      !nextProps.brand.loading
    ) {
      const { imagen, nombre, descripcion } = nextProps.brand.brand;
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

  onDeleteFileClick = () => {
    this.setState({ imagen: null });
    document.getElementById('imagen').value = null;
  };

  onUpdateBrand = () => {
    const { imagen, nombre, descripcion } = this.state;
    const updatedBrand = {
      nombre,
      descripcion,
      imagen: this.props.brand.brand.imagen
    };

    if (imagen !== null && imagen !== this.props.brand.brand.imagen) {
      const newBrandData = new FormData();
      newBrandData.append('file_uploads[]', imagen.file, imagen.name);
      newBrandData.append('json_data', JSON.stringify(updatedBrand));
      this.props.updateBrand(this.props.match.params.id, newBrandData);
    } else {
      this.props.updateBrand(this.props.match.params.id, updatedBrand);
    }

    this.setState({
      is_in_request: true
    });
  };

  render() {
    const {
      nombre,
      descripcion,
      imagen,
      errors: { nombre_error, descripcion_error }
    } = this.state;
    const { loading } = this.props.brand;
    let brandContent;

    if (loading) {
      brandContent = <Spinner fullWidth />;
    } else {
      brandContent = (
        <div className="card">
          <div className="card-content">
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
                active_label={true}
              />
            </div>

            <div className="row">
              <TextAreaInputField
                id="descripcion"
                label="Descripcion"
                onchange={this.onChangeTextInput}
                value={descripcion}
                error={descripcion_error}
                active_label={true}
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
              Marca
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right">
              <li>
                <a href="#!" onClick={this.onUpdateBrand}>
                  <i className="material-icons">save</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavBar>

        <main>
          <div className="row">
            <div className="col s12">{brandContent}</div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

EditBrand.propTypes = {
  getBrand: PropTypes.func.isRequired,
  updateBrand: PropTypes.func.isRequired,
  brand: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  brand: state.brand,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBrand, updateBrand }
)(EditBrand);
