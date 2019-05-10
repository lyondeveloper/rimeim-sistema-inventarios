import React, { Component } from 'react';

import NewNavbar from '../../layout/NewNavbar';

import Spinner from '../../common/Spinner';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import { searchProvider } from '../../../actions/providerActions';

import { connect } from 'react-redux';

import SearchProviderModal from '../../layout/modals/SearchProviderModal';
import ProviderCard from '../../common/ProviderCard';

class SearchProvider extends Component {
  state = {
    field: '',
    searching: false
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onSearch = e => {
    e.preventDefault();
    this.setState({
      searching: true
    });
    this.props.searchProvider(this.state.field);
  };

  render() {
    const { field, searching } = this.state;

    const { providers, loading } = this.props.providers;

    let searchContent;

    if (loading) {
      searchContent = <Spinner fullWidth />;
    } else {
      if (providers.length <= 0 && !loading) {
        searchContent = <h1>No hay proveedores</h1>;
      } else {
        searchContent = providers.map((provider, i) => (
          <div className='col s12 m6 l4'>
            <ProviderCard provider={provider} key={provider.id} />
          </div>
        ));
      }
    }

    return (
      <React.Fragment>
        <NewNavbar navtype={'PROVEEDOR'}>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Buscar proveedor
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right'>
              <li>
                <a href='#modal_buscar_proveedor' className='modal-trigger'>
                  <i className='material-icons'>search</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>
        <main>
          <SearchProviderModal
            onsearch={this.onSearch}
            onchange={this.onChangeTextInput}
            values={{ field }}
          />
          {searching ? searchContent : ''}
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
  { searchProvider }
)(SearchProvider);
