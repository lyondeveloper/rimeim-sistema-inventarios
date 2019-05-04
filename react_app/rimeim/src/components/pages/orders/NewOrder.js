import React, { Component } from 'react';

import NewNavbar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import AddOrderToLocal from './AddOrderToLocal';
import AddOrderToProvider from './AddOrderToProvider';

class NewOrder extends Component {
  state = {
    providerMode: false
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  onProviderModeChange = () => {
    this.setState({
      providerMode: !this.state.providerMode,
      needs_config_modals: true
    });
  };

  render() {
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
                        Pedido a{' '}
                        {this.state.providerMode ? 'Local' : 'Proveedor'}
                      </button>
                    </div>
                  </div>
                  {this.state.providerMode ? (
                    <AddOrderToProvider />
                  ) : (
                    <AddOrderToLocal />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default NewOrder;
