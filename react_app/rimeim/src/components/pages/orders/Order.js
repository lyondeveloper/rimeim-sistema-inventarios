import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import NewNavbar from '../../layout/NewNavbar';
import TextInputField from '../../common/TextInputField';

class Order extends Component {
  state = {
    codigo: '',
    ubicacion: '',
    proveedor: ''
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { codigo, ubicacion, proveedor } = this.state;
    return (
      <React.Fragment>
        <NewNavbar active_nav='PEDIDOS'>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Pedido: #{codigo}
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right'>
              <li>
                <a
                  href='nuevo_pedido.html'
                  className='tooltipped'
                  data-position='left'
                  data-tooltip='Editar'
                >
                  <i className='material-icons'>edit</i>
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
                    <TextInputField
                      input_size='12'
                      id='codigo'
                      label='Codigo de pedido'
                      onchange={this.onChangeTextInput}
                      value={codigo}
                      active_label={codigo ? true : false}
                    />
                  </div>

                  <div className='row'>
                    <div className='col s12'>
                      <table className='table-bordered striped'>
                        <thead>
                          <tr>
                            <th>Codigo</th>
                            <th>Descripcion</th>
                            <th>Cantidad</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td />
                            <td />
                            <td />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className='row'>
                    <TextInputField
                      input_size='s12'
                      id='ubicacion'
                      label='Ubicacion'
                      onchange={this.onChangeTextInput}
                      value={ubicacion}
                      active_label={ubicacion ? true : false}
                    />
                  </div>

                  <div className='row'>
                    <TextInputField
                      input_size='s12'
                      id='proveedor'
                      label='Proveedor'
                      onchange={this.onChangeTextInput}
                      value={proveedor}
                      active_label={proveedor ? true : false}
                    />
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

export default Order;
