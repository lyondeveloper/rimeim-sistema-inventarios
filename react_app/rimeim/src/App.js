import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux configuration
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

// Css
import './public/css/materialize.min.css';
import './public/css/main.css';

// Home
import Home from './components/pages/home/Home';
import NotFound from './components/common/NotFound';

// Auth
import Login from './components/pages/auth/Login';

// Sells
import NewSell from './components/pages/sells/NewSell';
import Sells from './components/pages/sells/Sells';
import SellReports from './components/pages/sells/SellReports';
import ShowSale from './components/pages/sells/ShowSale';

// Quotations
import NewQuotation from './components/pages/quotes/NewQuotation';
import Quotations from './components/pages/quotes/Quotations';
import ShowQuotation from './components/pages/quotes/ShowQuotation';

// Devolutions
import Devolutions from './components/pages/devolutions/Devolutions';
import NewDevolution from './components/pages/devolutions/NewDevolution';
import ShowDevolution from './components/pages/devolutions/ShowDevolution';

// Orders
import Orders from './components/pages/orders/Orders';
import Order from './components/pages/orders/Order';
import NewOrder from './components/pages/orders/NewOrder';
import EditOrderToProvider from './components/pages/orders/EditOrderToProvider';
import EditOrderToLocal from './components/pages/orders/EditOrderToLocal';

// Products
import Products from './components/pages/products/Products';
import Product from './components/pages/products/Product';
import EditProduct from './components/pages/products/EditProduct';
import Brands from './components/pages/products/Brands';
import Brand from './components/pages/products/Brand';
import NewBrand from './components/pages/products/NewBrand';
import EditBrand from './components/pages/products/EditBrand';
import VehicleType from './components/pages/products/VehicleType';
import NewVehicleType from './components/pages/products/NewVehicleType';
import EditVehicleType from './components/pages/products/EditVehicleType';
import ShowVehicleType from './components/pages/products/ShowVehicleType';

// Clients
import Clients from './components/pages/clients/Clients';
import Client from './components/pages/clients/Client';
import NewClient from './components/pages/clients/NewClient';
import EditClient from './components/pages/clients/EditClient';
import AddClientsFromExcel from './components/pages/clients/ImportFromExcel';

// Providers
import NewProvider from './components/pages/providers/NewProvider';
import EditProvider from './components/pages/providers/EditProvider';
import Providers from './components/pages/providers/Providers';
import Provider from './components/pages/providers/Provider';

// Account
import ConfigurationView from './components/pages/account/ConfigurationView';
import Notifications from './components/pages/account/Notifications';

// Custom component for multiple locals or admin user
import ChoseLocal from './components/pages/auth/ChooseLocal';
import FirstSession from './components/pages/auth/FirstSession';

// Admin area
import AdminArea from './components/pages/admin_area/AdminArea';
import AdminLocal from './components/pages/admin_area/locals/Local';
import AdminLocals from './components/pages/admin_area/locals/Locals';
import AdminNewLocal from './components/pages/admin_area/locals/NewLocal';
import AdminEditLocal from './components/pages/admin_area/locals/EditLocal';

import AdminEmployes from './components/pages/admin_area/employes/Employes';
import AdminEmploye from './components/pages/admin_area/employes/Employe';

import AdminUsers from './components/pages/admin_area/users/Users';
import AdminUser from './components/pages/admin_area/users/User';
import AdminNewUser from './components/pages/admin_area/users/NewUser';

import AdminGlobalVariables from './components/pages/admin_area/globals/GlobalVariables';

import AdminProducts from './components/pages/admin_area/products/Products';
import AdminAddProductsExcel from './components/pages/admin_area/products/NewProductsFromExcel';
import AdminNewProduct from './components/pages/admin_area/products/NewProduct';
import AdminProduct from './components/pages/admin_area/products/Product';
import AdminEditProduct from './components/pages/admin_area/products/EditProduct';
import AdminExportProductsToExcel from './components/pages/admin_area/products/ExportProducts';

import AdminSellsReport from './components/pages/admin_area/reports/SellReports';
import AdminProductsReport from './components/pages/admin_area/reports/ProductsReport';

import AdminConfiguration from './components/pages/admin_area/account/AdminConfiguration';
import AdminNotifications from './components/pages/admin_area/account/Notifications';
// Custom components
import PrivateRoute from './components/common/PrivateRoute';

// Custom functions
import checkAppStatus from './utils/checkAppStatus';

checkAppStatus(store);

