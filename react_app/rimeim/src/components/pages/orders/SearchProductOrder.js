import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { connect } from 'react-redux';

import Spinner from '../../common/Spinner';
import TextInputField from '../../common/TextInputField';
import SelectInputField from '../../common/SelectInputField';
import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import SearchProductLocal from './SearchProductLocal';
import SearchProductProvider from './SearchProductProvider';

import { searchProduct } from '../../../actions/productActions';
import { getProviders } from '../../../actions/providerActions';

class SearchProductOrder extends Component {
  state = {
    providerMode: false
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  render() {
    const { providerMode } = this.state;

    return <div />;
  }
}

// SearchProductOrder.propTypes = {
//   products: PropTypes.array.isRequired,
//   is_only_textbox: PropTypes.bool.isRequired
// };

// SearchProductOrder.defaultProps = {
//   is_only_textbox: false
// };
export default SearchProductOrder;
