import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import TextInputField from '../../common/TextInputField';
import Spinner from '../../common/Spinner';
import EmptyIcon from '../../common/EmptyIcon';

import { searchProduct } from '../../../actions/productActions';

class SearchProductAndShowInfo extends Component {
  state = {
    field: '',
    typing: false,
    typingTimeout: 0,
    searching: false
  };

  onChangeTextInput = e => {
    if (this.state.typingTimeout) {
      this.setState({ searching: true });
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      field: e.target.value,
      typing: false,
      typingTimeout: setTimeout(() => {
        if (this.state.field.trim() !== '') {
          this.props.searchProduct({ field: this.state.field });
        } else {
          this.setState({ searching: false });
        }
      }, 1500)
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.product.products) {
      this.setState({
        searching: false
      });
    }
  }

  onHideModal = () => {
    if (this.props.onHide) {
      this.props.onHide();
    }
  };

  render() {
    const { field, searching } = this.state;
    const { products } = this.props.product;
    let productInfo;

    if (searching) {
      productInfo = <Spinner fullWidth />;
    } else if (products && products.length > 0) {
      productInfo = (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Marca</th>
              <th>Tipo de vehiculo</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <tr key={uuid()}>
                <td>{product.id}</td>
                <td>{product.codigo_barra}</td>
                <td>{product.nombre}</td>
                <td>{product.precio}</td>
                <td>{product.marca && product.marca.nombre}</td>
                <td>{product.tipo_vehiculo && product.tipo_vehiculo.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      productInfo = <EmptyIcon message="No se encontro ningun producto" />;
    }
    return (
      <div className="modal" id="search_product_and_show_info">
        <div className="modal-content">
          <div className="row">
            <TextInputField
              id="field"
              onchange={this.onChangeTextInput}
              value={field}
            />
          </div>

          {productInfo}
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="btn-flat modal-close"
            onClick={this.onHideModal}
          >
            Cerrar
          </a>
        </div>
      </div>
    );
  }
}

SearchProductAndShowInfo.propTypes = {
  searchProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  onHide: PropTypes.func
};

const mapStateToProps = state => ({
  product: state.product
});
export default connect(
  mapStateToProps,
  {
    searchProduct
  }
)(SearchProductAndShowInfo);
