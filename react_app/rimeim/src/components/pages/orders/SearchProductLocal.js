import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { connect } from 'react-redux';

import Spinner from '../../common/Spinner';
import TextInputField from '../../common/TextInputField';

import { searchProduct, cleanProducts } from '../../../actions/productActions';

class SearchProductLocal extends Component {
  state = {
    field: '',
    producto_seleccionado: {},
    productos: [],
    cantidad: '',
    costo: '',
    productPosition: '',
    editMode: false,
    typing: false,
    typingTimeout: 0,
    searching: false,
    needs_config_selects: false,
    errors: {}
  };

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

  onSelectProduct = producto => {
    let selectedProduct = producto;
    // console.log(product);

    // if (selectedProduct.seleccionado) {
    //   selectedProduct.seleccionado = false;
    //   console.log('entra condicion');
    // }

    // selectedProduct.seleccionado = true;

    // document.getElementById(`${product.id}`).checked =
    //   selectedProduct.seleccionado;

    this.setState({
      producto_seleccionado: producto
    });
  };

  onChangeCheckbox = e => {
    e.preventDefault();

    this.onSelectModalProduct();

    const { producto_seleccionado, productos } = this.state;

    if (producto_seleccionado.seleccionado !== null) {
      producto_seleccionado.seleccionado = !producto_seleccionado.seleccionado;
    } else {
      producto_seleccionado.seleccionado = true;
    }

    this.setState({ productos });
  };

  onAddProductClick = e => {
    e.preventDefault();

    const { products } = this.props.products;

    if (products.length > 0) {
      this.props.cleanProducts();
    }

    this.setState({
      producto_seleccionado: {},
      field: '',
      cantidad: '',
      typing: false,
      typingTimeout: 0
    });
  };

  onAddProduct = e => {
    e.preventDefault();

    const { productos, cantidad, producto_seleccionado } = this.state;

    // const selecteds = productos.filter(p => p.seleccionado === true);

    // selecteds.forEach(product => {
    // });
    const productData = {
      id_producto: producto_seleccionado.id,
      cantidad,
      costo: producto_seleccionado.precio,
      nombre: producto_seleccionado.nombre,
      es_compra: false
    };

    productos.push(productData);

    this.props.onPassProductsData(productos);

    this.setState({
      producto_seleccionado: {},
      cantidad: ''
    });
  };

  onEditProductClick = producto => {
    const { products } = this.props.products;

    if (products.length > 0) {
      this.props.cleanProducts();
    }

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

    productos[productIndex].id_producto = producto_seleccionado.id;
    productos[productIndex].costo = producto_seleccionado.precio;
    productos[productIndex].nombre = producto_seleccionado.nombre;
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
      p => p.id_producto === producto.id_producto
    );

    delete productos[productIndex].actualizado;

    productos[productIndex].eliminado = true;

    this.setState({
      id_producto: '',
      cantidad: ''
    });
  };

  render() {
    const { productos, searching, cantidad, field, local } = this.state;

    const { products } = this.props;

    let searchResult;

    if (searching || products.loading) {
      searchResult = <Spinner fullWidth />;
    } else {
      searchResult = (
        <div className='row'>
          <div className='col s12'>
            {products.products.map((producto, i) => {
              return (
                <div
                  className='d-block cursor-pointer bordered p-1'
                  key={uuid()}
                >
                  <label>
                    <input
                      type='checkbox'
                      className='filled-in'
                      id={`${producto.id}`}
                      onClick={() => {
                        this.onSelectProduct(producto);
                      }}
                    />
                    <span />
                  </label>
                  {producto.id} - {producto.nombre}
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
                    <td>{p.id_producto}</td>
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
  { searchProduct, cleanProducts }
)(SearchProductLocal);
