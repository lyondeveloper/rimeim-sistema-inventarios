import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid';
import Moment from 'react-moment';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import NewNavbar from '../../layout/NewNavbar';
import TextInputField from '../../common/TextInputField';

import { getOrder } from '../../../actions/orderActions';
import Spinner from '../../common/Spinner';

class Order extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getOrder(this.props.match.params.id);
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { order, loading } = this.props.orders;

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
                  <TextInputField
                    input_size='12'
                    id='codigo'
                    label='Codigo de pedido'
                    onchange={this.onChangeTextInput}
                    value={order.codigo}
                    active_label={true}
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
                        {/* {order.productos.length > 0 ? (
                          order.productos.map((product, i) =>
                            product.eliminado ? (
                              ''
                            ) : (
                              <tr key={uuid()}>
                                <td>{product.codigo}</td>
                                <td>{product.descripcion}</td>
                                <td> {product.cantidad} </td>
                              </tr>
                            )
                          )
                        ) : (
                          <tr>
                            <td />
                            <td />
                            <td />
                          </tr>
                        )} */}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* <div className='row'>
                  <TextInputField
                    input_size='s12'
                    id='local'
                    label='Local'
                    onchange={this.onChangeTextInput}
                    value={order.local_solicitado.nombre}
                    active_label={true}
                  />
                </div> */}

                {order.es_compra ? (
                  <div className='row'>
                    <TextInputField
                      input_size='s12'
                      id='proveedor'
                      label='Proveedor'
                      onchange={this.onChangeTextInput}
                      value={order.proveedor}
                      active_label={true}
                    />
                  </div>
                ) : (
                  ''
                )}

                <div className='row'>
                  <TextInputField
                    input_size='s12'
                    id='fecha_prevista_entrega'
                    label='Fecha de Entrega de Pedido'
                    onchange={this.onChangeTextInput}
                    value={order.fecha_prevista_entrega}
                    active_label={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <NewNavbar active_nav='PEDIDOS'>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Pedido: #{order.codigo}
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right'>
              <li>
                <Link
                  to={`/editar_pedido/${this.props.match.params.id}`}
                  className='tooltipped'
                  data-position='left'
                  data-tooltip='Editar'
                >
                  <i className='material-icons'>edit</i>
                </Link>
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
  orders: state.order
});

export default connect(
  mapStateToProps,
  { getOrder }
)(Order);
