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
import ConfirmationModal from '../../layout/modals/ConfirmationModal';
import TextInputField from '../../common/TextInputField';

import { getOrder, deleteOrder } from '../../../actions/orderActions';
import Spinner from '../../common/Spinner';

class Order extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getOrder(this.props.match.params.id);
  }

  onConfirmDeleteOrder = () => {
    this.props.deleteOrder(
      this.props.match.params.id,
      this.props.history,
      '/pedidos'
    );
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { order, loading } = this.props.orders;

    let orderContent;

    if (loading) {
      orderContent = <Spinner fullWidth />;
    } else {
      if (Object.keys(order).length > 0) {
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
                            <th>Nombre</th>
                            <th>Costo</th>
                            <th>Cantidad</th>
                          </tr>
                        </thead>

                        <tbody>
                          {order.productos.length > 0 ? (
                            order.productos.map((product, i) =>
                              product.eliminado ? (
                                ''
                              ) : (
                                <tr key={uuid()}>
                                  <td>{product.nombre}</td>
                                  <td>{product.costo}</td>
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
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className='row'>
                    <TextInputField
                      input_size='s12'
                      id='local'
                      label='Local'
                      onchange={this.onChangeTextInput}
                      value={order.local_solicitado.nombre}
                      active_label={true}
                    />
                  </div>

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
                  <button
                    className='btn red darken-3 modal-trigger'
                    data-target='modal_confirmar_evento'
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
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

        <ConfirmationModal
          title='Eliminar pedido'
          message='Esta seguro de que quiere eliminar este pedido? No se podra revertir la operacion'
          onAccept={this.onConfirmDeleteOrder}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order
});

export default connect(
  mapStateToProps,
  { getOrder, deleteOrder }
)(Order);
