import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withRouter, Link } from 'react-router-dom';

import NewNavbar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import SearchProviderModal from '../../layout/modals/SearchProviderModal';

import { searchProvider } from '../../../actions/providerActions';

import ProviderCard from '../../common/ProviderCard';

import { getProviders } from '../../../actions/providerActions';

import Spinner from '../../common/Spinner';

class Providers extends Component {
  state = {
    field: '',
    searching: false
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getProviders();
  }

  onSearch = e => {
    e.preventDefault();
    this.setState({
      searching: true
    });
    this.props.searchProvider({ field: this.state.field });
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  getAll = () => {
    this.props.getProviders();
  };

  render() {
    const { field, searching } = this.state;

    const { providers, loading } = this.props.providers;

    let providersContent;
    let searchProvider;

    if (loading) {
      searchProvider = <Spinner fullWidth />;
    } else {
      if (providers.length <= 0 && !loading) {
        searchProvider = <h1>No hay proveedores</h1>;
      } else {
        searchProvider = providers.map((provider, i) => (
          <div className='col s12 m6 l4'>
            <ProviderCard provider={provider} key={provider.id} />
          </div>
        ));
      }
    }

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
                <a
                  href='#modal_buscar_proveedor'
                  className='tooltipped modal-trigger'
                  data-position='left'
                  data-tooltip='Buscar'
                >
                  <i className='material-icons cursor-pointer'>search</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>
        <main>
          <SearchProviderModal
            onsearch={this.onSearch}
            onchange={this.onChangeTextInput}
            onGetAll={this.getAll}
            values={{ field }}
          />
          <div className='row'>
            {searching ? searchProvider : providersContent}
          </div>
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
  { getProviders, searchProvider }
)(withRouter(Providers));
