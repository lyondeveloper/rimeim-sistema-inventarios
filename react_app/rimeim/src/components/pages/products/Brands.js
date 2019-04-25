import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Link } from 'react-router-dom';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import { getBrands, searchBrand } from '../../../actions/brandActions';

import BrandCard from '../../common/BrandCard';
import NewNavBar from '../../layout/NewNavbar';
import Spinner from '../../common/Spinner';
import TextInputField from '../../common/TextInputField';

class Brands extends Component {
  state = {
    search_marca: ''
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getBrands();
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onClickSearchBrand = () => {
    const { search_marca } = this.state;
    this.props.searchBrand({
      field: search_marca
    });
  };

  render() {
    const { loading, brands } = this.props.brand;
    let brandsContent;

    if (loading) {
      brandsContent = <Spinner fullWidth />;
    } else {
      brandsContent = brands.map(brand => (
        <div className="col s12 m6 l4" key={uuid()}>
          <BrandCard marca={brand} key={uuid()} />
        </div>
      ));
    }
    return (
      <React.Fragment>
        <NewNavBar active_nav="PRODUCTOS">
          <ul id="dropdown_more" className="dropdown-content">
            <li>
              <Link to="/nueva_marca">
                <i className="material-icons">add</i>
                Nueva
              </Link>
            </li>
            <li>
              <a href="#modal_buscar_marca" className="modal-trigger">
                <i className="material-icons">search</i>
                Buscar
              </a>
            </li>
          </ul>

          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Marcas
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-small-only">
              <li>
                <Link to="/nueva_marca">
                  <i className="material-icons">add</i>
                </Link>
              </li>
              <li>
                <a
                  href="#modal_buscar_marca"
                  className="modal-trigger tooltipped"
                  data-position="bottom"
                  data-tooltip="Buscar"
                >
                  <i className="material-icons">search</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavBar>

        <main>
          <div className="row">{brandsContent}</div>

          <div className="modal" id="modal_buscar_marca">
            <div className="modal-content">
              <div className="row">
                <TextInputField
                  id="search_marca"
                  label="Nombre de la marca"
                  value={this.state.search_marca}
                  onchange={this.onChangeTextInput}
                />
              </div>
            </div>

            <div className="modal-footer">
              <a href="#!" className="modal-close btn-flat left">
                Cerrar
              </a>
              <a
                href="#!"
                className="btn modal-close"
                onClick={this.onClickSearchBrand}
              >
                Buscar
              </a>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Brands.propTypes = {
  getBrands: PropTypes.func.isRequired,
  searchBrand: PropTypes.func.isRequired,
  brand: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  brand: state.brand
});

export default connect(
  mapStateToProps,
  { getBrands, searchBrand }
)(Brands);
