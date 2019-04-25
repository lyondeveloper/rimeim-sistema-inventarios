import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from "uuid"
import {
  createClient,
  getClient,
  addSpecialProductPrice
} from '../../../actions/clientActions';

import { getProducts } from '../../../actions/productActions';

import { NEW_CLIENT } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';

import { withRouter } from 'react-router-dom';

import LogoRimeim from '../../../public/img/logo_rimeim.png';

import isEmpty from '../../../actions/isEmpty';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields
} from '../../../utils/MaterialFunctions';

import Spinner from '../../common/Spinner';

import TextInputField from '../../common/TextInputField';
import CheckInputField from '../../common/CheckInputField';
import SelectInputField from '../../common/SelectInputField';

class NewClient extends Component {
  state = {
    nombre: '',
    rtn: '',
    correo: '',
    contacto: '',
    telefono: '',
    codigo: '',
    es_empresa: false,
    id_producto: '',
    producto_seleccionado: '',
    precio_especial: '',
    editar_precio: false,
    productos_especiales: [],
    needs_config_selects: false,
    errors: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getProducts();
  }

  componentDidUpdate() {
    if (this.state.needs_config_selects) {
      configSelectInputFields();
      this.setState({
        needs_config_selects: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    const { products } = nextProps.products;

    if (products && this.state.productos_especiales.length === 0) {
      products.forEach(product => (product.disabled = false));
      this.setState({
        needs_config_selects: true
      });
    }
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

    const { productos_especiales, id_producto, precio_especial } = this.state;

    const productData = {
      id_producto: id_producto,
      precio: precio_especial
    };

    productos_especiales.push(productData);

    this.setState({
      id_producto: '',
      precio_especial: '',
      producto_seleccionado: ''
    });
  };

  onEditSpecialProductPrice = producto => {
    const {
      id_producto,
      precio_especial,
      productos_especiales,
      producto_seleccionado
    } = this.state;

    const productIndex = productos_especiales.findIndex(
      p => p.id === producto_seleccionado
    );

    productos_especiales[productIndex].id = id_producto;
    productos_especiales[productIndex].precio = precio_especial;
    productos_especiales[productIndex].actualizado = true;

    this.setState({
      id_producto: '',
      precio_especial: '',
      producto_seleccionado: '',
      editar_precio: false
    });
  };

  onEditSpecialProductPriceClick = producto => {
    const { precio, id } = producto;

    this.setState({
      id_producto: id,
      precio_especial: precio,
      producto_seleccionado: id,
      editar_precio: true
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

  onSubmit = e => {
    e.preventDefault();

    const {
      nombre,
      rtn,
      correo,
      contacto,
      telefono,
      codigo,
      es_empresa,
      productos_especiales
    } = this.state;

    const clientData = {
      nombre,
      rtn,
      correo,
      contacto,
      telefono,
      codigo,
      es_empresa,
      precios_productos: productos_especiales
    };

    this.props.createClient(clientData, this.props.history, '/clientes');
  };

  render() {
    const {
      nombre,
      rtn,
      correo,
      contacto,
      telefono,
      codigo,
      es_empresa,
      id_producto,
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
        <Navbar navtype={NEW_CLIENT} />
        <main>
          <div className='row'>
            <div className='col s12'>
              <div className='card '>
                <div className='card-content'>
                  <div className='row'>
                    <div className='col s12 m12 center'>
                      <img
                        src={LogoRimeim}
                        className='responsive-img bordered'
                        alt=''
                      />
                      <div className='d-block'>
                        <button className='btn'>Cambiar</button>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col s12 m12'>
                      <form onSubmit={this.onSubmit}>
                        <div className='row'>
                          <TextInputField
                            id='nombre'
                            label='Nombre'
                            onchange={this.onChangeTextInput}
                            value={nombre}
                          />
                        </div>
                        <div className='row'>
                          <TextInputField
                            id='rtn'
                            label='RTN'
                            onchange={this.onChangeTextInput}
                            value={rtn}
                          />
                        </div>
                        <div className='row'>
                          <TextInputField
                            id='correo'
                            type='email'
                            label='Correo'
                            onchange={this.onChangeTextInput}
                            value={correo}
                          />
                        </div>
                        <div className='row'>
                          <TextInputField
                            id='contacto'
                            label='Contacto'
                            onchange={this.onChangeTextInput}
                            value={contacto}
                          />
                        </div>
                        <div className='row'>
                          <TextInputField
                            id='telefono'
                            label='Telefono'
                            onchange={this.onChangeTextInput}
                            value={telefono}
                          />
                        </div>
                        <div className='row'>
                          <TextInputField
                            id='codigo'
                            label='Codigo'
                            onchange={this.onChangeTextInput}
                            value={codigo}
                          />
                        </div>
                        <div className='row'>
                          <CheckInputField
                            id='es_empresa'
                            checked={es_empresa}
                            onchange={this.onChangeTextInput}
                            label='Es empresa'
                          />
                        </div>
                        <div className='col s12 center mb-1'>
                          <div className='d-block'>
                            <h5>Precio Especial a Producto</h5>
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
                            {this.props.products.loading && (
                              <Spinner fullWidth />
                            )}
                            <div>
                              <div className='modal-content center'>
                                <h5>Precio Especial a Producto</h5>
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
                                    this.state.editar_precio
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
  clients: state.client,
  products: state.product,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createClient, getClient, getProducts, addSpecialProductPrice }
)(withRouter(NewClient));
