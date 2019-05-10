import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import NewNavbar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';
import { getDevolutions } from '../../../actions/devolutionActions';

import DevolutionCard from '../../common/DevolutionCard';
import Spinner from '../../common/Spinner';
import EmptyIcon from '../../common/EmptyIcon';

class Devolutions extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getDevolutions();
  }

  getPageContent = () => {
    const { devolutions, loading } = this.props.devolution;
    let pageContent;
    if (loading) {
      pageContent = <Spinner fullWidth />;
    } else if (devolutions.length > 0) {
      pageContent = devolutions.map(dev => (
        <DevolutionCard devolucion={dev} key={uuid()} />
      ));
    } else {
      pageContent = <EmptyIcon message="No hay devoluciones" />;
    }
    return pageContent;
  };

  render() {
    return (
      <React.Fragment>
        <NewNavbar>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Devoluciones
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </NewNavbar>

        <main>
          <div className="row">
            <div className="col s12">{this.getPageContent()}</div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Devolutions.propTypes = {
  devolution: PropTypes.object.isRequired,
  getDevolutions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  devolution: state.devolution
});

export default connect(
  mapStateToProps,
  { getDevolutions }
)(Devolutions);
