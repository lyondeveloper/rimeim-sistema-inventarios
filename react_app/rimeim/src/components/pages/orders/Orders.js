import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid';

import OrderCard from '../../common/OrderCard';
import Spinner from '../../common/Spinner';
import { ORDERS } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import { getOrders } from '../../../actions/orderActions';

class Orders extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getOrders();
  }

  render() {
    const { orders, loading } = this.props.orders;

    let ordersContent;

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
        <Navbar navtype={ORDERS} />

        <main>{ordersContent}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order
});

export default connect(
  mapStateToProps,
  { getOrders }
)(withRouter(Orders));
