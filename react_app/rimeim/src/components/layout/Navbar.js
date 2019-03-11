import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import logo_rimeim from "../../public/img/logo_rimeim.png"

// Sells
import NewSellMobile from "./mobilemenu/NewSellMobile"
import NewSellWrapper from "./topnav/NewSellWrapper"
import SellsWrapper from "./topnav/SellsWrapper"
import SearchSellWrapper from "./topnav/SearchSellWrapper"

// Quotations
import NewQuotationMobile from "./mobilemenu/NewQuotationMobile"
import QuotationsWrapper from "./topnav/QuotationsWrapper"
import SearchQuotationsWrapper from "./topnav/SearchQuotationsWrapper"
import NewQuotationWrapper from "./topnav/NewQuotationWrapper"

// Devolutions
import DevolutionsWrapper from "./topnav/DevolutionsWrapper"
import SearchDevolutionWrapper from "./topnav/SearchDevolutionWrapper"
import NewDevolutionWrapper from "./topnav/NewDevolutionWrapper"

// Navbar Types
import {
    NEW_SELL,
    SELLS,
    SEARCH_SELL,
    NEW_QUOTATION,
    QUOTATIONS,
    SEARCH_QUOTATION,
    DEVOLUTIONS,
    NEW_DEVOLUTION,
    SEARCH_DEVOLUTION
} from "./NavTypes"

class Navbar extends Component {

    render() {

        const { navtype } = this.props
        var NavWrapper,
            MobileMenu,
            active_sells,
            active_quotes,
            active_devolutions = null

        switch (navtype) {
            case NEW_SELL:
                MobileMenu = NewSellMobile
                NavWrapper = NewSellWrapper
                active_sells = true
                break
            case SELLS:
                active_sells = true
                NavWrapper = SellsWrapper
                break
            case SEARCH_SELL:
                active_sells = true
                NavWrapper = SearchSellWrapper
                break

            // Quotatios
            case NEW_QUOTATION:
                active_quotes = true
                NavWrapper = NewQuotationWrapper
                MobileMenu = NewQuotationMobile
                break

            case QUOTATIONS:
                active_quotes = true
                NavWrapper = QuotationsWrapper
                break

            case SEARCH_QUOTATION:
                active_quotes = true
                NavWrapper = SearchQuotationsWrapper
                break

            // Devolutions
            case DEVOLUTIONS:
                active_devolutions = true
                NavWrapper = DevolutionsWrapper
                break

            case NEW_DEVOLUTION:
                active_devolutions = true
                NavWrapper = NewDevolutionWrapper
                break

            case SEARCH_DEVOLUTION:
                active_devolutions = true
                NavWrapper = SearchDevolutionWrapper
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
                        <NavWrapper />
                    </div>
                </nav>

                <ul className="sidenav sidenav-fixed" id="nav_sidenav">
                    <li className="logo">
                        <a href="#!" className="brand-logo center mt-1">
                            <img src={logo_rimeim} className="logo-sidenav" alt="" />
                        </a>
                        <div className="divider"></div>
                    </li>
                    <li className="no-padding">
                        <ul className="collapsible collapsible-accordion">
                            <li className={`bold ${active_sells && ('active')}`}>
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
                                            <Link to="/buscar_venta">Buscar</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className={`bold ${active_quotes && ('active')}`}>
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">library_books</i>
                                    Cotizaciones</a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <Link to="/nueva_cotizacion">
                                                Nueva
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/cotizaciones">
                                                Historial
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/buscar_cotizacion">
                                                Buscar
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className={`bold ${active_devolutions && ('active')}`}>
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">money_off</i>
                                    Devoluciones</a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <Link to="/devoluciones">
                                                Historial
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/buscar_devolucion">
                                                Buscar
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="bold">
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">border_color</i>
                                    Pedidos</a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <a href="nuevo_pedido.html">Nuevo</a>
                                        </li>
                                        <li><a href="pedidos.html">Historial</a></li>
                                        <li><a href="buscar_pedido.html">Buscar</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="bold">
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">directions_car</i>
                                    Productos</a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <a href="inventario.html">Inventario</a>
                                        </li>
                                        <li><a href="buscar_producto.html">Buscar</a></li>
                                        <li><a href="nuevo_producto.html">Nuevo</a></li>
                                        <li><a href="marcas.html">Marcas</a></li>
                                        <li><a href="tipo_vehiculo.html">Tipo de vehiculo</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="bold">
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">group</i>
                                    Clientes
                            </a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <a href="nuevo_cliente.html">Nuevo</a>
                                        </li>
                                        <li><a href="clientes.html">Ver todos</a></li>
                                        <li><a href="buscar_cliente.html">Buscar</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="bold">
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">perm_contact_calendar</i>
                                    Proveedor
                            </a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <a href="nuevo_proveedor.html">Nuevo</a>
                                        </li>
                                        <li><a href="proveedores.html">Ver todos</a></li>
                                    </ul>
                                </div>
                            </li>
                            <div className="divider"></div>
                            <li className="bold">
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons notifications-active">notifications_active</i>
                                    Cuenta
                            </a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <a href="#!">
                                                <i className="material-icons notifications-active-color">notifications</i>
                                                Notificaciones
                                        </a>
                                        </li>
                                        <li>
                                            <a href="#!">
                                                <i className="material-icons">settings</i>
                                                Configuracion
                                        </a>
                                        </li>
                                        <li><a href="index.html">
                                            <i className="material-icons">exit_to_app</i>
                                            Cerrar sesion</a></li>
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

Navbar.propTypes = {
    navtype: PropTypes.string.isRequired
}

export default Navbar