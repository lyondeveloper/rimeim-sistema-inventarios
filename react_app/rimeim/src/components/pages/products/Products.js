import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NewNavbar from "../../layout/NewNavbar";

import {
  configMaterialComponents,
  removeMaterialComponents
} from "../../../utils/MaterialFunctions";

import { getProducts, searchProduct } from "../../../actions/productActions";

import MapProducts from "../../common/MapProducts";
import SearchModal from "../../layout/modals/SearchModal";

class Products extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getProducts();
  }

  onSearchProduct = termino_busqueda => {
    const searchProductData = {
      field: termino_busqueda
    };
    this.props.searchProduct(searchProductData);
  };

  render() {
    const { loading, products } = this.props.product;
    return (
      <React.Fragment>
        <NewNavbar active_nav="PRODUCTOS" show_more_option={true}>
          <ul id="dropdown_more" className="dropdown-content">
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
                <a href="#modal_search" className="modal-trigger">
                  <i className="material-icons">search</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <main>
          <MapProducts loading={loading} products={products} />
        </main>

        <SearchModal onSearchAction={this.onSearchProduct} />
      </React.Fragment>
    );
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  searchProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getProducts, searchProduct }
)(Products);
