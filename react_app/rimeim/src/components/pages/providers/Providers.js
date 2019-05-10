import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withRouter, Link } from 'react-router-dom';

import NewNavbar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import ProviderCard from '../../common/ProviderCard';

import { getProviders } from '../../../actions/providerActions';

import Spinner from '../../common/Spinner';

class Providers extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getProviders();
  }

  render() {
    const { providers, loading } = this.props.providers;

    let providersContent;

    if (loading) {
      providersContent = <Spinner fullWidth />;
    } else {
      if (providers.length <= 0) {
        providersContent = <h1>No providers</h1>;
      } else {
        providersContent = providers.map((provider, i) => {
          return (
            <div className='col s12 m6 l4' key={provider.id}>
              <ProviderCard provider={provider} />
            </div>
          );
        });
      }
    }

    return (
      <React.Fragment>
        <NewNavbar active_nav='PROVEEDOR'>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Proveedores
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right'>
              <li>
                <Link
                  to='/buscar_proveedor'
                  className='tooltipped'
                  data-position='left'
                  data-tooltip='Buscar'
                >
                  <i className='material-icons'>search</i>
                </Link>
              </li>
            </ul>
          </div>
        </NewNavbar>
        <main>
          <div className='row'>{providersContent}</div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  providers: state.provider
});

export default connect(
  mapStateToProps,
  { getProviders }
)(withRouter(Providers));
