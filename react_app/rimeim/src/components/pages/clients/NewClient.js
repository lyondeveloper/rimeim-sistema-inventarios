import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

import { createClient, getClient } from '../../../actions/clientActions';
import { searchProduct } from '../../../actions/productActions';

import NewNavbar from '../../layout/NewNavbar';

import { withRouter, Link } from 'react-router-dom';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields
} from '../../../utils/MaterialFunctions';

import Spinner from '../../common/Spinner';
import TextInputField from '../../common/TextInputField';
import CheckInputField from '../../common/CheckInputField';
import SelectFiles from '../../common/SelectFiles';

class NewClient extends Component {
  state = {
    nombre: '',
    rtn: '',
    correo: '',
    telefono: '',
    codigo: '',
    imagen: null,
    es_empresa: false,
    field: '',
    precio: '',
    producto_seleccionado: {},
    productos_seleccionados: [],
    productos: [],
    editMode: false,
    typing: false,
    typingTimeout: 0,
    searching: false,
    needs_config_selects: false,
    needs_config_modals: true,
    errors: {}
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
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

    if (products) {
      products.forEach(product => (product.disabled = false));
      this.setState({
        needs_config_selects: true,
        searching: false
      });
    }
  }

  onChangeFiles = e => {
    const { files } = e.target;
    let nueva_imagen = null;

    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      var reader = new FileReader();
      reader.onload = result => {
        nueva_imagen = {
          name: file.name,
          url: result.target.result,
          file
        };

        if (i === files.length) {
          this.setState({ imagen: nueva_imagen });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  onDeleteFile = () => {
    this.setState({ imagen: null });
    document.getElementById('imagen').value = null;
  };

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
        this.props.searchProduct({ field: this.state.field });
      }, 500)
    });
  };

  onChangeTextInput = e => {
    if (e.target.name === 'es_empresa') {
      const value = this.state.es_empresa ? false : true;
      return this.setState({ [e.target.name]: value });
    }
    this.setState({ [e.target.name]: e.target.value });
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

    this.setState({ productos_seleccionados });
  };

  onCloseModal = () => {
    this.setState({
      typing: false,
      typingTimeout: 0,
      searching: false,
      field: '',
      precio: '',
      productos: []
    });
  };

  //Metodo para que cuando demos click a agregar productos, el state este limpio
  onAddProductClick = e => {
    e.preventDefault();

    this.setState({
      producto_seleccionado: {},
      typing: false,
      typingTimeout: 0,
      searching: false,
      field: '',
      precio: ''
    });
  };

  //Metodo para agregar productos a nuestro array
  onAddProduct = e => {
    e.preventDefault();

    const { productos, precio, productos_seleccionados } = this.state;

    const selecteds = productos_seleccionados.filter(
      p => p.seleccionado === true
    );

    selecteds.forEach(product => {
      const productData = {
        id_producto: product.id,
        precio,
        nombre: product.nombre
      };

      productos.push(productData);
    });

    this.setState({
      productos_seleccionados: [],
      cantidad: ''
    });
  };

  //Metodo para que cuando le demos click a editar un producto, se coloquen en los TextInputField la data
  onEditProductClick = producto => {
    this.setState({
      producto_seleccionado: producto,
      precio: producto.precio,
      productPosition: producto.id,
      editMode: true
    });
  };

  //Metodo para editar productos en nuestro array
  onEditProduct = () => {
    const { productos, producto_seleccionado, precio } = this.state;

    //Definiendo la posicion del objeto que editaremos
    const productIndex = productos.findIndex(
      p => p.id_producto === producto_seleccionado.id_producto
    );

    //Actualizando sus valores
    productos[productIndex].precio = precio;
    productos[productIndex].actualizado = true;

    this.setState({
      producto_seleccionado: {},
      precio: '',
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

  onSubmit = e => {
    e.preventDefault();

    const {
      nombre,
      rtn,
      correo,
      telefono,
      codigo,
      imagen,
      es_empresa,
      productos
    } = this.state;

    const clientData = {
      nombre,
      rtn,
      correo,
      telefono,
      codigo,
      es_empresa,
      precios_productos: productos
    };

    if (imagen !== null) {
      const newClientData = new FormData();
      newClientData.append('file_uploads[]', imagen.file, imagen.name);
      newClientData.append('json_data', JSON.stringify(clientData));
      this.props.createClient(newClientData, this.props.history, '/clientes');
    } else {
      this.props.createClient(clientData, this.props.history, '/clientes');
    }
  };

  render() {
    const {
      nombre,
      rtn,
      correo,
      telefono,
      codigo,
      es_empresa,
      imagen,
      searching,
      field,
      precio,
      productos,
      errors: { nombre_error }
    } = this.state;

    let searchResult = null;

    const { products, loading } = this.props.products;

    //Contenido del buscador, si esta en modo searching o en loading, mostrara spinner y cuando ya llegue la data, la mostrara o no dependiendo de cual haya sido el resultado
    if (searching || loading) {
      searchResult = <Spinner fullWidth />;
    } else {
      if (products.length > 0) {
        searchResult = (
          <div className='row'>
            <div className='col s12'>
              {products.map((producto, i) => {
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
      } else {
        searchResult = '';
      }
    }

    return (
      <React.Fragment>
        <NewNavbar active_nav='CLIENTES'>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Nuevo Cliente
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>

            <ul className='right'>
              <li>
                <a
                  href='#!'
                  class='tooltipped'
                  data-position='left'
                  data-tooltip='Guardar'
                  onClick={this.onSubmit}
                >
                  <i class='material-icons cursor-pointer'>save</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>
        <main>
          <div className='row'>
            <div className='col s12'>
              <div className='card '>
                <div className='card-content'>
                  <div className='row'>
                    <div className='col s12 m12'>
                      <div className='row'>
                        <SelectFiles
                          id='imagen'
                          files={[imagen]}
                          label='Seleccionar Imagen'
                          onchange={this.onChangeFiles}
                          onDeleteFileClick={this.onDeleteFile}
                        />
                      </div>
                      <div className='row'>
                        <TextInputField
                          id='nombre'
                          label='Nombre'
                          onchange={this.onChangeTextInput}
                          value={nombre}
                          error={nombre_error}
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
                            onClick={this.onAddProductClick}
                          >
                            <i className='material-icons'>add</i>
                          </button>
                        </div>

                        <div className='row'>
                          {productos.length > 0 ? (
                            <table className='striped table-bordered mt-1'>
                              <thead>
                                <tr>
                                  <th>ID Producto</th>
                                  <th>Nombre</th>
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
                                      <td>{producto.nombre}</td>
                                      <td>{producto.precio}</td>
                                      <td>
                                        <i
                                          onClick={this.onDeleteProduct.bind(
                                            this,
                                            producto
                                          )}
                                          className='material-icons cursor-pointer'
                                        >
                                          delete_sweep
                                        </i>
                                        <i
                                          onClick={this.onEditProductClick.bind(
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
                      {/* Modal */}
                      <div className='modal' id='modal_agregar_precio_producto'>
                        <div>
                          <div className='modal-content center'>
                            <h5>Precio Especial a Producto</h5>
                            {this.state.editMode ? (
                              <div className='row'>
                                <TextInputField
                                  id='precio'
                                  label='Precio'
                                  onchange={this.onChangeTextInput}
                                  value={precio}
                                  active_label={true}
                                />
                              </div>
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
                                  id='precio'
                                  label='Precio'
                                  onchange={this.onChangeTextInput}
                                  value={precio}
                                />
                              </React.Fragment>
                            )}
                          </div>
                          <div className='modal-footer'>
                            <a
                              href='#!'
                              className='modal-close waves-effect waves-green btn left text-white'
                              onClick={this.onCloseModal}
                            >
                              Cerrar
                            </a>
                            <a
                              href='#!'
                              className='modal-close waves-effect waves-green btn text-white mb-1'
                              onClick={
                                this.state.editMode
                                  ? this.onEditProduct
                                  : this.onAddProduct
                              }
                            >
                              Guardar
                            </a>
                          </div>
                        </div>
                      </div>
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
  { createClient, getClient, searchProduct }
)(withRouter(NewClient));
