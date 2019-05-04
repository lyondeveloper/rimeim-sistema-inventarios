import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import NewNavbar from "../../layout/NewNavbar";

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields
} from "../../../utils/MaterialFunctions";

import { getQuotes, searchSell } from "../../../actions/sellActions";
import { getClients } from "../../../actions/clientActions";

import "../../../public/css/cotizaciones.css";

import ModalSearchSells from "../../layout/modals/SearchSellModal";
import ShowSells from "../../common/ShowSells";

class Quotations extends Component {
  state = {
    clientes: [],
    need_config_selects: false
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getQuotes();
    this.props.getClients();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.client && nextProps.client.clients.length > 0) {
      const newClientsOptions = [];
      nextProps.client.clients.forEach(client => {
        newClientsOptions.push({
          value: client.id,
          label: client.nombre
        });
      });
      this.setState({
        clientes: newClientsOptions,
        need_config_selects: true
      });
    }
  }

  componentDidUpdate() {
    if (this.state.need_config_selects) {
      configSelectInputFields();
      this.setState({
        need_config_selects: false
      });
    }
  }

  onSearchSell = sellData => {
    sellData.con_factura = null;
    sellData.es_cotizacion = true;
    this.props.searchSell(sellData);
  };

  onGetAll = () => {
    this.props.getQuotes();
  };

  render() {
    const { user, currentLocal } = this.props.user;
    return (
      <React.Fragment>
        <NewNavbar active_nav="COTIZACIONES">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Cotizaciones
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <Link to="nueva_cotizacion">
                  <i className="material-icons">add</i>
                </Link>
              </li>
              <li>
                <a href="#modal_search" className="modal-trigger">
                  <i className="material-icons">search</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <main>
          <div className="row">
            <div className="col s12">
              <ShowSells
                sells={this.props.sell.sells}
                loading={this.props.sell.loading}
                is_admin={user.admin && currentLocal.id === "0"}
                es_cotizacion={true}
              />
            </div>
          </div>
        </main>

        <ModalSearchSells
          onSearch={this.onSearchSell}
          onGetAll={this.onGetAll}
          clientes={this.state.clientes}
          es_cotizacion={true}
        />
      </React.Fragment>
    );
  }
}

Quotations.propTypes = {
  sell: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getQuotes: PropTypes.func.isRequired,
  getClients: PropTypes.func.isRequired,
  searchSell: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sell: state.sell,
  user: state.user,
  client: state.client
});

export default connect(
  mapStateToProps,
  {
    getQuotes,
    getClients,
    searchSell
  }
)(Quotations);
