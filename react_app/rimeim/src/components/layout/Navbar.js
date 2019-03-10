import React, { Component } from 'react'

import logo_rimeim from "../../public/img/logo_rimeim.png"

class Navbar extends Component {

    render() {
        return (
            <header>
                <ul id="dropdown_more" className="dropdown-content">
                    <li>
                        <a href="#!">
                            <i className="material-icons ">save</i>
                            Guardar
                    </a>
                    </li>
                    <li>
                        <a href="#modal_buscar_producto">
                            <i className="material-icons">search</i>
                            Buscar
                    </a>
                    </li>
                    <li>
                        <a href="#!">
                            <i className="material-icons">check</i>
                            Facturar
                    </a>
                    </li>
                </ul>

                <nav className="red lighten-1 top-nav">
                    <div className="small-container">
                        <div className="nav-wrapper">
                            <a href="#!" className="brand-logo">
                                Nueva venta
                        </a>
                            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                                <i className="material-icons">menu</i>
                            </a>
                            <ul className="right hide-on-small-only">
                                <li>
                                    <a href="#!" className="tooltipped" data-position="bottom" data-tooltip="Guardar">
                                        <i className="material-icons">save</i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#modal_buscar_producto" className="modal-trigger tooltipped" data-position="bottom"
                                        data-tooltip="Buscar producto">
                                        <i className="material-icons">search</i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="tooltipped" data-position="bottom" data-tooltip="Facturar">
                                        <i className="material-icons">check</i>
                                    </a>
                                </li>
                            </ul>

                            <ul className="right mobile-only">
                                <li>
                                    <a className="dropdown-trigger" href="#!" data-target="dropdown_more">
                                        <i className="material-icons right">more_vert</i>
                                    </a>
                                </li>
                            </ul>
                        </div>
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
                            <li className="bold active">
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">monetization_on</i>
                                    Ventas
                            </a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <a href="nueva_venta.html">Nueva</a>
                                        </li>
                                        <li><a href="historial_ventas.html">Historial</a></li>
                                        <li><a href="buscar_venta.html">Buscar</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="bold">
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">library_books</i>
                                    Cotizaciones</a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <a href="nueva_cotizacion.html">Nueva</a>
                                        </li>
                                        <li><a href="cotizaciones.html">Historial</a></li>
                                        <li><a href="buscar_cotizacion.html">Buscar</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="bold">
                                <a className="collapsible-header" tabIndex="0" href="#!">
                                    <i className="material-icons">money_off</i>
                                    Devoluciones</a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <a href="devolucion.html">Nueva</a>
                                        </li>
                                        <li><a href="devoluciones.html">Historial</a></li>
                                        <li><a href="buscar_devolucion.html">Buscar</a></li>
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

export default Navbar