class App extends Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/notfound' component={NotFound} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/primera_sesion'
                component={FirstSession}
              />
            </Switch>

            {/* Sells */}
            <Switch>
              <PrivateRoute exact path='/ventas' component={Sells} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/ventas/:id' component={ShowSale} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/nueva_venta' component={NewSell} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/nueva_venta/:id' component={NewSell} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/ventas_reportes'
                component={SellReports}
              />
            </Switch>

            {/* Quotations */}
            <Switch>
              <PrivateRoute
                exact
                path='/nueva_cotizacion'
                component={NewQuotation}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/cotizaciones' component={Quotations} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/cotizaciones/:id'
                component={ShowQuotation}
              />
            </Switch>

            {/* Devolutions */}
            <Switch>
              <PrivateRoute
                exact
                path='/devoluciones'
                component={Devolutions}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/devoluciones/:id'
                component={ShowDevolution}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/nueva_devolucion/:id'
                component={NewDevolution}
              />
            </Switch>

            {/* Orders */}
            <Switch>
              <PrivateRoute exact path='/pedidos' component={Orders} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/pedidos/:id' component={Order} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/nuevo_pedido' component={NewOrder} />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path='/editar_pedido/proveedor/:id'
                component={EditOrderToProvider}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/editar_pedido/local/:id'
                component={EditOrderToLocal}
              />
            </Switch>

            {/* Products */}
            <Switch>
              <PrivateRoute exact path='/productos' component={Products} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/productos/:id' component={Product} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/editar_producto/:id'
                component={EditProduct}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/marcas' component={Brands} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/marcas/:id' component={Brand} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/nueva_marca' component={NewBrand} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/editar_marca/:id'
                component={EditBrand}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/vehiculos' component={VehicleType} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/vehiculos/:id'
                component={ShowVehicleType}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/nuevo_vehiculo'
                component={NewVehicleType}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/editar_vehiculo/:id'
                component={EditVehicleType}
              />
            </Switch>

            {/* Clients */}
            <Switch>
              <PrivateRoute exact path='/clientes' component={Clients} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/clientes/:id' component={Client} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/nuevo_cliente' component={NewClient} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/nuevos_clientes'
                component={AddClientsFromExcel}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/editar_cliente/:id'
                component={EditClient}
              />
            </Switch>

            {/* Providers */}
            <Switch>
              <PrivateRoute
                exact
                path='/nuevo_proveedor'
                component={NewProvider}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/editar_proveedor/:id'
                component={EditProvider}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/proveedores' component={Providers} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/proveedores/:id'
                component={Provider}
              />
            </Switch>

            {/* Account */}
            <Switch>
              <PrivateRoute
                exact
                path='/configuracion'
                component={ConfigurationView}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/notificaciones'
                component={Notifications}
              />
            </Switch>

            {/* ================== Admin Area =================== */}
            {/* Admin Locals */}
            <Switch>
              <PrivateRoute
                exact
                path='/seleccionar_local'
                component={ChoseLocal}
                isSelectLocal={true}
              />
            </Switch>

            {/* Admin area */}
            <Switch>
              <PrivateRoute
                exact
                path='/admin_area'
                component={AdminArea}
                isAdminRoute={true}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/admin/locales'
                component={AdminLocals}
                isAdminRoute={true}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/admin/locales/:id'
                component={AdminLocal}
                isAdminRoute={true}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/admin/locales/editar/:id'
                component={AdminEditLocal}
                isAdminRoute={true}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/admin/nuevo_local'
                component={AdminNewLocal}
                isAdminRoute={true}
              />
            </Switch>

            {/* Admin Employes */}
            <Switch>
              <PrivateRoute
                exact
                path='/admin/empleados'
                component={AdminEmployes}
                isAdminRoute={true}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/admin/empleados/:id'
                component={AdminEmploye}
                isAdminRoute={true}
              />
            </Switch>

            {/* Admin Users */}
            <Switch>
              <PrivateRoute
                exact
                path='/admin/usuarios'
                component={AdminUsers}
                isAdminRoute={true}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/admin/usuarios/:id'
                component={AdminUser}
                isAdminRoute={true}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/admin/nuevo_usuario'
                component={AdminNewUser}
                isAdminRoute={true}
              />
            </Switch>

            {/* Admin Products */}
            <Switch>
              <PrivateRoute
                exact
                path='/admin/productos'
                component={AdminProducts}
                isAdminRoute={true}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/admin/importar_excel'
                component={AdminAddProductsExcel}
                isAdminRoute={true}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/admin/exportar_productos'
                component={AdminExportProductsToExcel}
                isAdminRoute={true}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path='/admin/productos/:id'
                component={AdminProduct}
                isAdminRoute={true}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/admin/nuevo_producto'
                component={AdminNewProduct}
                isAdminRoute={true}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/admin/editar_producto/:id'
                component={AdminEditProduct}
                isAdminRoute={true}
              />
            </Switch>

            {/* Admin reports */}
            <Switch>
              <PrivateRoute
                exact
                path='/admin/reportes/ventas'
                component={AdminSellsReport}
                isAdminRoute={true}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/admin/reportes/productos'
                component={AdminProductsReport}
                isAdminRoute={true}
              />
            </Switch>

            {/* Global Variables */}
            <Switch>
              <PrivateRoute
                exact
                path='/admin/empresa'
                component={AdminGlobalVariables}
                isAdminRoute={true}
              />
            </Switch>

            {/* Admin Configuration */}
            <Switch>
              <PrivateRoute
                exact
                path='/admin/configuracion'
                component={AdminConfiguration}
                isAdminRoute={true}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path='/admin/notificaciones'
                component={AdminNotifications}
                isAdminRoute={true}
              />
            </Switch>
          </React.Fragment>
        </Router>
      </ReduxProvider>
    );
  }
}

export default App;
