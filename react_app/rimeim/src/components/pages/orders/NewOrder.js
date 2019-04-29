import React, { Component } from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NewNavbar from '../../layout/NewNavbar';

import { getProducts } from '../../../actions/productActions';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import TextInputField from '../../common/TextInputField';
import Spinner from '../../common/Spinner';
import SelectInputField from '../../common/SelectInputField';

class NewOrder extends Component {
  state = {
    codigo: '',
    ubicacion: '',
    proveedor: '',
    id_producto: '',
    producto_seleccionado: '',
    precio_especial: '',
    nuevo_producto_nombre: '',
    editMode: false,
    productos_especiales: [],
    needs_config_selects: false
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  onChangeTextInput = e => {
    if (e.target.name === 'es_empresa') {
      const value = this.state.es_empresa ? false : true;
      return this.setState({ [e.target.name]: value });
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddSpecialProductPriceClick = e => {
    e.preventDefault();

    this.setState({
      id_producto: '',
      precio_especial: '',
      producto_seleccionado: ''
    });
  };

  onAddSpecialProductPrice = e => {
    e.preventDefault();

    const { products } = this.props.products;

    const { productos_especiales, id_producto, precio_especial } = this.state;

    const productIndex = products.findIndex(p => p.id === id_producto);

    const productData = {
      id_producto,
      producto_nombre: products[productIndex].nombre,
      precio: precio_especial
    };

    productos_especiales.push(productData);

    this.setState({
      id_producto: '',
      nuevo_producto_nombre: '',
      precio_especial: '',
      producto_seleccionado: ''
    });
  };

  onEditSpecialProductPrice = () => {
    const {
      precio_especial,
      productos_especiales,
      producto_seleccionado
    } = this.state;

    const productIndex = productos_especiales.findIndex(
      p => p.id === producto_seleccionado
    );

    productos_especiales[productIndex].precio = precio_especial;
    productos_especiales[productIndex].actualizado = true;

    this.setState({
      id_producto: '',
      precio_especial: '',
      producto_seleccionado: '',
      nuevo_producto_nombre: '',
      editMode: false
    });
  };

  onEditSpecialProductPriceClick = producto => {
    const { precio, id } = producto;

    this.setState({
      id_producto: id,
      precio_especial: precio,
      producto_seleccionado: id,
      editMode: true
    });
  };

  onDeleteSpecialProductPrice = producto => {
    const { productos_especiales } = this.state;

    const productIndex = productos_especiales.findIndex(
      p => p.id.toString() === producto.id
    );

    delete productos_especiales[productIndex].actualizado;

    productos_especiales[productIndex].eliminado = true;

    this.setState({
      id_producto: '',
      precio_especial: ''
    });
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {};

  render() {
    const {
      codigo,
      ubicacion,
      proveedor,
      id_producto,
      imagen,
      precio_especial,
      productos_especiales
    } = this.state;

    const { products } = this.props.products;

    const productsOptions = [];

    products.forEach(product => {
      productsOptions.push({
        value: product.id,
        label: product.nombre
      });
    });

    return (
      <React.Fragment>
        <NewNavbar active_nav={'PEDIDOS'}>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Nuevo Pedido
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right'>
              <li>
                <a
                  href='#!'
                  className='tooltipped'
                  data-position='left'
                  data-tooltip='Ver Todos'
                >
                  <i className='material-icons'>group</i>
                </a>
              </li>

              <li>
                <a
                  href='#!'
                  className='tooltipped'
                  data-position='left'
                  data-tooltip='Buscar'
                >
                  <i className='material-icons'>search</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <main>
          <div className='row'>
            <div className='col s12'>
              <div className='card'>
                <div className='card-content'>
                  <div className='row'>
                    <div className='col s12'>
                      <form onSubmit={this.onSubmit}>
                        <div className='d-block'>
                          <h5>Agregar Productos</h5>
                          <button
                            className='modal-trigger btn-floating'
                            data-target='modal_agregar_precio_producto'
                            onClick={this.onAddSpecialProductPriceClick}
                          >
                            <i className='material-icons'>add</i>
                          </button>
                        </div>

                        <div
                          className='modal'
                          id='modal_agregar_precio_producto'
                        >
                          {this.props.products.loading && <Spinner fullWidth />}
                          <div>
                            <div className='modal-content center'>
                              <h5>Agregar Productos</h5>
                              {this.state.editMode ? (
                                <div className='row'>
                                  <TextInputField
                                    id='precio_especial'
                                    label='Precio Especial'
                                    onchange={this.onChangeTextInput}
                                    value={precio_especial}
                                    active_label={true}
                                  />
                                </div>
                              ) : (
                                <div>
                                  <div className='row'>
                                    <SelectInputField
                                      id='id_producto'
                                      label='Producto'
                                      onchange={this.onChangeTextInput}
                                      value={id_producto}
                                      options={productsOptions}
                                    />
                                  </div>
                                  <div className='row'>
                                    <TextInputField
                                      id='precio_especial'
                                      label='Precio Especial'
                                      onchange={this.onChangeTextInput}
                                      value={precio_especial}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className='modal-footer'>
                              <a
                                href='#!'
                                className='modal-close waves-effect waves-green btn left text-white'
                              >
                                Cerrar
                              </a>
                              <a
                                href='#!'
                                className='modal-close waves-effect waves-green btn text-white mb-1'
                                onClick={
                                  this.state.editMode
                                    ? this.onEditSpecialProductPrice
                                    : this.onAddSpecialProductPrice
                                }
                              >
                                Guardar
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          {productos_especiales.length > 0 ? (
                            <table className='striped table-bordered mt-1'>
                              <thead>
                                <tr>
                                  <th>ID Producto</th>
                                  <th>Nombre</th>
                                  <th>Precio</th>
                                  <th>Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {productos_especiales.map((producto, i) =>
                                  producto.eliminado ? (
                                    ''
                                  ) : (
                                    <tr key={uuid()}>
                                      <td>{producto.id_producto}</td>
                                      <td>{producto.producto_nombre}</td>
                                      <td>{producto.precio}</td>
                                      <td>
                                        <i
                                          onClick={this.onDeleteSpecialProductPrice.bind(
                                            this,
                                            producto
                                          )}
                                          className='material-icons cursor-pointer'
                                        >
                                          delete_sweep
                                        </i>
                                        <i
                                          onClick={this.onEditSpecialProductPriceClick.bind(
                                            this,
                                            producto
                                          )}
                                          data-target='modal_agregar_precio_producto'
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
                        </div>

                        <div className='row'>
                          <TextInputField
                            input_size='s12'
                            id='codigo'
                            label='Codigo de pedido'
                            onchange={this.onChangeTextInput}
                            value={codigo}
                          />
                        </div>

                        <div className='row'>
                          <TextInputField
                            input_size='s12'
                            id='ubicacion'
                            label='Ubicacion'
                            onchange={this.onChangeTextInput}
                            value={ubicacion}
                          />
                        </div>

                        <div className='row'>
                          <TextInputField
                            input_size='s12'
                            id='proveedor'
                            label='Proveedor'
                            onchange={this.onChangeTextInput}
                            value={proveedor}
                          />
                        </div>
                        <div className='d-block center mt-1'>
                          <button className='btn' type='submit'>
                            Guardar{' '}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product
});

export default connect(
  mapStateToProps,
  { getProducts }
)(NewOrder);
