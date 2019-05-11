import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NewNavBar from '../../layout/NewNavbar';
import uuid from 'uuid';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import { connect } from 'react-redux';
import { getClients, searchClient } from '../../../actions/clientActions';

import ClientCard from '../../common/ClientCard';
import SearchClientModal from '../../layout/modals/SearchClientModal';

import Spinner from '../../common/Spinner';

class Clients extends Component {
  state = {
    field: '',
    searching: false
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getClients();
  }

  onSearch = e => {
    e.preventDefault();
    this.setState({
      searching: true
    });
    this.props.searchClient({ field: this.state.field });
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  getAll = () => {
    this.props.getClients();
  };

  render() {
    const { clients, loading } = this.props.clients;

    const { searching, field } = this.state;

    let clientsContent;

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

    if (clients.length < 0 || loading) {
      clientsContent = <Spinner fullWidth />;
    } else {
      clientsContent = clients.map((client, index) => {
        return (
          <div className='col s12 m6 l4' key={uuid()}>
            <ClientCard client={client} key={client.id} />
          </div>
        );
      });
    }

    return (
      <React.Fragment>
        <NewNavBar active_nav='CLIENTES'>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Clientes
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>

            <ul className='right'>
              <li>
                <a
                  href='#modal_buscar_cliente'
                  className='tooltipped modal-trigger'
                  data-position='left'
                  data-tooltip='Buscar'
                >
                  <i className='material-icons cursor-pointer'>search</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavBar>
        <main>
          <SearchClientModal
            onsearch={this.onSearch}
            onchange={this.onChangeTextInput}
            onGetAll={this.getAll}
            values={{ field }}
          />
          <div className='row'>
            {searching ? searchContent : clientsContent}
          </div>
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
  { getClients, searchClient }
)(Clients);
