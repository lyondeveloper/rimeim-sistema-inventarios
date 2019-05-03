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
    productos_proveedor: [],
    cantidad: '',
    needs_config_selects: false,
    editMode: false,
    searching: false,
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
        this.props.searchProduct({ field: this.state.field });
      }, 500)
    });
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      productos_proveedor,
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
    if (searching) {
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
            >
              <i className='material-icons'>add</i>
            </button>
          </div>

          {productos_proveedor.length > 0 ? (
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
                {productos_proveedor.map((p, i) =>
                  p.eliminado ? (
                    ''
                  ) : (
                    <tr key={uuid()}>
                      <td>{p.id_producto}</td>
                      <td>{p.producto_nombre}</td>
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
                    id='field'
                    label='Parametro de Busqueda (ID o Nombre de Producto)'
                    value={field}
                    onchange={this.onChangeSearchProductInput}
                  />
                  {searching ? searchResult : ''}
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
            >
              Cerrar
            </a>
            <a
              href='#!'
              className='modal-close waves-effect waves-blue btn left text-white'
              onClick={this.onAddProvider}
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
  products: state.products
});

export default connect(
  mapStateToProps,
  { getProviders, searchProduct }
)(SearchProductProvider);
