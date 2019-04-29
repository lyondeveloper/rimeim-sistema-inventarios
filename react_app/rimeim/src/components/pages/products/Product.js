import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import NewNavbar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configMaterialBoxedImages
} from '../../../utils/MaterialFunctions';

import { getProductById } from '../../../actions/productActions';

import ShowProduct from '../../common/ShowProduct';

class Products extends Component {
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
  render() {
    const { loading, product } = this.props.product;
    return (
      <React.Fragment>
        <NewNavbar active_nav="PRODUCTOS">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Detalles de producto
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <Link to={`/editar_producto/${this.props.match.params.id}`}>
                  <i className="material-icons">edit</i>
                </Link>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <main>
          <div className="row">
            <ShowProduct loading={loading} product={product} />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Products.propTypes = {
  getProductById: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getProductById }
)(Products);
