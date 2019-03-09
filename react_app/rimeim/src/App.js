import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import M from 'materialize-css'

// Redux configuration
import { Provider } from 'react-redux'
import store from './store'

// Css
import "./public/css/materialize.min.css"
import "./public/css/main.css"

// Pages 
import Login from "./components/pages/auth/Login"

// Custom functions
import checkAppStatus from "./utils/checkAppStatus"
checkAppStatus(store)

class App extends Component {

  componentDidMount() {
    M.Sidenav.init(document.querySelectorAll('.sidenav'), []);
    M.Collapsible.init(document.querySelectorAll('.collapsible'), []);
    M.Modal.init(document.querySelectorAll('.modal'), []);
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), []);
    M.FormSelect.init(document.querySelectorAll('select'), []);
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), []);
    M.updateTextFields();
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;