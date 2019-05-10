import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import logo_rimeim from "../../public/img/logo_rimeim.png";

import { logoutUser, setCurrentLocal } from "../../actions/UserActions";

class NewNavbar extends Component {
  render() {
    const {
      active_nav,
      has_notifications,
      show_more_option,
      user: {
        user: { admin }
      }
    } = this.props;
    let mobile_nav = this.props.mobile_nav ? this.props.mobile_nav : null;

    return (
      <header>
        {mobile_nav}

        <nav className="red lighten-1 top-nav">
          <div className="small-container">
            {this.props.children}
            {show_more_option && (
              <ul className="mobile-only right">
                <li>
                  <a
                    className="dropdown-trigger"
                    href="#!"
                    data-target="dropdown_more"
                  >
                    <i className="material-icons">more_vert</i>
                  </a>
                </li>
              </ul>
            )}
          </div>
        </nav>

        <ul className="sidenav sidenav-fixed" id="nav_sidenav">
          <li className="logo">
            <a href="#!" className="brand-logo center mt-1">
              <img src={logo_rimeim} className="logo-sidenav" alt="" />
            </a>
            <div className="divider" />
          </li>
          <li className="no-padding">
            <ul className="collapsible collapsible-accordion pb-navbar">
              <li className={`bold ${active_nav === "VENTAS" && "active"}`}>
                <a className="collapsible-header" tabIndex="0" href="#!">
                  <i className="material-icons">monetization_on</i>
                  Ventas
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <Link to="/nueva_venta"> Nueva </Link>
                    </li>
                    <li>
                      <Link to="/ventas"> Historial </Link>
                    </li>
                    <li>
                      <Link to="/ventas_reportes">Reportes</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className={`bold ${active_nav === "COTIZACIONES" && "active"}`}
              >
                <a className="collapsible-header" tabIndex="0" href="#!">
                  <i className="material-icons">library_books</i>
                  Cotizaciones
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <Link to="/nueva_cotizacion">Nueva</Link>
                    </li>
                    <li>
                      <Link to="/cotizaciones">Historial</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className={`bold ${active_nav === "DEVOLUCIONES" && "active"}`}
              >
                <a className="collapsible-header" tabIndex="0" href="#!">
                  <i className="material-icons">money_off</i>
                  Devoluciones
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <Link to="/devoluciones">Historial</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={`bold ${active_nav === "PEDIDOS" && "active"}`}>
                <a className="collapsible-header" tabIndex="0" href="#!">
                  <i className="material-icons">border_color</i>
                  Pedidos
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <Link to="/nuevo_pedido">Nuevo</Link>
                    </li>
                    <li>
                      <Link to="/pedidos">Pedidos</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={`bold ${active_nav === "PRODUCTOS" && "active"}`}>
                <a className="collapsible-header" tabIndex="0" href="#!">
                  <i className="material-icons">directions_car</i>
                  Productos
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <Link to="/productos">Inventario</Link>
                    </li>
                    <li>
                      <Link to="/nuevo_producto">Nuevo</Link>
                    </li>
                    <li>
                      <Link to="/marcas">Marcas</Link>
                    </li>
                    <li>
                      <Link to="/vehiculos">Tipo de vehiculo</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={`bold ${active_nav === "CLIENTES" && "active"}`}>
                <a className="collapsible-header" tabIndex="0" href="#!">
                  <i className="material-icons">group</i>
                  Clientes
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <Link to="/nuevo_cliente">Nuevo</Link>
                    </li>
                    <li>
                      <Link to="/clientes">Ver todos</Link>
                    </li>
                    <li>
                      <Link to="/nuevos_clientes">Importar Excel</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={`bold ${active_nav === "PROVEEDOR" && "active"}`}>
                <a className="collapsible-header" tabIndex="0" href="#!">
                  <i className="material-icons">perm_contact_calendar</i>
                  Proveedor
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <Link to="/nuevo_proveedor">Nuevo</Link>
                    </li>
                    <li>
                      <Link to="/proveedores">Ver todos</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <div className="divider" />
              <li className={`bold ${active_nav === "CUENTA" && "active"}`}>
                <a className="collapsible-header" tabIndex="0" href="#!">
                  {has_notifications ? (
                    <i className="material-icons notifications-active">
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
                      <a href="#!">
                        <i
                          className={`material-icons ${has_notifications &&
                            "notifications-active-color"}`}
                        >
                          notifications
                        </i>
                        Notificaciones
                      </a>
                    </li>
                    {admin && (
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
                    )}
                    <li>
                      <Link to="/configuracion">
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

NewNavbar.propTypes = {
  user: PropTypes.object.isRequired,
  active_nav: PropTypes.string,
  has_notifications: PropTypes.bool.isRequired,
  setCurrentLocal: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  show_more_option: PropTypes.bool.isRequired
};

NewNavbar.defaultProps = {
  has_notifications: false,
  show_more_option: false
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
)(NewNavbar);
