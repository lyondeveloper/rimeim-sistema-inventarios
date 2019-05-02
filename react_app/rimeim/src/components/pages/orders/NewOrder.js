import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewNavbar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields,
  configModals
} from '../../../utils/MaterialFunctions';

import TextInputField from '../../common/TextInputField';
import SelectInputField from '../../common/SelectInputField';
import SearchProductLocal from './SearchProductLocal';
import SearchProductProvider from './SearchProductProvider';

import { getLocals } from '../../../actions/LocalActions';
import { createOrder } from '../../../actions/orderActions';

class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      fecha_entrega: '',
      local: '',
      id_local: '',
      productos: [],
      providerMode: false,
      needs_config_selects: false,
      errors: {}
    };

    this.onChangeTextInput = this.onChangeTextInput.bind(this);
    this.onProviderModeChange = this.onProviderModeChange.bind(this);
    this.onSelectLocal = this.onSelectLocal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getLocals();
  }

  componentDidUpdate() {
    configModals();
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

    if (nextProps.locals.locals) {
      const { locals } = nextProps.locals;
      locals.forEach(local => (local.disabled = false));
      this.setState({
        needs_config_selects: true,
        searching: false
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

  onReceiveProductData(productos) {
    this.setState({
      productos
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const { codigo, fecha_entrega, productos, local } = this.state;

    const orderData = {
      id_local_solicitado: local,
      codigo,
      fecha_entrega,
      productos
    };

    this.props.createOrder(orderData, this.props.history);
  }

  render() {
    const { codigo, providerMode, fecha_entrega, local } = this.state;

    const { locals } = this.props;

    const localOptions = [];

    locals.locals.map(local => {
      localOptions.push({
        value: local.id,
        label: local.nombre
      });
    });

    return (
      <React.Fragment>
        <NewNavbar active_nav={'PEDIDOS'}>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Nuevo Pedido
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
                  </div>
                  <form onSubmit={this.onSubmit}>
                    <div className='row'>
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
                              value={local}
                              options={localOptions}
                            />
                          </div>
                          <SearchProductLocal
                            onPassProductsData={this.onReceiveProductData.bind(
                              this
                            )}
                          />
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

                    <div className='d-block center mt-1'>
                      <button className='btn' type='submit'>
                        Guardar{' '}
                      </button>
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
  locals: state.local,
  orders: state.order
});

export default connect(
  mapStateToProps,
  { getLocals, createOrder }
)(NewOrder);
