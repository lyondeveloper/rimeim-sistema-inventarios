import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux configuration
import { Provider as ReduxProvider } from 'react-redux'
import store from './store'

// Css
import "./public/css/materialize.min.css"
import "./public/css/main.css"

// Home
import Home from "./components/pages/home/Home"
import NotFound from "./components/pages/home/NotFound"

// Auth 
import Login from "./components/pages/auth/Login"

// Sells
import NewSell from "./components/pages/sells/NewSell"
import Sells from "./components/pages/sells/Sells"
import SearchSell from "./components/pages/sells/SearchSell"

// Quotations
import NewQuotation from "./components/pages/quotes/NewQuotation"
import Quotations from "./components/pages/quotes/Quotations"
import SearchQuotation from "./components/pages/quotes/SearchQuotation"

// Devolutions
import Devolutions from "./components/pages/devolutions/Devolutions"
import SearchDevolution from "./components/pages/devolutions/SearchDevolution"

// Orders
import Orders from "./components/pages/orders/Orders"
import NewOrder from "./components/pages/orders/NewOrder"
import SearchOrder from "./components/pages/orders/SearchOrder"

// Products
import Products from "./components/pages/products/Products"
import NewProduct from "./components/pages/products/NewProduct"
import SearchProduct from "./components/pages/products/SearchProduct"
import Brands from "./components/pages/products/Brands"
import VehicleType from "./components/pages/products/VehicleType"

// Clients
import Clients from "./components/pages/clients/Clients"
import NewClient from "./components/pages/clients/NewClient"
import SearchClient from "./components/pages/clients/SearchClient"

// Providers
import NewProvider from "./components/pages/providers/NewProvider"
import Provider from "./components/pages/providers/Provider"
import Providers from "./components/pages/providers/Providers"

// Custom component for multiple locals or admin user
import ChoseLocal from "./components/pages/auth/ChooseLocal"

// Admin area
import AdminArea from "./components/pages/admin_area/AdminArea"
import Locals from "./components/pages/admin_area/locals/Locals"

// Custom components
import PrivateRoute from "./components/common/PrivateRoute"

// Custom functions
import checkAppStatus from "./utils/checkAppStatus"
checkAppStatus(store)

class App extends Component {

  render() {
    return (
      <ReduxProvider store={store}>
        <Router>
          <React.Fragment>

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/notfound" component={NotFound} />
            </Switch>

            {/* Sells */}
            <Switch>
              <PrivateRoute exact path="/ventas" component={Sells} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact path="/nueva_venta" component={NewSell}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/buscar_venta" component={SearchSell} />
            </Switch>


            {/* Quotations */}
            <Switch>
              <PrivateRoute exact path="/nueva_cotizacion" component={NewQuotation} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/cotizaciones" component={Quotations} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/buscar_cotizacion" component={SearchQuotation} />
            </Switch>


            {/* Devolutions */}
            <Switch>
              <PrivateRoute exact path="/devoluciones" component={Devolutions} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/buscar_devolucion" component={SearchDevolution} />
            </Switch>


            {/* Orders */}
            <Switch>
              <PrivateRoute exact path="/pedidos" component={Orders} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/nuevo_pedido" component={NewOrder} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/buscar_pedido" component={SearchOrder} />
            </Switch>


            {/* Products */}
            <Switch>
              <PrivateRoute exact path="/productos" component={Products} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/nuevo_producto" component={NewProduct} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/buscar_producto" component={SearchProduct} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/marcas" component={Brands} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/vehiculos" component={VehicleType} />
            </Switch>


            {/* Clients */}
            <Switch>
              <PrivateRoute exact path="/clientes" component={Clients} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/buscar_cliente" component={SearchClient} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/nuevo_cliente" component={NewClient} />
            </Switch>

            {/* Providers */}
            <Switch>
              <PrivateRoute exact path="/nuevo_proveedor" component={NewProvider} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/proveedores" component={Providers} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/proveedores/:id" component={Provider} />
            </Switch>

            {/* Locals */}
            <Switch>
              <PrivateRoute exact path="/seleccionar_local" component={ChoseLocal} isSelectLocal={true} />
            </Switch>

            {/* Admin area */}
            <Switch>
              <PrivateRoute exact path="/admin_area" component={AdminArea} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/admin/locales" component={Locals} />
            </Switch>

          </React.Fragment>
        </Router>
      </ReduxProvider>
    )
  }
}

export default App;