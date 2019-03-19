import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

import logo_rimeim from "../../public/img/logo_rimeim.png"

// Navbar Types
import {
    ADMIN_DEFAULT,
    ADMIN_LOCALS,
    ADMIN_LOCAL,
    ADMIN_EDIT_LOCAL,

    ADMIN_EMPLOYES,
    ADMIN_EDIT_EMPLOYE,
    ADMIN_EMPLOYE,

    ADMIN_USER,
    ADMIN_USERS,

    ADMIN_REPORT_SELLS,
    ADMIN_REPORT_PRODUCTS
} from "./NavTypes"

// Default
import DefaultWrapper from "./admin_topnav/DefaultWrapper"

// Locals
import LocalsMobile from "./admin_mobilemenu/LocalsMobile"
import LocalsWrapper from "./admin_topnav/LocalsWrapper"
import NewLocalWrapper from "./admin_topnav/NewLocalWrapper"
import LocalWrapper from "./admin_topnav/LocalWrapper"

// Functions
import {
    logoutUser,
    setCurrentLocal
} from "../../actions/UserActions"

class NavbarAdmin extends Component {

    render() {

        const { navtype, has_notifications, user: { user: { admin } } } = this.props

        var NavWrapper,
            MobileMenu,
            active_reports = null

        switch (navtype) {
            case ADMIN_DEFAULT:
                NavWrapper = DefaultWrapper
                break

            case ADMIN_LOCALS:
                NavWrapper = LocalsWrapper
                MobileMenu = LocalsMobile
                break

            case ADMIN_LOCAL:
                NavWrapper = LocalWrapper
                break

            case ADMIN_EDIT_LOCAL:
                NavWrapper = NewLocalWrapper
                break

            case ADMIN_EMPLOYES:
                break
            case ADMIN_EDIT_EMPLOYE:
                break
            case ADMIN_EMPLOYE:
                break

            case ADMIN_USER:
                break
            case ADMIN_USERS:
                break

            case ADMIN_REPORT_SELLS:
                break
            case ADMIN_REPORT_PRODUCTS:
                break
            default:
                break
        }

        return (
            <header>
                {MobileMenu && (
                    <MobileMenu />
                )}

                <nav className="red lighten-1 top-nav">
                    <div className="small-container">
                        {NavWrapper && (
                            <NavWrapper />
                        )}
                    </div>
                </nav>

                <ul className="sidenav sidenav-fixed" id="nav_sidenav">
                    <li className="logo">
                        <Link to="/admin_area" className="brand-logo center mt-1">
                            <img src={logo_rimeim} className="logo-sidenav" alt="" />
                        </Link>
                        <div className="divider"></div>
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

                            <li className={`bold ${active_reports && ('active')}`}>
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">trending_up</i>
                                    Reportes
                                </a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <a href="#!">
                                                Ventas
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">
                                                Inventario
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <div className="divider"></div>
                            <li className="bold">
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    {has_notifications ? (
                                        <i className="material-icons notifications-active">notifications_active</i>
                                    ) : (
                                            <i className="material-icons">notifications</i>
                                        )}

                                    Cuenta
                            </a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <a href="#!">
                                                <i className={`material-icons ${has_notifications && ('notifications-active-color')}`}>
                                                    notifications
                                                </i>
                                                Notificaciones
                                        </a>
                                        </li>
                                        {admin && (
                                            <li>
                                                <a href="#!" onClick={() => { this.props.setCurrentLocal(null); }}>
                                                    <i className="material-icons">compare_arrow</i>
                                                    Cambiar de local
                                                </a>
                                            </li>
                                        )}
                                        <li>
                                            <a href="#!">
                                                <i className="material-icons">settings</i>
                                                Configuracion
                                        </a>
                                        </li>
                                        <li>
                                            <a href="#!" onClick={() => { this.props.logoutUser() }}>
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
        )
    }
}

NavbarAdmin.propTypes = {
    user: PropTypes.object.isRequired,
    navtype: PropTypes.string.isRequired,
    has_notifications: PropTypes.bool.isRequired,
    setCurrentLocal: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
}

NavbarAdmin.defaultProps = {
    has_notifications: false
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {
    setCurrentLocal,
    logoutUser
})(NavbarAdmin)