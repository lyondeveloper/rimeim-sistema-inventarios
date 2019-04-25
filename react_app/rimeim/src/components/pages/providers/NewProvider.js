import React, { Component } from 'react';

import { NEW_PROVIDER } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';

import LogoRimeim from '../../../public/img/logo_rimeim.png';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields,
  getModalInstanceById
} from '../../../utils/MaterialFunctions';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import TextInputField from '../../common/TextInputField';
import SelectInputField from '../../common/SelectInputField';
import Spinner from '../../common/Spinner';

import { getProducts } from '../../../actions/productActions';
import { addProvider, editProvider } from '../../../actions/providerActions';

class NewProvider extends Component {
  state = {
    nombre: '',
    rtn: '',
    correo: '',
    contacto: '',
    producto_seleccionado: '0',
    producto_precio_especial: '0',
    productos: [],
    needs_config_selects: false
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getProducts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors)
      this.setState({
        errors: nextProps.errors
      });

    if (nextProps.products.products && this.state.productos.length === 0) {
      const { products } = nextProps.products;
      products.forEach(product => (product.disabled = false));
      this.setState({
        needs_config_selects: true
      });
    }
  }
  componentDidUpdate() {
    if (this.state.needs_config_selects) {
      configSelectInputFields();
      this.setState({
        needs_config_selects: false
      });
    }
  }

  onAddProduct = e => {
    e.preventDefault();
    const { products } = this.props.products;

    const {
      producto_seleccionado,
      productos,
      producto_precio_especial
    } = this.state;

    const productIndex = products.findIndex(
      p => p.id.toString() === producto_seleccionado
    );

    const productData = {
      ...products[productIndex],
      producto_precio_especial
    };

    productos.push(productData);

    this.setState({
      producto_precio: '0',
      needs_config_selects: false
    });
  };

  onAddProductClick = () => {
    this.setState({
      producto_nombre: '',
      producto_precio: '0',
      producto_descripcion: '',
      producto_codigo: '0',
      needs_config_selects: true
    });
  };

  onDeleteProduct = producto => {
    const { productos } = this.state;

    const productIndex = productos.findIndex(p => p.id === producto.id);

    productos.splice(productIndex, 1);

    this.setState({
      producto_nombre: '',
      producto_codigo: '',
      producto_descripcion: '',
      producto_precio: ''
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const providerData = {
      nombre: this.state.nombre,
      rtn: this.state.rtn,
      contacto: this.state.contacto,
      correo: this.state.correo,
      productos: this.state.productos
    };
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      nombre,
      rtn,
      correo,
      contacto,
      producto_seleccionado,
      productos,
      producto_precio_especial
    } = this.state;

    const productsOptions = [];

    const { products } = this.props.products;

    products.forEach(product => {
      productsOptions.push({
        value: product.id,
        label: product.nombre
      });
    });

    return (
      <React.Fragment>
        <Navbar navtype={NEW_PROVIDER} />
        <main>
          <div className='row'>
            <div className='col s12'>
              <div className='card'>
                <div className='card-content'>
                  <form className='' onSubmit={this.onSubmit}>
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

                    <div className='col s12 center mb-1'>
                      <h5>Productos</h5>
                      <button
                        className='btn-floating modal-trigger'
                        data-tooltip='Agregar'
                        data-target='modal_agregar_productos'
                        onClick={this.onAddProductClick}
                      >
                        <i className='material-icons'>add</i>
                      </button>
                    </div>

                    <div className='row center'>
                      {productos.length > 0 ? (
                        <table className='striped table-bordered'>
                          <thead>
                            <tr>
                              <th>Nombre</th>
                              <th>Precio</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productos.map((producto, i) => (
                              <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>
                                <td>
                                  <i
                                    className='material-icons cursor-pointer center'
                                    onClick={this.onDeleteProduct.bind(
                                      this,
                                      producto
                                    )}
                                  >
                                    delete_sweep
                                  </i>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        ''
                      )}
                    </div>

                    <div className='modal' id='modal_agregar_productos'>
                      <div className='modal-content'>
                        {this.props.products.loading && <Spinner fullWidth />}
                        <SelectInputField
                          id='producto_seleccionado'
                          label='Producto'
                          value={producto_seleccionado}
                          onchange={this.onChangeTextInput}
                          options={productsOptions}
                        />

                        <TextInputField
                          id='producto_precio_especial'
                          label='Precio Especial'
                          onchange={this.onChangeTextInput}
                          value={producto_precio_especial}
                        />

                        <div className='modal-footer'>
                          <a
                            href='#!'
                            className='modal-close waves-effect waves-green btn left text-white'
                          >
                            Cerrar
                          </a>
                          <a
                            href='#!'
                            className='modal-close waves-effect waves-green btn text-white'
                            onClick={this.onAddProduct}
                          >
                            Agregar
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className='center mt-1'>
                      <button className='btn'>Guardar</button>
                    </div>
                  </form>
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
  providers: state.provider,
  products: state.product,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProducts, addProvider }
)(withRouter(NewProvider));
