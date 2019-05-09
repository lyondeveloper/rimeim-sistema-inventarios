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

import MapProducts from '../../../common/MapProducts';
import SearchProductsModal from '../../../layout/modals/SearchProductModel';

class AdminProducts extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getProducts();
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
                <a href="#modal_search_producto" className="modal-trigger">
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

        <SearchProductsModal is_admin={true} />
      </React.Fragment>
    );
  }
}

AdminProducts.propTypes = {
  product: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProducts }
)(AdminProducts);
