import React, { Component } from 'react';

import { SEARCH_PROVIDER } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';

import Spinner from '../../common/Spinner';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import { searchProvider } from '../../../actions/providerActions';

import { connect } from 'react-redux';

import SearchProviderModal from '../../layout/modals/SearchProviderModal';

class SearchProvider extends Component {
  render() {
    return <div />;
  }
}

export default SearchProvider;
