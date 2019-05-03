import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewNavbar from '../../layout/NewNavbar';
// import uuid from 'uuid';
import PropTypes from 'prop-types';

import '../../../public/css/ventas.css';

// Functions
import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import { getSellById } from '../../../actions/sellActions';
import ShowSaleCard from '../../common/ShowSale';

class ShowSale extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getSellById(this.props.match.params.id);
  }

  render() {
    const { loading, sell } = this.props.sell;
    return (
      <React.Fragment>
        <NewNavbar active_nav="VENTAS">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Venta
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </NewNavbar>

        <main>
          <div className="row">
            <div className="col s12">
              <ShowSaleCard loading={loading} sale={sell} />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

ShowSale.propTypes = {
  sell: PropTypes.object.isRequired,
  getSellById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sell: state.sell
});

export default connect(
  mapStateToProps,
  { getSellById }
)(ShowSale);
