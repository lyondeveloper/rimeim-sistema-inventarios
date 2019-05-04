import React, { Component } from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';

import Spinner from '../../common/Spinner';
import SelectInputField from '../../common/SelectInputField';
import TextInputField from '../../common/TextInputField';
import { configSelectInputFields } from '../../../utils/MaterialFunctions';

import { getProviders } from '../../../actions/providerActions';
import { searchProduct } from '../../../actions/productActions';

class SearchProductProvider extends Component {
  state = {
    modal_id: 'modal_agregar_productos_proveedor',
    field: '',
    id_proveedor: '',
    productos: [],
    productos_seleccionados: [],
    cantidad: '',
    needs_config_selects: false,
    editMode: false,
    searching: false,
    typing: false,
    typingTimeout: 0,
    errors: {}
  };

  componentDidMount() {
    this.props.getProviders();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors)
      this.setState({
        errors: nextProps.errors
      });
    if (nextProps.providers.providers) {
      const { providers } = nextProps.providers;
      providers.forEach(provider => (provider.disabled = false));
      this.setState({
        needs_config_selects: true,
        searching: false
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

    const { products } = this.props.products;

    if (products.length > 0) {
      this.props.cleanProducts();
    }

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

    const { productsProps } = this.props;

    //Chequeando cual array estamos trabajando, si es de props, estamos en EditarPedido usando el array que nos sale de la API para agregar nuevos productos, si no, estamos en NuevoPedido usando el array del state normal
    if (productsProps !== undefined) {
      const selecteds = productos_seleccionados.filter(
        p => p.seleccionado === true
      );
      selecteds.forEach(product => {
        const productData = {
          id: product.id,
          id_producto: product.id_producto,
          cantidad,
          costo: product.precio,
          nombre: product.nombre,
          es_compra: false
        };

        productsProps.push(productData);
      });
    } else {
      const selecteds = productos_seleccionados.filter(
        p => p.seleccionado === true
      );

      selecteds.forEach(product => {
        const productData = {
          id_producto: product.id,
          cantidad,
          costo: product.precio,
          nombre: product.nombre,
          es_compra: false
        };

        productos.push(productData);

        //Pasamos datos nuevos usando metodo del componente padre
        this.props.onPassProductsData(productos);
      });
    }

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

    const { productsProps } = this.props;

    //Chequeando cual array estamos trabajando, si es de props, estamos en EditarPedido usando el array que nos sale de la API para editar productos existentes, si no, estamos en NuevoPedido usando el array del state normal
    if (productsProps !== undefined) {
      //Definiendo la posicion del objeto que editaremos
      const productIndex = productsProps.findIndex(
        p => p.id_producto === producto_seleccionado.id_producto
      );

      //Actualizando sus valores
      productsProps[productIndex].cantidad = cantidad;
      productsProps[productIndex].actualizado = true;
    } else {
      //Definiendo la posicion del objeto que editaremos
      const productIndex = productos.findIndex(
        p => p.id_producto === producto_seleccionado.id_producto
      );

      //Actualizando sus valores
      productos[productIndex].cantidad = cantidad;
      productos[productIndex].actualizado = true;

      this.props.onPassProductsData(productos);
    }

    this.setState({
      producto_seleccionado: {},
      cantidad: '',
      editMode: false
    });
  };

  //Metodo para eliminar productos del array
  onDeleteProduct = producto => {
    const { productos } = this.state;

    const { productsProps } = this.props;

    //Chequeando cual array estamos trabajando, si es de props, estamos en EditarPedido usando el array que nos sale de la API para eliminar productos, si no, estamos en NuevoPedido usando el array del state normal
    if (productsProps !== undefined) {
      //Definimos posicion del producto a eliminar
      const productPropsIndex = productsProps.findIndex(
        p => p.id === producto.id
      );

      productsProps[productPropsIndex].eliminado = true;
    } else {
      //Definimos posicion del producto a eliminar
      const productIndex = productos.findIndex(
        p => p.id_producto === producto.id
      );

      productos[productIndex].eliminado = true;
    }

    this.setState({
      id_producto: '',
      cantidad: ''
    });
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      productos,
      id_proveedor,
      searching,
      cantidad,
      field,
      modal_id
    } = this.state;

    const { providers, loading } = this.props.providers;

    const { products, productsProps } = this.props;

    const providersOptions = [];

    providers.map(provider => {
      providersOptions.push({
        value: provider.id,
        label: provider.nombre
      });
    });

    let providerContent;

    let searchResult;

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
      providerContent = <Spinner fullWidth />;
    } else {
      providerContent = (
        <React.Fragment>
          <div className='row'>
            <SelectInputField
              input_size='s12'
              id='id_proveedor'
              label='Proveedor'
              onchange={this.onChangeTextInput}
              options={providersOptions}
              value={id_proveedor}
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
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {providerContent}
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
                    id='id_proveedor'
                    label='ID de Proveedor'
                    value={id_proveedor}
                    onchange={this.onChangeSearchProductInput}
                    active_label={id_proveedor ? true : false}
                  />
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  providers: state.provider,
  products: state.product
});

export default connect(
  mapStateToProps,
  { getProviders, searchProduct }
)(SearchProductProvider);
