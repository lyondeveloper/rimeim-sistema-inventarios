import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavbarAdmin from '../../../layout/NewNavbarAdmin';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../../utils/MaterialFunctions';

// import { getProductById } from '../../../../actions/productActions';

import Spinner from '../../../common/Spinner';
// import ProductCard from '../../../common/ProductCard';

class NewProduct extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    // this.props.getProductById(this.props.match.params.id);
  }

  render() {
    // const { product, loading } = this.props.product;
    return (
      <React.Fragment>
        <NavbarAdmin>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Nuevo producto
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <a href="#!">
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
                  <div className="row">
                    <div className="col s12">
                      <div className="horizontal-scroll-container bordered">
                        <div className="item red">
                          <div className="red close-button cursor-pointer">
                            <i className="material-icons">close</i>
                          </div>
                        </div>
                      </div>
                      <div className="file-field input-field overflow-x-hidden">
                        <div className="btn">
                          <span>Seleccionar imagen</span>
                          <input
                            type="file"
                            accept="image/jpeg"
                            onchange="onChangeInputFileImage(this, 'img_producto')"
                          />
                        </div>
                        <div className="file-path-wrapper d-none">
                          <input className="file-path validate" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <div className="input-field">
                        <input
                          id="codigo_barra"
                          name="codigo_barra"
                          type="text"
                          className="validate"
                        />
                        <label for="codigo_barra">Codigo de barra</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <div className="input-field">
                        <input
                          id="nombre"
                          name="nombre"
                          type="text"
                          className="validate"
                        />
                        <label for="nombre">Nombre</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <select>
                        <option value="" disabled selected>
                          Seleccionar
                        </option>
                        <option value="1">Marca 1</option>
                        <option value="2">Marca 2</option>
                        <option value="3">Marca 3</option>
                      </select>
                      <label>Marca</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <select>
                        <option value="" disabled selected>
                          Seleccionar
                        </option>
                        <option value="1">Tipo 1</option>
                        <option value="2">Tipo 2</option>
                        <option value="3">Tipo 3</option>
                      </select>
                      <label>Tipo de vehiculo</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <div className="input-field">
                        <input
                          id="descripcion"
                          name="descripcion"
                          type="text"
                          className="validate"
                        />
                        <label for="descripcion">Descripcion</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      <div className="input-field">
                        <input
                          id="precio"
                          name="precio"
                          type="text"
                          className="validate"
                        />
                        <label for="precio">Precio</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <div className="input-field">
                        <input
                          id="existencia"
                          name="existencia"
                          type="text"
                          className="validate"
                        />
                        <label for="existencia">Existencia</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <div className="input-field">
                        <input
                          id="cantidad_minima"
                          name="cantidad_minima"
                          type="text"
                          className="validate"
                        />
                        <label for="cantidad_minima">Cantidad minima</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <label>
                        <input
                          type="checkbox"
                          className="filled-in"
                          checked="checked"
                        />
                        <span>Es raro</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-content card-distrubucion-productos">
                  <h5>Distribucion</h5>
                  <div className="row">
                    <div className="col s12">
                      San Pedro Sula:
                      <div className="input-field inline">
                        <input
                          id="email_inline"
                          type="text"
                          className="validate"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      Tegucigalpa:
                      <div className="input-field inline">
                        <input
                          id="email_inline"
                          type="text"
                          className="validate"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      Choloma:
                      <div className="input-field inline">
                        <input
                          id="email_inline"
                          type="text"
                          className="validate"
                        />
                      </div>
                    </div>
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

NewProduct.propTypes = {
  product: PropTypes.object.isRequired
  //   getProductById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps)(NewProduct);
