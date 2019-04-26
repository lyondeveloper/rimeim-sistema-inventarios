import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { PROVIDERS } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';

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
            <div className='col s12 m6 l6' key={provider.id}>
              <ProviderCard provider={provider} />
            </div>
          );
        });
      }
    }

    return (
      <React.Fragment>
        <Navbar navtype={PROVIDERS} />
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
