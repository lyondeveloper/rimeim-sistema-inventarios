import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getModalInstanceById } from '../../../utils/MaterialFunctions';
import isEmpty from '../../../actions/isEmpty';

class SellConfiguration extends Component {
  closeCurrentModal = () => {
    getModalInstanceById('modal_sell_configuracion').close();
  };

  onChangeCurrentClient = () => {
    this.closeCurrentModal();
    if (this.props.id_search_client_modal) {
      getModalInstanceById(this.props.id_search_client_modal).open();
    }
  };

  onCloseClick = () => {
    this.closeCurrentModal();
    if (this.props.onHide) {
      this.props.onHide();
    }
  };

  render() {
    const { currentClient } = this.props;

    let currentClientContent;

    if (currentClient && !isEmpty(currentClient)) {
      currentClientContent = (
        <div className="row">
          <div className="col s9">
            <h6>
              {currentClient.nombre} - {currentClient.rtn}
            </h6>
          </div>
          <div className="col s3">
            <button className="btn" onClick={this.onChangeCurrentClient}>
              Cambiar
            </button>
          </div>
        </div>
      );
    } else {
      currentClientContent = (
        <div className="row">
          <div className="col s3">
            <button className="btn" onClick={this.onChangeCurrentClient}>
              Seleccionar
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="modal" id="modal_sell_configuracion">
        <div className="modal-content">
          <h5>Cliente</h5>
          {currentClientContent}
        </div>
        <div className="modal-footer">
          <a href="#!" className="btn-flat" onClick={this.onCloseClick}>
            Cerrar
          </a>
        </div>
      </div>
    );
  }
}

SellConfiguration.propTypes = {
  id_search_client_modal: PropTypes.string,
  currentClient: PropTypes.object.isRequired,
  onHide: PropTypes.func
};

export default SellConfiguration;
