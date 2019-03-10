import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux configuration
import { Provider } from 'react-redux'
import store from './store'

// Css
import "./public/css/materialize.min.css"
import "./public/css/main.css"

// Pages 
import Login from "./components/pages/auth/Login"
import NewSell from "./components/pages/sells/NewSell"

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
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;