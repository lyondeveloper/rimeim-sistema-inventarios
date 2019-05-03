import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

import { SEARCH_ORDER } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import SearchOrderModel from '../../layout/modals/SearchOrderModel';
import OrderCard from '../../common/OrderCard';
import { getCurrentDateToInput } from '../../../utils/dateFormat';

import { searchOrder } from '../../../actions/orderActions';
import Spinner from '../../common/Spinner';

class SearchOrder extends Component {
  state = {
    field: '',
    searching: false
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    const current_date = getCurrentDateToInput();
    this.setState({
      fecha_inicio: current_date,
      fecha_fin: current_date
    });
  }

  onSearch = e => {
    e.preventDefault();
    this.setState({
      searching: true
    });
    this.props.searchOrder(this.state.field);
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { loading, orders } = this.props.orders;

    const { searching } = this.state;

    const { field } = this.props;

    let searchResult;

    if (loading || this.state.searching) {
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

    return (
      <React.Fragment>
        <Navbar navtype={SEARCH_ORDER} />

        <main>
          <SearchOrderModel
            values={field}
            onchange={this.onChangeTextInput}
            onsearch={this.onSearch}
          />
          {searching ? searchResult : ''}
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order
});

export default connect(
  mapStateToProps,
  { searchOrder }
)(SearchOrder);
