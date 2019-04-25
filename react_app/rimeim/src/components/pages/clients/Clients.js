import React, { Component } from 'react';

import { CLIENTS } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';
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
          <div className="col s12 m6 l6" key={uuid()}>
            <ClientCard client={client} key={uuid()} />
          </div>
        );
      });
    }

    return (
      <React.Fragment>
        <Navbar navtype={CLIENTS} />
        <main>
          <div className="row">{clientsContent}</div>
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
