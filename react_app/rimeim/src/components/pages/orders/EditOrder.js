import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NewNavbar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields
} from '../../../utils/MaterialFunctions';

import Spinner from '../../common/Spinner';
import TextInputField from '../../common/TextInputField';
import SelectInputField from '../../common/SelectInputField';
import SearchProductLocal from './SearchProductLocal';
import SearchProductProvider from './SearchProductProvider';

import { configModals } from '../../../utils/MaterialFunctions';

import { getLocals } from '../../../actions/LocalActions';
import { editOrder, getOrder } from '../../../actions/orderActions';

import isEmpty from '../../../actions/isEmpty';

class EditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      fecha_prevista_entrega: '',
      local: {},
      productos: [],
      providerMode: false,
      needs_config_selects: false,
      errors: {}
    };

    this.onChangeTextInput = this.onChangeTextInput.bind(this);
    this.onProviderModeChange = this.onProviderModeChange.bind(this);
    this.onReceiveProductData = this.onReceiveProductData.bind(this);
    this.onSelectLocal = this.onSelectLocal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getLocals();
    this.props.getOrder(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (this.state.needs_config_selects) {
      configSelectInputFields();
      this.setState({
        needs_config_selects: false
      });
    }
    configModals();
  }

  componentWillReceiveProps(nextProps) {
    const { order } = this.props.orders;

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.locals.locals) {
      const { locals } = nextProps.locals;
      locals.forEach(local => (local.disabled = false));
      this.setState({
        needs_config_selects: true,
        searching: false
      });
    }

    if (nextProps.orders.orders) {
      const { orders } = nextProps.orders;
      orders.forEach(order => (order.disabled = false));
      this.setState({
        needs_config_selects: true,
        searching: false
      });
    }

    if (order) {
      order.codigo = !isEmpty(order.codigo) ? order.codigo : '';
      order.local_solicitado = !isEmpty(order.local_solicitado)
        ? order.local_solicitado
        : {};
      order.fecha_prevista_entrega = !isEmpty(order.fecha_prevista_entrega)
        ? order.fecha_prevista_entrega
        : '';
      order.productos = !isEmpty(order.productos) ? order.productos : [];

      this.setState({
        codigo: order.codigo,
        local: order.local_solicitado,
        fecha_prevista_entrega: order.fecha_prevista_entrega,
        productos: order.productos
      });
    }
  }

  onSelectLocal() {
    this.setState({});
  }

  onProviderModeChange() {
    this.setState({
      providerMode: !this.state.providerMode
    });
  }

  onChangeTextInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //A la hora de recibir la data de productos del componente hijo, este sera mapeado y agregado a nuestro array de productos
  onReceiveProductData(newProducts) {
    const { productos } = this.state;

    newProducts.map(product => {
      productos.push(product);
    });

    this.setState({ productos });
  }

  onSubmit(e) {
    e.preventDefault();

    const { codigo, fecha_prevista_entrega, productos, local } = this.state;

    const { id } = this.props.match.params;

    const orderData = {
      id_local_solicitado: local,
      codigo,
      fecha_prevista_entrega,
      productos
    };

    this.props.editOrder(id, orderData, this.props.history);
  }

  render() {
    const {
      codigo,
      providerMode,
      fecha_prevista_entrega,
      local,
      productos
    } = this.state;

    const { locals } = this.props;
    const { loading } = this.props.orders;

    //Mapeando las opciones de locales para desplegarlas en el SelectInputField
    const localOptions = [];

    locals.locals.map(local => {
      localOptions.push({
        value: local.id,
        label: local.nombre
      });
    });

    let orderContent;

    if (loading || locals.loading) {
      orderContent = <Spinner fullWidth />;
    } else {
      orderContent = (
        <form onSubmit={this.onSubmit}>
          <div className='row'>
            {/* Si modo proveedor esta activo, mostrara el buscador de productos de proveedor, si no, usara el del local */}
            {providerMode ? (
              <SearchProductProvider />
            ) : (
              <React.Fragment>
                <div className='row'>
                  <SelectInputField
                    input_size='s12'
                    id='local'
                    label='Local'
                    onchange={this.onChangeTextInput}
                    value={local.id}
                    options={localOptions}
                  />
                </div>
              </React.Fragment>
            )}
          </div>

          <div className='row'>
            <TextInputField
              input_size='s12'
              id='codigo'
              label='Codigo de pedido'
              onchange={this.onChangeTextInput}
              value={codigo}
              active_label={codigo ? true : false}
            />
          </div>

          <div className='row'>
            <TextInputField
              type='date'
              input_size='s12'
              id='fecha_prevista_entrega'
              label='Fecha de Entrega de Pedido'
              onchange={this.onChangeTextInput}
              value={fecha_prevista_entrega}
            />
          </div>
        </form>
      );
    }

    return (
      <React.Fragment>
        <NewNavbar active_nav={'PEDIDOS'}>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Editar Pedido
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right'>
              <li>
                <a
                  href='#!'
                  className='tooltipped'
                  data-position='left'
                  data-tooltip='Ver Todos'
                >
                  <i className='material-icons'>group</i>
                </a>
              </li>

              <li>
                <a
                  href='#!'
                  className='tooltipped'
                  data-position='left'
                  data-tooltip='Buscar'
                >
                  <i className='material-icons'>search</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <main>
          <div className='row'>
            <div className='col s12'>
              <div className='card'>
                <div className='card-content'>
                  <div className='row'>
                    <div className='d-block right'>
                      <button
                        className='btn'
                        onClick={this.onProviderModeChange}
                      >
                        Pedido a {providerMode ? 'Local' : 'Proveedor'}
                      </button>
                    </div>
                    {orderContent}

                    <SearchProductLocal
                      onPassProductsData={this.onReceiveProductData}
                      productsProps={productos}
                    />
                    <div className='d-block center mt-1'>
                      <button
                        className='btn'
                        type='submit'
                        onClick={this.onSubmit}
                      >
                        Guardar{' '}
                      </button>
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
  locals: state.local,
  orders: state.order
});

export default connect(
  mapStateToProps,
  { editOrder, getOrder, getLocals }
)(withRouter(EditOrder));
