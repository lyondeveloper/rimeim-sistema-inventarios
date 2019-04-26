import React, { Component } from 'react';
import uuid from 'uuid';

import { EDIT_PROVIDER } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';

import LogoRimeim from '../../../public/img/logo_rimeim.png';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields
} from '../../../utils/MaterialFunctions';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import TextInputField from '../../common/TextInputField';
import SelectInputField from '../../common/SelectInputField';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../actions/isEmpty';

import { getProducts } from '../../../actions/productActions';
import { editProvider, getProvider } from '../../../actions/providerActions';

class EditProvider extends Component {
  state = {
    nombre: '',
    rtn: '',
    correo: '',
    contacto: '',
    telefono: '',
    producto_seleccionado: '0',
    id_nuevo_producto: '',
    precio_especial: '0',
    productos: [],
    needs_config_selects: false,
    editMode: false
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    const { id } = this.props.match.params;
    if (id) this.props.getProvider(id);
    this.props.getProducts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors)
      this.setState({
        errors: nextProps.errors
      });

    if (nextProps.products.products) {
      const { products } = nextProps.products;
      products.forEach(product => (product.disabled = false));
      this.setState({
        needs_config_selects: true
      });
    }

    const { provider } = nextProps.providers;

    if (provider) {
      provider.nombre = !isEmpty(provider.nombre) ? provider.nombre : '';
      provider.rtn = !isEmpty(provider.rtn) ? provider.rtn : '';
      provider.correo = !isEmpty(provider.correo) ? provider.correo : '';
      provider.contacto = !isEmpty(provider.contacto) ? provider.contacto : '';
      provider.telefono = !isEmpty(provider.telefono) ? provider.telefono : '';
      provider.productos = !isEmpty(provider.productos)
        ? provider.productos
        : [];

      this.setState({
        nombre: provider.nombre,
        rtn: provider.rtn,
        correo: provider.correo,
        contacto: provider.contacto,
        telefono: provider.telefono,
        productos: provider.productos
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

    const { productos, precio_especial, id_nuevo_producto } = this.state;

    const productIndex = products.findIndex(p => p.id === id_nuevo_producto);

    const productData = {
      id_producto: products[productIndex].id,
      nombre: products[productIndex].nombre,
      precio: products[productIndex].precio,
      precio_especial
    };

    productos.push(productData);

    this.setState({
      producto_seleccionado: id_nuevo_producto,
      precio_especial: '0',
      needs_config_selects: false
    });
  };

  onAddProductClick = () => {
    this.setState({
      producto_seleccionado: '',
      id_nuevo_producto: '',
      precio_especial: '0'
    });
  };

  onEditProductClick = producto => {
    const { precio_especial, id_producto } = producto;

    this.setState({
      id_nuevo_producto: id_producto,
      producto_seleccionado: id_producto,
      precio_especial,
      editMode: true
    });
  };

  onEditProduct = () => {
    const {
      productos,
      producto_seleccionado,
      precio_especial,
      id_nuevo_producto
    } = this.state;

    const productIndex = productos.findIndex(
      p => p.id_producto === producto_seleccionado
    );

    productos[productIndex].id_producto = id_nuevo_producto;
    productos[productIndex].precio_especial = precio_especial;
    productos[productIndex].nombre = precio_especial;
    productos[productIndex].actualizado = true;

    this.setState({
      id_nuevo_producto: '',
      producto_seleccionado: '',
      precio_especial: '0',
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
      id_nuevo_producto: '',
      producto_seleccionado: '',
      precio_especial: '0'
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const providerData = {
      nombre: this.state.nombre,
      rtn: this.state.rtn,
      contacto: this.state.contacto,
      correo: this.state.correo,
      telefono: this.state.telefono,
      productos: this.state.productos
    };

    this.props.addProvider(providerData, this.props.history);
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      nombre,
      rtn,
      correo,
      contacto,
      telefono,
      producto_seleccionado,
      productos,
      precio_especial
    } = this.state;

    const productsOptions = [];

    const { products } = this.props.products;

    const { loading } = this.props.providers;

    products.forEach(product => {
      productsOptions.push({
        value: product.id,
        label: product.nombre
      });
    });

    let providerContent;

    if (loading) providerContent = <Spinner fullWidth />;
    else {
      providerContent = (
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
                      active_label={true}
                    />
                  </div>
                  <div className='row'>
                    <TextInputField
                      id='rtn'
                      label='RTN'
                      onchange={this.onChangeTextInput}
                      value={rtn}
                      active_label={true}
                    />
                  </div>

                  <div className='row'>
                    <TextInputField
                      id='correo'
                      type='email'
                      label='Correo'
                      onchange={this.onChangeTextInput}
                      value={correo}
                      active_label={true}
                    />
                  </div>
                  <div className='row'>
                    <TextInputField
                      id='contacto'
                      label='Contacto'
                      onchange={this.onChangeTextInput}
                      value={contacto}
                      active_label={true}
                    />
                  </div>

                  <div className='row'>
                    <TextInputField
                      id='telefono'
                      label='Telefono'
                      onchange={this.onChangeTextInput}
                      value={telefono}
                      active_label={true}
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
                            <th>Precio Original</th>
                            <th>Precio Especial</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productos.map((producto, i) =>
                            producto.eliminado ? (
                              ''
                            ) : (
                              <tr key={uuid()}>
                                <td>{producto.id_producto}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.precio_especial}</td>
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

                                  <i
                                    className='material-icons cursor-pointer modal-trigger center'
                                    data-target='modal_agregar_productos'
                                    onClick={this.onEditProductClick.bind(
                                      this,
                                      producto
                                    )}
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

                  <div className='center mt-1'>
                    <button className='btn'>Guardar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <Navbar navtype={EDIT_PROVIDER} />

        <main>
          {providerContent}
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
                id='precio_especial'
                label='Precio Especial'
                onchange={this.onChangeTextInput}
                value={precio_especial}
                active_label={true}
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
                  onClick={
                    this.state.editMode ? this.onEditProduct : this.onAddProduct
                  }
                >
                  Guardar
                </a>
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
  { getProducts, editProvider, getProvider }
)(withRouter(EditProvider));
