import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { connect } from 'react-redux';

import Spinner from '../../common/Spinner';
import SelectInputField from '../../common/SelectInputField';
import { configSelectInputFields } from '../../../utils/MaterialFunctions';

import { getProviders } from '../../../actions/providerActions';

class SearchProductProvider extends Component {
  state = {
    modal_id: 'modal_agregar_producto_proveedor',
    proveedor_seleccionado: '',
    productos: [],
    cantidad: '',
    needs_config_selects: false,
    editMode: false,
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

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { productos, proveedor_seleccionado, modal_id } = this.state;

    const { providers, loading } = this.props.providers;

    const providersOptions = [];

    providers.map(provider => {
      providersOptions.push({
        value: provider.id,
        label: provider.nombre
      });
    });

    let providerContent;

    if (loading) {
      providerContent = <Spinner fullWidth />;
    } else {
      providerContent = (
        <div>
          <div className='d-block center'>
            <h5>Agregar Productos De Proveedores</h5>
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
        </div>
      );
    }

    return (
      <React.Fragment>
        {providerContent}
        <div className='modal' id={modal_id}>
          <div className='modal-content'>
            <h5>Buscar producto</h5>
            <div className='row'>
              <SelectInputField
                input_size='s12'
                id='proveedor_seleccionado'
                label='Proveedor'
                onchange={this.onChangeTextInput}
                options={providersOptions}
                value={proveedor_seleccionado}
              />
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
  providers: state.provider
});

export default connect(
  mapStateToProps,
  { getProviders }
)(SearchProductProvider);
