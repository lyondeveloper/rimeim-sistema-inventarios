import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { editClient, getClient } from '../../../actions/clientActions';

import { getProducts } from '../../../actions/productActions';

import { EDIT_CLIENT } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';

import { withRouter } from 'react-router-dom';

import isEmpty from '../../../actions/isEmpty';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields
} from '../../../utils/MaterialFunctions';

import Spinner from '../../common/Spinner';
import SelectFiles from '../../common/SelectFiles';
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
    imagen: null,
    id_producto: '',
    precio: '',
    producto_seleccionado: '',
    productos_especiales: [],
    editMode: false,
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
      client.imagen = !isEmpty(client.imagen) ? client.imagen : '';
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
        imagen: client.imagen,
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

    const { id } = this.props.match.params;

    const { client } = this.props.clients;

    const {
      nombre,
      rtn,
      correo,
      contacto,
      telefono,
      codigo,
      imagen,
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

    if (imagen !== null && imagen !== client.imagen) {
      const clientDataUpdated = new FormData();
      clientDataUpdated.append('file_uploads[]', imagen.file, imagen.name);
      clientDataUpdated.append('json_data', JSON.stringify(clientData));
      this.props.editClient(
        clientDataUpdated,
        id,
        this.props.history,
        '/clientes'
      );
    } else {
      this.props.editClient(clientData, id, this.props.history, '/clientes');
    }
  };

  render() {
    const {
      nombre,
      rtn,
      correo,
      contacto,
      telefono,
      codigo,
      imagen,
      es_empresa,
      id_producto,
      precio_especial,
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
                  <div className='col s12 m12'>
                    <form onSubmit={this.onSubmit}>
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
                            data-target='modal_editMode_producto'
                            onClick={this.onAddSpecialProductPriceClick}
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
                                      <td>{producto.nombre}</td>
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
                                          data-target='modal_editMode_producto'
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

        <div className='modal' id='modal_editMode_producto'>
          {this.props.products.loading && <Spinner fullWidth />}

          <div className='modal-content center'>
            <h5>Precio Especial a Producto</h5>
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
  { editClient, getClient, getProducts }
)(withRouter(EditClient));
