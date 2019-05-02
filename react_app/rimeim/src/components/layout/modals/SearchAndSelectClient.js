import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import isEmpty from '../../../actions/isEmpty';
import { getModalInstanceById } from '../../../utils/MaterialFunctions';
import { searchClient } from '../../../actions/clientActions';

import TextInputField from '../../common/TextInputField';
import Spinner from '../../common/Spinner';
import EmptyIcon from '../../common/EmptyIcon';

class SearchAndSelectClient extends Component {
  state = {
    field_cliente: '',
    typing: false,
    typingTimeout: 0,
    searching: false
  };

  onChangeTextInput = e => {
    if (this.state.typingTimeout) {
      this.setState({ searching: true });
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      field_cliente: e.target.value,
      typing: false,
      typingTimeout: setTimeout(() => {
        if (this.state.field_cliente.trim() !== '') {
          this.props.searchClient({ field: this.state.field_cliente });
        } else {
          this.setState({ searching: false });
        }
      }, 1500)
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.client.clients) {
      this.setState({
        searching: false
      });
    }
  }

  onHideModal = () => {
    if (this.props.onHide) {
      this.props.onHide();
    }
  };

  onClickInClient = client => {
    if (this.props.onSelectClient) {
      this.props.onSelectClient(client);
    }
    getModalInstanceById('modal_seleccionar_cliente').close();
  };

  render() {
    const { field_cliente, searching } = this.state;
    const { currentClient } = this.props;
    let clientsContent;

    if (searching) {
      clientsContent = <Spinner fullWidth />;
    } else if (this.props.client.clients.length > 0) {
      clientsContent = (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>RTN</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {this.props.client.clients.map(client => (
              <tr
                key={uuid()}
                onClick={this.onClickInClient.bind(this, client)}
                className="cursor-pointer"
              >
                <td>{client.id}</td>
                <td>{client.nombre}</td>
                <td>{client.rtn}</td>
                <td>{client.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      clientsContent = <EmptyIcon message="No se encontraron clientes" />;
    }

    let currentClientContent;
    if (currentClient && !isEmpty(currentClient)) {
      currentClientContent = (
        <div className="row">
          <TextInputField
            id="current_client"
            value={`${currentClient.nombre} - ${currentClient.rtn}`}
            onchange={this.onChangeTextInput}
            disabled={true}
          />
        </div>
      );
    }
    return (
      <div className="modal" id="modal_seleccionar_cliente">
        <div className="modal-content">
          {currentClientContent}
          <div className="row">
            <TextInputField
              id="field_cliente"
              label="Nombre de cliente, rtn o codigo"
              value={field_cliente}
              onchange={this.onChangeTextInput}
            />
          </div>

          <div className="row">
            <div className="col s12">{clientsContent}</div>
          </div>
        </div>

        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close btn-flat"
            onClick={this.onHideModal}
          >
            Cerrar{' '}
          </a>
        </div>
      </div>
    );
  }
}

SearchAndSelectClient.propTypes = {
  client: PropTypes.object.isRequired,
  searchClient: PropTypes.func.isRequired,
  currentClient: PropTypes.object,
  onSelectClient: PropTypes.func,
  onHideModal: PropTypes.func
};

const mapStateToProps = state => ({
  client: state.client
});

export default connect(
  mapStateToProps,
  {
    searchClient
  }
)(SearchAndSelectClient);
