import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewNavbar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import { getLocals } from '../../../actions/LocalActions';

import TextInputField from '../../common/TextInputField';
import SearchProductLocal from './SearchProductLocal';
import SearchProductProvider from './SearchProductProvider';
import SelectInputField from '../../common/SelectInputField';
import Spinner from '../../common/Spinner';

class NewOrder extends Component {
  state = {
    codigo: '',
    ubicacion: '',
    providerMode: false,
    needs_config_selects: false
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getLocals();
  }

  onProviderModeChange = () =>
    this.setState({
      providerMode: !this.state.providerMode
    });

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {};

  render() {
    const { codigo, ubicacion, providerMode } = this.state;

    const { locals, loading } = this.props.locals;

    const localOptions = [];

    locals.map(local => {
      localOptions.push({
        value: local.id,
        label: local.name
      });
    });

    let orderContent;

    if (loading) {
      orderContent = <Spinner fullWidth />;
    } else {
      orderContent = (
        <div className='row'>
          <div className='col s12'>
            <div className='card'>
              <div className='card-content'>
                <div className='row'>
                  <div className='d-block right'>
                    <button className='btn' onClick={this.onProviderModeChange}>
                      Cambiar a modo {providerMode ? 'Tienda' : 'Proveedor'}
                    </button>
                  </div>
                </div>
                <form onSubmit={this.onSubmit}>
                  <div className='row'>
                    <SelectInputField
                      input_size='s12'
                      id='ubicacion'
                      label='Ubicacion'
                      onchange={this.onChangeTextInput}
                      value={ubicacion}
                      options={localOptions}
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
                    {providerMode ? (
                      <SearchProductProvider />
                    ) : (
                      <SearchProductLocal />
                    )}
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
      );
    }

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

        <main>{orderContent}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  locals: state.local
});

export default connect(
  mapStateToProps,
  { getLocals }
)(NewOrder);
