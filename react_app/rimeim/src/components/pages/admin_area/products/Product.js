import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import NavbarAdmin from '../../../layout/NewNavbarAdmin';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configMaterialBoxedImages
} from '../../../../utils/MaterialFunctions';

import {
  getProductById,
  deleteProductById
} from '../../../../actions/productActions';

import ShowProduct from '../../../common/ShowProduct';

class AdminProduct extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getProductById(this.props.match.params.id);
  }

  componentDidUpdate() {
    configMaterialBoxedImages();
  }

  onDeleteProduct = () => {
    this.props.deleteProductById(
      this.props.match.params.id,
      this.props.history,
      '/admin/productos'
    );
  };

  render() {
    const { loading, product } = this.props.product;
    let productName = 'Producto';

    if (!loading) {
      productName = product.nombre;
    }
    return (
      <React.Fragment>
        <NavbarAdmin>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              {productName}
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <Link
                  to={`/admin/editar_producto/${this.props.match.params.id}`}
                >
                  <i className="material-icons">edit</i>
                </Link>
              </li>
            </ul>
          </div>
        </NavbarAdmin>

        <main>
          <div className="row">
            <ShowProduct
              loading={loading}
              product={product}
              onDeleteProduct={this.onDeleteProduct}
            />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

AdminProduct.propTypes = {
  product: PropTypes.object.isRequired,
  getProductById: PropTypes.func.isRequired,
  deleteProductById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProductById, deleteProductById }
)(AdminProduct);
