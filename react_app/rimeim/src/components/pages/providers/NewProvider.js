import React, { Component } from 'react';

import NewNavbar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields
} from '../../../utils/MaterialFunctions';

import { connect } from 'react-redux';

import uuid from 'uuid';

import { withRouter, Link } from 'react-router-dom';

import TextInputField from '../../common/TextInputField';
import SelectFiles from '../../common/SelectFiles';
import Spinner from '../../common/Spinner';

import { searchProduct } from '../../../actions/productActions';
import { addProvider } from '../../../actions/providerActions';

class NewProvider extends Component {
  state = {
    nombre: '',
    rtn: '',
    correo: '',
    telefono: '',
    imagen: null,
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

    this.setState({ productos_seleccionados });
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

  onCloseProviderModal = () => {
    this.setState({
      typing: false,
      typingTimeout: 0,
      searching: false,
      field: '',
      cantidad: '',
      productos: [],
      id_local: ''
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
    const { productos, precio } = this.state;

    //Definiendo la posicion del objeto que editaremos
    const productIndex = productos.findIndex(
      p => p.id_producto === productos.id_producto
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

  onSubmit = e => {
    e.preventDefault();

    const providerData = {
      nombre: this.state.nombre,
      rtn: this.state.rtn,
      correo: this.state.correo,
      telefono: this.state.telefono,
      productos: this.state.productos
    };

    if (this.state.imagen !== null) {
      const newProviderData = new FormData();
      newProviderData.append(
        'file_uploads[]',
        this.state.imagen.file,
        this.state.imagen.name
      );
      newProviderData.append('json_data', JSON.stringify(providerData));
      this.props.addProvider(
        newProviderData,
        this.props.history,
        '/proveedores'
      );
    } else {
      this.props.addProvider(providerData, this.props.history, '/proveedores');
    }
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      nombre,
      rtn,
      correo,
      telefono,
      imagen,
      field,
      productos,
      precio,
      searching,
      errors: { nombre_error }
    } = this.state;

    const { products, loading } = this.props.products;

    let searchResult = null;

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
        <NewNavbar active_nav='PROVEEDOR'>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Nuevo proveedor
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>

            <ul className='right'>
              <li>
                <Link
                  to='/proveedores'
                  className='tooltipped'
                  data-position='left'
                  data-tooltip='Ver Todos'
                >
                  <i className='material-icons'>people</i>
                </Link>
              </li>

              <li>
                <Link
                  to='/buscar_proveedor'
                  className='tooltipped'
                  data-position='left'
                  data-tooltip='Buscar'
                >
                  <i className='material-icons'>search</i>
                </Link>
              </li>
            </ul>
          </div>
        </NewNavbar>
        <main>
          <div className='row'>
            <div className='col s12'>
              <div className='card'>
                <div className='card-content'>
                  <form className='' onSubmit={this.onSubmit}>
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

                    <div className='col s12 center mb-1'>
                      <h5>Agregar Productos</h5>
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
                              <th>ID</th>
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
                                  <td> {producto.nombre} </td>
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

                    <div className='modal' id='modal_agregar_productos'>
                      <div className='modal-content'>
                        <h5>Agregar Productos</h5>
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
  { searchProduct, addProvider }
)(withRouter(NewProvider));
