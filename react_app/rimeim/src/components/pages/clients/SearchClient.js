import React, { Component } from 'react';

import NewNavbar from '../../layout/NewNavbar';

import ClientCard from '../../common/ClientCard';

import Spinner from '../../common/Spinner';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import { searchClient } from '../../../actions/clientActions';

import { connect } from 'react-redux';

import SearchClientModal from '../../layout/modals/SearchClientModal';

class SearchClient extends Component {
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
    this.props.searchClient(this.state.field);
  };

  render() {
    const { field, searching } = this.state;

    const { clients, loading } = this.props.clients;

    let searchContent;

    if (loading) {
      searchContent = <Spinner fullWidth />;
    } else {
      if (clients.length <= 0 && !loading)
        searchContent = <h1>No hay clientes</h1>;
      else {
        searchContent = clients.map((client, index) => (
          <div className='col s12 m6 l4'>
            <ClientCard client={client} key={client.id} />
          </div>
        ));
      }
    }

    return (
      <React.Fragment>
        <NewNavbar active_nav='CLIENTES'>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Buscar cliente
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right'>
              <li>
                <a href='#modal_buscar_cliente' className='modal-trigger'>
                  <i className='material-icons'>search</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>
        <main>
          <SearchClientModal
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
  clients: state.client
});

export default connect(
  mapStateToProps,
  { searchClient }
)(SearchClient);
