import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import NewNavbar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import {
  getProductById,
  deleteProductById
} from '../../../actions/productActions';

import ShowProduct from '../../common/ShowProduct';

class Products extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getProductById(this.props.match.params.id);
  }

  onDeleteProduct = () => {
    const { history, match } = this.props;
    this.props.deleteProductById(match.params.id, history, '/productos');
  };

  render() {
    const { loading, product } = this.props.product;
    return (
      <React.Fragment>
        <NewNavbar active_nav="PRODUCTOS" show_more_option={true}>
          <ul id="dropdown_more" className="dropdown-content">
            <li>
              <Link to="/nuevo_producto">
                <i className="material-icons">add</i>
              </Link>
            </li>
            <li>
              <a href="#modal_search" className="modal-trigger">
                <i className="material-icons">search</i>
              </a>
            </li>
          </ul>

          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Inventario
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-small-only">
              <li>
                <Link to="/nuevo_producto">
                  <i className="material-icons">add</i>
                </Link>
              </li>

              <li>
                <a href="#modal_search" className="modal-trigger">
                  <i className="material-icons">search</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

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

Products.propTypes = {
  getProductById: PropTypes.func.isRequired,
  deleteProductById: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getProductById, deleteProductById }
)(Products);
