import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

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

// Orders
import OrdersMobile from "./mobilemenu/OrdersMobile"
import NewOrderWrapper from "./topnav/NewOrderWrapper"
import OrderWrapper from "./topnav/OrderWrapper"
import OrdersWrapper from "./topnav/OrdersWrapper"
import SearchOrderWrapper from "./topnav/SearchOrderWrapper"

// Products
import NewProductMobile from "./mobilemenu/NewProductMobile"
import BrandsMovile from "./mobilemenu/BrandsMovile"
import VehicleTypeMobile from "./mobilemenu/VehicleTypeMobile"
import ProductsWrapper from "./topnav/ProductsWrapper"
import NewProductWrapper from "./topnav/NewProductWrapper"
import SearchProductWrapper from "./topnav/SearchProductWrapper"
import BrandsWrapper from "./topnav/BrandsWrapper"
import VehicleTypeWrapper from "./topnav/VehicleTypeWrapper"

// Clients
import ClientsWrapper from "./topnav/ClientsWrapper"
import NewClientWrapper from "./topnav/NewClientWrapper"
import SearchClientWrapper from "./topnav/SearchClientWrapper"

// Provider
import ProviderMobile from "./mobilemenu/ProviderMobile"
import ProvidersWrapper from "./topnav/ProvidersWrapper"
import ProviderWrapper from "./topnav/ProviderWrapper"
import NewProviderWrapper from "./topnav/NewProviderWrapper"

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
    SEARCH_DEVOLUTION,

    NEW_ORDER,
    ORDERS,
    ORDER,
    SEARCH_ORDER,

    PRODUCTS,
    NEW_PRODUCT,
    SEARCH_PRODUCT,
    BRANDS,
    VEHICLE_TYPE,
    CLIENTS,
    NEW_CLIENT,
    SEARCH_CLIENT,

    PROVIDERS,
    PROVIDER,
    NEW_PROVIDER
} from "./NavTypes"

// Functions
import {
    logoutUser,
    setCurrentLocal
} from "../../actions/UserActions"

class Navbar extends Component {

    render() {

        const { navtype, has_notifications, user: { user: { admin }}} = this.props 

        var NavWrapper,
            MobileMenu,
            active_sells,
            active_quotes,
            active_devolutions,
            active_orders,
            active_products,
            active_clients,
            active_provider = null

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

            // Case orders
            case NEW_ORDER:
                active_orders = true
                NavWrapper = NewOrderWrapper
                break

            case ORDERS:
                active_orders = true
                NavWrapper = OrdersWrapper
                MobileMenu = OrdersMobile
                break

            case ORDER:
                active_orders = true
                NavWrapper = OrderWrapper
                break

            case SEARCH_ORDER:
                active_orders = true
                NavWrapper = SearchOrderWrapper
                break

            //Products
            case PRODUCTS:
                active_products = true
                NavWrapper = ProductsWrapper
                break

            case NEW_PRODUCT:
                active_products = true
                MobileMenu = NewProductMobile
                NavWrapper = NewProductWrapper
                break

            case SEARCH_PRODUCT:
                active_products = true
                NavWrapper = SearchProductWrapper
                break

            case BRANDS:
                active_products = true
                MobileMenu = BrandsMovile
                NavWrapper = BrandsWrapper
                break

            case VEHICLE_TYPE:
                active_products = true
                MobileMenu = VehicleTypeMobile
                NavWrapper = VehicleTypeWrapper
                break

            // Clients
            case CLIENTS:
                active_clients = true
                NavWrapper = ClientsWrapper
                break

            case NEW_CLIENT:
                active_clients = true
                NavWrapper = NewClientWrapper
                break

            case SEARCH_CLIENT:
                active_clients = true
                NavWrapper = SearchClientWrapper
                break

            // Provider
            case PROVIDER:
                active_provider = true
                MobileMenu = ProviderMobile
                NavWrapper = ProviderWrapper
                break

            case NEW_PROVIDER:
                active_provider = true
                NavWrapper = NewProviderWrapper
                break

            case PROVIDERS:
                active_provider = true
                NavWrapper = ProvidersWrapper
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
                        <a href="#!" className="brand-logo center mt-1">
                            <img src={logo_rimeim} className="logo-sidenav" alt="" />
                        </a>
                        <div className="divider"></div>
                    </li>
                    <li className="no-padding">
                        <ul className="collapsible collapsible-accordion pb-navbar">
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
                            <li className={`bold ${active_orders && ('active')}`}>
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">border_color</i>
                                    Pedidos</a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <Link to="/nuevo_pedido">
                                                Nuevo
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/pedidos">
                                                Pedidos
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/buscar_pedido">
                                                Buscar
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className={`bold ${active_products && ('active')}`}>
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">directions_car</i>
                                    Productos</a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <Link to="/productos">
                                                Inventario
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/buscar_producto">
                                                Buscar
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/nuevo_producto">
                                                Nuevo
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/marcas">
                                                Marcas
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/vehiculos">
                                                Tipo de vehiculo
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className={`bold ${active_clients && ('active')}`}>
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">group</i>
                                    Clientes
                            </a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <Link to="/nuevo_cliente">
                                                Nuevo
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/clientes">
                                                Ver todos
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/buscar_cliente">
                                                Buscar
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className={`bold ${active_provider && ('active')}`}>
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">perm_contact_calendar</i>
                                    Proveedor
                            </a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <Link to="/nuevo_proveedor">
                                                Nuevo
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/proveedores">
                                                Ver todos
                                            </Link>
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
                                        { admin && (
                                            <li>
                                                <a href="#!" onClick={() => {this.props.setCurrentLocal(null);}}>
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

Navbar.propTypes = {
    user: PropTypes.object.isRequired,
    navtype: PropTypes.string.isRequired,
    has_notifications: PropTypes.bool.isRequired,
    setCurrentLocal: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
}

Navbar.defaultProps = {
    has_notifications: false
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {
    setCurrentLocal,
    logoutUser
})(Navbar)