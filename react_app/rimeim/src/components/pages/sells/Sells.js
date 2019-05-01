import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import NewNavbar from "../../layout/NewNavbar";

// Functions
import {
  configMaterialComponents,
  removeMaterialComponents
} from "../../../utils/MaterialFunctions";

import { getSells, searchSell } from "../../../actions/sellActions";

import ShowSells from "../../common/ShowSells";
import SearchSellModal from "../../common/SearchSellModal";

class Sells extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getSells();
  }

  onSearchSell = json_search => {
    console.log(json_search);
  };

  render() {
    const { loading, sells } = this.props.sell;
    const { admin } = this.props.user.user;
    return (
      <React.Fragment>
        <NewNavbar active_nav="VENTAS" show_more_option={true}>
          <ul id="dropdown_more" className="dropdown-content">
            <li>
              <Link to="/nueva_venta">
                <i className="material-icons">add</i>
              </Link>
            </li>
            <li>
              <a href="#modal_search" className="modal-trigger">
                <i className="material-icons">search</i>
              </a>
            </li>
          </ul>

          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Ventas
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-small-only">
              <li>
                <Link to="/nueva_venta">
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
              <ShowSells sells={sells} loading={loading} is_admin={admin} />
            </div>
          </div>

          <SearchSellModal onSearch={this.onSearchSell} clientes={[]} />
        </main>
      </React.Fragment>
    );
  }
}

Sells.propTypes = {
  sell: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getSells: PropTypes.func.isRequired,
  searchSell: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sell: state.sell,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getSells, searchSell }
)(Sells);
