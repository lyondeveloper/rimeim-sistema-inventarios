import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NewNavBar from '../../layout/NewNavbar';
import uuid from 'uuid';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import { connect } from 'react-redux';
import { getClients } from '../../../actions/clientActions';

import ClientCard from '../../common/ClientCard';

import Spinner from '../../common/Spinner';

class Clients extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getClients();
  }

  render() {
    const { clients, loading } = this.props.clients;

    let clientsContent;

    if (clients.length < 0 || loading) {
      clientsContent = <Spinner fullWidth />;
    } else {
      clientsContent = clients.map((client, index) => {
        return (
          <div className='col s12 m6 l4' key={uuid()}>
            <ClientCard client={client} key={uuid()} />
          </div>
        );
      });
    }

    return (
      <React.Fragment>
        <NewNavBar active_nav='CLIENTES'>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Cliente
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>

            <ul className='right'>
              <li>
                <Link
                  to='/buscar_cliente'
                  className='tooltipped'
                  data-position='left'
                  data-tooltip='Buscar'
                >
                  <i className='material-icons'>search</i>
                </Link>
              </li>
            </ul>
          </div>
        </NewNavBar>
        <main>
          <div className='row'>{clientsContent}</div>
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
  { getClients }
)(Clients);
