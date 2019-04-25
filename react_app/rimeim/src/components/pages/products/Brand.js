import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configMaterialBoxedImages
} from '../../../utils/MaterialFunctions';

import NewNavBar from '../../layout/NewNavbar';
import Spinner from '../../common/Spinner';
import ConfirmationModal from '../../layout/modals/ConfirmationModal';

import { getBrand, deleteBrand } from '../../../actions/brandActions';

class Brand extends Component {
  state = {};

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getBrand(this.props.match.params.id);
  }

  componentDidUpdate() {
    configMaterialBoxedImages();
  }

  onConfirmDeleteBrand = () => {
    this.props.deleteBrand(
      this.props.match.params.id,
      this.props.history,
      '/marcas'
    );
  };

  render() {
    const {
      loading,
      brand: { id, imagen, nombre, descripcion }
    } = this.props.brand;
    let brandContent;

    if (loading) {
      brandContent = <Spinner fullWidth />;
    } else {
      brandContent = (
        <div className="col s12">
          <div className="card">
            <div className="card-content">
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
                <Link to={`/editar_marca/${this.props.match.params.id}`}>
                  <i className="material-icons">edit</i>
                </Link>
              </li>
            </ul>
          </div>
        </NewNavBar>

        <main>
          <div className="row">{brandContent}</div>
        </main>

        <ConfirmationModal
          title="Eliminar marca"
          message="Esta seguro de que quiere eliminar esta marca? No se podra revertir la operacion"
          onAccept={this.onConfirmDeleteBrand}
        />
      </React.Fragment>
    );
  }
}

Brand.propTypes = {
  getBrand: PropTypes.func.isRequired,
  deleteBrand: PropTypes.func.isRequired,
  brand: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  brand: state.brand
});

export default connect(
  mapStateToProps,
  { getBrand, deleteBrand }
)(Brand);
