import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../../common/Spinner';
import TextFieldInput from '../../common/TextInputField';
import { getModalInstanceById } from '../../../utils/MaterialFunctions';

import { getUsersByField, clearUsers } from '../../../actions/UserActions';

class SearchUser extends Component {
  state = {
    modal_id: 'modal_buscar_usuario',
    usuario: '',
    typing: false,
    typingTimeout: 0,
    searching: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.users) {
      this.setState({ searching: false });
    }
  }

  onSelectUser = user => {
    const currentModal = getModalInstanceById(this.state.modal_id);
    currentModal.close();
    this.setState({ usuario: '' });

    if (this.props.is_only_textbox) return;
    this.props.onSelectNewUser(user);
    this.props.clearUsers();
  };

  onChangeTextInput = e => {
    if (this.state.typingTimeout) {
      this.setState({ searching: true });
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      usuario: e.target.value,
      typing: false,
      typingTimeout: setTimeout(() => {
        this.props.getUsersByField(this.state.usuario);
      }, 2000)
    });
  };

  render() {
    const { usuario, searching } = this.state;
    var results = null;

    if (!this.props.is_only_textbox) {
      const { users } = this.props.user;
      if (searching) {
        results = <Spinner fullWidth />;
      } else {
        results = (
          <div className="row">
            <div className="col s12">
              {users.map((usuario, i) => {
                return (
                  <div
                    className="d-block cursor-pointer bordered p-1"
                    key={usuario.id}
                    onClick={() => {
                      this.onSelectUser(usuario);
                    }}
                  >
                    {usuario.id} - {usuario.nombre}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    }

    return (
      <div className="modal" id={this.state.modal_id}>
        <div className="modal-content">
          <h5>Buscar usuario</h5>
          <div className="row">
            <TextFieldInput
              id="usuario"
              label="ID o nombre del usuario"
              value={usuario}
              onchange={this.onChangeTextInput}
            />
          </div>
          {results}
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="btn-flat left"
            onClick={() => {
              this.onSelectUser(null);
            }}
          >
            Cerrar
          </a>
        </div>
      </div>
    );
  }
}

SearchUser.propTypes = {
  user: PropTypes.object.isRequired,
  is_only_textbox: PropTypes.bool.isRequired,
  getUsersByField: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  onSelectNewUser: PropTypes.func
};

SearchUser.defaultProps = {
  is_only_textbox: false
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  {
    getUsersByField,
    clearUsers
  }
)(SearchUser);
