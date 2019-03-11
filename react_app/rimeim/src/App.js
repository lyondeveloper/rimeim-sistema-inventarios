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
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;