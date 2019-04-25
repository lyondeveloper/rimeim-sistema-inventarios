import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createClient,
  editClient,
  getClient,
  addSpecialProductPrice
} from '../../../actions/clientActions';

import { getProducts } from '../../../actions/productActions';

import { EDIT_CLIENT } from '../../layout/NavTypes';
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

class EditClient extends Component {
  state = {
    nombre: '',
    rtn: '',
    correo: '',
    contacto: '',
    telefono: '',
    codigo: '',
    es_empresa: false,
    id_producto: '',
    precio: '',
    producto_seleccionado: '',
    productos_especiales: [],
    editar_precio: false,
    needs_config_selects: false,
    errors: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    const { id } = this.props.match.params;
    if (id) this.props.getClient(id);
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

    const { client } = nextProps.clients;

    const { products } = nextProps.products;

    if (products && this.state.productos_especiales.length === 0) {
      products.forEach(product => (product.disabled = false));
      this.setState({
        needs_config_selects: true
      });
    }

    if (client) {
      client.nombre = !isEmpty(client.nombre) ? client.nombre : '';
      client.rtn = !isEmpty(client.rtn) ? client.rtn : '';
      client.correo = !isEmpty(client.correo) ? client.correo : '';
      client.contacto = !isEmpty(client.contacto) ? client.contacto : '';
      client.telefono = !isEmpty(client.telefono) ? client.telefono : '';
      client.codigo = !isEmpty(client.codigo) ? client.codigo : '';
      client.es_empresa = !isEmpty(client.es_empresa) ? client.es_empresa : '';
      client.precios_productos = !isEmpty(client.precios_productos)
        ? client.precios_productos
        : [];

      this.setState({
        nombre: client.nombre,
        rtn: client.rtn,
        correo: client.correo,
        contacto: client.contacto,
        telefono: client.telefono,
        codigo: client.codigo,
        es_empresa: client.es_empresa,
        productos_especiales: client.precios_productos
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
      precio: '',
      producto_seleccionado: ''
    });
  };

  onAddSpecialProductPrice = e => {
    e.preventDefault();

    const { productos_especiales, id_producto, precio } = this.state;

    const productData = {
      id_producto,
      precio
    };

    productos_especiales.push(productData);

    this.setState({
      id_producto: '',
      precio: '',
      producto_seleccionado: ''
    });
  };

  onEditSpecialProductPrice = producto => {
    const {
      id_producto,
      precio,
      productos_especiales,
      producto_seleccionado
    } = this.state;

    const productIndex = productos_especiales.findIndex(
      p => p.id_producto === producto_seleccionado
    );

    productos_especiales[productIndex].id_producto = id_producto;
    productos_especiales[productIndex].precio = precio;
    productos_especiales[productIndex].actualizado = true;

    this.setState({
      id_producto: '',
      precio: '',
      producto_seleccionado: '',
      editar_precio: false
    });
  };

  onEditSpecialProductPriceClick = producto => {
    const { precio, id_producto } = producto;

    this.setState({
      id_producto,
      precio: precio,
      producto_seleccionado: id_producto,
      editar_precio: true
    });
  };

  onDeleteSpecialProductPrice = producto => {
    const { productos_especiales } = this.state;

    const productIndex = productos_especiales.findIndex(
      p => p.id.toString() === producto.id_producto
    );

    delete productos_especiales[productIndex].actualizado;

    productos_especiales[productIndex].eliminado = true;

    this.setState({
      id_producto: '',
      precio: ''
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { id } = this.props.match.params;

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

    this.props.editClient(clientData, id, this.props.history, '/clientes');
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
      precio,
      productos_especiales
    } = this.state;

    const { loading } = this.props.clients;

    const { products } = this.props.products;

    const { id } = this.props.match.params;

    const productsOptions = [];

    products.forEach(product => {
      productsOptions.push({
        value: product.id,
        label: product.nombre
      });
    });

    let newClientContent;

    if (loading && id) {
      newClientContent = <Spinner fullWidth />;
    } else {
      newClientContent = (
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
                      <div className='row'>
                        <TextInputField
                          id='codigo'
                          label='Codigo'
                          onchange={this.onChangeTextInput}
                          value={codigo}
                          active_label={true}
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
                            data-target='modal_editar_precio_producto'
                            onClick={
                              this.state.editar_precio
                                ? this.onEditSpecialProductPriceClick
                                : this.onAddSpecialProductPriceClick
                            }
                          >
                            <i className='material-icons'>add</i>
                          </button>
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
                                    undefined
                                  ) : (
                                    <tr key={producto.id_producto}>
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
                                          data-target='modal_editar_precio_producto'
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
                            undefined
                          )}
                        </div>
                      </div>
                      <div className='d-block center mt-1'>
                        <button className='btn' type='submit'>
                          Guardar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <Navbar navtype={EDIT_CLIENT} />
        <main>{newClientContent}</main>

        <div className='modal' id='modal_editar_precio_producto'>
          {this.props.products.loading && <Spinner fullWidth />}

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
                id='precio'
                label='Precio'
                onchange={this.onChangeTextInput}
                value={precio}
                active_label={true}
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
  { createClient, editClient, getClient, getProducts, addSpecialProductPrice }
)(withRouter(EditClient));
