import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavbarAdmin from '../../../layout/NewNavbarAdmin';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../../utils/MaterialFunctions';

import { getProducts } from '../../../../actions/productActions';

import MapProducts from "../../../common/MapProducts"

class AdminProducts extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    const id_local = this.props.user.currentLocal.id
      ? this.props.user.currentLocal.id
      : 0;
    this.props.getProducts(id_local);
  }

  render() {
    const { products, loading } = this.props.product;
    return (
      <React.Fragment>
        <NavbarAdmin>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Productos
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <a href="#!">
                  <i className="material-icons">search</i>
                </a>
              </li>
              <li>
                <Link to="/admin/nuevo_producto">
                  <i className="material-icons">add</i>
                </Link>
              </li>
            </ul>
          </div>
        </NavbarAdmin>

        <main>
          <div className="row">
            <MapProducts loading={loading} products={products} admin={true} />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

AdminProducts.propTypes = {
  product: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getProducts }
)(AdminProducts);
