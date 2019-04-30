import React, { Component } from 'react';

import { ORDERS } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import OrderCard from '../../common/OrderCard';

class Orders extends Component {
  state = {
    pedidos: []
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  render() {
    const { pedidos } = this.state;
    return (
      <React.Fragment>
        <Navbar navtype={ORDERS} />

        <main>
          <div className='row'>
            <div className='col s12'>
              {pedidos.map((pedido, i) => {
                return <OrderCard pedido={pedido} key={pedido.id} />;
              })}
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Orders;
