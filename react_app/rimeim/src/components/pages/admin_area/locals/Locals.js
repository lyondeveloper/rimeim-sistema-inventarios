import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import NavbarAdmin from '../../../layout/NewNavbarAdmin';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../../utils/MaterialFunctions';

import { getLocals } from '../../../../actions/LocalActions';

import Spinner from '../../../common/Spinner';
import LocalCard from '../../../common/LocalCard';

class Locals extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getLocals();
  }

  render() {
    const { locals, loading } = this.props.local;
    return (
      <React.Fragment>
        <NavbarAdmin>
          <ul id="dropdown_more" className="dropdown-content">
            <li>
              <Link to="/admin/nuevo_local">
                <i className="material-icons">add</i>
              </Link>
            </li>
          </ul>

          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Locales
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-small-only">
              <li>
                <Link to="/admin/nuevo_local">
                  <i className="material-icons">add</i>
                </Link>
              </li>
            </ul>

            <ul className="right mobile-only">
              <li>
                <a
                  className="dropdown-trigger"
                  href="#!"
                  data-target="dropdown_more"
                >
                  <i className="material-icons right">more_vert</i>
                </a>
              </li>
            </ul>
          </div>
        </NavbarAdmin>

        <main>
          <div className="row">
            {loading ? (
              <Spinner fullWidth />
            ) : (
              locals.map(local => (
                <div className="col s12 m6 l6" key={local.id}>
                  <LocalCard local={local} />
                </div>
              ))
            )}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Locals.propTypes = {
  local: PropTypes.object.isRequired,
  getLocals: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  local: state.local
});

export default connect(
  mapStateToProps,
  {
    getLocals
  }
)(Locals);
