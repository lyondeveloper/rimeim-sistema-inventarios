import React, { Component } from 'react';
import uuid from 'uuid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  configSelectInputFields,
  configModals
} from '../../../utils/MaterialFunctions';

import Spinner from '../../common/Spinner';
import SelectInputField from '../../common/SelectInputField';
import TextInputField from '../../common/TextInputField';

import { getProviders } from '../../../actions/providerActions';
import { createOrder } from '../../../actions/orderActions';
import { searchProduct } from '../../../actions/productActions';
import { getLocals } from '../../../actions/LocalActions';

class AddOrderToProvider extends Component {
  state = {
    modal_id: 'modal_agregar_productos_proveedor',
    modal_distribucion_id: 'modal_agregar_distribucion_proveedor',
    field: '',
    id_proveedor: '',
    cantidad: '',
    fecha_entrega: '',
    codigo: '',
    productos: [],
    distribucion: [],
    productos_seleccionados: [],
    needs_config_selects: false,
    needs_config_modals: true,
    editMode: false,
    searching: false,
    typing: false,
    typingTimeout: 0,
    errors: {}
  };

  componentDidMount() {
    this.props.getProviders();
    this.props.getLocals();
    if (this.state.needs_config_modals) {
      configModals();
      this.setState({
        needs_config_modals: false
      });
    }
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
        needs_config_selects: true,
        searching: false
      });
    }

    if (nextProps.providers.providers) {
      const { providers } = nextProps.providers;
      providers.forEach(provider => (provider.disabled = false));
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

  //Metodo para escribir un producto y despues de un retraso, empiece a buscar el producto
  onChangeSearchProductInput = e => {
    if (this.state.typingTimeout) {
      this.setState({ searching: true });
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      field: e.target.value,
      typing: false,
      typingTimeout: setTimeout(() => {
        this.props.searchProduct({
          field: this.state.field,
          id_proveedor: this.state.id_proveedor
        });
      }, 500)
    });
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onChangeDistributionText = (e, dis) => {
    const { distribucion } = this.state;

    const index = distribucion.findIndex(d => d.id === dis.id);

    this.setState({
      [e.target.name[index]]: e.target.value[index]
    });
  };

  //Metodo para seleccionar producto con checkbox
  onSelectProduct = producto => {
    const { productos_seleccionados } = this.state;

    //Chequeamos en que array estamos, si en los props o en el normal
    const productIndex = productos_seleccionados.findIndex(
      p => p.id === producto.id
    );

    if (productIndex >= 0) {
      if (producto.seleccionado) producto.seleccionado = false;
      else producto.seleccionado = true;
    } else {
      producto.seleccionado = true;

      productos_seleccionados.push(producto);
    }

    document.getElementById(`${producto.id}`).checked = producto.seleccionado;

    this.setState({
      productos_seleccionados
    });
  };

  onCloseProviderModal = () => {
    this.setState({
      typing: false,
      typingTimeout: 0,
      searching: false,
      field: '',
      cantidad: '',
      productos: [],
      id_proveedor: ''
    });
  };

  //Metodo para que cuando demos click a agregar productos, el state este limpio
  onAddProductClick = e => {
    e.preventDefault();
    this.setState({
      producto_seleccionado: {},
      field: '',
      cantidad: '',
      editMode: false,
      typing: false,
      typingTimeout: 0
    });
  };

  //Metodo para agregar productos a nuestro array
  onAddProduct = e => {
    e.preventDefault();

    const { productos, cantidad, productos_seleccionados } = this.state;

    const selecteds = productos_seleccionados.filter(
      p => p.seleccionado === true
    );

    selecteds.forEach(product => {
      const productData = {
        id_producto: product.id,
        cantidad,
        costo: product.precio,
        nombre: product.nombre
      };

      productos.push(productData);
    });

    this.setState({
      productos_seleccionados: [],
      cantidad: ''
    });
  };

  //Metodo para que cuando le demos click a editar un producto, se coloque toda la data en los TextInputField
  onEditProductClick = producto => {
    this.setState({
      producto_seleccionado: producto,
      cantidad: producto.cantidad,
      productPosition: producto.id,
      editMode: true
    });
  };

  //Metodo para editar productos en nuestro array
  onEditProduct = () => {
    const { productos, producto_seleccionado, cantidad } = this.state;

    //Definiendo la posicion del objeto que editaremos
    const productIndex = productos.findIndex(
      p => p.id_producto === producto_seleccionado.id_producto
    );

    //Actualizando sus valores
    productos[productIndex].cantidad = cantidad;
    productos[productIndex].actualizado = true;

    this.setState({
      producto_seleccionado: {},
      cantidad: '',
      editMode: false
    });
  };

  //Metodo para eliminar productos del array
  onDeleteProduct = producto => {
    const { productos } = this.state;

    //Definimos posicion del producto a eliminar
    const productIndex = productos.findIndex(
      p => p.id_producto === producto.id_producto
    );

    productos[productIndex].eliminado = true;

    this.setState({
      id_producto: '',
      cantidad: ''
    });
  };

  //Adding distribution

  onAddDistribution = () => {};

  onSubmit = e => {
    e.preventDefault();

    const { codigo, fecha_entrega, productos, id_proveedor } = this.state;

    const orderData = {
      id_proveedor,
      codigo,
      fecha_entrega,
      productos
    };

    this.props.createOrder(orderData, this.props.history);
  };

  render() {
    const {
      productos,
      id_proveedor,
      searching,
      cantidad,
      field,
      codigo,
      fecha_entrega,
      distribucion,
      modal_id,
      modal_distribucion_id
    } = this.state;

    const { providers, loading } = this.props.providers;

    const { products } = this.props;

    const { locals } = this.props.locals;

    const providerOptions = [];

    providers.map(provider => {
      providerOptions.push({
        value: provider.id,
        label: provider.nombre
      });
    });

    locals.map((local, i) => {
      distribucion.push({
        nombre: local.nombre,
        cantidad: ''
      });
    });

    let providerOrderContent;
    let searchResult;
    let localContent;

    //Contenido del buscador, si esta en modo searching o en loading, mostrara spinner y cuando ya llegue la data, la mostrara o no dependiendo de cual haya sido el resultado
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
                  <label
                    onClick={() => {
                      this.onSelectProduct(producto);
                    }}
                  >
                    <input
                      type='checkbox'
                      className='filled-in'
                      id={`${producto.id}`}
                      defaultChecked={producto.seleccionado}
                      readOnly={true}
                    />
                    {/* NO QUITAR */}
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

    if (loading) {
      providerOrderContent = <Spinner fullWidth />;
    } else {
      providerOrderContent = (
        <React.Fragment>
          <div className='row'>
            <SelectInputField
              input_size='s12'
              id='id_proveedor'
              label='Proveedor'
              onchange={this.onChangeTextInput}
              value={id_proveedor}
              options={providerOptions}
            />
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
              type='date'
              input_size='s12'
              id='fecha_entrega'
              label='Fecha de Entrega de Pedido'
              onchange={this.onChangeTextInput}
              value={fecha_entrega}
            />
          </div>
          <div className='d-block center'>
            <h5>Agregar Productos</h5>
            <button
              className='modal-trigger btn-floating'
              data-target={modal_id}
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
                          data-target={modal_id}
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

          <div className='d-block center'>
            <h5>Agregar Distribucion</h5>
            <button
              className='modal-trigger btn-floating'
              data-target={modal_distribucion_id}
            >
              <i className='material-icons'>add</i>
            </button>
          </div>

          <div className='d-block center mt-1'>
            <button className='btn' type='submit'>
              Guardar{' '}
            </button>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>{providerOrderContent}</form>

        {/* AGREGAR PRODUCTOS MODAL */}
        <div className='modal' id={modal_id}>
          <div className='modal-content'>
            <h5>Agregar Productos de Proveedor</h5>
            <div className='row'>
              {this.state.editMode ? (
                <TextInputField
                  id='cantidad'
                  label='Cantidad'
                  onchange={this.onChangeTextInput}
                  value={cantidad}
                  active_label={cantidad ? true : false}
                />
              ) : (
                <React.Fragment>
                  <TextInputField
                    id='field'
                    label='Parametro de Busqueda (ID o Nombre de Producto)'
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
                </React.Fragment>
              )}
            </div>
          </div>
          <div className='modal-footer'>
            <a
              href='#!'
              className='modal-close waves-effect waves-green btn text-white'
              onClick={this.onCloseProviderModal}
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

        {/* AGREGAR DISTRIBUCION MODAL */}
        <div className='modal' id={modal_distribucion_id}>
          <div className='modal-content'>
            <h5>Agregar Distribucion de Productos</h5>

            {distribucion.map((dis, i) => (
              <React.Fragment>
                <div className='row'>
                  <TextInputField
                    id={'cantidad'}
                    label={`Para ${dis.nombre}`}
                    onchange={this.onChangeDistributionText.bind(this, dis)}
                    value={dis.cantidad}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className='modal-footer'>
            <a
              href='#!'
              className='modal-close waves-effect waves-green btn text-white'
              onClick={this.onCloseProviderModal}
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
  providers: state.provider,
  products: state.product,
  locals: state.local,
  orders: state.order
});

export default connect(
  mapStateToProps,
  { getProviders, searchProduct, createOrder, getLocals }
)(withRouter(AddOrderToProvider));
