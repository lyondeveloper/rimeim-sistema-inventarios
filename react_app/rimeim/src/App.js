import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux configuration
import { Provider } from 'react-redux'
import store from './store'

// Css
import "./public/css/materialize.min.css"
import "./public/css/main.css"

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

// Custom functions
import checkAppStatus from "./utils/checkAppStatus"
checkAppStatus(store)

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />

            <Route exact path="/nueva_venta" component={NewSell} />
            <Route exact path="/ventas" component={Sells} />
            <Route exact path="/buscar_venta" component={SearchSell} />

            <Route exact path="/nueva_cotizacion" component={NewQuotation} />
            <Route exact path="/cotizaciones" component={Quotations} />
            <Route exact path="/buscar_cotizacion" component={SearchQuotation} />

            <Route exact path="/devoluciones" component={Devolutions} />
            <Route exact path="/buscar_devolucion" component={SearchDevolution} />

            <Route exact path="/pedidos" component={Orders} />
            <Route exact path="/nuevo_pedido" component={NewOrder} />
            <Route exact path="/buscar_pedido" component={SearchOrder} />

            <Route exact path="/productos" component={Products} />
            <Route exact path="/nuevo_producto" component={NewProduct} />
            <Route exact path="/buscar_producto" component={SearchProduct} />
            <Route exact path="/marcas" component={Brands} />
            <Route exact path="/vehiculos" component={VehicleType} />

            <Route exact path="/clientes" component={Clients} />
            <Route exact path="/buscar_cliente" component={SearchClient} />
            <Route exact path="/nuevo_cliente" component={NewClient} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;