import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import uuid from "uuid";
import { Link } from "react-router-dom";

import OrderCard from "../../common/OrderCard";
import Spinner from "../../common/Spinner";
import NewNavbar from "../../layout/NewNavbar";

import {
  configMaterialComponents,
  removeMaterialComponents
} from "../../../utils/MaterialFunctions";

import { getOrders } from "../../../actions/orderActions";

class Orders extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getOrders();
  }

  render() {
    const { orders, loading } = this.props.order;

    let ordersContent;

    if (loading) {
      ordersContent = <Spinner fullWidth />;
    } else {
      ordersContent = (
        <div className="row">
          <div className="col s12">
            {orders.map((order, i) => {
              return <OrderCard order={order} key={uuid()} />;
            })}
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <NewNavbar navtype="PEDIDOS">
          <NewNavbar active_nav="PEDIDOS">
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">
                Pedido: #{this.props.match.params.id}
              </a>
              <a
                href="#!"
                className="sidenav-trigger"
                data-target="nav_sidenav"
              >
                <i className="material-icons">menu</i>
              </a>
              <ul className="right">
                <li>
                  <Link
                    to="/buscar_pedido"
                    className="tooltipped"
                    data-position="left"
                    data-tooltip="Buscar"
                  >
                    <i className="material-icons">search</i>
                  </Link>
                </li>
              </ul>
            </div>
          </NewNavbar>
        </NewNavbar>

        <main>{ordersContent}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order
});

export default connect(
  mapStateToProps,
  { getOrders }
)(withRouter(Orders));
