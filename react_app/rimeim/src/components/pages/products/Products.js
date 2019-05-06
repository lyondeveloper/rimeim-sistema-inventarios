import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NewNavbar from "../../layout/NewNavbar";

import {
  configMaterialComponents,
  removeMaterialComponents
} from "../../../utils/MaterialFunctions";

import { getProducts } from "../../../actions/productActions";
import MapProducts from "../../common/MapProducts";
import SearchProductModal from "../../layout/modals/SearchProductModel";

class Products extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getProducts();
  }

  render() {
    const { loading, products } = this.props.product;
    return (
      <React.Fragment>
        <NewNavbar active_nav="PRODUCTOS">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Inventario
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
            </ul>
          </div>
        </NewNavbar>

        <main>
          <MapProducts loading={loading} products={products} />
        </main>
        <SearchProductModal />
      </React.Fragment>
    );
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProducts }
)(Products);
