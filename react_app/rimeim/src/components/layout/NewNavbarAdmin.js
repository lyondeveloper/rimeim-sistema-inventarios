import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo_rimeim from '../../public/img/logo_rimeim.png';

// Functions
import { logoutUser, setCurrentLocal } from '../../actions/UserActions';
import isEmpty from '../../actions/isEmpty';

class NavbarAdmin extends Component {
  render() {
    const {
      active_nav,
      user: { user }
    } = this.props;
    const has_notifications = !isEmpty(user.notificaciones);
    let mobile_nav = this.props.mobile_nav ? this.props.mobile_nav : null;

    return (
      <header>
        {mobile_nav}

        <nav className="red lighten-1 top-nav">
          <div className="small-container">{this.props.children}</div>
        </nav>

        <ul className="sidenav sidenav-fixed" id="nav_sidenav">
          <li className="logo">
            <Link to="/admin_area" className="brand-logo center mt-1">
              <img src={logo_rimeim} className="logo-sidenav" alt="" />
            </Link>
            <div className="divider" />
          </li>
          <li className="no-padding">
            <ul className="collapsible collapsible-accordion pb-navbar">
              <li className="bold">
                <Link to="/admin/locales">
                  <i className="material-icons">store</i>
                  Locales
                </Link>
              </li>

              <li className="bold">
                <Link to="/admin/empleados">
                  <i className="material-icons">people</i>
                  Empleados
                </Link>
              </li>

              <li className="bold">
                <Link to="/admin/usuarios">
                  <i className="material-icons">account_circle</i>
                  Usuarios
                </Link>
              </li>

              <li className="bold">
                <Link to="/admin/empresa">
                  <i className="material-icons">settings</i>
                  Configuracion
                </Link>
              </li>

              <li className={`bold ${active_nav === 'PRODUCTOS' && 'active'}`}>
                <a className="collapsible-header" tabIndex="0" href="#!">
                  <i className="material-icons">directions_car</i>
                  Productos
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <Link to="/admin/productos">Inventario</Link>
                    </li>
                    <li>
                      <Link to="/admin/nuevo_producto">Nuevo producto</Link>
                    </li>
                    <li>
                      <Link to="/admin/importar_excel">Importar Excel</Link>
                    </li>
                    <li>
                      <Link to="/admin/exportar_productos">Exportar Excel</Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className={`bold ${active_nav === 'REPORTES' && 'active'}`}>
                <a className="collapsible-header" tabIndex="0" href="#!">
                  <i className="material-icons">trending_up</i>
                  Reportes
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <Link to="/admin/reportes/ventas">Ventas</Link>
                    </li>
                    <li>
                      <a href="#!">Inventario</a>
                    </li>
                  </ul>
                </div>
              </li>
              <div className="divider" />
              <li className={`bold ${active_nav === 'CUENTA' && 'active'}`}>
                <a className="collapsible-header" tabIndex="0" href="#!">
                  {has_notifications ? (
                    <i className="material-icons notifications-active-color">
                      notifications_active
                    </i>
                  ) : (
                    <i className="material-icons">notifications</i>
                  )}
                  Cuenta
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <Link to="/admin/notificaciones">
                        <i
                          className={`material-icons ${has_notifications &&
                            'notifications-active-color'}`}
                        >
                          notifications
                        </i>
                        Notificaciones
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#!"
                        onClick={() => {
                          this.props.setCurrentLocal(null);
                        }}
                      >
                        <i className="material-icons">compare_arrow</i>
                        Cambiar de local
                      </a>
                    </li>
                    <li>
                      <Link to="/admin/configuracion">
                        <i className="material-icons">settings</i>
                        Configuracion
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#!"
                        onClick={() => {
                          this.props.logoutUser();
                        }}
                      >
                        <i className="material-icons">exit_to_app</i>
                        Cerrar sesion
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </header>
    );
  }
}

NavbarAdmin.propTypes = {
  user: PropTypes.object.isRequired,
  active_nav: PropTypes.string,
  setCurrentLocal: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  {
    setCurrentLocal,
    logoutUser
  }
)(NavbarAdmin);
