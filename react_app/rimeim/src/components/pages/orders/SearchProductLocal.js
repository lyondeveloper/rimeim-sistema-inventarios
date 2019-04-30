import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { connect } from 'react-redux';

import Spinner from '../../common/Spinner';
import TextInputField from '../../common/TextInputField';

import { searchProduct } from '../../../actions/productActions';

class SearchProductLocal extends Component {
  state = {
    field: '',
    producto_seleccionado: {},
    productos: [],
    cantidad: '',
    productPosition: '',
    editMode: false,
    typing: false,
    typingTimeout: 0,
    searching: false,
    errors: {}
  };

  // componentDidMount() {
  //   this.props.getProducts();
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors)
      this.setState({
        errors: nextProps.errors
      });
    if (nextProps.products.products) {
      const { products } = nextProps.products;
      products.forEach(product => (product.disabled = false));
      this.setState({
        needs_config_selects: true,
        searching: false
      });
    }
  }

  onChangeSearchProductInput = e => {
    if (this.state.typingTimeout) {
      this.setState({ searching: true });
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      field: e.target.value,
      typing: false,
      typingTimeout: setTimeout(() => {
        this.props.searchProduct({ field: this.state.field });
      }, 500)
    });
  };

  onChangeTextInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelectModalProduct = product =>
    this.setState({ producto_seleccionado: product });

  onAddProductClick = e => {
    e.preventDefault();

    this.setState({
      producto_seleccionado: {},
      cantidad: '',
      typing: false,
      typingTimeout: 0
    });
  };

  onAddProduct = e => {
    e.preventDefault();

    const { productos, cantidad, producto_seleccionado } = this.state;

    const productData = {
      id: producto_seleccionado.id,
      cantidad,
      nombre: producto_seleccionado.nombre
    };

    productos.push(productData);

    this.setState({
      producto_seleccionado: {},
      cantidad: ''
    });
  };

  onEditProductClick = producto => {
    this.setState({
      producto_seleccionado: producto,
      cantidad: producto.cantidad,
      productPosition: producto.id,
      editMode: true
    });
  };

  onEditProduct = () => {
    const {
      productos,
      producto_seleccionado,
      cantidad,
      productPosition
    } = this.state;

    const productIndex = productos.findIndex(p => p.id === productPosition);

    productos[productIndex].cantidad = cantidad;
    productos[productIndex].actualizado = true;

    this.setState({
      producto_seleccionado: {},
      cantidad: '',
      editMode: false
    });
  };

  onDeleteProduct = producto => {
    const { productos } = this.state;

    const productIndex = productos.findIndex(
      p => p.id.toString() === producto.id
    );

    delete productos[productIndex].actualizado;

    productos[productIndex].eliminado = true;

    this.setState({
      id_producto: '',
      cantidad: ''
    });
  };

  render() {
    const { products, loading } = this.props.products;

    const { productos, searching, cantidad, field } = this.state;

    let searchResult;

    if (searching || loading) {
      searchResult = <Spinner fullWidth />;
    } else {
      searchResult = (
        <div className='row'>
          <div className='col s12'>
            {products.map((product, i) => {
              return (
                <div
                  className='d-block cursor-pointer bordered p-1'
                  key={uuid()}
                  onClick={() => {
                    this.onSelectModalProduct(product);
                  }}
                >
                  {product.id} - {product.nombre}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className='d-block center'>
          <h5>Agregar Productos</h5>
          <button
            className='modal-trigger btn-floating'
            data-target='modal_agregar_productos'
            onClick={this.onAddProductClick}
          >
            <i className='material-icons'>add</i>
          </button>
        </div>

        {productos.length > 0 ? (
          <table className='striped table-bordered mt-1'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p, i) =>
                p.eliminado ? (
                  ''
                ) : (
                  <tr key={uuid()}>
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td>{p.cantidad}</td>
                    <td>
                      <i
                        onClick={this.onDeleteProduct.bind(this, p)}
                        className='material-icons cursor-pointer'
                      >
                        delete_sweep
                      </i>
                      <i
                        onClick={this.onEditProductClick.bind(this, p)}
                        data-target='modal_agregar_productos'
                        className='material-icons cursor-pointer modal-trigger'
                      >
                        create
                      </i>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          ''
        )}

        <div className='modal' id='modal_agregar_productos'>
          <div className='modal-content'>
            <h5>Buscar producto</h5>
            <div className='row'>
              <TextInputField
                id='field'
                label='ID o nombre del producto'
                value={field}
                onchange={this.onChangeSearchProductInput}
              />
              {searchResult}
              <TextInputField
                id='cantidad'
                label='Cantidad'
                onchange={this.onChangeTextInput}
                value={cantidad}
              />
            </div>
          </div>
          <div className='modal-footer'>
            <a
              href='#!'
              className='modal-close waves-effect waves-green btn text-white'
            >
              Cerrar
            </a>
            <a
              href='#!'
              className='modal-close waves-effect waves-blue btn left text-white'
              onClick={
                this.state.editMode ? this.onEditProduct : this.onAddProduct
              }
            >
              Guardar
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product
});

export default connect(
  mapStateToProps,
  { searchProduct }
)(SearchProductLocal);
