import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavbarAdmin from '../../../layout/NewNavbarAdmin';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../../utils/MaterialFunctions';

import { getUsers } from '../../../../actions/UserActions';

import Spinner from '../../../common/Spinner';
import SearchUserModal from '../../../layout/modals/SearchUser';

class AdminUsers extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getUsers();
  }

  render() {
    const { users, loading } = this.props.user;
    return (
      <React.Fragment>
        <NavbarAdmin>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Usuarios
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <a href="#modal_buscar_usuario" className="modal-trigger">
                  <i className="material-icons">search</i>
                </a>
              </li>
              <li>
                <Link to="/admin/nuevo_usuario">
                  <i className="material-icons">add</i>
                </Link>
              </li>
            </ul>
          </div>
        </NavbarAdmin>

        <main>
          <div className="row">
            {loading ? (
              <Spinner fullWidth />
            ) : (
              users.map(user => (
                <div className="col s12 m6 l6" key={user.id}>
                  <div className="card hoverable">
                    <Link to={`/admin/usuarios/${user.id}`}>
                      <div
                        className={`card-content ${!user.habilitado &&
                          'grey lighten-2'}`}
                      >
                        <div className="d-block border-bottom p-1">
                          ID: {user.id}
                        </div>
                        <div className="d-block border-bottom p-1">
                          Nombre: <span>{user.nombre}</span>
                        </div>
                        <div className="d-block p-1">
                          Admin: {user.admin ? 'Si' : 'No'}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        <SearchUserModal is_only_textbox={true} />
      </React.Fragment>
    );
  }
}

AdminUsers.propTypes = {
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  {
    getUsers
  }
)(AdminUsers);
