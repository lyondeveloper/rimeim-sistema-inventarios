import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import isEmpty from '../../actions/isEmpty';
import EmptyIcon from './EmptyIcon';

import Spinner from './Spinner';

class ShowSellReports extends Component {
  render() {
    const { report, loading } = this.props.sell;
    let reportContent;

    if (loading) {
      reportContent = <Spinner fullWidth />;
    } else if (!isEmpty(report)) {
      reportContent = 'El reporte llego';
    } else {
      reportContent = (
        <EmptyIcon message="No hay informacion para este reporte" />
      );
    }
    return <div>{reportContent}</div>;
  }
}

ShowSellReports.propTypes = {
  sell: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sell: state.sell
});

export default connect(mapStateToProps)(ShowSellReports);
