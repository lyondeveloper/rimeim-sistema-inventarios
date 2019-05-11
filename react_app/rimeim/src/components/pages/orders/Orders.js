import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid';

import OrderCard from '../../common/OrderCard';
import Spinner from '../../common/Spinner';
import NewNavbar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import { getCurrentDateToInput } from '../../../utils/dateFormat';

import { getOrders, searchOrder } from '../../../actions/orderActions';

class Orders extends Component {
  state = {
    codigo: '',
    proveedor: '',
    local: '',
    fecha_inicio: '',
    fecha_fin: '',
    searching: false
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getOrders();
    const current_date = getCurrentDateToInput();
    this.setState({
      fecha_inicio: current_date,
      fecha_fin: current_date
    });
  }

  onSearch = e => {
    e.preventDefault();

    const searchParameters = {
      codigo: this.state.codigo,
      proveedor: this.state.proveedor,
      local: this.state.local,
      fecha_inicio: this.state.fecha_inicio,
      fecha_fin: this.state.fecha_fin
    };

    this.setState({
      searching: true
    });
    this.props.searchOrder(searchParameters);
  };

  getAll = () => {
    this.props.getOrders();
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const searchParameters = {
      codigo: this.state.codigo,
      proveedor: this.state.proveedor,
      local: this.state.local,
      fecha_inicio: this.state.fecha_inicio,
      fecha_fin: this.state.fecha_fin
    };

    const { searching } = this.state;

    const { orders, loading } = this.props.orders;

    let ordersContent;

    let searchResult;

    if (loading) {
      searchResult = <Spinner fullWidth />;
    } else {
      if (orders.length < 0) {
        searchResult = <h1>No se encontraron pedidos disponibles</h1>;
      } else {
        searchResult = orders.map(order => (
          <div className='s12 m6 l6'>
            <OrderCard order={order} key={uuid()} />
          </div>
        ));
      }
    }

    if (loading) {
      ordersContent = <Spinner fullWidth />;
    } else {
      ordersContent = (
        <div className='row'>
          <div className='col s12'>
            {orders.map((order, i) => {
              return <OrderCard order={order} key={uuid()} />;
            })}
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <NewNavbar active_nav='PEDIDOS'>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Pedidos
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right'>
              <li>
                <a
                  href='#modal_buscar_pedido'
                  className='tooltipped modal-trigger'
                  data-position='left'
                  data-tooltip='Buscar'
                >
                  <i className='material-icons cursor-pointer'>search</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <main>
          <SearchOrderModel
            values={searchParameters}
            onchange={this.onChangeTextInput}
            onsearch={this.onSearch}
            onGetAll={this.getAll}
          />
          <div className='row'>{searching ? searchResult : ordersContent}</div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order
});

export default connect(
  mapStateToProps,
  { getOrders, searchOrder }
)(withRouter(Orders));
